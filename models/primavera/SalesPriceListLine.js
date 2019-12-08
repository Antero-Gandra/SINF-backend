const Joi = require("@hapi/joi");
const {
  AmountObject,
  Amount
} = require("./common");

/**
 * Validator for required fields of PriceListLineResource
 * SalesItem.priceListLines[]
 */
const SalesPriceListLine = Joi.object({
  unit: Joi.string(), // Unit
  unitId: Joi.string().uuid(),

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

  priceAmount: AmountObject,
  priceAmountAmount: Amount,

  priceList: Joi.string().optional(), // PriceList
}).required().options({ presence: "required" }).unknown(true);

module.exports = SalesPriceListLine;
