const APIBrand = require("../models/primavera/Brand");
const APISalesItem = require("../models/primavera/SalesItem");
const Brand = require("../models/techsinf/Brand");
const SalesItem = require("../models/techsinf/SalesItem");

/**
 * NOTE: This whole thing is prone to data races if the supplier has two windows open
 */

/**
 * Given a supplier, one of its jasmin brands, and the corresponding db brand,
 * add all new sales items to our database.
 *
 * TODO: discard removed sales items?
 */
const syncKnownBrand = async (supplier, jasminBrand, dbBrand) => {
  const brand_id = dbBrand.brand_id;

  const [jasminItems, dbItems] = await Promise.all([
    APISalesItem(supplier).odata({ $filter: `BrandId eq ${jasminBrand.id}` }),
    SalesItem.allBrand(dbBrand.brand_id).then(SalesItem.mapSalesItemUUID)
  ]);

  const promises = jasminItems.map(jasminItem => {
    const sales_item_uuid = jasminItem.id;
    if (sales_item_uuid in dbItems) continue;
    return SalesItem.create({ brand_id, sales_item_uuid });
  });

  return await Promise.all(promises);
};

/**
 * Given a supplier and a new jasmin brand without a matching db brand,
 * create the new brand in our database and add all sales items.
 *
 * TODO: discard removed sales items?
 */
const syncUnknownBrand = async (supplier, jasminBrand) => {
  const supplier_id = supplier.user_id;
  const brand_uuid = jasminBrand.id;
  const brand_name = jasminBrand.name;

  const [jasminItems, dbBrand] = await Promise.all([
    APISalesItem(supplier).odata({ $filter: `BrandId eq ${jasminBrand.id}` }),
    Brand.create({ supplier_id, brand_uuid, brand_name })
  ]);

  const brand_id = dbBrand.brand_id;

  const promises = jasminItems.map(jasminItem => {
    const sales_item_uuid = jasminItem.id;
    return SalesItem.create({ brand_id, sales_item_uuid });
  });

  return await Promise.all(promises);
};

const SyncService = {
  // Sync brands of this supplier
  // supplier: {user_id, tenant, organization, company_uuid}
  async brands(supplier) {
    const [jasminBrands, dbBrands] = await Promise.all([
      APIBrand(supplier).all(),
      Brand.allSupplier(supplier.user_id).then(Brand.makeMapBrandUUID)
    ]);

    const known = [];
    const unknown = [];

    for (const jasminBrand of jasminBrands) {
      const brand_uuid = jasminBrand.id;
      // We have already seen this jasminBrand
      if (brand_uuid in dbBrands) {
        const dbBrand = dbBrands[brand_uuid];
        const promise = syncKnownBrand(supplier, jasminBrand, dbBrand);
        known.push(promise);
      } else {
        const promise = syncUnknownBrand(supplier, jasminBrand);
        unknown.push(promise);
      }
    }

    // TODO: What does the caller want returned?
    await Promise.all(known);
    await Promise.all(unknown);
    return jasminBrands;
  }
};

Object.freeze(SyncService);

module.exports = SyncService;
