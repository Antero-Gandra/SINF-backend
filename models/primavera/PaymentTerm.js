const Joi = require("@hapi/joi");
const { } = require("./Core");

/**
 * Validator for required fields of PaymentTermResource
 * GET /financialCore/paymentTerms
 */
const PaymentTerm = Joi.object({
  id: Joi.string().uuid(),
  paymentTermKey: Joi.string(), // PRIMARY KEY PaymentTerm
  description: Joi.string(),

  useInAccountsReceivable: Joi.boolean(),
  useInAccountsPayable: Joi.boolean(),
  daysFromReferenceDate: Joi.number().integer().min(0),

  validFrom: Joi.date().optional().empty(null),
  validTo: Joi.date().optional().empty(null),
}).required().options({ presence: "required" }).unknown(true);

module.exports = PaymentTerm;
