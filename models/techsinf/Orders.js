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
  }

  // ...
};

module.exports = Orders;
