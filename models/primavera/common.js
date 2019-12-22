const Joi = require("@hapi/joi");
const { api } = require("../../utils/endpoints");
const qs = require("qs");

const JoiSchema = Joi.object().schema();

const check = ({ schema, url }) => {
  const ok = JoiSchema.validate(schema);
  if (ok.error) throw ok.error;

  return {
    one: where => data => {
      const result = schema.validate(data);
      if (result.error) {
        const detail = result.error.details[0];
        console.error("Schema error in %s %s:\n%o", where, url, detail);
      }
      return data;
    },

    many: where => data => {
      for (const item of data) {
        const result = schema.validate(item);
        if (result.error) {
          const detail = result.error.details[0];
          console.error("Schema error in %s %s:\n%o", where, url, detail);
          break;
        }
      }
      return data;
    },

    empty: where => response => {
      // Various acceptable cases
      if (response.data === null || response.data === undefined) {
        return response;
      }
      const type = typeof response.data;
      if (type === "string" && response.data === "") {
        return response;
      }
      if (type === "object" && Object.keys(response.data).length === 0) {
        return response;
      }
      console.error(
        "Schema error in %s %s:\nExpected empty response but found:\n",
        where,
        url,
        response.data
      );
      return response;
    }
  };
};

const common = ({ url, schema }) => {
  const expect = check({ schema, url });

  const log = error => {
    console.error("API ERROR [%d] at %s:\n%o", error.status, url, error);
    return null;
  };

  return {
    url,
    schema,

    /**
     * @param {string} id
     * @returns Promise<Resource?>
     */
    async get(id) {
      return api
        .get(`${url}/${id}`)
        .then(response => response.data)
        .then(expect.one(`GET ${id}`))
        .catch(error => {
          if (error.status === 404) return null;
          return log(error);
        });
    },

    /**
     * @returns Promise<Resource[]>
     */
    async all() {
      return api
        .get(url)
        .then(response => response.data)
        .then(expect.many("ALL"))
        .catch(log);
    },

    /**
     * @param {Object} params - Odata query parameters
     * @returns Promise<Resource[]>
     */
    async odata(params) {
      return api
        .get(`${url}/odata`, { params })
        .then(response => response.data.items)
        .then(expect.many(`ODATA ${qs.stringify(params)}`))
        .catch(log);
    },

    /**
     * @param {any} data - Data that describes the new resource
     * @returns Promise<UUID>
     */
    async create(data) {
      return api.post(url, data).catch(log);
    },

    /**
     * @param {string} id - The existing resource id or natural key
     * @param {string} field - A field in the existing resource
     * @param {any} data - Data that describes the new field's value
     * @returns Promise<void>
     */
    async update(id, field, data) {
      return api
        .put(`${url}/${id}/${field}`, data)
        .then(expect.empty(`UPDATE ${id}/${field}`))
        .catch(log);
    },

    /**
     * @param {string} id - The existing resource id or natural key
     * @returns Promise<void>
     */
    async delete(id) {
      return api
        .delete(`${url}/${id}`)
        .then(expect.empty(`DELETE ${id}`))
        .catch(log);
    }
  };
};

module.exports = common;
