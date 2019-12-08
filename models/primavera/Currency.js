const Joi = require("@hapi/joi");
const { DecimalPlaces } = require("./Core");

/**
 * Validator for required fields of CurrencyResource
 * GET /corePatterns/currencies
 */
const Currency = Joi.strict({
  id: Joi.string().uuid(), // Currency
  currencyKey: Joi.string(), // PRIMARY KEY Currency

  description: Joi.string(),
  currencyUnit: Joi.string(),
  isoCode: Joi.string(),
  symbol: Joi.string(),
  fractionDigits: DecimalPlaces,
  isExternallyManaged: Joi.boolean(),

  currencySubUnit: Joi.string().optional().allow(""),
  validFrom: Joi.date().optional(),
  validTo: Joi.date().optional(),
  pricesFractionDigits: DecimalPlaces.optional(),
});

module.exports = Currency;
