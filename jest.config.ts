module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*spec.ts'],
    transform: {
      '^.+\\.(t|j)s$': [
        'ts-jest',
        {
          tsconfig: '<rootDir>/tsconfig.test.json',
          ignoreCodes: ['TS151001'],
        },
      ],
    },
    collectCoverage: true,
  };