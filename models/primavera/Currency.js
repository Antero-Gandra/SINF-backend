const JoiCurrency = require("./joi/Currency");
const common = require("./common");

const Currency = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/corePatterns/currencies`;

  return {
    ...common({ url, schema: JoiCurrency })
  };
};

module.exports = Currency;
