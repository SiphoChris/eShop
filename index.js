import express from "express";
import { router } from "./routes/index.js";
const port = +process.env.PORT || 3000;

const server = express();

// middleware
server.use(
  router,
  express.static("./static"),
  express.json(),
  express.urlencoded({ extended: true })
);

server.listen(port, () => console.log(`Listening on port ${port}`));
