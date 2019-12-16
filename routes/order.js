const express = require("express");
const router = express.Router();
const { Orders } = require("../models/techsinf");

router.put("/reject/:id", function(req, res, next) {
    let orderId = req.params.id;

    Orders.reject(orderId)
        .then(res.send({msg: "Rejected order!"}))
        .catch(error => {
            console.log(error);
            res.send(error);
        })
});

module.exports = router;