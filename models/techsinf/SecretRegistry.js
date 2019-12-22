const db = require("../../database");
const Result = require("./result");

const SecretRegistry = {
  // Get the registry for the given secret_key. Remember to check the returned brand.
  async find(secret_key) {
    return db
      .query(
        `SELECT * FROM secret_registry
         WHERE secret_key = $1`,
        [secret_key]
      )
      .then(Result.one);
  },

  // Generate a new secret key for the given brand.
  async generate(brand_id) {
    return db
      .query(
        `INSERT INTO secret_registry(brand_id)
         VALUES ($1) RETURNING *`,
        [brand_id]
      )
      .then(Result.one);
  },

  // Delete the given secret key.
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

Object.freeze(SecretRegistry);

module.exports = SecretRegistry;
