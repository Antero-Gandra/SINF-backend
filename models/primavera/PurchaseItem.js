const Joi = require("@hapi/joi");
const {
  Amount,
  AmountObject
} = require("./Core");
const Item = require("./Item");

/**
 * Validator for required fields of PurchasesItemResource
 * GET /purchasesCore/purchasesItems[/extension]
 */
const PurchaseItem = Joi.object({
  id: Joi.string().uuid(),
  itemKey: Joi.string(), // PRIMARY KEY PurchaseItem

  unit: Joi.string(), // Unit
  unitId: Joi.string().uuid(),

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

  itemTaxSchema: Joi.string(), // ItemTaxSchema
  itemTaxSchemaId: Joi.string().uuid(),

  expenseAccount: Joi.string(), // Account
  expenseAccountId: Joi.string().uuid(),
  // incomeAccount: Joi.string(),
  // incomeAccountId: Joi.string().uuid(),

  lastPrice: AmountObject,
  lastPriceAmount: Amount,

  // priceListLines: Joi.array()...
}).required().options({ presence: "required" }).unknown(true);

PurchaseItem.extended = Item.concat(PurchaseItem);

module.exports = PurchaseItem;
