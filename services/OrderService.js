const APISalesOrder = require("../models/primavera/SalesOrder");
const APIPurchaseOrder = require("../models/primavera/PurchaseOrder");
const Orders = require("../models/techsinf/Orders");
const SPItem = require("../models/techsinf/SPItem");

const ORDER_NOT_FOUND = "The order does not exist";
const ORDER_ACCEPTED_OR_REJECTED =
  "The order has already been accepted or rejected";
const WITHDRAWN_PURCHASE_ORDER =
  "The customer has withdrawn his purchase order";
const FAILED_CREATE_SALES_ORDER = "Could not create sales order in Jasmin";

/**
 * Service responsible for generating Sales Orders from Purchase Orders
 *
 * Not async safe (data races are present, can fix later after MVP)
 */
const OrderService = {
  async rejectPurchaseOrder({ order_id }) {
    const order = await Orders.get(order_id);
    if (!order) {
      return { error: ORDER_NOT_FOUND, status: 404 };
    }
    if (order.stage !== Orders.stages.PURCHASE_ORDER) {
      return { error: ORDER_ACCEPTED_OR_REJECTED, status: 400 };
    }

    const count = await Orders.reject(order_id);
    return count > 0 ? true : false;
  },

  // supplier: {tenant, organization, company_uuid}
  async acceptPurchaseOrder({ supplier, order_id }) {
    const order = await Orders.get(order_id);
    if (!order) {
      return { error: ORDER_NOT_FOUND, status: 404 };
    }
    if (order.stage !== Orders.stages.PURCHASE_ORDER) {
      return { error: ORDER_ACCEPTED_OR_REJECTED, status: 400 };
    }

    const purchaseOrder = await APIPurchaseOrder.get(order.purchase_order_uuid);
    if (!purchaseOrder) {
      Orders.delete(order_id);
      return { error: WITHDRAWN_PURCHASE_ORDER, status: 404 };
    }

    // Get all sales items ids
    const salesItemsMap = SPItem.mapSalesItems({
      subscription_id: order.subscription_id,
      purchases_items_uuids: purchaseOrder.documentLines.map(
        line => line.purchasesItemId
      )
    });

    // PURCHASE ORDER ==> SALES ORDER
    const salesOrder = {
      // serie: "DEFAULT-ORDER", // TODO
      buyerCustomerParty: order.customer_company_name,
      company: supplier.company_name, // TODO
      remarks: purchaseOrder.remarks,
      documentLines: purchaseOrder.documentLines.map(line => ({
        quantity: line.quantity,
        unitPrice: line.unitPrice, // TODO VERIFY
        deliveryDate: line.deliveryDate,
        salesItem: salesItemsMap[line.purchasesItemId]
      }))
    };

    const uuid = await APISalesOrder(supplier).create(salesOrder);
    if (!uuid) {
      return { error: FAILED_CREATE_SALES_ORDER, status: 500 };
    }

    const count = Orders.accept({ order_id, sales_order_uuid: uuid });
    return count > 0 ? true : false;
  }
};

Object.freeze(OrderService);

module.exports = OrderService;
