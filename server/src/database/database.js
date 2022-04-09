const config = require('./config');
const mysql = require('mysql2')

const connection = mysql.createConnection(config);

connection.connect(function(error) {
    if (error) {
        console.log(`Error connecting to database ${config.host}.${config.database}`);
        return;
    }
    console.log(`Connected to database ${config.host}.${config.database}`);
});

exports.connection = connection;