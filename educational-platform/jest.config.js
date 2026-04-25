export default {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  transform: {},
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/js/core/$1",
    "^@tasks/(.*)$": "<rootDir>/js/tasks/$1",
    "^@html-css-basics/(.*)$": "<rootDir>/html-css-basics/$1",
    "^@html-css-basics-2/(.*)$": "<rootDir>/html-css-basics-2/$1",
    "^@js-basics/(.*)$": "<rootDir>/js-basics/$1",
  },
};
