import express from "express";
import {getUsers, getHomePage, getUser, getErrorPage} from '../controllers/index.js';

const server = express();
const router = express.Router();

// home page end-point : gets home page
router.get("^/$|/eShop", getHomePage);

// users end-point : gets all users
router.get("/users", getUsers);

// user end-point : gets a user by id
router.get("/user/:userID", getUser);

router.get('*', getErrorPage)

export {router}