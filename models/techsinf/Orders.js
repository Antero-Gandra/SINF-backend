const db = require("../../database");
const Result = require("./result");

const Orders = {
  // Get order with the given id. Authorization is assumed.
  async get(order_id) {
    return db
      .query(
        `SELECT * FROM subscription_brand_orders
         WHERE order_id = $1`,
        [order_id]
      )
      .then(Result.one);
  },

  // Get all orders for the given supplier.
  async allSupplier(supplier_id) {
    return db
      .query(
        `SELECT * FROM subscription_brand_orders
         WHERE supplier_id = $1`,
        [supplier_id]
      )
      .then(Result.many);
  },

  // Get all orders for the given customer.
  async allCustomer(customer_id) {
    return db
      .query(
        `SELECT * FROM subscription_brand_orders
         WHERE customer_id = $1`,
        [customer_id]
      )
      .then(Result.many);
  },

  // Create new order from a purchase order
  async create({ subscription_id, purchase_order_uuid }) {
    console.log("Model");
    return db
      .query(
        `INSERT INTO orders(subscription_id,
                            purchase_order_uuid)
         VALUES ($1, $2) RETURNING *`,
        [subscription_id, purchase_order_uuid]
      )
      .then(Result.one);
  },

  // Delete order
  async delete(order_id) {
    return db
      .query(
        `DELETE FROM orders
         WHERE order_id = $1 RETURNING *`,
        [order_id]
      )
      .then(Result.count);
  }
};

Object.freeze(Orders);

module.exports = Orders;
