import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class ExchangeRateEntity extends EntityWithMeta {
    @Field(() => ID)
    @PrimaryColumn()
    public currencyCode!: string;

    @Field(() => Float)
    @Column({ type: 'float' })
    public rate!: number;

    @Field(() => Number)
    @Column()
    public amount!: number;

    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currencyName!: string;

    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public country!: string;
}
