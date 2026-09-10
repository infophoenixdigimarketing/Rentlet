// Custom Node entry point for Hostinger's Node.js hosting (Phusion Passenger needs a startup
// file — it does not run `npm start`). Serves the already-built .next output.
//
// Deploy order on the server:
//   1. npm install
//   2. npm run build      (produces .next/)
//   3. Passenger / Node runs this file
//
// Passenger provides the port via process.env.PORT.
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "0.0.0.0";

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res, parse(req.url, true));
    }).listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Rentlet ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
