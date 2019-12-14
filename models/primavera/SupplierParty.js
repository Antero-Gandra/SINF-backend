const JoiSupplierParty = require("./joi/SupplierParty");
const { common } = require("./common");

// https://jasminsoftware.github.io/purchasescore.supplierparties.html
const SupplierParty = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/purchasesCore/supplierParties`;

  return {
    ...common({ url, schema: JoiSupplierParty.extended })
  };
};

module.exports = SupplierParty;
