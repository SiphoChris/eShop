import { connection as db } from "../config/index.js";

class Product {
  fetchProducts(req, res) {
    try {
      const strQry = `
                        SELECT productID, prodName, category, prodDescription, prodURL, amount
                        from Products;
                        `;
      db.query(strQry, (err, results) => {
        if (err)
          res.json({
            status: res.statusCode,
            msg: `Unable to fetch all users`,
          });
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

  fetchProductByID(req, res) {
    try {
      const { prodID } = req.params.productID;
      const strQry = `
              SELECT productID, prodName, category, prodDescription, prodURL, amount
              FROM Products
              WHERE productID = ?;
            `;
      db.query(strQry, [prodID], (err, results) => {
        if (err) {
          res.status(500).json({ error: "Unable to fetch product" });
        } else {
          res.json({
            status: res.statusCode,
            results: results[0],
          });
        }
        if (results.length === 0) {
          res.status(404).json({ error: "product not found" });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: res.statusCode,
        msg: e.message,
      });
    }
  }

  recentProducts(req, res) {
    try {
      const strQry = `
              SELECT productID, prodName, category, prodDescription, prodURL, amount
              FROM Products
              ORDER BY productID DESC
              LIMIT 5;
            `;
      db.query(strQry, (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Unable to fetch productS" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Products not found" });
        }
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.status(500).json({
        status: res.statusCode,
        msg: e.message,
      });
    }
  }

  async addProduct(req, res) {
    try {
      let data = req.body;
      const strQry = `INSERT INTO Products SET ?;`;
      db.query(strQry, [data], (err) => {
        if (err) {
          return res.status(500).json({ error: "Unable to add product" });
        }
        res.json({
          status: res.statusCode,
          msg: "Product added successfully",
        });
      });
    } catch (e) {
      res.status(500).json({
        status: res.statusCode,
        msg: e.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { productID } = req.params;
      let data = req.body;
      const strQry = `UPDATE Products
                        SET ?
                        WHERE productID = ${productID};`;
      db.query(strQry, [data], (err) => {
        if (err) throw new Error("Unable to update product");
        res.json({
          status: res.statusCode,
          msg: "Product updated successfully",
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

  deleteProduct(req, res) {
    try {
      const { productID } = req.params;
      const strQry = `DELETE FROM Products 
                        WHERE productID = ?;`;

      db.query(strQry, [productID], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Unable to delete product" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({
          status: res.statusCode,
          msg: "Product deleted successfully",
        });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export { Product };
