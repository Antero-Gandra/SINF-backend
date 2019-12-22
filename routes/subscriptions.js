const express = require("express");
const {
  api
} = require("../utils/endpoints");
const router = express.Router();
const {
  Customer,
  SalesItem,
  SecretRegistry,
  SPItem,
  Subscription,
  Supplier
} = require("../models/techsinf");

router.get("/get/all/customer", function(req, res, next) {

  let tenant = req.query.tenant;
  let organization = req.query.organization;
  let company_name = req.query.company;

  Customer.find({
      tenant,
      organization,
      company_name
    }).then(response => {
      if (response !== null) {
        let userId = response.customer_id;

        Subscription.allCustomer(userId).then(response => {
          res.send(response);
        })
      } else {
        res.send({
          msg: "Customer not found"
        });
      }

    })
    .catch(error => console.log(error));
});

router.get("/get/all/supplier", function(req, res, next) {
  let tenant = req.query.tenant;
  let organization = req.query.organization;
  let company_name = req.query.company;

  Supplier.find({
      tenant,
      organization,
      company_name
    }).then(response => {
      if (response !== null) {
        let userId = response.supplier_id;

        Subscription.allSupplier(userId).then(response => {
          res.send(response);
        })
      } else {
        res.send({
          msg: "Supplier not found"
        });
      }
    })
    .catch(error => console.log(error));
});

router.delete("/delete/:id", function(req, res, next) {
  let subscriptionId = req.params.id;

  Subscription.delete(subscriptionId)
    .then(res.send({
      msg: "Deleted subscription!"
    }))
    .catch(error => {
      console.log(error);
      res.send(error);
    })
});

router.post("/create", function(req, res, next) {
  let secretKey = req.body.secretKey;
  let tenant = req.body.tenant;
  let organization = req.body.organization;
  let company_name = req.body.company;

  Customer.find({
      tenant,
      organization,
      company_name
    })
    .then(response => {
      let customer_id = response.customer_id

      SecretRegistry.find(secretKey)
        .then(response => {
          let brand_id = response.brand_id;

          Subscription.find({
              brand_id,
              customer_id
            })
            .then(response => {
              if (response == null) {
                Subscription.create({
                    brand_id,
                    customer_id
                  })
                  .then(response => {
                    let subscription_id = response.subscription_id;

                    SalesItem.allBrand(brand_id)
                      .then(response => {
                        for (const id in response) {
                          let sales_item_name = response[id].sales_item_name;
                          let description = `Item "${sales_item_name}" of Empresa BY`;
                          let customer_item = makeid(10);

                          SalesItem.find({
                              brand_id,
                              sales_item_name
                            })
                            .then(response => {
                              let sales_item_id = response.sales_item_id;

                              SPItem.create({
                                subscription_id,
                                sales_item_id,
                                customer_item
                              })

                              api.post(`/${tenant}/${organization}/purchasesCore/purchasesItems`, {
                                  description: description,
                                  itemkey: customer_item
                                })
                                .catch(error => console.log(error))
                            })
                        }
                      })
                      .catch(error => console.log(error))
                  })
                  .catch(error => console.log(error))
              }
            })
            .catch(error => console.log(error))

        })
        .catch(error => console.log(error))
    })
    .catch(error => res.send(error))
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = router;