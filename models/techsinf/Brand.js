const db = require("../../database");
const Result = require("./result");

const Brand = {
  // Get brand with the given id. Remember to check authorization.
  async get(brand_id) {
    return db
      .query(
        `SELECT * FROM supplier_brand
         WHERE brand_id = $1`,
        [brand_id]
      )
      .then(Result.one);
  },

  // Find brand with the given UUID. Remember to check authorization.
  async find(brand_uuid) {
    return db
      .query(
        `SELECT * FROM supplier_brand
         WHERE brand_uuid = $1`,
        [brand_uuid]
      )
      .then(Result.one);
  },

  // Find all brands from the given supplier.
  async allSupplier(supplier_id) {
    return db
      .query(
        `SELECT * FROM supplier_brand
         WHERE supplier_id = $1`,
        [supplier_id]
      )
      .then(Result.many);
  },

  // Create a new brand for the given supplier and brand UUID.
  async create({ supplier_id, brand_uuid, brand_name }) {
    return db
      .query(
        `INSERT INTO brand(supplier_id,
                           brand_uuid,
                           brand_name)
         VALUES ($1, $2, $3) RETURNING *`,
        [supplier_id, brand_uuid, brand_name]
      )
      .then(Result.one);
  },

  // Delete the given brand. Authorization is assumed.
  async delete(brand_id) {
    return db
      .query(
        `DELETE FROM brand
         WHERE brand_id = $1 RETURNING *`,
        [brand_id]
      )
      .then(Result.count);
  },

  makeMapBrandUUID(rows) {
    const map = {};
    for (row in rows) map[row.brand_uuid] = row;
    return map;
  }
};

Object.freeze(Brand);

module.exports = Brand;
