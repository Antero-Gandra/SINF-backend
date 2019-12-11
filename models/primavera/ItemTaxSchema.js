const JoiItemTaxSchema = require("./joi/ItemTaxSchema");
const common = require("./common");

// https://jasminsoftware.github.io/taxescore.itemtaxschemas.html
const ItemTaxSchema = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/taxesCore/ItemTaxSchemas`;

  return {
    ...common({ url, schema: JoiItemTaxSchema })
  };
};

module.exports = ItemTaxSchema;
