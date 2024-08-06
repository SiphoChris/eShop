import path from 'node:path'
import { connection as db } from "../config/index.js";

function getUsers(_req, res) {
    try {
      const strQry = `
                SELECT userID, firstName, lastName, age, emailAddress
                from Users;
                `;
      db.query(strQry, (err, results) => {
        if (err) throw new Error(`Unable to fetch all users`);
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

  function getHomePage(_req, res){
    res.status(200).sendFile(path.resolve("./static/html/index.html"));
}

function getUser(req, res){
    try {
      let userID = +req.params.userID
      const strQry = `
                SELECT userID, firstName, lastName, age, emailAddress
                from Users
                where userID = ${userID};
                `;
      db.query(strQry, (err, results) => {
        if (err) throw new Error(`Unable to fetch all users`);
        res.json({
          status: res.statusCode,
          results: results[0],
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
  export {getUsers, getHomePage, getUser, getErrorPage}