import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],

  moduleNameMapper: {
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/src/tests/__mocks__/fileMock.ts',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};

export default config;
