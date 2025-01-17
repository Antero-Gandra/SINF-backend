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

  async create({ subscription_id, sales_item_id, customer_item }) {
    return db
      .query(
        `INSERT INTO sp_item (subscription_id, sales_item_id, customer_item)
        VALUES ($1, $2, $3)`,
        [subscription_id, sales_item_id, customer_item]
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
  async purchaseItems(supplier_item) {
    return db
      .query(
        `SELECT * FROM sp_item
         WHERE supplier_item = $1`,
        [supplier_item]
      )
      .then(Result.many);
  },

  // Get the sales item matching the given purchase item
  async salesItem(customer_item) {
    return db
      .query(
        `SELECT * FROM sp_item
         WHERE customer_item = $1`,
        [customer_item]
      )
      .then(Result.one);
  },

  // Return an object map with the matching sales items for the given purchase items
  async mapSalesItems({ subscription_id, purchases_items_uuids }) {
    return db
      .query(
        `SELECT * FROM subscription_brand_sp_item
         WHERE subscription_id = $1 AND purchase_item = ANY ($2)`,
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
         WHERE subscription_id = $1 AND sales_item = ANY ($2)`,
        [subscription_id, sales_items]
      )
      .then(Result.many)
      .then(makeMapSalesItems);
  },

  makeMapPurchaseItems: Result.keyfy("purchase_item_uuid"),
  makeMapSalesItems: Result.keyfy("sales_item_uuid")
};

Object.freeze(SPItem);

module.exports = SPItem;
