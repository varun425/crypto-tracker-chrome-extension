module.exports = {
    env: {
      browser: true,  // Standard browser globals like `window`, `document`, etc.
    },
    globals: {
      chrome: "readonly", // Declares `chrome` as a global variable
    },
    extends: [
      "react-app",
      "eslint:recommended"
    ],
    rules: {
      // Your custom ESLint rules
    }
  };
  