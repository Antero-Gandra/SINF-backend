const db = require("../../database");
const Result = require("./result");

const Invoice = {
  // Create new sales invoice
  async create({ order_id, sales_invoice_uuid }) {
    return db
      .query(
        `INSERT INTO invoice(order_id,
                            sales_invoice_uuid)
         VALUES ($1, $2) RETURNING *`,
        [order_id, sales_invoice_uuid]
      )
      .then(Result.one);
  },

  // Find invoice    with the given UUID. Remember to check authorization.
  async find(sales_invoice_uuid) {
    return db
      .query(
        `SELECT * FROM invoice
         WHERE sales_invoice_uuid = $1`,
        [sales_invoice_uuid]
      )
      .then(Result.one);
  },
};

Object.freeze(Invoice);

module.exports = Invoice;
