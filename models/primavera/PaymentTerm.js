const JoiPaymentTerm = require("./joi/PaymentTerm");
const common = require("./common");

// https://jasminsoftware.github.io/financialcore.paymentterms.html
const PaymentTerm = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/financialCore/paymentTerms`;

  return {
    ...common({ url, schema: JoiPaymentTerm })
  };
};

module.exports = PaymentTerm;
