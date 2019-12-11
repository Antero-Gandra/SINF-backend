const JoiPaymentMethod = require("./joi/PaymentMethod");
const common = require("./common");

const PaymentMethod = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/financialCore/paymentMethods`;

  return {
    ...common({ url, schema: JoiPaymentMethod })
  };
};

module.exports = PaymentMethod;
