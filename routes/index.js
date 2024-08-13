import express from "express";
import {
  getHomePage,
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  deleteUsers,
  getErrorPage,
} from "../controllers/index.js";

const server = express();
const userRouter = express.Router();
const shopRouter = express.Router();

// middleware
userRouter.use(express.json());

// home page end-point : gets home page
shopRouter.get("/|^/$|^/products", getHomePage);

// users end-point : gets all users
userRouter.get("^/$|^/all$", getUsers);

// user end-point : gets a user by id
userRouter.get("/:userID", getUser);

// register end-point : registers a new user
userRouter.post("/register", registerUser);

// update end-point : updates a user
userRouter.patch("/update/:userID", updateUser);

// delete end-point : delete a user
userRouter.delete("/delete/:userID", deleteUser);

// delete end-point : delete users
userRouter.delete("/delete", deleteUsers);

// login end-point : login a user
userRouter.post("/login", loginUser)

// error page end-point : gets error page
userRouter.get("*", getErrorPage);
shopRouter.get("*", getErrorPage);

export { userRouter, shopRouter };
