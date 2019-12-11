const JoiSupplierParty = require("./joi/SupplierParty");
const { common } = require("./common");

const SupplierParty = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/purchasesCore/supplierParties`;

  return {
    ...common({ url, schema: JoiSupplierParty })
  };
};

module.exports = SupplierParty;
