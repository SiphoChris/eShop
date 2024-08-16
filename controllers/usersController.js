import express from "express";
import {user} from "../model/index.js"
import path from "path";

// routes
const userRouter = express.Router();

// middleware
userRouter.use(express.json());


userRouter.get("^/$|^/all$", (req, res) => {
  user.fetchUsers(req, res);
});

userRouter.get("/:userID", (req, res) => {
  user.fetchUserByID(req, res);
})

userRouter.post("/register", (req, res) => {
  user.registerUser(req, res);
})

userRouter.post("/login", (req, res) => {
  user.loginUser(req, res);
})

userRouter.patch("/update/:userID", (req, res) => {
  user.updateUser(req, res);
})

userRouter.delete("/delete/:userID", (req, res) => {
  user.deleteUser(req, res);
})

userRouter.delete("/delete", (req, res) => {
  user.deleteUsers(req, res);
})


export {userRouter}
