const JoiItemTaxSchema = require("./joi/ItemTaxSchema");
const common = require("./common");

const ItemTaxSchema = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/taxesCore/ItemTaxSchemas`;

  return {
    ...common({ url, schema: JoiItemTaxSchema })
  };
};

module.exports = ItemTaxSchema;
