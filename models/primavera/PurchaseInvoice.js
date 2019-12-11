const JoiPurchaseInvoice = require("./joi/PurchaseInvoice");
const common = require("./common");

const PurchaseInvoice = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/invoiceReceipt/invoices`;

  return {
    ...common({ url, schema: JoiPurchaseInvoice })
  };
};

module.exports = PurchaseInvoice;
