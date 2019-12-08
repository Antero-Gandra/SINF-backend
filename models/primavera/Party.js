const Joi = require("@hapi/joi");
const { } = require("./Core");

/**
 * Validator for required fields of PartyResource
 * GET /businessCore/parties
 */
const Party = Joi.strict({
  id: Joi.string().uuid(),
  partyKey: Joi.string(), // PRIMARY KEY Party
  name: Joi.string(),
  isPerson: Joi.boolean(),

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

  country: Joi.string(), // Country
  countryId: Joi.string().uuid(),

  isExternallyManaged: Joi.boolean(),

  partyAddresses: Joi.array().optional(),
  partyContacts: Joi.array().optional(),
  address: Joi.string().optional().empty(null), // Address
  contact: Joi.string().optional().empty(null), // Contact
  culture: Joi.string().optional().empty(null), // Culture
});

module.exports = Party;
