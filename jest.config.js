module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: './tsconfig.json',
      diagnostics: false,
    },
  },
  // modulePathIgnorePatterns: ['<rootDir>/server'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': ["ts-jest"],
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
