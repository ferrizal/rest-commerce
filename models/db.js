var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'mydbinstance.cdvu1flvszaj.ap-northeast-1.rds.amazonaws.com:3306',
    user     : 'ferrizal',
    password : 'justf0rtest1ng',
    database : 'commerce'
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
