import express from "express";
import bodyParser from "body-parser";
import {
  getHomePage,
  getUsers,
  getUser,
  registerUser,
  updateUser,
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
router.get("/user/:userID", getUser);

// register end-point : registers a new user
router.post("/register", registerUser);

// update end-point : updates a user
router.patch("/user/:userID", updateUser);

router.get("*", getErrorPage);

export { router };
