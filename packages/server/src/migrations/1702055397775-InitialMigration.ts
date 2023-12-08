import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1702055397775 implements MigrationInterface {
    name = 'InitialMigration1702055397775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rate_entity" ("createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "rate" double precision NOT NULL, "amount" integer NOT NULL, "currencyCode" character varying NOT NULL, "currencyName" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, CONSTRAINT "PK_cf6a3e7e99e2b75a7f1b5f94b0e" PRIMARY KEY ("currencyCode"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate_entity"`);
    }

}
