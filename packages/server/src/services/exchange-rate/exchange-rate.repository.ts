import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRateEntity } from '../../entities';
import { OmittedMetaEntityColumns } from '../../common';

@Injectable()
export class ExchangeRateRepository {
    constructor(
        @InjectRepository(ExchangeRateEntity)
        private repository: Repository<ExchangeRateEntity>
    ) {}

    public upsertExchangeRates(
        exchangeRate:
            | Omit<ExchangeRateEntity, OmittedMetaEntityColumns>
            | Omit<ExchangeRateEntity, OmittedMetaEntityColumns>[]
    ) {
        const rates = Array.isArray(exchangeRate)
            ? exchangeRate.map((rate) => ({ ...rate, updatedAtUtc: new Date() }))
            : { ...exchangeRate, updatedAtUtc: new Date() };
        return this.repository
            .createQueryBuilder()
            .insert()
            .values(rates)
            .orUpdate(['updatedAtUtc', 'rate', 'amount'], ['currencyCode'])
            .returning('*')
            .execute();
    }
    public getExchangeRates() {
        return this.repository.find();
    }
}
