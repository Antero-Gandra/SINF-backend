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

  // Get all orders in general
  async allOrdersCustomer() {
    return db
      .query(
        `SELECT * FROM orders, subscription, brand, supplier, "user"
        WHERE orders.subscription_id = subscription.subscription_id
        AND subscription.brand_id = brand.brand_id
        AND supplier.supplier_id = brand.supplier_id
        AND supplier.supplier_id = "user".user_id`
      )
      .then(Result.many);
  },

  async allOrdersSupplier() {
    return db
      .query(
        `SELECT * FROM orders, subscription, customer, "user"
        WHERE orders.subscription_id = subscription.subscription_id
        AND subscription.customer_id = customer.customer_id
        AND customer.customer_id = "user".user_id`
      )
      .then(Result.many);
  },

  // Create new order from a purchase order
  async create({ subscription_id, purchase_order_uuid }) {
    return db
      .query(
        `INSERT INTO orders(subscription_id,
                            purchase_order_uuid)
         VALUES ($1, $2) RETURNING *`,
        [subscription_id, purchase_order_uuid]
      )
      .then(Result.one);
  },

  // Find order with the given UUID. Remember to check authorization.
  async find(purchase_order_uuid) {
    return db
      .query(
          `SELECT *
           FROM subscription_brand_orders
          WHERE purchase_order_uuid = $1`,
        [purchase_order_uuid]
      )
      .then(Result.one);
  },

  // Reject a purchase order
  async reject(order_id) {
    return db
      .query(
        `UPDATE orders
         SET stage = 'REJECTED'
         WHERE order_id = $1 RETURNING *`,
        [order_id]
      )
      .then(Result.count);
  },

  // Accept a purchase order
  async accept({ order_id, sales_order_uuid }) {
    return db
      .query(
        `UPDATE orders
         SET sales_order_uuid = $2,
             stage = 'SALES_ORDER'
         WHERE order_id = $1 RETURNING *`,
        [order_id, sales_order_uuid]
      )
      .then(Result.count);
  },

  async complete(order_id) {
    return db
      .query(
        `UPDATE orders
        SET stage = 'COMPLETED'
        WHERE order_id = $1 RETURNING *`,
        [order_id]
      )
      .then(Result.count);
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
  },

  stages: {
    PURCHASE_ORDER: "PURCHASE_ORDER",
    REJECTED: "REJECTED",
    SALES_ORDER: "SALES_ORDER",
    SALES_INVOICE: "SALES_INVOICE",
    PURCHASE_INVOICE: "PURCHASE_INVOICE",
    COMPLETED: "COMPLETED"
  }
};

Object.freeze(Orders);

module.exports = Orders;
