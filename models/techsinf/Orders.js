const db = require("../../database");
const Result = require("./result");

const Orders = {
  // Get order with the given id. Authorization is assumed.
  async get(order_id) {
    return db
      .query(
        `SELECT * FROM orders_customer_supplier
         WHERE order_id = $1`,
        [order_id]
      )
      .then(Result.one);
  },

  // Get all orders for the given supplier.
  async allSupplier(supplier_id) {
    return db
      .query(
        `SELECT * FROM orders_customer_supplier
         WHERE supplier_id = $1`,
        [supplier_id]
      )
      .then(Result.many);
  },

  // Get all orders for the given customer.
  async allCustomer(customer_id) {
    return db
      .query(
        `SELECT * FROM orders_customer_supplier
         WHERE customer_id = $1`,
        [customer_id]
      )
      .then(Result.many);
  },

  // Get all orders in general
  async allOrdersCustomer() {
    return db
      .query(
        `SELECT orders.order_id, orders.stage, orders.total, "user".company_name, COUNT(*)
        FROM orders, supplier, "user", order_item
        WHERE orders.supplier_id = supplier.supplier_id
        AND supplier.supplier_id = "user".user_id
        AND order_item.order_id = orders.order_id
        GROUP BY orders.order_id, "user".company_name
        ORDER BY orders.order_id`
      )
      .then(Result.many);
  },

  async allOrdersSupplier() {
    return db
      .query(
        `SELECT orders.order_id, orders.stage, orders.total, "user".company_name, COUNT(*)
        FROM orders, customer, "user", order_item
        WHERE orders.customer_id = customer.customer_id
        AND customer.customer_id = "user".user_id
        AND order_item.order_id = orders.order_id
        GROUP BY orders.order_id, "user".company_name
        ORDER BY orders.order_id`
      )
      .then(Result.many);
  },

  // Create new order from a purchase order
  async create({ customer_id, supplier_id, purchase_order_uuid, total, order_createdat }) {
    return db
      .query(
        `INSERT INTO orders(customer_id,
                            supplier_id,
                            purchase_order_uuid,
                            total,
                            order_createdat)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [customer_id, supplier_id, purchase_order_uuid, total, order_createdat]
      )
      .then(Result.one);
  },

  // Find order with the given UUID. Remember to check authorization.
  async findByPurchaseUUID(purchase_order_uuid) {
    return db
      .query(
          `SELECT *
           FROM orders_customer_supplier
          WHERE purchase_order_uuid = $1`,
        [purchase_order_uuid]
      )
      .then(Result.one);
  },

  async findByOrderID(order_id) {
    return db
      .query(
          `SELECT *
           FROM orders_customer_supplier
          WHERE order_id = $1`,
        [order_id]
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

  async receiveSalesInvoice(order_id) {
    return db
    .query(
      `UPDATE orders
      SET stage = 'SALES_INVOICE'
      WHERE order_id = $1 RETURNING *`,
      [order_id]
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
