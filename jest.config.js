module.exports = {
  preset: 'ts-jest',
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/*.{ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '__tests__/snapshot__tests/'],
};
