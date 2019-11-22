const express = require("express");

const router = express.Router();

router.get('/:omega/:lul', function (req, res, next) {
  var text = "API request on endpoint " + req.originalUrl + "\n";
  res.send(req.params);
});

module.exports = router;
