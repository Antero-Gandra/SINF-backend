const Joi = require("@hapi/joi");
const { api } = require("../../utils/endpoints");

const JoiSchema = Joi.object().schema();

const check = ({ schema, url }) => {
  const ok = JoiSchema.validate(schema);
  if (ok.error) throw ok.error;

  return {
    one(data) {
      const result = schema.validate(data);
      if (result.error) {
        const detail = result.error.details[0];
        console.error("Schema error in %s:\n%o", url, detail);
      }
      return data;
    },

    many(data) {
      for (item in data) {
        const result = schema.validate(item);
        if (result.error) {
          const detail = result.error.details[0];
          console.error("Schema error in %s:\n%o", url, detail);
          break;
        }
      }
      return data;
    }
  };
};

const common = ({ url, schema }) => {
  const expect = check({ schema, url });

  return {
    url,

    async get(id) {
      return api
        .get(`${url}/${id}`)
        .then(response => response.data)
        .then(expect.one)
        .catch(error => {
          if (error.status === 404) return null;
          return Promise.reject(error);
        });
    },

    async all() {
      return api
        .get(url)
        .then(response => response.data)
        .then(expect.many);
    },

    async query(params) {
      return api
        .get(`${url}/odata`, { params })
        .then(response => response.data.items)
        .then(expect.many);
    },

    async create(data) {
      return api.post(url, data);
    },

    async update(id, field, data) {
      return api.put(`${url}/${id}/${field}`, data);
    },

    async delete(id) {
      return api
        .delete(`${url}/${id}`)
        .then(response => response.data)
        .then(expect.one);
    }
  };
};

module.exports = common;
