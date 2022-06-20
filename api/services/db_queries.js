const oracledb = require("oracledb");

config = require("../config/db_config");
<<<<<<< HEAD
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function queryResult(query, binds) {
=======

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

queryResult = async function (query, binds) {
>>>>>>> fc1582ddb5b77359ee769070f83e78538ecdf11d
  let connection;

  try {
    connection = await oracledb.getConnection(config);

    const result = await connection.execute(query, binds);
<<<<<<< HEAD
    return result;

    // console.log(result);
=======
    console.log(result);
>>>>>>> fc1582ddb5b77359ee769070f83e78538ecdf11d
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> fc1582ddb5b77359ee769070f83e78538ecdf11d

module.exports = queryResult;
