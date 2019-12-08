const { Pool } = require("pg");

const pool =
  process.env.NODE_ENV === "production"
    ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: true })
    : new Pool({ ssl: false });

module.exports = pool;
