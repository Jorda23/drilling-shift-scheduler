import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  globalSetup: '<rootDir>/jest/jest.setup.ts',
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setupAfterEnv.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
  ],

  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/app/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
     '^styles/(.*)$': '<rootDir>/styles/$1',
    '^engine/(.*)$': '<rootDir>/engine/$1',
    
  },
  maxWorkers: "80%",
  cache: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },

  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
};

export default createJestConfig(config);
