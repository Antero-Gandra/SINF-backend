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
  const brand_name = jasminBrand.brandKey;

  const [jasminItems, dbItems] = await Promise.all([
    APISalesItem(supplier).odata({ $filter: `Brand eq '${brand_name}'` }),
    SalesItem.allBrand(brand_id).then(SalesItem.mapSalesItemUUID)
  ]);

  const promises = jasminItems
    .map(jasminItem => {
      const sales_item_uuid = jasminItem.id;
      const sales_item_name = jasminItem.itemKey;
      if (sales_item_uuid in dbItems) return null;
      return SalesItem.create({ brand_id, sales_item_uuid, sales_item_name });
    })
    .filter(value => value !== null);

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
  const brand_name = jasminBrand.brandKey;

  const [jasminItems, dbBrand] = await Promise.all([
    APISalesItem(supplier).odata({ $filter: `Brand eq '${brand_name}'` }),
    Brand.create({ supplier_id, brand_uuid, brand_name })
  ]);

  const brand_id = dbBrand.brand_id;

  const promises = jasminItems.map(jasminItem => {
    const sales_item_uuid = jasminItem.id;
    const sales_item_name = jasminItem.itemKey;
    return SalesItem.create({ brand_id, sales_item_uuid, sales_item_name });
  });

  return await Promise.all(promises);
};

/**
 * @typedef {Object} Supplier
 * @property {number} user_id
 * @property {string}  tenant
 * @property {string}  organization
 * @property {string}  company_uuid
 */

const SyncService = {
  /**
   * Sync brands of this supplier
   * @param {Supplier} supplier
   * @returns {Promise<Brand[]>}
   */
  async brands(supplier) {
    const [jasminBrands, dbBrands] = await Promise.all([
      APIBrand(supplier).all(),
      Brand.allSupplier(supplier.user_id).then(Brand.makeMapBrandUUID)
    ]);

    console.log("JASMIN_BRANDS: %o", jasminBrands);
    console.log("DB_BRANDS: %o", dbBrands);

    const known = [];
    const unknown = [];

    for (const jasminBrand of jasminBrands) {
      const brand_uuid = jasminBrand.id;
      // We have already seen this jasminBrand
      if (brand_uuid in dbBrands) {
        const dbBrand = dbBrands[brand_uuid];
        console.log("KNOWN BRAND: ", brand_uuid);
        const promise = syncKnownBrand(supplier, jasminBrand, dbBrand);
        known.push(promise);
      } else {
        console.log("UNKNOWN BRAND: ", brand_uuid);
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
