const Joi = require("@hapi/joi");
const { } = require("./common");
const Party = require("./Party");

// 1=Accrual, 2=Cash
const AccountingSchema = Joi.number().integer().valid(1, 2);

/**
 * Validator for required fields of CustomerPartyResource
 * GET /salesCore/customerParties[/extension]
 */
const CustomerParty = Joi.object({
  id: Joi.string().uuid(),
  partyKey: Joi.string(), // PRIMARY KEY CustomerParty

  // supplierGroup: Joi.string(),
  // supplierGroupId: Joi.string().uuid(),
  customerGroup: Joi.string(), // CustomerGroup
  customerGroupId: Joi.string().uuid(),

  paymentMethod: Joi.string(), // PaymentMethod
  paymentMethodId: Joi.string().uuid(),

  paymentTerm: Joi.string(), // PaymentTerm
  paymentTermId: Joi.string().uuid(),

  deliveryTerm: Joi.string().optional().allow(null), // DeliveryTerm
  deliveryTermId: Joi.string().uuid().optional().allow(null),

  partyTaxSchema: Joi.string(), // PartyTaxSchema
  partyTaxSchemaId: Joi.string().uuid(),

  accountingParty: Joi.string().optional().allow(null), // Party
  accountingPartyId: Joi.string().uuid().optional().allow(null),

  accountingSchema: AccountingSchema,
  locked: Joi.boolean(),

  oneTimeCustomer: Joi.boolean(),
  endCustomer: Joi.boolean(),

  priceList: Joi.string().optional().allow(null), // PriceList
  priceListId: Joi.string().uuid().optional().allow(null),
}).required().options({ presence: "required" }).unknown(true);

CustomerParty.extended = Party.concat(CustomerParty);

module.exports = CustomerParty;
