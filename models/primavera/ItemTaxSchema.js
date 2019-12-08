const Joi = require("@hapi/joi");
const { } = require("./Core");

/**
 * Validator for required fields of ItemTaxSchemaResource
 * GET /taxesCore/itemTaxSchemas
 */
const ItemTaxSchema = Joi.strict({
  id: Joi.string().uuid(),
  taxCodeItemGroupKey: Joi.string(), // PRIMARY KEY ItemTaxSchema
  description: Joi.string().optional().empty(null).empty('').default(''),

  isExternallyManaged: Joi.boolean(),

  // ...
});

module.exports = ItemTaxSchema;
