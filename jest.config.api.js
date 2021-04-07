module.exports = {
  roots: ['<rootDir>/src/__tests__/apis'],
  collectCoverageFrom: ['**/*.{js,ts}', '!**/*.d.ts', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '.*/__tests__/.*TestData.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/common/Api.ts'],
};
