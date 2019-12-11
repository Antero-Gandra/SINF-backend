const Joi = require("@hapi/joi");
const { api } = require("../../utils/endpoints");

const JoiSchema = Joi.object().schema();

const check = schema => {
  const ok = JoiSchema.validate(schema);
  if (ok.error) throw ok.error;

  return {
    one(response) {
      const result = schema.validate(response);
      if (result.error) {
        console.error("API Schema error: %o", result.error.details[0]);
      }
      return response;
    },

    many(response) {
      for (item in response) {
        const result = schema.validate(response);
        if (result.error) {
          console.error("API Schema error: %o", result.error.details[0]);
          break;
        }
      }
      return response;
    }
  };
};

const common = ({ url, schema }) => {
  const expect = check(schema);

  return {
    async get(id) {
      return api
        .get(`${url}/${id}`)
        .then(expect.one)
        .catch(error => {
          if (error.status === 404) return null;
          return Promise.reject(error);
        });
    },

    async all() {
      return api.get(url).then(expect.many);
    },

    async query(params) {
      return api
        .get(`${url}/odata`, params)
        .then(response => response.items)
        .then(expect.many);
    },

    async create(data) {
      const result = schema.validate(data);
      if (result.error) throw result.error;
      return api.post(url, result.value);
    },

    async update(id, field, data) {
      return api.put(`${url}/${id}/${field}`, data);
    }
  };
};

module.exports = { common };
