const Joi = require("@hapi/joi");
const { ItemType } = require("./common");

/**
 * Validator for required fields of ItemResource
 * GET /businessCore/items
 */
const Item = Joi.object({
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

  brandModel: Joi.string().optional().empty(null), // BrandModel
  brandModelId: Joi.string().optional().empty(null),

  assortment: Joi.string().optional().empty(null), // Assortment
  assortmentId: Joi.string().uuid().optional().empty(null),

  image: Joi.string().uri().optional().empty(null),
  imageThumbnail: Joi.string().uri().optional().empty(null),
}).required().options({ presence: "required" }).unknown(true);

module.exports = Item;
