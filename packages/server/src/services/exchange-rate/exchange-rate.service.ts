import { Injectable } from '@nestjs/common';
import { ExchangeRateDto } from '../../dto/exchange-rate.dto';
import { ExchangeRateEntity } from '../../entities';
import { ExchangeRateRepository } from './exchange-rate.repository';

@Injectable()
export class ExchangeRateService {
    // I had it set up as a check in the database... though this makes more sense since the rates are updated daily
    // and all at once, the data is a bulk
    private EXCHANGE_RATE_CACHE_TIME = 300_000;
    private EXCHANGE_RATE_CACHE_LAST_UPDATE: number | null = null;
    constructor(private exchangeRatesRepository: ExchangeRateRepository) {}
    public getExchangeRates() {
        // TODO: Implement the fetching and parsing of the exchange rates.
        // Use this method in the resolver.
        return this.getExchangeRatesAsFetchOrCache();
    }

    public async fetchExchangeRates() {
        const [date] = new Date().toISOString().split('T');
        const request = await fetch(`https://api.cnb.cz/cnbapi/exrates/daily?date=${date}`);
        return (await request.json()).rates as ExchangeRateDto[];
    }

    public async getExchangeRatesAsFetchOrCache() {
        const now = new Date().valueOf() - this.EXCHANGE_RATE_CACHE_TIME;
        if (
            this.EXCHANGE_RATE_CACHE_LAST_UPDATE === null ||
            this.EXCHANGE_RATE_CACHE_LAST_UPDATE <= now
        ) {
            // eslint-disable-next-line no-console
            console.log('Fetching Exchange Rates from CNB');
            const newRates = await this.setExchangeRates();
            return newRates.raw as ExchangeRateEntity[];
        }
        return this.exchangeRatesRepository.getExchangeRates();
    }
    public async setExchangeRates() {
        const rates = await this.fetchExchangeRates();
        this.EXCHANGE_RATE_CACHE_LAST_UPDATE = new Date().valueOf();
        return this.exchangeRatesRepository.upsertExchangeRates(
            rates.map(({ rate, amount, country, currencyCode, currency }) => ({
                rate,
                amount,
                country,
                currencyName: currency,
                currencyCode,
            }))
        );
    }
}
