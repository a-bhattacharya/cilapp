const oracledb = require("oracledb");

config = require("../config/db_config");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

queryResult = async function (query, binds) {
  let connection;

  try {
    connection = await oracledb.getConnection(config);

    const result = await connection.execute(query, binds);
    console.log(result);
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
};

module.exports = queryResult;
