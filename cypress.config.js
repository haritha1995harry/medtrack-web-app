const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: "8mpjtc",
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
