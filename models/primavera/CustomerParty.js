const JoiCustomerParty = require("./joi/CustomerParty");
const common = require("./common");

// https://jasminsoftware.github.io/salescore.customerparties.html
const CustomerParty = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/salesCore/customerParties`;

  return {
    ...common({ url, schema: JoiCustomerParty.extended })
  };
};

module.exports = CustomerParty;
