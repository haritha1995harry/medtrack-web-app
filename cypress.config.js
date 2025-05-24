const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '239apm',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
