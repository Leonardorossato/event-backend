import { MigrationInterface, QueryRunner } from "typeorm";

export class events1674756037444 implements MigrationInterface {
    name = 'events1674756037444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "receiverId" integer NOT NULL, "announcementId" integer NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_063308359b6a00ed4bba1acfd0b" UNIQUE ("email"), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
