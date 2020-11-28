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

app.get('/login', function (req, res) {
    res.render('login.ejs');
});

app.get('/changeReservation', function (req, res) {
    res.render('changeReservation.ejs');
});

app.get('/changeReservation-1', function (req, res) {
    res.render('changeReservation-1.ejs');
});

app.get('/makeReservation', function (req, res) {
    res.render('makeReservation.ejs');
});

/* -----------------------------개인 기록 조회--------------------------------------- */
app.get('/myrecord', function (req, res) {
    var sql = 'SELECT * FROM Reservation';
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('myrecord.ejs', {list : rows});
    });
});
/* -------------------------------------------------------------------------------------- */

/* ------------------------------------개인기록 상세 조회 --------------------------------*/
app.get(['/checkMyRecord','/checkMyRecord/:ReservationNum'], function (req, res) {

    var sql = 'SELECT ReservationNum FROM Reservation';
    conn.query(sql,function (err, records, fields) {
        var ReservationNum = req.params.ReservationNum; 
        if(ReservationNum){
            var sql = 'SELECT ReservationDate, StartTime, EndTime, ReservationNum, CarNum, Price FROM Reservation WHERE ReservationNum =?';
            conn.query(sql,[ReservationNum],function(err, Reservation, fields){
                if(err) console.log('query is not excuted. select fail...\n' + err);
                else {
                    res.render('checkMyRecord.ejs', {records : records, Reservation:Reservation[0]});
            }
        });
                  
        }else {
            res.render('/checkMyRecord',{records : records, Reservation: undefined})
        }
    });
    
});

/* -------------------------------------------------------------------------------------- */

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
