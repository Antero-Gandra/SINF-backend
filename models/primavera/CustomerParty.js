const JoiCustomerParty = require("./joi/CustomerParty");
const common = require("./common");

const CustomerParty = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/salesCore/customerParties`;

  return {
    ...common({ url, schema: JoiCustomerParty })
  };
};

module.exports = CustomerParty;
