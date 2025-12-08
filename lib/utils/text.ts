export function countText(text: string) {
    return {
        characters: text.length,
        charactersNoSpaces: text.replace(/\s/g, '').length,
        words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
        lines: text.length === 0 ? 0 : text.split(/\r\n|\r|\n/).length,
        paragraphs: text.trim() === '' ? 0 : text.replace(/\n$/gm, '').split(/\n{2,}/).length
    }
}

export function convertCase(text: string, type: 'upper' | 'lower' | 'title' | 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant' | 'sentence') {
    switch (type) {
        case 'upper':
            return text.toUpperCase()
        case 'lower':
            return text.toLowerCase()
        case 'title':
            return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        case 'camel':
            return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '')
        case 'pascal':
            return text.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s+/g, '')
        case 'snake':
            return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || text
        case 'kebab':
            return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || text
        case 'constant':
            return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toUpperCase()).join('_') || text
        case 'sentence':
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        default:
            return text
    }
}

export function generateSlug(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Split accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}
