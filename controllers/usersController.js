import path from "node:path";
import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/authenticateUser.js";
import { hash, compare } from "bcrypt";

export function getHomePage(_req, res) {
  res.status(200).sendFile(path.resolve("./static/html/index.html"));
}

export function getErrorPage(_req, res) {
  // res.sendFile(path.resolve("./static/html/error.html"));
  res.json({
    status: 404,
    msg: "Page not found"
  })
}

export function getUsers(_req, res) {
  try {
    const strQry = `
                SELECT userID, firstName, lastName, age, emailAddress, userRole
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

export function getUser(req, res) {
  try {
    const userID = req.params.userID;
    const strQry = `
      SELECT userID, firstName, lastName, age, emailAddress, userRole
      FROM Users
      WHERE userID = ?;
    `;
    db.query(strQry, [userID], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Unable to fetch user" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
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

export async function registerUser(req, res) {
  try {
    let data = req.body;
    data.userPassword = await hash(data.userPassword, 12);
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

export async function updateUser(req, res) {
  try {
    const { userID } = req.params;
    let data = req.body;
    if (data.userPassword) {
      data.userPassword = await hash(data.userPassword, 12);
    }
    const strQry = `UPDATE Users
                    SET ?
                    WHERE userID = ${userID};`;
    db.query(strQry, [data], (err) => {
      if (err) throw new Error("Unable to update user");
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

export function deleteUser(req, res) {
  try {
    const userID = req.params.userID;
    const strQry = `DELETE FROM Users 
                    WHERE userID = ?;`;

    db.query(strQry, [userID], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Unable to delete user" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({
        status: res.statusCode,
        msg: "User deleted successfully",
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}

export function deleteUsers(req, res) {
  try {
    const strQry = `DELETE FROM Users;`;

    db.query(strQry, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Unable to delete users" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ msg: "Users not found" });
      }

      res.status(200).json({
        status: res.statusCode,
        msg: "Users deleted successfully",
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { emailAddress, userPassword } = req.body;

    const strQry = `SELECT userID, firstName, lastName, age, emailAddress, userPassword
                    FROM Users
                    WHERE emailAddress = ?;`;

    db.query(strQry, [emailAddress], async (err, results) => {
      if (err) {
        return res.status(500).json({ status: 500, msg: "Server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({
          status: 401,
          msg: "Invalid email. Please try again.",
        });
      }

      const user = results[0];
      const isValidPass = await compare(userPassword, user.userPassword);

      if (isValidPass) {
        const token = createToken({
          emailAddress: user.emailAddress,
          userPassword: user.userPassword,
        });
        return res.status(200).json({
          status: 200,
          token,
          user: {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            emailAddress: user.emailAddress,
          },
        });
      } else {
        return res.status(401).json({
          status: 401,
          msg: "Invalid password or you have not registered.",
        });
      }
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      msg: "Server error",
    });
  }
}


