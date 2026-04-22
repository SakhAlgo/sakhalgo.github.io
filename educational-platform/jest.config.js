export default {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  transform: {},
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/js/core/$1",
    "^@tasks/(.*)$": "<rootDir>/js/tasks/$1",
  },
};
