import path from "node:path";
import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/authenticateUser.js";
import { hash } from "bcrypt";

function getHomePage(_req, res) {
  res.status(200).sendFile(path.resolve("./static/html/index.html"));
}

function getUsers(_req, res) {
  try {
    const strQry = `
                SELECT userID, firstName, lastName, age, emailAddress
                from Users;
                `;
    db.query(strQry, (err, results) => {
      if (err) throw err;
      // new Error(`Unable to fetch all users`)
      res.json({
        status: res.statusCode,
        results: results,
      });
    });
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message,
    });
  }
}

function getUser(req, res) {
  try {
    const userID = req.params.userID;
    const strQry = `
      SELECT userID, firstName, lastName, age, emailAddress
      FROM Users
      WHERE userID = ?;
    `;
    db.query(strQry, [userID], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to fetch user' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({
        status: res.statusCode,
        results: results[0],
      });
    });
  } catch (e) {
    res.status(500).json({
      status: res.statusCode,
      msg: e.message,
    });
  }
}


async function registerUser(req, res) {
  try {
    let data = req.body;
    data.userPassword = await hash(data.userPassword, 12);
    // payload
    let user = {
      emailAddress: data.emailAddress,
      userPassword: data.userPassword,
    };
    const strQry = `INSERT INTO Users
                    SET ?;`;
    db.query(strQry, [data], (err) => {
      if (err) {
        res.json({ status: res.statusCode, msg: "This email already exists" });
      } else {
        const token = createToken(user);
        res.json({
          msg: "User created successfully",
          status: res.statusCode,
          token: token,
        });
      }
    });
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const {userID} = req.params
    let data = req.body;
    if (data.userPassword) {
      data.userPassword = await hash(data.userPassword, 12);
    }
    const strQry = `UPDATE Users
                    SET ?
                    WHERE userID = ${userID};`;
    db.query(strQry, [data], (err) => {
      if (err) throw new Error('Unable to update user');
      res.json({
        status: res.statusCode,
        msg: "User updated successfully",
      });
    });
  } catch (e) {
    res.json({
      status: 404,
      msg: e.message,
    });
  }
}

function getErrorPage(_req, res) {
  res.sendFile(path.resolve("./static/html/error.html"));
}
export { getUsers, getHomePage, getUser, getErrorPage, registerUser, updateUser };
