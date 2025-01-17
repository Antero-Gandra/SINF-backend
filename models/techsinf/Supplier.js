const db = require("../../database");
const Result = require("./result");

const Supplier = {
  // Get all suppliers (development only)
  async all() {
    return db.query("SELECT * FROM supplier_user").then(Result.many);
  },

  // Get supplier with the given id. Authorization is assumed.
  async get(supplier_id) {
    return db
      .query(
        `SELECT * FROM supplier_user
         WHERE supplier_id = $1`,
        [supplier_id]
      )
      .then(Result.one);
  },

  // Find supplier with the given tenant and organization identifiers.
  async find({ tenant, organization, company_name }) {
    return db
      .query(
        `SELECT * FROM supplier_user
         WHERE supplier_tenant = $1 AND supplier_organization = $2
         AND supplier_company_name = $3`,
        [tenant, organization, company_name]
      )
      .then(Result.one);
  },

  // Create a new supplier for the given tenant, organization, and company triple.
  async create({ tenant, organization, company_uuid, company_name }) {
    return db
      .query(
        `INSERT INTO supplier_user(supplier_tenant,
                                   supplier_organization,
                                   supplier_company_uuid,
                                   supplier_company_name)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [tenant, organization, company_uuid, company_name]
      )
      .then(Result.one);
  },

  // Delete the given supplier. Authorization is assumed.
  async delete(supplier_id) {
    return db
      .query(
        `DELETE FROM supplier_user
         WHERE supplier_id = $1 RETURNING *`,
        [supplier_id]
      )
      .then(Result.count);
  }
};

Object.freeze(Supplier);

module.exports = Supplier;
