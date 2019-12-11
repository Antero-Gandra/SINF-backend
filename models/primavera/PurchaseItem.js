const JoiPurchaseItem = require("./joi/PurchaseItem");
const common = require("./common");

const PurchaseItem = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/purchasesCore/purchasesItems`;

  return {
    ...common({ url, schema: JoiPurchaseItem })
  };
};

module.exports = PurchaseItem;
