const { connection } = require('../database');

const users = {
    all: function() {
        return asyncQuery("SELECT * FROM Users");
    },
    find: function(where) {
        var sql = "SELECT * FROM Users WHERE ";
        var first = true;
        Object.keys(where).forEach(key => {
            if (!first) {
                sql += 'AND ';
            } else {
                first = false;
            }
            sql += `${key} = '${where[key]}' `;
        });
        return asyncQuery(sql)
    },
    create: function(user) {
        console.log(Object.keys(user))
        var sql = "INSERT INTO Users (";
        var first = true
        Object.keys(user).forEach(prop => {
            if (first) {
                sql += `${prop}`;
                first = false;
            } else {
                sql += `, ${prop}`;
            }
        })
        sql += ') VALUES (';
        first = true;
        Object.keys(user).forEach(prop => {
            if (first) {
                sql += `'${user[prop]}'`;
                first = false;
            } else {
                sql += `, '${user[prop]}'`;
            }
        })
        sql += ")"
        return asyncQuery(sql);
    }
}

function asyncQuery(sql, args) {
    console.log(sql)
    return new Promise(function(resolve, reject) {
        connection.query(sql, args, (error, data) => {
            if (error) 
                reject(error);
            resolve(data);
        });
    });
}

module.exports = users;