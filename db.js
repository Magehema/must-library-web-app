const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql7.freesqldatabase.com',  // Online database host
    user: 'sql7712796',                // Database user
    password: 'wxI7YRmYSy',            // Database password
    database: 'sql7712796',            // Database name
    port: 3306                         // Port number
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
