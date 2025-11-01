export default function getCurrencySymbol(code: string): string {
    const symbols: Record<string, string> = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        INR: '₹',
        JPY: '¥',
        AUD: 'A$',
        CAD: 'C$',
        CHF: 'CHF',
        CNY: '¥',
        KRW: '₩',
        RUB: '₽',
        AED: 'د.إ',
        SGD: 'S$',
    };

    return symbols[code.toUpperCase()] || code;
}
