const Joi = require("@hapi/joi");
const { } = require("./Core");

// Cash, Check, PayPal, Other, BankTransfer, DirectDebit
const PaymentMethodType = Joi.number().integer().valid(1, 2, 5, 4, 6, 7);

/**
 * Validator for required fields of PaymentMethodResource
 * GET /financialCore/paymentMethods
 */
const PaymentMethod = Joi.object({
  id: Joi.string().uuid(),
  paymentMethodsKey: Joi.string(), // PRIMARY KEY PaymentMethod
  description: Joi.string().optional().empty(null),

  isAvailableInSales: Joi.boolean(),
  isAvailableInPurchases: Joi.boolean(),
  isAllowedInPettyCash: Joi.boolean(),
  isAllowedInFinancialAccount: Joi.boolean(),
  isAvailableInOnLineStore: Joi.boolean(),
  balanceManaged: Joi.boolean(),

  valueDateOffset: Joi.number().integer().min(0),
  paymentMethodType: PaymentMethodType,
  isEft: Joi.boolean(), // is electronic funds transfer
}).required().options({ presence: "required" }).unknown(true);

module.exports = PaymentMethod;
