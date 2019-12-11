const JoiPurchaseInvoice = require("./joi/PurchaseInvoice");
const common = require("./common");

// https://jasminsoftware.github.io/invoicereceipt.invoices.html
const PurchaseInvoice = ({ tenant, organization }) => {
  const url = `/${tenant}/${organization}/invoiceReceipt/invoices`;

  return {
    ...common({ url, schema: JoiPurchaseInvoice })
  };
};

module.exports = PurchaseInvoice;
