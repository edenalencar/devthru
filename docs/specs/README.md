# Spec-Driven Development (SDD) - DevThru

Este diretório contém as especificações funcionais e técnicas das ferramentas disponíveis no DevThru. 
Adotamos o **Spec-Driven Development (SDD)** para garantir que as funcionalidades do produto sejam desenhadas, validadas e testadas com base em um contrato claro e legível antes ou em paralelo ao código.

---

## 🎯 O que é SDD?

Spec-Driven Development é uma metodologia onde o desenvolvimento é guiado por uma especificação detalhada escrita em linguagem natural estruturada. A especificação serve como:
1. **Guia de Implementação**: O desenvolvedor constrói a interface e regras seguindo a spec.
2. **Contrato de Teste**: Os cenários descritos na spec são traduzidos diretamente para testes automatizados.
3. **Documentação Viva**: A especificação reflete exatamente o estado atual de produção da ferramenta.

---

## 📂 Estrutura de Pastas

Para manter as especificações organizadas e de fácil localização, a pasta `docs/specs/` **espelha** exatamente a estrutura de diretórios de `app/tools/`:

```
docs/specs/
├── README.md
├── template.md
├── finance/
│   └── iban-validator.md
├── documents/
│   └── cpf-generator.md
└── ...
```

Cada arquivo de ferramenta em `app/tools/[categoria]/[nome-da-ferramenta]/page.tsx` deve possuir uma especificação correspondente em `docs/specs/[categoria]/[nome-da-ferramenta].md`.

---

## 📝 Como Criar uma Nova Especificação

Sempre utilize o arquivo [`template.md`](file:///c:/Users/edena/Projetos/devhubtools/docs/specs/template.md) como ponto de partida. Cada especificação deve obrigatoriamente conter as seguintes seções:

1. **Visão Geral/Objetivo**: Breve descrição do problema e o que a ferramenta faz.
2. **Regras de Negócio & Validações**: Lógica detalhada do funcionamento, limites, e formatações.
3. **Casos de Uso / Cenários de Aceitação**: Cenários descritos no formato BDD (Dado / Quando / Então) para guiar a escrita de testes no Vitest.
4. **Design & UX**: Descrição das interações de interface e tratamento de estados de erro.

---

## ⚡ Verificação Automatizada (Doc Drift)

Para garantir que novas ferramentas criadas não entrem em produção sem a respectiva especificação, utilizamos um validador local.

Para rodar a verificação de specs:
```bash
npm run verify-specs
```

Este script falhará se detectar qualquer ferramenta ativa em `app/tools/**/page.tsx` que não possua uma correspondência em `docs/specs/**/*.md`.
