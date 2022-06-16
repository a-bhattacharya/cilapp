const oracledb = require("oracledb");

// https://oracle.github.io/node-oracledb/INSTALL.html#3414-install-the-free-oracle-instant-client-zip

const config = {
  user: "intern",
  password: "intern",
  connectString: "172.17.1.108:1521/CILDEV",
};

let dbConnection;

try {
  dbConnection = oracledb.getConnection(config);
  console.log("Connected to " + config.connectString);
} catch (err) {
  console.log("Ouch!", err);
}
/*finally {
  if (conn) {
    // conn assignment worked, need to close
    await conn.close();
  }
}*/

module.exports = dbConnection;
