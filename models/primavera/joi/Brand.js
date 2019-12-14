const Joi = require("@hapi/joi");
const { } = require("./common");

/**
 * Validator for required fields of BrandResource
 * GET /businessCore/brands
 */
const Brand = Joi.object({
  id: Joi.string().uuid(),
  brandKey: Joi.string(), // PRIMARY KEY Brand

  description: Joi.string().optional().allow(null),
  picture: Joi.string().uri().optional().allow(null),
  remarks: Joi.string().optional().allow(null),

  isExternallyManaged: Joi.boolean(),
}).required().options({ presence: "required" }).unknown(true);

module.exports = Brand;
