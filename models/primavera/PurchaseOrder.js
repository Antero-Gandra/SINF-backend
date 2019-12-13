const JoiPurchaseOrder = require("./joi/PurchaseOrder");
const common = require("./common");

// https://jasminsoftware.github.io/purchases.orders.html
const PurchaseOrder = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/purchases/orders`;

  return {
    ...common({ url, schema: JoiPurchaseOrder })
  };
};

module.exports = PurchaseOrder;
