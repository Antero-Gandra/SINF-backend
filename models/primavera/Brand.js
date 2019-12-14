const JoiBrand = require("./joi/Brand");
const common = require("./common");

// https://jasminsoftware.github.io/businesscore.brands.html
const Brand = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/businessCore/brands`;

  return {
    ...common({ url, schema: JoiBrand, name: "Brand" })
  };
};

module.exports = Brand;
