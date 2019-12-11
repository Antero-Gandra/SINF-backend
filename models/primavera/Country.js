const JoiCountry = require("./joi/Country");
const common = require("./common");

const Country = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/corePatterns/countries`;

  return {
    ...common({ url, schema: JoiCountry, name: "Country" })
  };
};

module.exports = Country;
