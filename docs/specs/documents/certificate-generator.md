# Gerador de Certificado

> [!NOTE]
> Ferramenta visual de utilidade para criar representações estruturadas de certificados de participação ou conclusão de cursos e eventos de forma rápida e dinâmica.

## 🎯 Visão Geral / Objetivo

* **O que faz:** Gera layouts visuais parametrizados de certificados de conclusão contendo dados dinâmicos do aluno, curso, carga horária, assinaturas e data.
* **Problema que resolve:** Facilita a criação e exportação em formato de imagem ou PDF de certificados de teste, mocks para validação visual de design ou automação de emissão sem depender de softwares pesados de edição gráfica.
* **Público-alvo:** Desenvolvedores integrando módulos de e-learning (LMS), organizadores de eventos de tecnologia e estudantes.

---

## ⚙️ Regras de Negócio & Validações

### 1. Dados Dinâmicos Suportados
A ferramenta permite personalizar:
* **Nome do Aluno:** Nome completo do participante do curso/evento.
* **Nome do Curso:** Título da capacitação, evento ou palestra.
* **Carga Horária (horas):** Tempo de duração a ser exibido no documento.
* **Data da Emissão:** Data de realização ou finalização.
* **Assinatura/Organização:** Nome do emissor ou instituição organizadora.

### 2. Formato de Exportação
* A ferramenta oferece opções de exportação em **Imagem (PNG)** ou **PDF**.
* A imagem ou documento gerado deve conter todos os dados dinâmicos aplicados e dispostos de forma elegante dentro do mockup de fundo selecionado.

---

## 🧪 Casos de Uso / Cenários de Aceitação (BDD)

### Cenário 1: Personalizar Dados do Certificado
* **Dado** que o usuário está na tela do Gerador de Certificado
* **Quando** ele digita o nome do aluno como `"Maria Oliveira"`, o curso como `"Web Development 101"`, a carga horária como `"40"` horas
* **Então** a visualização gráfica (mockup) do certificado deve atualizar instantaneamente com os textos `"Maria Oliveira"`, `"Web Development 101"` e `"40 horas"`.

### Cenário 2: Download do Certificado em Imagem (PNG)
* **Dado** que o certificado está preenchido
* **Quando** o usuário clica no botão "Baixar Imagem"
* **Então** o sistema deve processar a renderização do elemento HTML e disparar o download de um arquivo de imagem em formato PNG.

---

## 🎨 Design & UX

* **Visualização de Layouts:**
  * Apresenta um mockup de certificado horizontal (landscape) contendo bordas clássicas elegantes e selo decorativo.
  * Tipografia sofisticada (serifada para títulos e cursiva/itálica para nomes) simulando documentos reais de instituições de ensino.
* **Painel de Controles:**
  * Formulário lateral com campos de texto de preenchimento simples para cada parâmetro dinâmico.
  * Botões de ação para limpar todos os campos e exportar dados.
