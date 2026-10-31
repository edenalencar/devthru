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
