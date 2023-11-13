const express = require("express");
const routes = require("./src/main/routes");
const migration = require("./src/main/databases/migration");
const port = process.env.PORT || 3000;
const testMode = process.env.TEST_MODE === "true" || false;

const app = express();

app.use(routes);

const listen = (port) => {
  return app.listen(port, async () => {
    try {
      await migration.up();

      console.log(
        "[application.js:listen] Success on import data to movielist"
      );
    } catch (error) {
      console.error(
        `[application.js:listen] Error on import data to movielist: ${error}`
      );
    }

    console.log(`[application.js:listen] Server started on port: ${port}`);
  });
};

if (!testMode) {
  listen(port);
}

module.exports = {
  listen,
};
