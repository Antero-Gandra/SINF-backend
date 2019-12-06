const axios = require("axios").default;
const qs = require("qs");

const PRIMAVERA_AUTH_BASE_URL = "https://identity.primaverabss.com";
const PRIMAVERA_API_BASE_URL = "https://my.jasminsoftware.com/api";

const auth = axios.create({
  baseURL: PRIMAVERA_AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  transformRequest: data => {
    return qs.stringify(data);
  }
});

const api = axios.create({
  baseURL: PRIMAVERA_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 30000
});

module.exports = { auth, api };
