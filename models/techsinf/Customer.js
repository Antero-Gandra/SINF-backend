const db = require("../../database");
const Result = require("./result");

const Customer = {
  async all() {
    return db.query("SELECT * FROM customer_user").then(Result.many);
  },

  async get(customer_id) {
    return db
      .query(
        `SELECT * FROM customer_user
         WHERE customer_id = $1`,
        [customer_id]
      )
      .then(Result.one);
  },

  async find({ tenant, organization }) {
    return db
      .query(
        `SELECT * FROM customer_user
         WHERE customer_tenant = $1 AND customer_organization = $2`,
        [tenant, organization]
      )
      .then(Result.one);
  },

  async create({ tenant, organization, company_uuid }) {
    return db
      .query(
        `INSERT INTO customer_user(customer_tenant,
                                 customer_organization,
                                 customer_company_uuid)
         VALUES ($1, $2, $3) RETURNING *`,
        [tenant, organization, company_uuid]
      )
      .then(Result.one);
  },

  async delete(customer_id) {
    return db
      .query(
        `DELETE FROM customer_user
         WHERE customer_id = $1 RETURNING *`,
        [customer_id]
      )
      .then(Result.count);
  }
};

module.exports = Customer;
