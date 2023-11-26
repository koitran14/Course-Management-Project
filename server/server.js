const mysql = require('mssql/msnodesqlv8');

var config = {
    server: "LAPTOP-J8Q1OE31\\SQLEXPRESS", //update me
    database: "CourseDB",
    options: {
        synchronize: true,
        trustServerCertificate: true,
        trustedConnection: true,
    },
    driver: "msnodesqlv8"
}

const myconn = new mysql.ConnectionPool(config).connect().then(pool => {
    return pool;
})

module.exports = {
    conn: myconn,
    sql: mysql
}