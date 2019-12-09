const db = require("../../database");
const Result = require("./result");

const SecretRegistry = {
  async get(secret_key) {
    return db
      .query(
        `SELECT * FROM secret_registry
         WHERE secret_key = $1`,
        [secret_key]
      )
      .then(Result.one);
  },

  async generate({ brand_id }) {
    return db
      .query(
        `INSERT INTO secret_registry(brand_id)
         VALUES ($1)`,
        [brand_id]
      )
      .then(Result.one);
  },

  async delete(secret_key) {
    return db
      .query(
        `DELETE * FROM secret_registry
         WHERE secret_key = $1`,
        [secret_key]
      )
      .then(Result.count);
  }
};

module.exports = SecretRegistry;
