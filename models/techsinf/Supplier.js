const db = require("../../database");
const Result = require("./result");

const Supplier = {
  async all() {
    return db.query("SELECT * FROM supplier_user").then(Result.many);
  },

  async get(supplier_id) {
    return db
      .query(
        `SELECT * FROM supplier_user
         WHERE supplier_id = $1`,
        [supplier_id]
      )
      .then(Result.one);
  },

  async find({ tenant, organization }) {
    return db
      .query(
        `SELECT * FROM supplier_user
         WHERE supplier_tenant = $1 AND supplier_organization = $2`,
        [tenant, organization]
      )
      .then(Result.one);
  },

  async create({ tenant, organization, company_uuid }) {
    return db
      .query(
        `INSERT INTO supplier_user(supplier_tenant,
                                 supplier_organization,
                                 supplier_company_uuid)
       VALUES ($1, $2, $3) RETURNING *`,
        [tenant, organization, company_uuid]
      )
      .then(Result.one);
  },

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

module.exports = Supplier;
