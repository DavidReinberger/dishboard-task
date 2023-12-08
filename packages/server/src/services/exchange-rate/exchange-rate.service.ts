import { Injectable } from '@nestjs/common';
import { ExchangeRateDto } from '../../dto/exchange-rate.dto';
import { ExchangeRateEntity } from '../../entities';
import { ExchangeRateRepository } from './exchange-rate.repository';

@Injectable()
export class ExchangeRateService {
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
        const cachedRates = await this.exchangeRatesRepository.getExchangeRates();
        if (cachedRates.length === 0) {
            // eslint-disable-next-line no-console
            console.log('cache expired, fetching new rates');
            const newRates = await this.setExchangeRates();
            return newRates.raw as ExchangeRateEntity[];
        }
        return cachedRates;
    }
    public async setExchangeRates() {
        const rates = await this.fetchExchangeRates();
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
