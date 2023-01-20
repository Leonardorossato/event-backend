import { MigrationInterface, QueryRunner } from 'typeorm';

export class receivers1674237589593 implements MigrationInterface {
  name = 'receivers1674237589593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "receiver" ("id" SERIAL NOT NULL, "fullName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "whatsapp" character varying(255) NOT NULL, "cellphone" character varying(14) NOT NULL, "message" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9a9bd8cec6e78db5897a0afb0b9" UNIQUE ("email"), CONSTRAINT "PK_c49c8583f3bebce9c6a3403ed30" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "receiver"`);
  }
}
