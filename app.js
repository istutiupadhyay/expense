const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const connection = require('./database');


app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


/*app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/form.html');
});*/

app.post('/', (req, res, next) => {
    var expense = req.body.expense
    var description = req.body.description
    var category = req.body.category

    var sql = 'INSERT INTO users(expense, description, category) values (?)';
    var values = [expense, description, category]
    connection.query(sql, [values], (err, result) => {
    if(err) throw err;
    console.log('data uploaded');
    res.redirect('/');
    });
});

app.get('/', (req, res, next) => {
    var sql = 'SELECT * FROM users';
    connection.query(sql, (err, result) => {
    if(err) throw err;
    res.render('./display', { users : result });
    });
});

app.get('/update', (req, res, next) => {
    //connection.connect((err) => {
      //  if (err) console.log(err);
        var sql = 'SELECT * FROM users WHERE id = ?';
        var id = req.query.id;
        connection.query(sql, [id], (err, result) => {
            if (err) throw err;
            res.render('./update', { users : result });
        });
    //});
});

app.post('/updateData', (req, res, next) => {
    var expense = req.body.expense;
    var description = req.body.description;
    var category = req.body.category;
    var id = req.body.id;
    console.log(expense, description, category, id);
    var sql = 'UPDATE users set expense=?, description=?, category=? where id=?';
    connection.query(sql, [expense, description, category, id], (err, result) =>{
        if (err) throw err;
        console.log('data updated');
        res.redirect('/')
    });
});

app.get('/delete', (req, res, next) => {
    //if(err) throw err;
    var sql = 'DELETE FROM users WHERE id=?';
    var id = req.query.id;
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});


app.listen(3000, () => {
    console.log('server is running');
});