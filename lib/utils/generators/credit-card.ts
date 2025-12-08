
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover';

export const CARD_BRANDS: { id: CardBrand; name: string; prefixes: number[]; length: number }[] = [
    { id: 'visa', name: 'Visa', prefixes: [4], length: 16 },
    { id: 'mastercard', name: 'Mastercard', prefixes: [51, 52, 53, 54, 55], length: 16 },
    { id: 'amex', name: 'American Express', prefixes: [34, 37], length: 15 },
    { id: 'discover', name: 'Discover', prefixes: [6011, 65], length: 16 },
];

function generateLuhnDigit(partial: string): number {
    let sum = 0;
    let double = true;
    for (let i = partial.length - 1; i >= 0; i--) {
        let digit = parseInt(partial.charAt(i), 10);
        if (double) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        double = !double;
    }
    return (sum * 9) % 10;
}

export function generateCreditCard(brandId: CardBrand): string {
    const brand = CARD_BRANDS.find(b => b.id === brandId);
    if (!brand) throw new Error('Invalid brand');

    const prefix = brand.prefixes[Math.floor(Math.random() * brand.prefixes.length)].toString();
    let number = prefix;

    while (number.length < brand.length - 1) {
        number += Math.floor(Math.random() * 10).toString();
    }

    const checkDigit = generateLuhnDigit(number);
    return number + checkDigit;
}

export function generateExpiryDate(): string {
    const month = Math.floor(Math.random() * 12) + 1;
    const year = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
    return `${month.toString().padStart(2, '0')}/${year}`;
}

export function generateCVV(brandId: CardBrand): string {
    const length = brandId === 'amex' ? 4 : 3;
    let cvv = '';
    for (let i = 0; i < length; i++) {
        cvv += Math.floor(Math.random() * 10).toString();
    }
    return cvv;
}
