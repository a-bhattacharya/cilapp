var express = require("express");
var router = express.Router();

const connection = require("../config/db-config");

router.get("/", function (req, res, next) {
  sqlQuery = "SELECT * FROM sales_bills.fois_rr_divr_dtl;";
  binds = {};
  /* options = {
    outFormat: connection.oracledb.OUT_FORMAT_OBJECT, // query result format
  }; */

  result = connection.execute(sqlQuery, binds);
  res.send("Working");
});

module.exports = router;
