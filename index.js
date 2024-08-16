import express from "express";
import { userRouter } from "./controllers/usersController.js";
import { shopRouter } from "./controllers/productsController.js";
import { createToken } from "./middleware/authenticateUser.js";

const port = +process.env.PORT || 4000;

const server = express();

// middleware
server.use(
  express.static("./static"),
  express.urlencoded({ extended: true })
);
// auth
server.use(createToken) 

// routes
server.use('/api/users', userRouter)
server.use('/api/shop', shopRouter)


server.listen(port, () => console.log(`Listening on port ${port}`));
