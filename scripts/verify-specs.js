const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TOOLS_DIR = path.join(__dirname, '..', 'app', 'tools');
const SPECS_DIR = path.join(__dirname, '..', 'docs', 'specs');

// Cores para output no console
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

// Parâmetros da CLI
const args = process.argv.slice(2);
const onlyChanged = args.includes('--only-changed') || args.includes('-c');
const strict = args.includes('--strict');

console.log(`${BLUE}🔍 Verificando especificações SDD (Spec-Driven Development)...${RESET}`);
if (onlyChanged) {
  console.log(`${YELLOW}Modo incremental ativo: Verificando apenas ferramentas novas ou modificadas via Git.${RESET}\n`);
} else {
  console.log(`${YELLOW}Modo completo ativo: Verificando todas as ferramentas do repositório.${RESET}\n`);
}

if (!fs.existsSync(TOOLS_DIR)) {
  console.error(`${RED}Erro: O diretório de ferramentas não foi encontrado em: ${TOOLS_DIR}${RESET}`);
  process.exit(1);
}

if (!fs.existsSync(SPECS_DIR)) {
  console.error(`${RED}Erro: O diretório de especificações não foi encontrado em: ${SPECS_DIR}${RESET}`);
  process.exit(1);
}

// Retorna todos os page.tsx sob app/tools
function getToolPages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getToolPages(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Retorna arquivos modificados ou não rastreados no Git sob app/tools
function getChangedToolPages() {
  try {
    // Pega arquivos modificados (staged e unstaged) + não rastreados (untracked) detalhadamente
    const statusOutput = execSync('git status --porcelain -u app/tools', { encoding: 'utf8' });
    const changedFiles = statusOutput
      .split('\n')
      .map(line => line.trim().substring(3).trim()) // Remove status codes
      .filter(filePath => filePath.endsWith('page.tsx'))
      .map(filePath => path.join(__dirname, '..', filePath));

    // Pega também diferenças em commits recentes na branch atual comparada com 'developer' ou 'main'
    // caso o usuário já tenha feito commit localmente mas ainda não pushou/mergeou.
    // Para simplificar, o status local cobre 95% dos casos de desenvolvimento ativo.
    return Array.from(new Set(changedFiles));
  } catch (err) {
    console.log(`${YELLOW}Aviso: Não foi possível ler o status do Git. Verificando todos os arquivos.${RESET}\n`);
    return getToolPages(TOOLS_DIR);
  }
}

const targetPages = onlyChanged ? getChangedToolPages() : getToolPages(TOOLS_DIR);
const missingSpecs = [];
let checkedCount = 0;

targetPages.forEach((pagePath) => {
  const relativeToTools = path.relative(TOOLS_DIR, pagePath);
  
  if (relativeToTools === 'page.tsx') {
    return;
  }

  checkedCount++;

  // Caminho da spec correspondente: substitui '/page.tsx' por '.md'
  const specRelativePath = relativeToTools.replace(/[\\/]page\.tsx$/, '.md');
  const specFullPath = path.join(SPECS_DIR, specRelativePath);

  const pageDisplayPath = path.join('app', 'tools', relativeToTools).replace(/\\/g, '/');
  const specDisplayPath = path.join('docs', 'specs', specRelativePath).replace(/\\/g, '/');

  if (fs.existsSync(specFullPath)) {
    console.log(`${GREEN}✓ OK:${RESET} ${pageDisplayPath} -> ${specDisplayPath}`);
  } else {
    console.log(`${RED}✗ FALTANDO:${RESET} ${pageDisplayPath}`);
    console.log(`   Esperado em: ${YELLOW}${specDisplayPath}${RESET}`);
    missingSpecs.push({
      tool: pageDisplayPath,
      expectedSpec: specDisplayPath,
    });
  }
});

console.log('\n--------------------------------------------------');
console.log(`Resumo: ${checkedCount} ferramenta(s) analisada(s).`);

if (missingSpecs.length > 0) {
  console.log(`\n${RED}Encontrada(s) ${missingSpecs.length} ferramenta(s) sem especificação SDD:${RESET}`);
  missingSpecs.forEach((item) => {
    console.log(`- ${item.tool} (crie a especificação em: ${item.expectedSpec})`);
  });
  console.log(`\n${YELLOW}Dica: Copie o template padrão em docs/specs/template.md para iniciar.${RESET}\n`);
  
  // Se for strict ou se estivermos validando apenas as modificadas ativamente, falha o processo.
  // Caso contrário, apenas avisa para permitir adoção gradual sem quebrar comandos padrão de dev.
  if (strict || onlyChanged) {
    console.error(`${RED}Erro: A verificação falhou devido a especificações ausentes.${RESET}`);
    process.exit(1);
  } else {
    console.log(`${YELLOW}Aviso: Algumas especificações estão ausentes, mas a execução continuou sem erros (modo não-estrito).${RESET}`);
    process.exit(0);
  }
} else {
  console.log(`\n${GREEN}Sucesso: Todas as ferramentas verificadas possuem especificações correspondentes! 🎉${RESET}\n`);
  process.exit(0);
}
