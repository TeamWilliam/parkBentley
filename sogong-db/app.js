var express = require('express');
var app = express();
var db_config = require(__dirname + '/index.js');
var conn = db_config.init();
var bodyParser = require('body-parser');

db_config.connect(conn);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.send('ROOT');
});

// app.get('/list', function (req, res) {
//     var sql = 'SELECT * FROM user';    
//     conn.query(sql, function (err, rows, fields) {
//         if(err) console.log('query is not excuted. select fail...\n' + err);
//         else res.render('list.ejs', {list : rows});
//     });
// });

app.get('/transaction1', function (req, res) {
    var sql = 'SELECT * FROM user';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('transaction1.ejs', {list : rows});
    });
});

app.get('/llogin', function (req, res) {
    res.render('llogin.ejs');
});

app.get('/makeReservation', function (req, res) {
    res.render('makeReservation.ejs');
});

app.post('/loginAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'INSERT INTO BOARD VALUES(?, ?, ?, NOW())';
    var params = [body.id, body.pw, body.content];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.redirect('/transaction1');
    });
});

app.listen(3000, () => console.log('Server is running on port 3000...'));
