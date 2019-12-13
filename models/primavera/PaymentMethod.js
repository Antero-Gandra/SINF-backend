const JoiPaymentMethod = require("./joi/PaymentMethod");
const common = require("./common");

// https://jasminsoftware.github.io/financialcore.paymentmethods.html
const PaymentMethod = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/financialCore/paymentMethods`;

  return {
    ...common({ url, schema: JoiPaymentMethod })
  };
};

module.exports = PaymentMethod;
