var express = require("express");
var router = express.Router();
const oracledb = require("oracledb");

// var connection = require("../config/db-config");

let connection = oracledb.getConnection({
  user: "intern",
  password: "intern",
  connectString: "172.17.1.108:1521/CILDEV",
});

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
