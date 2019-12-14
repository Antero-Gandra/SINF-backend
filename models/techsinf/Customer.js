const db = require("../../database");
const Result = require("./result");

const Customer = {
  // Get all customers (development only)
  async all() {
    return db.query("SELECT * FROM customer_user").then(Result.many);
  },

  // Get customer with the given id. Authorization is assumed.
  async get(customer_id) {
    return db
      .query(
        `SELECT * FROM customer_user
         WHERE customer_id = $1`,
        [customer_id]
      )
      .then(Result.one);
  },

  // Find customer with the given tenant and organization identifiers.
  async find({ tenant, organization, company_name }) {
    return db
      .query(
        `SELECT * FROM customer_user
         WHERE customer_tenant = $1 AND customer_organization = $2
         AND customer_company_name = $3`,
        [tenant, organization, company_name]
      )
      .then(Result.one);
  },

  // Create a new customer for the given tenant, organization, and company triple.
  async create({ tenant, organization, company_uuid, company_name }) {
    return db
      .query(
        `INSERT INTO customer_user(customer_tenant,
                                   customer_organization,
                                   customer_company_uuid,
                                   customer_company_name)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [tenant, organization, company_uuid, company_name]
      )
      .then(Result.one);
  },

  // Delete the given customer. Authorization is assumed.
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

Object.freeze(Customer);

module.exports = Customer;
