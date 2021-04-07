module.exports = {
  type: 'mysql',
  charset: 'utf8mb4',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'sample',
  synchronize: false,
  logging: false,
  extra: {
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
  },
  entities: ['src/interfaces/databases/models/**/*.ts'],
  migrations: ['src/interfaces/databases/migrations/**/*.ts'],
  subscribers: ['src/interfaces/databases/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/interfaces/databases/models',
    migrationsDir: 'src/interfaces/databases/migrations',
    subscribersDir: 'src/interfaces/databases/subscribers',
  },
  seeds: ['src/__tests__/common/seeding/seeds/**/*.seed.ts'],
  factories: ['src/__tests__/common/seeding/factories/**/*.factory.ts'],
};
