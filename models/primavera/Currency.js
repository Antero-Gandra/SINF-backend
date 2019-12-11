const JoiCurrency = require("./joi/Currency");
const common = require("./common");

// https://jasminsoftware.github.io/corepatterns.currencies.html
const Currency = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/corePatterns/currencies`;

  return {
    ...common({ url, schema: JoiCurrency })
  };
};

module.exports = Currency;
