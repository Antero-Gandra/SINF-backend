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

  async findSupplierName({
    supplier_id,
    brand_name
  }) {
    return db
      .query(
        `SELECT * FROM supplier_brand
         WHERE supplier_id = $1 AND brand_name = $2`,
        [supplier_id, brand_name]
      )
      .then(Result.one);
  },

  // Find all brands from the given supplier.
  // select brand_id, brand_name, (select count(*) as n_subscriptions from subscription where subscription.brand_id = brand.brand_id),(select count(*) as n_products from sales_item where sales_item.brand_id = brand.brand_id)  from brand where supplier_id='4';
  async allSupplier(supplier_id) {
    return db
      .query(
        `SELECT brand_id, brand_name, 
        (SELECT count(*) as n_subscriptions FROM subscription WHERE subscription.brand_id = brand.brand_id),
        (SELECT count(*) as n_products FROM sales_item WHERE sales_item.brand_id = brand.brand_id)  
        FROM brand 
        WHERE supplier_id=$1`,
        [supplier_id]
      )
      .then(Result.many);
  },

  // Create a new brand for the given supplier and brand UUID.
  async create({
    supplier_id,
    brand_uuid,
    brand_name,
    brand_createdat
  }) {
    return db
      .query(
        `INSERT INTO brand(supplier_id,
                           brand_uuid,
                           brand_name,
                           brand_createdat)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [supplier_id, brand_uuid, brand_name, brand_createdat]
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
    for (const row in rows) map[row.brand_uuid] = row;
    return map;
  }
};

Object.freeze(Brand);

module.exports = Brand;