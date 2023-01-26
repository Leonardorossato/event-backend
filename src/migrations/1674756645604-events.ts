import { MigrationInterface, QueryRunner } from "typeorm";

export class events1674756645604 implements MigrationInterface {
    name = 'events1674756645604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "creatorAnnouncements" character varying(255) NOT NULL, "releasetTitle" character varying NOT NULL, "creatorsEmail" character varying(255) NOT NULL, "communiquéContent" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9104e7437d51a31ece276bb9a57" UNIQUE ("creatorsEmail"), CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "receiver" ("id" SERIAL NOT NULL, "fullName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "whatsapp" character varying(255) NOT NULL, "cellphone" character varying(14) NOT NULL, "message" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9a9bd8cec6e78db5897a0afb0b9" UNIQUE ("email"), CONSTRAINT "PK_c49c8583f3bebce9c6a3403ed30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "receiverId" integer NOT NULL, "announcementId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "receiver"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
    }

}
