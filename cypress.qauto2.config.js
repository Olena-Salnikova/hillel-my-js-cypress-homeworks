const { fa } = require("@faker-js/faker");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: true,
    html: false,
    json: true,
  },
  defaultBrowser: "chrome",
  viewportHeight: 1024,
  viewportWidth: 1440,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  defaultCommandTimeout: 8000,
  e2e: {
    baseUrl: "https://qauto2.forstudy.space",
    watchForFileChanges: false,
    specPattern: "cypress/e2e/**/*.{spec,test}.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
