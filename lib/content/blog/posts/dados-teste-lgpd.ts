import { BlogPost } from '../index'

export const postDadosTesteLgpd: BlogPost = {
    slug: 'dados-ficticios-testes-lgpd',
    title: 'Como Gerar Dados Fictícios para Testes sem Violar a LGPD',
    description: 'Aprenda a criar dados de teste realistas sem usar informações pessoais reais. Guia prático sobre LGPD, anonimização e ferramentas para QA e desenvolvedores.',
    date: '2026-02-13',
    author: 'DevThru',
    category: 'testes-qa',
    readingTime: 7,
    tags: ['LGPD', 'testes', 'dados fictícios', 'QA', 'privacidade', 'mock data'],
    relatedTools: ['/tools/personal/lgpd-data', '/tools/personal/person', '/tools/development/mock-data'],
    content: `
<p>A <strong>LGPD (Lei Geral de Proteção de Dados)</strong> mudou a forma como empresas e desenvolvedores lidam com dados pessoais no Brasil. Se você usa dados reais de usuários em ambientes de teste, staging ou desenvolvimento, você pode estar violando a lei — mesmo sem intenção.</p>

<p>Neste guia, vamos mostrar como gerar dados fictícios realistas para testes sem nenhum risco legal.</p>

<h2>O Que a LGPD Diz Sobre Dados de Teste?</h2>

<p>A LGPD (Lei 13.709/2018) define que <strong>todo dado que identifica ou pode identificar uma pessoa</strong> é considerado dado pessoal. Isso inclui:</p>

<ul>
<li>Nome completo</li>
<li>CPF e RG</li>
<li>Email pessoal</li>
<li>Endereço</li>
<li>Telefone</li>
<li>Dados bancários</li>
</ul>

<p>Usar esses dados em ambientes de teste sem consentimento explícito viola o <strong>princípio da finalidade</strong> da LGPD — os dados foram coletados para um propósito específico, não para testes.</p>

<div class="info-box">
<strong>⚠️ Multas:</strong> A ANPD (Autoridade Nacional de Proteção de Dados) pode aplicar multas de até 2% do faturamento da empresa, limitadas a R$ 50 milhões por infração.
</div>

<h2>A Solução: Dados Fictícios</h2>

<p>Dados fictícios são informações que <strong>parecem reais</strong> mas <strong>não pertencem a ninguém</strong>. Um CPF fictício segue o algoritmo de validação da Receita Federal, mas não está associado a uma pessoa real.</p>

<h3>Vantagens dos dados fictícios</h3>

<ul>
<li><strong>Conformidade legal:</strong> Zero risco de violação da LGPD</li>
<li><strong>Realismo:</strong> Dados seguem formatos e validações reais</li>
<li><strong>Escalabilidade:</strong> Gere milhares de registros instantaneamente</li>
<li><strong>Reprodutibilidade:</strong> Testes consistentes sem dependência de dados reais</li>
</ul>

<h2>Tipos de Dados Fictícios para Testes</h2>

<p>Veja o que você pode gerar e onde usar:</p>

<table>
<thead>
<tr><th>Dado</th><th>Formato</th><th>Ferramenta DevThru</th></tr>
</thead>
<tbody>
<tr><td>CPF</td><td>XXX.XXX.XXX-DD</td><td><a href="/tools/documents/cpf">Gerador de CPF</a></td></tr>
<tr><td>CNPJ</td><td>XX.XXX.XXX/XXXX-DD</td><td><a href="/tools/documents/cnpj">Gerador de CNPJ</a></td></tr>
<tr><td>Nome completo</td><td>Nome + Sobrenome</td><td><a href="/tools/personal/name">Gerador de Nomes</a></td></tr>
<tr><td>Endereço</td><td>Rua, Cidade, CEP</td><td><a href="/tools/personal/address">Gerador de Endereços</a></td></tr>
<tr><td>Email</td><td>nome@dominio.com</td><td><a href="/tools/personal/email">Gerador de Email</a></td></tr>
<tr><td>Telefone</td><td>(XX) XXXXX-XXXX</td><td><a href="/tools/personal/phone">Gerador de Telefone</a></td></tr>
<tr><td>Pessoa completa</td><td>Perfil inteiro</td><td><a href="/tools/personal/person">Gerador de Pessoa</a></td></tr>
<tr><td>Cartão de crédito</td><td>XXXX XXXX XXXX XXXX</td><td><a href="/tools/finance/credit-card-generator">Gerador de Cartão</a></td></tr>
</tbody>
</table>

<h2>Estratégias de Geração por Cenário</h2>

<h3>1. Testes Unitários e de Integração</h3>

<p>Para testes automatizados, gere dados diretamente no código:</p>

<pre><code class="language-javascript">// factories/user.js — Factory Pattern para testes
function createTestUser(overrides = {}) {
  return {
    name: 'Maria Silva Santos',
    cpf: '529.982.247-25',     // CPF fictício válido
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    address: {
      street: 'Rua das Flores',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      zip: '01234-567'
    },
    ...overrides                // Permite customização
  };
}

// Uso no teste
it('deve cadastrar usuário com sucesso', () => {
  const user = createTestUser();
  const result = cadastrarUsuario(user);
  expect(result.success).toBe(true);
});
</code></pre>

<h3>2. Testes de Carga e Performance</h3>

<p>Para popular bases de dados com milhares de registros:</p>

<pre><code class="language-python">import json
import random

def gerar_massa_dados(quantidade: int) -> list:
    """Gera massa de dados fictícios para testes de carga."""
    nomes = ['Ana', 'Carlos', 'Maria', 'João', 'Julia']
    sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima']
    
    dados = []
    for i in range(quantidade):
        dados.append({
            'id': i + 1,
            'nome': f'{random.choice(nomes)} {random.choice(sobrenomes)}',
            'email': f'user{i}@teste.dev',
            'ativo': random.choice([True, False])
        })
    return dados

# Gera 10.000 registros para teste de carga
massa = gerar_massa_dados(10000)
with open('test_data.json', 'w') as f:
    json.dump(massa, f, ensure_ascii=False, indent=2)
</code></pre>

<h3>3. Anonimização de Dados Reais</h3>

<p>Se você <em>precisa</em> usar a estrutura de dados reais (ex: testar migrações), anonimize antes:</p>

<pre><code class="language-python">import hashlib

def anonimizar_email(email: str) -> str:
    """Substitui email real por hash irreversível."""
    hash_email = hashlib.sha256(email.encode()).hexdigest()[:8]
    return f'{hash_email}@anonimizado.dev'

def anonimizar_cpf(cpf: str) -> str:
    """Substitui CPF real por fictício válido."""
    return '529.982.247-25'  # Use um gerador real

# Antes: joao.silva@empresa.com → Depois: a3f8b2c1@anonimizado.dev
</code></pre>

<h2>Checklist LGPD para Ambientes de Teste</h2>

<ol>
<li>✅ Nunca copie dados de produção para ambientes de teste</li>
<li>✅ Use geradores de dados fictícios</li>
<li>✅ Se precisar de dados reais, anonimize com hash irreversível</li>
<li>✅ Implemente controle de acesso nos ambientes de teste</li>
<li>✅ Documente o processo de geração de dados de teste</li>
<li>✅ Defina políticas de retenção (delete dados de teste antigos)</li>
<li>✅ Treine a equipe sobre LGPD e dados de teste</li>
</ol>

<h2>Perguntas Frequentes</h2>

<h3>Posso usar dados fictícios em homologação?</h3>
<p>Sim! Dados fictícios gerados por algoritmos são a forma mais segura de popular ambientes de homologação e staging.</p>

<h3>E se meu teste precisa de dados "reais"?</h3>
<p>Use a técnica de anonimização: copie a estrutura dos dados mas substitua as informações pessoais por dados fictícios ou hashes.</p>

<h3>O DevThru armazena os dados que eu gero?</h3>
<p>Não. Todas as ferramentas do DevThru processam dados <strong>localmente no seu navegador</strong>. Nenhum dado gerado é enviado para servidores.</p>
`
}
