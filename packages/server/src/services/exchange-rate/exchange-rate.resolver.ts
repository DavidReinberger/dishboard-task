import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateEntity } from '../../entities';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => [ExchangeRateEntity])
    exchangeRates() {
        return this.exchangeRateService.getExchangeRates();
    }

    @Query(() => Number, { nullable: true })
    async cacheAge() {
        const rates = await this.exchangeRateService.getExchangeRates();
        return new Date(rates[0].updatedAtUtc ?? new Date()).valueOf();
    }
}
