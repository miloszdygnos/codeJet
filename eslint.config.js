// jest.config.mjs
export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "mjs"],

  // Automatically transform files with .jsx using babel-jest
  transform: {
    "^.+\\.(jsx)$": "babel-jest",
  },

  // Specify only .jsx to treat as ESM if needed
  extensionsToTreatAsEsm: [".jsx"],

  // Mock static asset imports (optional)
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
  },

  // Setup files to be run before the test framework is installed in the environment
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
