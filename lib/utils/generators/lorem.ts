const WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
]

/**
 * Gera uma palavra aleatória
 */
function getRandomWord(): string {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
}

/**
 * Capitaliza a primeira letra
 */
function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Gera N palavras
 */
export function generateWords(count: number): string {
    return Array.from({ length: count }, () => getRandomWord()).join(" ")
}

/**
 * Gera N sentenças
 */
export function generateSentences(count: number): string {
    const sentences: string[] = []

    for (let i = 0; i < count; i++) {
        const wordCount = Math.floor(Math.random() * 10) + 5 // 5-15 palavras por sentença
        const words = Array.from({ length: wordCount }, () => getRandomWord())
        words[0] = capitalize(words[0])
        sentences.push(words.join(" ") + ".")
    }

    return sentences.join(" ")
}

/**
 * Gera N parágrafos
 */
export function generateParagraphs(count: number): string {
    const paragraphs: string[] = []

    for (let i = 0; i < count; i++) {
        const sentenceCount = Math.floor(Math.random() * 5) + 3 // 3-8 sentenças por parágrafo
        paragraphs.push(generateSentences(sentenceCount))
    }

    return paragraphs.join("\n\n")
}

/**
 * Gera texto Lorem Ipsum
 */
export function generateLoremIpsum(
    type: "words" | "sentences" | "paragraphs",
    count: number
): string {
    switch (type) {
        case "words":
            return generateWords(count)
        case "sentences":
            return generateSentences(count)
        case "paragraphs":
            return generateParagraphs(count)
        default:
            return generateParagraphs(count)
    }
}
