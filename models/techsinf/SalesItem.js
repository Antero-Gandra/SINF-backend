const db = require("../../database");
const Result = require("./result");

const SalesItem = {
  // Get the sales item for this id
  async get(sales_item_id) {
    return db
      .query(
        `SELECT * FROM brand_sales_item
         WHERE sales_item_id = $1`,
        [sales_item_id]
      )
      .then(Result.one);
  },

  // Get all sales item of a brand
  async allBrand(brand_id) {
    return db
      .query(
        `SELECT * FROM brand_sales_item
         WHERE brand_id = $1`,
        [brand_id]
      )
      .then(Result.many);
  },

  // Create a new sales item
  async create({ brand_id, sales_item_uuid }) {
    return db
      .query(
        `INSERT INTO sales_item(brand_id,
                                sales_item_uuid)
         VALUES ($1, $2) RETURNING *`,
        [brand_id, sales_item_uuid]
      )
      .then(Result.one);
  },

  // Delete the sales item
  async delete(sales_item_id) {
    return db
      .query(
        `DELETE FROM sales_item
         WHERE sales_item_id = $1`,
        [sales_item_id]
      )
      .then(Result.count);
  },

  mapSalesItemUUID: Result.map("sales_item_uuid")
};

Object.freeze(SalesItem);

module.exports = SalesItem;