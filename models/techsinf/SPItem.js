const db = require("../../database");
const Result = require("./result");

const SPItem = {
  // Get the sp_item correspondence. Authorization is assumed.
  async get(sp_item_id) {
    return db
      .query(
        `SELECT * FROM subscription_brand_sp_item
         WHERE sp_item_id = $1`,
        [sp_item_id]
      )
      .then(Result.one);
  },

  // Find all sales items from the given supplier
  async supplierItems(supplier_id) {
    return db
      .query(
        `SELECT * FROM subscription_brand_sp_item
         WHERE subscription_id = $1`,
        [supplier_id]
      )
      .then(Result.many);
  },

  // Find all pairs from the given subscription
  async subscription(subscription_id) {
    return db
      .query(
        `SELECT * FROM sp_item
         WHERE subscription_id = $1`,
        [subscription_id]
      )
      .then(Result.many);
  },

  // Get all purchase items matching the given sales item
  async purchaseItems(supplier_item_uuid) {
    return db
      .query(
        `SELECT * FROM sp_item
         WHERE supplier_item_uuid = $1`,
        [supplier_item_uuid]
      )
      .then(Result.many);
  },

  // Get the sales item matching the given purchase item
  async salesItem(customer_item_uuid) {
    return db
      .query(
        `SELECT * FROM sp_item
         WHERE customer_item_uuid = $1`,
        [customer_item_uuid]
      )
      .then(Result.one);
  },

  // Return an object map with the matching sales items for the given purchase items
  async mapSalesItems({ subscription_id, purchases_items_uuids }) {
    return db
      .query(
        `SELECT * FROM subscription_brand_sp_item
         WHERE subscription_id = $1 AND purchase_item_uuid = ANY ($2)`,
        [subscription_id, purchases_items_uuids]
      )
      .then(Result.many)
      .then(makeMapPurchaseItems);
  },

  // Return an object map with the matching purchase items for the given sales items
  async mapPurchasesItems({ subscription_id, sales_items_uuids }) {
    return db
      .query(
        `SELECT * FROM subscription_brand_sp_item
         WHERE subscription_id = $1 AND sales_item_uuid = ANY ($2)`,
        [subscription_id, sales_items_uuids]
      )
      .then(Result.many)
      .then(makeMapSalesItems);
  },

  makeMapPurchaseItems(rows) {
    const map = {};
    for (row in rows) map[row.purchase_item_uuid] = row;
    return map;
  },

  makeMapSalesItems(rows) {
    const map = {};
    for (row in rows) map[row.sales_item_uuid] = row;
    return map;
  }
};

Object.freeze(SPItem);

module.exports = SPItem;
