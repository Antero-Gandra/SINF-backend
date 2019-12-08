const Joi = require("@hapi/joi");
const { } = require("./Core");

const PartyTaxSchema = Joi.strict({
  id: Joi.string().uuid(),
  taxCodeGroupKey: Joi.string(), // PRIMARY KEY PartyTaxSchema
  description: Joi.string().optional().empty(null).empty('').default(''),

  // ...
});

module.exports = PartyTaxSchema;
