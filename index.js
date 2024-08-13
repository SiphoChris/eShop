import express from "express";
import { userRouter, shopRouter } from "./routes/index.js";
import { createToken } from "./middleware/authenticateUser.js";

const port = +process.env.PORT || 3000;

const server = express();

// middleware
server.use(
  express.static("./static"),
  express.urlencoded({ extended: true })
);

// routes
server.use('/api/users', userRouter)
server.use('/api/shop', shopRouter)

// auth
server.use(createToken) 

server.listen(port, () => console.log(`Listening on port ${port}`));
