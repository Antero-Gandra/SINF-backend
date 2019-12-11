const JoiParty = require("./joi/Party");
const common = require("./common");

// https://jasminsoftware.github.io/businesscore.parties.html
const Party = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/businessCore/parties`;

  return {
    ...common({ url, schema: JoiParty })
  };
};

module.exports = Party;
