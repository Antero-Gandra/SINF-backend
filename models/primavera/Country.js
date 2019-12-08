const Joi = require("@hapi/joi");
const { } = require("./Core");

/**
 * Validator for required fields of CountryResource
 * GET /corePatterns/countries
 */
const Country = Joi.strict({
  id: Joi.string().uuid(),
  countryKey: Joi.string(), // PRIMARY KEY Country

  culture: Joi.string(), // Culture
  cultureId: Joi.string().uuid(),

  name: Joi.string(),
  eU: Joi.boolean(), // is EU member
  isExternallyManaged: Joi.boolean(),
});

module.exports = Country;
