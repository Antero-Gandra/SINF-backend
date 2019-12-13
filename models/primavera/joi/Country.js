const Joi = require("@hapi/joi");
const { } = require("./common");

/**
 * Validator for required fields of CountryResource
 * GET /corePatterns/countries
 */
const Country = Joi.object({
  id: Joi.string().uuid(),
  countryKey: Joi.string(), // PRIMARY KEY Country

  culture: Joi.string(), // Culture
  cultureId: Joi.string().uuid(),

  name: Joi.string(),
  eU: Joi.boolean(), // is EU member
  isExternallyManaged: Joi.boolean(),
}).required().options({ presence: "required" }).unknown(true);

module.exports = Country;
