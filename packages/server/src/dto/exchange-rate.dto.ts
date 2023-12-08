export interface ExchangeRateDto {
    validFor: `${string}-${string}-${string}`;
    order: number;
    country: string;
    currency: string;
    amount: number;
    currencyCode: string;
    rate: number;
}
