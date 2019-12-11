const JoiPartyTaxSchema = require("./joi/PartyTaxSchema");
const common = require("./common");

const PartyTaxSchema = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/taxesCore/partyTaxSchemas`;

  return {
    ...common({ url, schema: JoiPartyTaxSchema })
  };
};

module.exports = PartyTaxSchema;
