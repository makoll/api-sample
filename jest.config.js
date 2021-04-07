module.exports = {
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['**/*.{js,ts}', '!**/*.d.ts', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '.*/__tests__/.*TestData.ts', '<rootDir>/src/__tests__/.*'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['dotenv/config'],
};
