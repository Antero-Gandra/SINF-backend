const Joi = require("@hapi/joi");
const { } = require("./common");
const SalesPriceListLine = require("./SalesPriceListLine");
const Item = require("./Item");

/**
 * Validator for required fields of SalesItemResource
 * GET /salesCore/salesItems[/extension]
 */
const SalesItem = Joi.object({
  id: Joi.string().uuid(),
  itemKey: Joi.string(), // PRIMARY KEY SalesItem

  unit: Joi.string(), // Unit
  unitId: Joi.string().uuid(),

  // currency: Joi.string(),
  // currencyId: Joi.string().uuid(),

  itemTaxSchema: Joi.string(), // ItemTaxSchema
  itemTaxSchemaId: Joi.string().uuid(),

  // expenseAccount: Joi.string(),
  // expenseAccountId: Joi.string().uuid(),
  incomeAccount: Joi.string(), // Account,
  incomeAccountId: Joi.string().uuid(),

  // lastPrice: AmountObject,
  // lastPriceAmount: Amount,

  priceListLines: Joi.array().items(SalesPriceListLine).optional().allow(null),
}).required().options({ presence: "required" }).unknown(true);

SalesItem.extended = Item.concat(SalesItem);

module.exports = SalesItem;
