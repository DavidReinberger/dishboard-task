import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateEntity } from '../../entities';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { ExchangeRateRepository } from './exchange-rate.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ExchangeRateEntity])],
    providers: [
        ExchangeRateEntity,
        ExchangeRateService,
        ExchangeRateResolver,
        ExchangeRateRepository,
    ],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
