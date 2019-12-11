const JoiSalesItem = require("./joi/SalesItem");
const common = require("./common");

const SalesItem = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/salesCore/salesItems`;

  return {
    ...common({ url, schema: JoiSalesItem })
  };
};

module.exports = SalesItem;
