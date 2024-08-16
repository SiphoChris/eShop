import express from "express";
import { userRouter } from "./controllers/usersController.js";
import { shopRouter } from "./controllers/productsController.js";
import path from "path";
import { fileURLToPath } from "url";

const port = +process.env.PORT || 4000;

const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
server.use(
  express.static("./static"),
  express.json(),
  express.urlencoded({ extended: true })
);

// routes
server.get("^/home$", (req, res) => {
  res.sendFile(path.resolve("./static/html/index.html"));
});

server.use("/api/users", userRouter);
server.use("/api/shop", shopRouter);

server.get("*", (req, res) => {
  res.sendFile(path.resolve("./static/html/error.html"));
})

server.listen(port, () => console.log(`Listening on port ${port}`));
