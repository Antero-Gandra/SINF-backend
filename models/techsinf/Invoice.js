const db = require("../../database");
const Result = require("./result");

const Invoice = {
  // Create new sales invoice
  async create({ order_id, sales_invoice_uuid, invoice_createdat }) {
    return db
      .query(
        `INSERT INTO invoice(order_id,
                            sales_invoice_uuid,
                            invoice_createdat)
         VALUES ($1, $2, $3) RETURNING *`,
        [order_id, sales_invoice_uuid, invoice_createdat]
      )
      .then(Result.one);
  },

  // Find invoice with the given UUID. Remember to check authorization.
  async find(sales_invoice_uuid) {
    return db
      .query(
        `SELECT * FROM invoice
         WHERE sales_invoice_uuid = $1`,
        [sales_invoice_uuid]
      )
      .then(Result.one);
  },

  async setPurchase({ order_id , purchase_invoice_uuid }) {
    return db
      .query(
        `UPDATE invoice
        SET purchase_invoice_uuid = $1
        WHERE order_id = $2 RETURNING *`,
        [purchase_invoice_uuid, order_id]
      )
      .then(Result.one);
  },
};

Object.freeze(Invoice);

module.exports = Invoice;
