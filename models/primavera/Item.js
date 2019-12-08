const Joi = require("@hapi/joi");
const { ItemType } = require("./Core");

/**
 * Validator for required fields of ItemResource
 * GET /businessCore/items
 */
const Item = Joi.strict({
  id: Joi.string().uuid(),
  itemKey: Joi.string(), // PRIMARY KEY Item
  description: Joi.string().optional().empty(null),

  baseUnit: Joi.string(), // Unit
  baseUnitId: Joi.string().uuid(),

  itemType: ItemType,
  isExternallyManaged: Joi.boolean(),

  externalId: Joi.string().optional().empty(Joi.allow(null, "")),
  externalVersion: Joi.string().optional().empty(Joi.allow(null, "")),

  brand: Joi.string().optional().empty(null), // Brand
  brandId: Joi.string().uuid().optional().empty(null),

  image: Joi.string().uri().optional().empty(null),
  imageThumbnail: Joi.string().uri().optional().empty(null),
});

module.exports = Item;
