import { describe, expect, it } from "vitest"
import { PROGRAMMATIC_CONTENT } from "@/lib/content/programmatic"
import {
    GUIDE_CATEGORY_META_DESCRIPTIONS,
    MAX_META_DESCRIPTION_LENGTH,
    MIN_META_DESCRIPTION_LENGTH,
    TOOL_META_DESCRIPTIONS,
    generateGuideMetaDescription,
} from "./meta-descriptions"

describe("SEO meta descriptions", () => {
    it("generates guide descriptions within the Bing Webmaster target range", () => {
        for (const content of PROGRAMMATIC_CONTENT) {
            const description = generateGuideMetaDescription(content.toolId, content.languageId)

            expect(description.length, `${content.category}/${content.toolId}/${content.languageId}`).toBeGreaterThanOrEqual(MIN_META_DESCRIPTION_LENGTH)
            expect(description.length, `${content.category}/${content.toolId}/${content.languageId}`).toBeLessThanOrEqual(MAX_META_DESCRIPTION_LENGTH)
        }
    })

    it("keeps guide category descriptions long enough for Bing Webmaster", () => {
        for (const [category, description] of Object.entries(GUIDE_CATEGORY_META_DESCRIPTIONS)) {
            expect(description.length, category).toBeGreaterThanOrEqual(MIN_META_DESCRIPTION_LENGTH)
            expect(description.length, category).toBeLessThanOrEqual(MAX_META_DESCRIPTION_LENGTH)
        }
    })

    it("keeps listed tool page descriptions long enough for Bing Webmaster", () => {
        for (const [tool, description] of Object.entries(TOOL_META_DESCRIPTIONS)) {
            expect(description.length, tool).toBeGreaterThanOrEqual(MIN_META_DESCRIPTION_LENGTH)
            expect(description.length, tool).toBeLessThanOrEqual(MAX_META_DESCRIPTION_LENGTH)
        }
    })
})
