const JoiSalesOrder = require("./joi/SalesOrder");
const common = require("./common");

// https://jasminsoftware.github.io/sales.orders.html
const SalesOrder = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/sales/orders`;

  return {
    ...common({ url, schema: JoiSalesOrder })
  };
};

module.exports = SalesOrder;
