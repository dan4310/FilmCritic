const { connection } = require('../database/database');

exports.asyncQuery = function (sql, args) {
    console.log(sql);
    if (args) {
        console.log(args);
    }
    return new Promise(function(resolve, reject) {
        connection.query(sql, args, (error, data) => {
            if (error) 
                reject(error);
            resolve(data);
        });
    });
}