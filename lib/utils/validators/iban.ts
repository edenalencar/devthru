export function validateIBAN(iban: string): boolean {
    // Remove spaces and uppercase
    const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();

    // Basic format check (min length 15, max 34, alphanumeric)
    if (!/^[A-Z0-9]{15,34}$/.test(cleanIBAN)) {
        return false;
    }

    // Move first 4 chars to end
    const rearranged = cleanIBAN.slice(4) + cleanIBAN.slice(0, 4);

    // Replace letters with numbers
    const numeric = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());

    // Modulo 97 check using BigInt
    try {
        return BigInt(numeric) % BigInt(97) === BigInt(1);
    } catch {
        return false;
    }
}

export function formatIBAN(iban: string): string {
    const clean = iban.replace(/\s/g, '').toUpperCase();
    return clean.match(/.{1,4}/g)?.join(' ') || clean;
}

const COUNTRY_SPECS: Record<string, { length: number, format: RegExp }> = {
    BR: { length: 29, format: /^[0-9]{23}[A-Z]{1}[0-9]{1}$/ }, // Example format, simplified
    DE: { length: 22, format: /^[0-9]{18}$/ },
    FR: { length: 27, format: /^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$/ },
    GB: { length: 22, format: /^[A-Z]{4}[0-9]{14}$/ },
    PT: { length: 25, format: /^[0-9]{21}$/ },
    ES: { length: 24, format: /^[0-9]{20}$/ },
};

export function generateIBAN(countryCode: string = 'BR'): string {
    const spec = COUNTRY_SPECS[countryCode] || COUNTRY_SPECS['BR'];
    const length = spec.length;

    // Generate random body (length - 4 for country code + check digits)
    let body = '';
    const bodyLength = length - 4;

    // Simple random generation based on length (improving this would require specific bank formats)
    // For now, generating random alphanumeric to satisfy length
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < bodyLength; i++) {
        body += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Calculate check digits
    // 1. Prepend country code + '00'
    const tempIBAN = countryCode + '00' + body;

    // 2. Move first 4 to end
    const rearranged = tempIBAN.slice(4) + tempIBAN.slice(0, 4);

    // 3. Convert to numeric
    const numeric = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());

    // 4. Calculate mod 97
    const mod = BigInt(numeric) % BigInt(97);
    const checkDigits = (BigInt(98) - mod).toString().padStart(2, '0');

    return countryCode + checkDigits + body;
}
