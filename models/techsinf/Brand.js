const db = require("../../database");
const Result = require("./result");

const Brand = {
  async all() {
    return db.query("SELECT * FROM brand").then(Result.many);
  },

  async get(brand_id) {
    return db
      .query(
        `SELECT * FROM brand
       WHERE brand_id = $1`,
        [brand_id]
      )
      .then(Result.one);
  },

  async allSupplier(supplier_id) {
    return db
      .query(
        `SELECT * FROM supplier_brand
         WHERE supplier_id = $1`,
        [supplier_id]
      )
      .then(Result.many);
  },

  async create({ supplier_id, brand_uuid }) {
    return db
      .query(
        `INSERT INTO brand(supplier_id,
                           brand_uuid)
         VALUES ($1, $2) RETURNING *`,
        [supplier_id, brand_uuid]
      )
      .then(Result.one);
  },

  async delete(brand_id) {
    return db
      .query(
        `DELETE FROM brand
         WHERE brand_id = $1 RETURNING *`,
        [brand_id]
      )
      .then(Result.count);
  }
};

module.exports = Brand;
