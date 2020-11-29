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


var loginMemberID = "root"

/* -----------------------------------임시메인화면 --------------------------------*/
app.get('/main-login', function (req, res) {

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("get 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('main-login.ejs', { list : rows});
            console.log(rows);
        }
    });
});

/* ------------------------------------메인화면 --------------------------------*/

app.get('/main', function (req, res) {

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("로그인된 ID : "+userID);
    
    console.log("get 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('main.ejs', { list : rows});
            console.log(rows);
        }
    });
});
/* -------------------------------------------------------------------------*/


/* ------------------------------------회원가입 --------------------------------*/
app.get('/join', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'SELECT * FROM user';
    console.log(sql);
    conn.query(sql, function(err,result,fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            res.render('join',{
                results: result
            });
        }
    });
});

app.post('/joinAf', function (req, res) {
    var body = req.body;
    // console.log(body);
    // var users = { // TABLE user parameter
    //     ID : body.input_id,
    //     PW: body.input_pw,
    //     Name : body.input_name,
    //     Money : 0,
    //     Email: body.input_email,
    //     CarType : body.input_carType,
    //     CarNum : body.input_carNum
    // };
    var id = body.input_id;
    var pw = body.input_pw;
    var name = body.input_name;
    var email = body.input_email;
    var carType = body.input_carType;
    var carNum = body.input_carNum;
    
    console.log(body);

    var sql = 'INSERT INTO user (ID,PW,Name,Money,Email,CarType,CarNum) VALUES(?,?,?,0,?,?,?)';
    var params = [id, pw, name, email, carType, carNum];
    //var sql = "INSERT INTO user VALUES ? "
    console.log(sql);
    conn.query(sql, params, function(err,rows) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
            if(id == "" || id == null || id == undefined) {
                res.send('<script type="text/javascript">alert("아이디를 입력해주세요");window.location="/join";</script>');
            }
            else if(pw == "" || pw == null || pw == undefined) {
                res.send('<script type="text/javascript">alert("비밀번호를 입력해주세요");window.location="/join";</script>');
            }
            else if(carNum == "" || carNum == null || carNum == undefined) {
                res.send('<script type="text/javascript">alert("차 번호를 입력해주세요");window.location="/join";</script>');
            }
        }
        else {
            res.send('<script type="text/javascript">alert("회원가입 완료.로그인하세요");window.location="/login";</script>');
            console.log("data inserted");
        }
    });
});
/* --------------------------------------------------------------------------*/


/* ------------------------------------로그인 --------------------------------*/
app.get('/login', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log(sql);
    conn.query(sql, [userID], function(err,result,fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            res.render('login',{
                results: result
            });
        }
    });
});

app.post('/loginAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var id = body.ID;
    var pw = body.PASSWORD;

    console.log("입력한 ID : "+id);
    console.log("입력한 PW : "+pw);
    var sql1 = 'SELECT * FROM user WHERE ID=?';
    console.log(sql1);
    conn.query(sql1, [id], function(err,results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        if(!results[0]) {
            res.send('<script type="text/javascript">alert("존재하지 않는 아이디입니다.");window.location="/login";</script>');
        }
        else { 
            console.log("results : " +results);
            console.log(results[0]);
            var memberPW = results[0].PW;
            if (memberPW == pw ) {
                res.send('<script type="text/javascript">alert("로그인되었습니다.");window.location="/main";</script>');
                console.log("로그인 완료");
                console.log(sql1);
                loginMemberID = results[0].ID; // 로그인 된 ID 전역변수에 저장
                console.log("로그인된 아이디 : "+loginMemberID);
            }
            else {
                res.send('<script type="text/javascript">alert("비밀번호가 일치하지 않습니다.");window.location="/login";</script>');
            }
            res.end;
        }
    });
});
/* ---------------------------------------------------------------------------*/


// enterCar 입차하기
app.get('/enterCar', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'SELECT * FROM reservation';
    console.log(sql);
    conn.query(sql, function(err,result,fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            res.render('enterCar',{
                results: result
            });
        }
    });
});

app.post('/enterCar', function (req, res) {
    var body = req.body;
    console.log(body);

    var carNum = require('./ocr');
    //console.log(carNumber('C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg'));

    //const carNum = '152가 3017';
    console.log("carNum : "+carNum);
    var sql1 = 'SELECT * FROM Reservation WHERE CarNum=?';
    console.log(sql1);
    conn.query(sql1, [carNum], function(err,results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        if(!results[0]) {
            res.redirect('/enterCar_ReserNum');
        }
        else { 
            console.log("예약이 되어있습니다. 차단기가 올라갑니다.");
            //res.send('<script type="text/javascript">alert("예약이 되어있습니다. 차단기가 올라갑니다.");window.location="/afterEnterCar";</script>');
            res.redirect('/afterEnterCar');
        }
    });
});

