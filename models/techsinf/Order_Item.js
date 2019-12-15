const db = require("../../database");
const Result = require("./result");

const Order_Item = {
  // Create new sales order item
  async create({ order_id, quantity, unit_price }) {
      console.log(unit_price);
    return db
      .query(
        `INSERT INTO order_item(order_id,
                                quantity,
                                unit_price)
         VALUES ($1, $2, $3) RETURNING *`,
        [order_id, quantity, unit_price]
      )
      .then(Result.one);
  },
  
  async findOrderItems (order_id)
  {
    return db
    .query(
        `SELECT * FROM order_item
         WHERE order_id = $1`,
        [order_id]
      )
    .then(Result.many);
  }
};

Object.freeze(Order_Item);

module.exports = Order_Item;
