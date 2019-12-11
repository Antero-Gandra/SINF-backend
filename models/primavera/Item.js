const JoiItem = require("./joi/Item");
const common = require("./common");

const Item = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/businessCore/items`;

  return {
    ...common({ url, schema: JoiItem })
  };
};

module.exports = Item;