// 입차 완료
app.get('/afterEnterCar', function (req, res) {
    //var carNumber = require('./ocr.js');
    // console.log(carNumber('C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg'));

    const carNum = '152가 3018';
    const resNum = "55555";
    // sql = 'SELECT ReservationNum FROM reservation WHERE CarNum = ?';
    // conn.query(sql, [carNum], function(err, results, fields) {
    //     if(err) console.log('query is not excuted. select fail...\n' + err);
    //     else {
    //         console.log("resNum" + results[0].ReservationNum);
    //         resNum = results[0].ReservationNum;
    //     }
    // });
    // var carNum = carNumber('C:/Users/ey/Desktop/parkBentley/sogong-db/image6.jpg');
    var sql1 = 'SELECT * FROM Reservation,cartransaction WHERE CarNum=? AND cartransaction.ReservationNum=?';
    conn.query(sql1, [carNum, resNum], function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('afterEnterCar.ejs', {list : rows});
    });
});

// 인식이 안되었을 경우 | 예약 테이블에 자동차 번호가 없을 경우
app.get('/enterCar_ReserNum', function (req, res) {
    res.render('enterCar_ReserNum.ejs');
});

app.post('/enterCar_ReserNum', function (req, res) {
    var body = req.body;
    console.log(body);
    var resNum = body.reservationNum;
    console.log("resNum : "+resNum);

    var sql = 'SELECT * FROM Reservation WHERE ReservationNum=?';
    console.log(sql);
    conn.query(sql, [resNum], function(err,results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        if(!results[0]) {
            res.send('<script type="text/javascript">alert("예약 내역이 없습니다.");window.location="/main";</script>');
        }
        else { 
            console.log("예약이 되어있습니다. 차단기가 올라갑니다.");
            //res.send('<script type="text/javascript">alert("예약이 되어있습니다. 차단기가 올라갑니다.");window.location="/afterEnterCar";</script>');
            res.redirect('/afterEnterCar');
        }
    });
});

/* ---------------------------------잔액 충전하기------------------------------------------*/
app.get('/charge', function (req, res) {

    var userID = loginMemberID;

    var sql = 'SELECT * FROM user WHERE ID=?';

    console.log("get 실행");
    conn.query(sql, [userID], function (err, rows, results) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('charge.ejs', {list : rows});
            console.log(rows);
        }
    });
});


app.post('/charge', function (req, res) {
    var body = req.body;
    console.log(body);

    var userID = loginMemberID;
    var addMoney = body.chk_info;
    console.log("현재 로그인 되어 있는 사람 : "+userID);

    var sql = "UPDATE user SET money = money + ?  WHERE ID =?";
    console.log(sql);
    conn.query(sql, [addMoney, userID], function(err,rows, results) {
        if(err) {
            console.log('query is not excuted. insert fail...\n' + err);
        }
        else {
            console.log("잔액 충전 완료.");
            
            res.redirect('/charge');
        }
    });
});
/* ------------------------------------------------------------------------------*/


app.get('/reservationNum', function (req, res) {
    res.render('reservationNum.ejs');
});


app.get('/transaction1', function (req, res) {
    var sql = 'SELECT * FROM user';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('transaction1.ejs', {list : rows});
    });
});

app.get('/makeReservation', function (req, res) {
    res.render('makeReservation.ejs');
});


app.get('/adminDay', function (req, res) {
    res.render('adminDay.ejs');
});

app.get('/adminMonth', function (req, res) {
    res.render('adminMonth.ejs');
});

app.get('/afterDepartCar', function (req, res) {
    res.render('afterDepartCar.ejs');
});

app.get('/changeReservation', function (req, res) {
    res.render('changeReservation.ejs');
});

app.get('/changeReservation-1', function (req, res) {
    res.render('changeReservation-1.ejs');
});

app.get('/departCar', function (req, res) {
    res.render('departCar.ejs');
});

app.get('/completeReservation', function (req, res) {
    res.render('completeReservation.ejs');
});

app.get('/confirmReservation', function (req, res) {
    res.render('confirmReservation.ejs');
});

app.get('/index', function (req, res) {
    res.render('index.ejs');
});

app.get('/payExtraFee', function (req, res) {
    res.render('payExtraFee.ejs');
});

app.get('/reservationPayment', function (req, res) {
    res.render('reservationPayment.ejs');
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
