const Joi = require("@hapi/joi");
const { } = require("./Core");

/**
 * Validator for required fields of ItemTaxSchemaResource
 * GET /taxesCore/itemTaxSchemas
 */
const ItemTaxSchema = Joi.object({
  id: Joi.string().uuid(),
  taxCodeItemGroupKey: Joi.string(), // PRIMARY KEY ItemTaxSchema
  description: Joi.string().optional().empty(null).empty('').default(''),

  isExternallyManaged: Joi.boolean(),

  // ...
}).required().options({ presence: "required" }).unknown(true);

module.exports = ItemTaxSchema;
