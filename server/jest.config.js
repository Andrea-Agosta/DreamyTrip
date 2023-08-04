/* eslint-disable */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^dbConnection$': '<rootDir>/src/__test__/__mocks__/dbConnection.ts',
    '^apiConnnection$': '<rootDir>/src/__test__/__mocks__/apiConnection.ts',
  },
  setupFiles: ['dotenv/config'],
  globalSetup: './src/__test__/config/test-global-setup.ts',
  globalTeardown: './src/__test__/config/test-global-teardown.ts',
  setupFilesAfterEnv: ['./src/__test__/config/test-config.ts'],
};