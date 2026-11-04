import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { NickGeneratorPage } from "./client"

const title = "Gerador de Nicks para Jogos e Redes Sociais"
const description = "Gerador de nicks criativos: gamer, fofo, sombrio ou engraçado, com seu nome e letras diferentes para Free Fire, Roblox, Discord e Instagram. Grátis."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/text/nick-generator",
    keywords: ["gerador de nicks", "gerador de nick", "nick para free fire", "nomes para jogos", "nick com letras diferentes", "nick para discord", "nick gamer"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Nicks",
                    description,
                    categoryLabel: "Texto",
                    path: "/tools/text/nick-generator",
                    toolSlug: "nick-generator"
                })}
            />
            <NickGeneratorPage />
        </>
    )
}
