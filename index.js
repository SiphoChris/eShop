import express from "express";
import { userRouter } from "./controllers/usersController.js";
import { shopRouter } from "./controllers/productsController.js";
import path from "path"

const port = +process.env.PORT || 4000;

const server = express();

// middleware
server.use(
  express.static("./static"),
  express.json(),
  express.urlencoded({ extended: true })
);


server.get("/", (req, res) => {
  res.sendFile(path.resolve("./static/html/index.html"));
});

// routes
server.use('/api/users', userRouter)
server.use('/api/shop', shopRouter)


server.listen(port, () => console.log(`Listening on port ${port}`));
