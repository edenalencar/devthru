export interface TaxBracket {
    limit: number;
    rate: number;
    deduction: number;
}

export const ANEXO_I: TaxBracket[] = [
    { limit: 180000, rate: 0.04, deduction: 0 },
    { limit: 360000, rate: 0.073, deduction: 5940 },
    { limit: 720000, rate: 0.095, deduction: 13860 },
    { limit: 1800000, rate: 0.107, deduction: 22500 },
    { limit: 3600000, rate: 0.143, deduction: 87300 },
    { limit: 4800000, rate: 0.19, deduction: 378000 },
];

export const ANEXO_II: TaxBracket[] = [
    { limit: 180000, rate: 0.045, deduction: 0 },
    { limit: 360000, rate: 0.078, deduction: 5940 },
    { limit: 720000, rate: 0.10, deduction: 13860 },
    { limit: 1800000, rate: 0.112, deduction: 22500 },
    { limit: 3600000, rate: 0.147, deduction: 85500 },
    { limit: 4800000, rate: 0.30, deduction: 720000 },
];

export const ANEXO_III: TaxBracket[] = [
    { limit: 180000, rate: 0.06, deduction: 0 },
    { limit: 360000, rate: 0.112, deduction: 9360 },
    { limit: 720000, rate: 0.135, deduction: 17640 },
    { limit: 1800000, rate: 0.16, deduction: 35640 },
    { limit: 3600000, rate: 0.21, deduction: 125640 },
    { limit: 4800000, rate: 0.33, deduction: 648000 },
];

export const ANEXO_IV: TaxBracket[] = [
    { limit: 180000, rate: 0.045, deduction: 0 },
    { limit: 360000, rate: 0.09, deduction: 8100 },
    { limit: 720000, rate: 0.102, deduction: 12420 },
    { limit: 1800000, rate: 0.14, deduction: 39780 },
    { limit: 3600000, rate: 0.22, deduction: 183780 },
    { limit: 4800000, rate: 0.33, deduction: 828000 },
];

export const ANEXO_V: TaxBracket[] = [
    { limit: 180000, rate: 0.155, deduction: 0 },
    { limit: 360000, rate: 0.18, deduction: 4500 },
    { limit: 720000, rate: 0.195, deduction: 9900 },
    { limit: 1800000, rate: 0.205, deduction: 17100 },
    { limit: 3600000, rate: 0.23, deduction: 62100 },
    { limit: 4800000, rate: 0.305, deduction: 540000 },
];

export const ANEXOS: Record<string, TaxBracket[]> = {
    'I': ANEXO_I,
    'II': ANEXO_II,
    'III': ANEXO_III,
    'IV': ANEXO_IV,
    'V': ANEXO_V,
};

export function calculateSimplesNacional(revenue12Months: number, revenueMonth: number, anexo: string) {
    const table = ANEXOS[anexo];
    if (!table) throw new Error("Anexo inválido");

    const bracket = table.find(b => revenue12Months <= b.limit) || table[table.length - 1];

    // Formula: (RBT12 * Aliq - PD) / RBT12
    // Effective Rate
    let effectiveRate = ((revenue12Months * bracket.rate) - bracket.deduction) / revenue12Months;

    // Handle edge case where revenue12Months is 0 (first month)
    if (revenue12Months === 0) {
        effectiveRate = bracket.rate; // Use nominal rate
    }

    const taxAmount = revenueMonth * effectiveRate;

    return {
        effectiveRate,
        taxAmount,
        bracket
    };
}
