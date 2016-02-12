require('dotenv').config();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

connection.connect();

module.exports = connection;

/*
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) {
        res.send('respond with a resource products hahaha');
        throw err;
    }

    console.log('The solution is: ', rows[0].solution);
});

connection.end();*/
