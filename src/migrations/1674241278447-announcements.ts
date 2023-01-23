import { MigrationInterface, QueryRunner } from 'typeorm';

export class announcements1674241278447 implements MigrationInterface {
  name = 'announcements1674241278447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "receiverId" integer NOT NULL, "creatorAnnouncement" character varying(255) NOT NULL, "creatorEmail" character varying(255) NOT NULL, "communiqContent" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_aa8d71f5479ef36c7ca6db5f7e8" UNIQUE ("creatorEmail"), CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "announcement"`);
  }
}
