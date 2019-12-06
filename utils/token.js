const { api, auth } = require("./endpoints");

const RETRY_ON_ERROR = true;
const RETRY_DELAY = 120;

const tokenRequestData = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  grant_type: "client_credentials",
  scope: "application"
};

function printToken(token) {
  const lo = token.substring(0, 10);
  const hi = token.substring(token.length - 10);
  console.log("Access Token: Bearer %s...%s", lo, hi);
}

function setToken(token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  printToken(token);
}

function destroyToken() {
  delete api.defaults.headers["Authorization"];
}

async function requestToken() {
  return auth
    .post("/connect/token", tokenRequestData)
    .then(res => {
      const { access_token, expires_in } = res.data;
      setToken(access_token);
      const wait = expires_in > 180 ? expires_in - 180 : expires_in;
      setTimeout(requestToken, wait * 1000);
      return res;
    })
    .catch(err => {
      console.error("Error fetching token: %s", err.message);
      destroyToken();
      if (RETRY_ON_ERROR) setTimeout(requestToken, RETRY_DELAY * 1000);
      return Promise.reject(err);
    });
}

function register() {
  const handler = api.interceptors.response.use(
    originalResponse => originalResponse,
    originalError => {
      const { status, config } = originalError.response;

      if (status !== 401) {
        return Promise.reject(originalError);
      }

      api.interceptors.response.eject(handler);
      destroyToken();

      return requestToken()
        .then(_ => api(config))
        .finally(register);
    }
  );
}

requestToken();
register();

module.exports = { requestToken };
