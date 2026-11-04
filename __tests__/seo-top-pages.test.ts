import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

// Páginas com mais impressões no Search Console; títulos longos são cortados no Google.
const TITLE_SUFFIX = " | DevThru"
const MAX_TITLE = 60
const MAX_DESCRIPTION = 160

const pages = [
    { path: "app/tools/personal/phone/page.tsx", query: "número de telefone" },
    { path: "app/tools/finance/credit-card-generator/page.tsx", query: "cartão de crédito válido" },
    { path: "app/tools/personal/person/page.tsx", query: "pessoa" },
    { path: "app/tools/documents/cpf/page.tsx", query: "gerador de cpf" },
    { path: "app/tools/documents/pis/page.tsx", query: "gerador de pis" },
    { path: "app/tools/documents/rg/page.tsx", query: "gerador de rg" },
    { path: "app/tools/text/character-counter/page.tsx", query: "contador de caracteres" },
    { path: "app/tools/utilities/password/page.tsx", query: "gerador de senha" },
    { path: "app/tools/text/fancy-letters/page.tsx", query: "letras diferentes" },
    { path: "app/tools/converters/number-to-words/page.tsx", query: "número por extenso" },
    { path: "app/tools/utilities/rule-of-three/page.tsx", query: "regra de 3" },
    { path: "app/tools/utilities/percentage-calculator/page.tsx", query: "calculadora de porcentagem" },
    { path: "app/tools/utilities/random-number/page.tsx", query: "número aleatório" },
]

function read(path: string) {
    const source = readFileSync(join(process.cwd(), path), "utf8")
    const title = source.match(/^const title = "(.*)"$/m)?.[1] ?? ""
    const description = source.match(/^const description = "(.*)"$/m)?.[1] ?? ""
    return { title, description }
}

describe("SEO das páginas mais vistas", () => {
    for (const page of pages) {
        it(`${page.path} tem título e descrição dentro do limite`, () => {
            const { title, description } = read(page.path)

            expect(title).not.toBe("")
            expect((title + TITLE_SUFFIX).length).toBeLessThanOrEqual(MAX_TITLE)
            expect(description.length).toBeGreaterThan(70)
            expect(description.length).toBeLessThanOrEqual(MAX_DESCRIPTION)
        })

        it(`${page.path} traz a consulta principal no título`, () => {
            const { title } = read(page.path)

            expect(title.toLowerCase()).toContain(page.query.toLowerCase())
        })
    }
})
