const JoiSalesItem = require("./joi/SalesItem");
const common = require("./common");

// https://jasminsoftware.github.io/salescore.salesitems.html
const SalesItem = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/salesCore/salesItems`;

  return {
    ...common({ url, schema: JoiSalesItem.extended })
  };
};

module.exports = SalesItem;
