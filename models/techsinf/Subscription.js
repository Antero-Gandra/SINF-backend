const db = require("../../database");
const Result = require("./result");

const Subscription = {
  async all() {
    return db.query("SELECT * FROM subscription").then(Result.many);
  },

  async get(subscription_id) {
    return db
      .query(
        `SELECT * FROM subscription
         WHERE subscription_id = $1`,
        [subscription_id]
      )
      .then(Result.one);
  },

  async allSupplier(supplier_id) {
    return db
      .query(
        `SELECT * FROM supplier_subscription
         WHERE supplier_id = $1`,
        [supplier_id]
      )
      .then(Result.many);
  },

  async allCustomer(customer_id) {
    return db
      .query(
        `SELECT * FROM customer_subscription
         WHERE customer_id = $1`,
        [customer_id]
      )
      .then(Result.many);
  },

  async find({ brand_id, customer_id }) {
    return db
      .query(
        `SELECT * FROM subscription
         WHERE brand_id = $1 AND customer_id = $2`,
        [brand_id, customer_id]
      )
      .then(Result.one);
  },

  async create({ brand_id, customer_id }) {
    return db
      .query(
        `INSERT INTO subscription(brand_id,
                                  customer_id)
         VALUES ($1, $2) RETURNING *`,
        [brand_id, customer_id]
      )
      .then(Result.one);
  },

  async delete(subscription_id) {
    return db
      .query(
        `DELETE FROM subscription
         WHERE subscription_id = $1 RETURNING *`,
        [subscription_id]
      )
      .then(Result.count);
  }
};

module.exports = Subscription;
