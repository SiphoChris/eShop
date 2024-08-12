import express from "express";
import bodyParser from "body-parser";
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
const router = express.Router();
router.use(bodyParser.json());

// home page end-point : gets home page
router.get("^/$|/eShop", getHomePage);

// users end-point : gets all users
router.get("/users", getUsers);

// user end-point : gets a user by id
router.get("/users/:userID", getUser);

// register end-point : registers a new user
router.post("/register", registerUser);

// update end-point : updates a user
router.patch("/users/:userID", updateUser);

// delete end-point : delete a user
router.delete("/users/:userID", deleteUser);

// delete end-point : delete users
router.delete("/users", deleteUsers);

// login end-point : login a user
router.post("/login", loginUser)

router.get("*", getErrorPage);

export { router };
