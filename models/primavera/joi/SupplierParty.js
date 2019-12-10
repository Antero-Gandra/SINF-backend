const Joi = require("@hapi/joi");
const { } = require("./common");
const Party = require("./Party");

/**
 * Validator for required fields of SupplierPartyResource
 * GET /purchasesCore/supplierParties[/extension]
 */
const SupplierParty = Joi.object({
  id: Joi.string().uuid(),
  partyKey: Joi.string(), // PRIMARY KEY SupplierParty

  supplierGroup: Joi.string(), // SupplierGroup
  supplierGroupId: Joi.string().uuid(),
  // customerGroup: Joi.string(), // CustomerGroup
  // customerGroupId: Joi.string().uuid(),

  paymentMethod: Joi.string(), // PaymentMethod
  paymentMethodId: Joi.string().uuid(),

  paymentTerm: Joi.string(), // PaymentTerm
  paymentTermId: Joi.string().uuid(),

  deliveryTerm: Joi.string(), // DeliveryTerm
  deliveryTermId: Joi.string().uuid(),

  partyTaxSchema: Joi.string(), // PartyTaxSchema
  partyTaxSchemaId: Joi.string().uuid(),

  accountingParty: Joi.string().optional().allow(null), // Party
  accountingPartyId: Joi.string().uuid().optional().allow(null),

  // accountingSchema: AccountingSchema,
  locked: Joi.boolean(),

  // oneTimeCustomer: Joi.boolean(),
  // endCustomer: Joi.boolean(),

  supplierItemPrices: Joi.array().optional().allow(null), // SupplierItemPrice
  // priceList: Joi.string().optional().allow(null),
  // priceListId: Joi.string().uuid().optional().allow(null),
}).required().options({ presence: "required" }).unknown(true);

SupplierParty.extended = Party.concat(SupplierParty);

module.exports = SupplierParty;
