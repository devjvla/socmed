const mysql  = require("mysql2/promise");
const config = require("../config");

async function connection(){
    return await mysql.createConnection(config.db);
}

async function executeQuery(query) {
    let connection       = await mysql.createConnection(config.db);
    let [query_result, ] = await connection.query(query);

    return query_result;
}

module.exports = { connection, executeQuery }