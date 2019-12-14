const JoiPurchaseItem = require("./joi/PurchaseItem");
const common = require("./common");

// https://jasminsoftware.github.io/purchasescore.purchasesitems.html
const PurchaseItem = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/purchasesCore/purchasesItems`;

  return {
    ...common({ url, schema: JoiPurchaseItem.extended })
  };
};

module.exports = PurchaseItem;
