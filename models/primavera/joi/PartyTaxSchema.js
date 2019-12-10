const Joi = require("@hapi/joi");
const { } = require("./common");

/**
 * Validator for required fields of resource PartyTaxSchemaResource
 * GET /taxesCore/partyTaxSchemas
 */
const PartyTaxSchema = Joi.object({
  id: Joi.string().uuid(),
  taxCodeGroupKey: Joi.string(), // PRIMARY KEY PartyTaxSchema
  description: Joi.string().optional().empty(null).empty('').default(''),

  // ...
}).required().options({ presence: "required" }).unknown(true);

module.exports = PartyTaxSchema;
