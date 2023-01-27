import { MigrationInterface, QueryRunner } from 'typeorm';

export class announcements1674778620020 implements MigrationInterface {
  name = 'announcements1674778620020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "creatorAnnouncements" character varying(255) NOT NULL, "releasetTitle" character varying NOT NULL, "creatorsEmail" character varying(255) NOT NULL, "communiquéContent" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9104e7437d51a31ece276bb9a57" UNIQUE ("creatorsEmail"), CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "announcement"`);
  }
}
