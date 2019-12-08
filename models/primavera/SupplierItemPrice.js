const Joi = require("@hapi/joi");
const {
  Amount,
  AmountObject,
  Decimal,
} = require("./Core");

/**
 * Validator for required fields of CustomerPartyResource
 * SupplierParty.supplierItemPrices[]
 */
const SupplierItemPrice = Joi.strict({
  id: Joi.string().uuid(),

  supplierPartyId: Joi.string().uuid(), // SupplierParty

  currency: Joi.string(), // Currency
  currencyId: Joi.string().uuid(),

  unit: Joi.string(), // Unit
  unitId: Joi.string().uuid(),

  item: Joi.string(), // Item
  itemId: Joi.string().uuid(),

  price: AmountObject,
  priceAmount: Amount,
  lastPrice: AmountObject,
  lastPriceAmount: Amount,
});

module.exports = SupplierParty;
