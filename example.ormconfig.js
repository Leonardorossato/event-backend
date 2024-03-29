const { DataSource } = require('typeorm');

module.exports.postgresSQLConnection = new DataSource({
  type: 'postgres',
  port: +(process.env.DB_PORT ?? 5432),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['./dist/**/**/**.entity.js'],
  migrations: ['./dist/**/migrations/**.js'],
  synchronize: false,
  migrationsRun: true,
});
