const JoiPaymentTerm = require("./joi/PaymentTerm");
const common = require("./common");

const PaymentTerm = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/financialCore/paymentTerms`;

  return {
    ...common({ url, schema: JoiPaymentTerm })
  };
};

module.exports = PaymentTerm;
