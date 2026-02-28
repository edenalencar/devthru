import { BlogPost } from '../index'

export const postDadosFicticiosTestesApi: BlogPost = {
    slug: 'gerar-dados-ficticios-testes-api',
    title: 'Como Gerar Dados Fictícios para Testes de API (Mock Data)',
    description: 'Aprenda a criar dados realistas para popular seu banco de dados em testes automatizados. Com exemplos usando Faker.js, Factory Bot e ferramentas online gratuitas.',
    date: '2026-02-26',
    author: 'DevThru',
    category: 'testes-qa',
    readingTime: 10,
    tags: ['mock data', 'dados fictícios', 'testes automatizados', 'Faker.js', 'QA', 'API testing'],
    relatedTools: ['/tools/development/mock-data', '/tools/personal/person', '/tools/documents/cpf'],
    content: `
<p>Todo desenvolvedor já passou por isso: você precisa testar uma API, popular um banco de dados ou rodar testes automatizados, mas não tem dados para usar. Copiar dados de produção é um risco enorme (LGPD, segurança), e criar registros na mão é improdutivo.</p>

<p>A solução é gerar <strong>dados fictícios realistas</strong> — também chamados de <strong>mock data</strong> ou <strong>fake data</strong>. Neste guia, vamos mostrar as melhores ferramentas e bibliotecas para isso, com exemplos práticos para cada situação.</p>

<h2>Por Que Usar Dados Fictícios?</h2>

<ul>
<li><strong>Conformidade com a LGPD:</strong> dados reais de clientes nunca devem ser usados em ambientes de teste</li>
<li><strong>Reprodutibilidade:</strong> testes com dados fixos são mais previsíveis</li>
<li><strong>Velocidade:</strong> é muito mais rápido gerar 10.000 registros do que criá-los manualmente</li>
<li><strong>Cobertura:</strong> dados gerados podem simular edge cases (nomes longos, CEPs inválidos, etc)</li>
</ul>

<div class="info-box">
<strong>⚠️ Atenção à LGPD:</strong> A Lei Geral de Proteção de Dados proíbe o uso de dados pessoais reais em ambientes de teste e homologação. Geradores de dados fictícios resolvem esse problema por design.
</div>

<h2>Abordagem 1: Bibliotecas de Código (Faker.js)</h2>

<p>O <strong>Faker.js</strong> (agora mantido como <code>@faker-js/faker</code>) é a biblioteca mais popular para gerar dados fictícios em JavaScript/TypeScript.</p>

<h3>Instalação</h3>

<pre><code class="language-bash">npm install @faker-js/faker
</code></pre>

<h3>Gerando dados básicos</h3>

<pre><code class="language-javascript">import { faker } from '@faker-js/faker/locale/pt_BR';

// Gerar uma pessoa fictícia completa
const pessoa = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  telefone: faker.phone.number(),
  cpf: faker.string.numeric(11),
  nascimento: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
  endereco: {
    rua: faker.location.street(),
    cidade: faker.location.city(),
    estado: faker.location.state(),
    cep: faker.location.zipCode(),
  }
};

console.log(pessoa);
</code></pre>

<h3>Gerando dados em massa para popular um banco</h3>

<pre><code class="language-javascript">import { faker } from '@faker-js/faker/locale/pt_BR';

function gerarUsuarios(quantidade) {
  return Array.from({ length: quantidade }, () => ({
    id: faker.string.uuid(),
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    telefone: faker.phone.number(),
    criado_em: faker.date.past(),
    ativo: faker.datatype.boolean(),
  }));
}

// Gerar 500 usuários fictícios
const usuarios = gerarUsuarios(500);
console.log(\`Gerados \${usuarios.length} usuários\`);
</code></pre>

<h2>Abordagem 2: Factory Pattern (Backend)</h2>

<p>Em projetos maiores, o ideal é usar o padrão <strong>Factory</strong> para centralizar a criação de dados de teste.</p>

<h3>Exemplo com TypeScript</h3>

<pre><code class="language-typescript">interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

class UsuarioFactory {
  static criar(overrides: Partial&lt;Usuario&gt; = {}): Usuario {
    return {
      id: crypto.randomUUID(),
      nome: 'João da Silva',
      email: \`user-\${Date.now()}@teste.com\`,
      role: 'user',
      ...overrides,
    };
  }

  static criarAdmin(overrides: Partial&lt;Usuario&gt; = {}): Usuario {
    return this.criar({ role: 'admin', nome: 'Admin Teste', ...overrides });
  }

  static criarLote(quantidade: number): Usuario[] {
    return Array.from({ length: quantidade }, () =&gt; this.criar());
  }
}

// Uso em testes
const admin = UsuarioFactory.criarAdmin();
const usuarios = UsuarioFactory.criarLote(100);
</code></pre>

<h2>Abordagem 3: Ferramentas Online (Sem Código)</h2>

<p>Nem sempre você precisa escrever código. Para prototipação rápida ou testes manuais, ferramentas online são mais produtivas:</p>

<table>
<thead>
<tr><th>Ferramenta</th><th>O Que Gera</th><th>Ideal Para</th></tr>
</thead>
<tbody>
<tr><td><a href="/tools/personal/person">Pessoa Completa (DevThru)</a></td><td>Nome, CPF, RG, endereço, telefone</td><td>Cadastros de clientes</td></tr>
<tr><td><a href="/tools/development/mock-data">Mock Data (DevThru)</a></td><td>JSON/CSV com dados customizáveis</td><td>Popular bancos de dados</td></tr>
<tr><td><a href="/tools/documents/cpf">Gerador de CPF (DevThru)</a></td><td>CPFs válidos para teste</td><td>Formulários de cadastro</td></tr>
<tr><td><a href="/tools/documents/cnpj">Gerador de CNPJ (DevThru)</a></td><td>CNPJs válidos para teste</td><td>Sistemas fiscais/ERP</td></tr>
</tbody>
</table>

<div class="info-box">
<strong>💡 Vantagem:</strong> Ferramentas online como o DevThru geram dados que respeitam as regras de validação brasileiras (dígitos verificadores de CPF/CNPJ, formato de CEP, DDD válidos), algo que o Faker.js nem sempre garante.
</div>

<h2>Abordagem 4: Seeding de Banco de Dados</h2>

<p>Para popular um banco automaticamente durante o setup de testes ou desenvolvimento:</p>

<h3>Exemplo com Prisma + Faker</h3>

<pre><code class="language-typescript">// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient();

async function main() {
  // Limpa a base
  await prisma.usuario.deleteMany();

  // Seed com 100 usuários
  for (let i = 0; i &lt; 100; i++) {
    await prisma.usuario.create({
      data: {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        telefone: faker.phone.number(),
        ativo: true,
      },
    });
  }

  console.log('Seed concluído: 100 usuários criados');
}

main()
  .catch(console.error)
  .finally(() =&gt; prisma.$disconnect());
</code></pre>

<h2>Boas Práticas</h2>

<ol>
<li><strong>Nunca use dados reais:</strong> mesmo que "só sejam testes", o vazamento de dados de produção em ambientes de teste é uma violação da LGPD.</li>
<li><strong>Use seeds determinísticos:</strong> configure uma seed fixa no Faker (<code>faker.seed(123)</code>) para que os testes sejam reproduzíveis.</li>
<li><strong>Valide os dados gerados:</strong> se precisa de CPFs/CNPJs válidos, use geradores que implementem o algoritmo de módulo 11 — como as ferramentas do DevThru.</li>
<li><strong>Cubra edge cases:</strong> gere dados com nomes muito longos, caracteres especiais, e-mails duplicados, etc.</li>
<li><strong>Isole os ambientes:</strong> nunca rode seeds em banco de produção. Use variáveis de ambiente para proteger.</li>
</ol>

<h2>Perguntas Frequentes</h2>

<h3>Faker.js gera CPFs válidos?</h3>
<p>Não por padrão. O <code>faker.string.numeric(11)</code> gera 11 dígitos aleatórios, mas sem calcular os dígitos verificadores. Para CPFs com validação matemática correta, use nosso <a href="/tools/documents/cpf">Gerador de CPF</a>.</p>

<h3>Posso usar dados fictícios em testes de carga?</h3>
<p>Sim, é a prática recomendada. Use o Faker.js para gerar milhares de registros e testar performance sem riscos legais.</p>

<h3>Qual a diferença entre mock data e stub?</h3>
<p><strong>Mock data</strong> são dados fictícios usados para popular bancos ou payloads. <strong>Stubs</strong> são respostas fixas para simular comportamentos de APIs ou serviços externos durante testes unitários. São conceitos complementares.</p>
`
}
