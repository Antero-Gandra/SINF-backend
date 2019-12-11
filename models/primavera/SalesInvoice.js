const JoiSalesInvoice = require("./joi/SalesInvoice");
const common = require("./common");

const SalesInvoice = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/billing/invoices`;

  return {
    ...common({ url, schema: JoiSalesInvoice })
  };
};

module.exports = SalesInvoice;
