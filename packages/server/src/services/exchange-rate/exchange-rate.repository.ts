import { Injectable } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRateEntity } from '../../entities';
import { OmittedMetaEntityColumns } from '../../common';

@Injectable()
export class ExchangeRateRepository {
    private CACHE_TIME_MILLIS = 300_000;
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
        const now = new Date(new Date().valueOf() - this.CACHE_TIME_MILLIS);
        return this.repository.find({
            where: { updatedAtUtc: MoreThanOrEqual(now) },
        });
    }
}
