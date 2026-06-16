import { BlogPost } from '../index'

export const postMassaDadosCypressSelenium: BlogPost = {
    slug: 'gerar-massa-dados-teste-cypress-selenium-cpf-cnpj-endereco',
    title: 'Como Gerar Massa de Dados para Cypress e Selenium',
    description: 'Aprenda estratégias práticas para gerar e injetar massas de dados de teste (CPF, CNPJ, endereços) em scripts de automação com Cypress e Selenium.',
    date: '2026-06-14',
    author: 'DevThru',
    category: 'testes-qa',
    readingTime: 7,
    tags: ['Cypress', 'Selenium', 'massa de dados', 'testes-qa', 'CPF', 'CNPJ', 'JavaScript'],
    relatedTools: ['/tools/development/mock-data', '/tools/documents/cpf', '/tools/documents/cnpj', '/tools/personal/address'],
    content: `
<p>Escrever testes automatizados de ponta a ponta (E2E) com frameworks como <strong>Cypress</strong> ou <strong>Selenium</strong> é um dos pilares para garantir a qualidade de qualquer aplicação. No entanto, um dos maiores desafios de QA é: <strong>de onde tirar a massa de dados para rodar os testes?</strong></p>

<p>Cadastros repetidos frequentemente exigem documentos únicos, como CPF e CNPJ válidos, além de CEPs estruturados e endereços completos. Usar dados reais infringe a LGPD, enquanto dados fixos (hardcoded) nas fixtures fazem os testes falharem a partir da segunda execução por duplicação de chaves no banco.</p>

<p>Neste post, vamos explorar as melhores abordagens para gerar massas de dados dinâmicas e válidas em seus pipelines de teste usando Cypress e Selenium.</p>

<h2>Estratégia 1: Massa de Dados Estática (Fixtures) vs. Dinâmica</h2>

<p>Existem dois caminhos principais para gerenciar sua massa:</p>

<ul>
  <li><strong>Fixtures Estáticas (JSON):</strong> Excelente para dados de configuração ou fluxos que não exigem exclusividade de chaves únicas no banco (ex: perfis de usuários pré-cadastrados para login).</li>
  <li><strong>Geração Dinâmica:</strong> Essencial para fluxos de cadastro de clientes, parceiros ou faturamento. Aqui, cada execução gera novos números matematicamente válidos de CPF, CNPJ e emails aleatórios.</li>
</ul>

<div class="info-box">
  <strong>💡 Boas Práticas:</strong> Nunca faça chamadas para geradores externos públicos diretamente no meio do script de teste (ex: fazendo requisições HTTP para geradores não confiáveis). Isso adiciona instabilidade (flakiness) e lentidão ao seu pipeline. Em vez disso, use bibliotecas locais ou crie funções auxiliares dentro do seu projeto de testes.
</div>

<h2>Geração de Dados Dinâmicos no Cypress</h2>

<p>No Cypress, podemos estruturar comandos customizados (Custom Commands) em <code>cypress/support/commands.js</code> para gerar dados brasileiros em tempo de execução de maneira limpa.</p>

<h3>Passo 1: Criar geradores auxiliares em JS</h3>
<p>Em um arquivo de utilidades da sua suíte de testes (ex: <code>cypress/support/utils.js</code>), você pode implementar funções para gerar CPF e CNPJ matematicamente válidos:</p>

<pre><code class="language-javascript">// cypress/support/utils.js
export function gerarCPF() {
  const numAleatorio = () => Math.floor(Math.random() * 9);
  const d = Array.from({ length: 9 }, numAleatorio);
  
  // Cálculo dos dígitos verificadores
  let d1 = d.reduce((s, v, i) => s + v * (10 - i), 0);
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  
  d.push(d1);
  let d2 = d.reduce((s, v, i) => s + v * (11 - i), 0);
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  
  d.push(d2);
  return d.join('');
}
</code></pre>

<h3>Passo 2: Integrar no teste do Cypress</h3>
<p>Agora podemos injetar esse dado dinamicamente nos campos do formulário:</p>

<pre><code class="language-javascript">import { gerarCPF } from '../support/utils';

describe('Fluxo de Cadastro de Usuário', () => {
  it('Deve cadastrar um cliente com sucesso', () => {
    const cpfFicticio = gerarCPF();
    const emailFicticio = \`teste_\${Date.now()}@devthru.com.br\`;

    cy.visit('/cadastro');
    cy.get('#nome').type('Desenvolvedor de Teste');
    cy.get('#email').type(emailFicticio);
    cy.get('#cpf').type(cpfFicticio);
    cy.get('#cep').type('01310-100'); // CEP da Av. Paulista
    
    cy.get('button[type="submit"]').click();
    cy.get('.toast-success').should('be.visible').and('contain', 'Cadastro realizado!');
  });
});
</code></pre>

<h2>Injetando Massa de Dados Dinâmica no Selenium (Python)</h2>

<p>Se a sua stack usa Selenium WebDriver com Python, você pode adotar uma estratégia similar. O uso de geradores customizados mantém os testes isolados e rápidos.</p>

<pre><code class="language-python">import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By

def gerar_cpf_fake():
    # Retorna um CPF matematicamente válido formatado
    d = [random.randint(0, 9) for _ in range(9)]
    
    # Dígito 1
    soma = sum(d[i] * (10 - i) for i in range(9))
    d1 = 11 - (soma % 11)
    d.append(0 if d1 >= 10 else d1)
    
    # Dígito 2
    soma = sum(d[i] * (11 - i) for i in range(10))
    d2 = 11 - (soma % 11)
    d.append(0 if d2 >= 10 else d2)
    
    return "".join(map(str, d))

# Iniciando Driver do Selenium
driver = webdriver.Chrome()
try:
    driver.get("http://localhost:3000/cadastro")
    
    # Preenchendo campos
    driver.find_element(By.ID, "nome").send_keys("Analista de QA")
    driver.find_element(By.ID, "cpf").send_keys(gerar_cpf_fake())
    driver.find_element(By.ID, "email").send_keys(f"qa_{int(time.time())}@devthru.com")
    
    driver.find_element(By.CSS_SELECTOR, "button.submit").click()
    time.sleep(2) # Espera simples apenas para ilustrar
    assert "Sucesso" in driver.page_source
finally:
    driver.quit()
</code></pre>

<h2>Agilizando a Geração com Ferramentas Especializadas</h2>

<p>Se você precisa de massas de dados complexas e prontas (com nome, CPF, CNPJ, telefone e endereços integrados e coerentes) para rodar manualmente ou configurar scripts maiores, usar plataformas específicas economiza muito tempo.</p>

<p>Com o DevThru, você pode gerar massas inteiras em segundos:</p>
<ul>
  <li>Obtenha chaves válidas de CPF no nosso <a href="/tools/documents/cpf">Gerador de CPF</a>.</li>
  <li>Gere dados empresariais com o <a href="/tools/documents/cnpj">Gerador de CNPJ</a>.</li>
  <li>Gere CEPs e endereços reais no <a href="/tools/personal/address">Gerador de Endereços (CEP)</a>.</li>
  <li>Ou crie um lote completo customizado no <a href="/tools/development/mock-data">Mock Data Generator</a>.</li>
</ul>

<p>Integrar geradores consistentes na sua rotina de QA garante testes resilientes, evita retrabalho e protege seu ambiente contra falhas causadas por dados expirados ou duplicados.</p>
`
}
