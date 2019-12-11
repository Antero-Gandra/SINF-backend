const JoiPurchaseOrder = require("./joi/PurchaseOrder");
const common = require("./common");

const PurchaseOrder = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/purchases/orders`;

  return {
    ...common({ url, schema: JoiPurchaseOrder })
  };
};

module.exports = PurchaseOrder;
