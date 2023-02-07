const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@12345',
    database: 'node_crud'   
});

connection.connect((err) => {
    if(err) {
        console.log(error);
    }else {
        console.log('database connected');
    }
});

module.exports = connection;