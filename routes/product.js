const { api } = require("../utils/endpoints");

const express = require("express");
const router = express.Router();

const tenant = process.env.A_TENANT;
const organization = process.env.A_ORGANIZATION;

router.get("/pId/:id", function(req, res, next) {
  let productId = req.params.id;

  api
    .get(`/${tenant}/${organization}/salescore/salesitems/${productId}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/all", function(req, res, next) {
  api
    .get(`/${tenant}/${organization}/salesCore/salesItems/extension`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
