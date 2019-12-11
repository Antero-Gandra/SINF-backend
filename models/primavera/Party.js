const JoiParty = require("./joi/Party");
const common = require("./common");

const Party = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/businessCore/parties`;

  return {
    ...common({ url, schema: JoiParty })
  };
};

module.exports = Party;
