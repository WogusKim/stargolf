// 모듈 import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwe123!@#',
    database: 'stargolf'
});
// 데이터베이스 연결
connection.connect(err => {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});
// Express 앱 설정
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API 끝점 설정: 특정 날짜에 해당하는 예약 정보 조회
app.get('/reservations', (req, res) => {
    const { date } = req.query; // URL에서 date 파라미터 추출
    if (!date) {
        return res.status(400).json({ error: 'Date parameter is required' });
    }
    // SQL 쿼리 실행
    const query = 'select rsv.rsvnum, info.rsv_firsthalf_start from rsv left join rsv_info info on rsv.rsvnum = info.rsvnum where rsvdate=?';
    connection.query(query, [date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // 조회 결과 반환
        res.json(results);
    });
});
app.get('/querykakao', (req, res) => {
    console.log('query');
    let responseData = {};
    let memberid = req.query.memberid;
    let email = req.query.email;
    let query = 'SELECT memberid from members where email="'+email+'" ;'
    // connection.query(query,[memberid],(err, rows) => {
    connection.query(query,(err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (rows[0]) {
            console.log(rows[0]);
            responseData.data = rows;
            responseData.state = 'ok';
        } else {
            responseData.state = 'none';
        }
        res.json(responseData); //클라이언트 응답 전송
    })
})
//가입여부 이메일로 체크
app.get('/ckem', (req, res) => {
    console.log('카카오 로그인 회원가입여부 체크');
    console.log(req.query.email);
    let responseData = {};
    let email = req.query.email;
    let query = 'SELECT * from members where email= ? ;'
    // connection.query(query,[memberid],(err, rows) => {
    connection.query(query,email,(err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (rows[0]) {
            console.log(rows[0]);
            responseData.data = rows;
            responseData.state = 'yes';
            console.log(responseData.data);
        } else {
            responseData.state = 'none';
        }
        res.json(responseData); //클라이언트 응답 전송
    })
})

//카카오 로그인 관련  메소드
app.get('/klogin',(req, res)=>{
    console.log('query');
    let data = req.query;
    console.log(data);
    let responseData ={};
    let query = 'Select * from members where email = ?';
    connection.query(query, data.email ,(err, rows)=>{ // 번쨰 매개변수 = > 쿼리문  // err은 오류 rows는 배열의 형태로 값이 하나라도 있으면 들어옴
        if(err) throw err;
        if(rows[0]){
            console.log(rows[0]);
            responseData.info = rows[0];
            responseData.state = 'ok';
        }else{
            responseData.state='none'; //디비 연결 성공했지만 값이 없는 경우(로그인 실패)
        }
        res.json(responseData);
    })
})
// 서버 시작
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.post('/member-login', (req, res) => {
    // const memberid = req.query.memberid;
    // const pw = req.query.pw;
    // let id=req.body.id;
    // let pw=req.body.pw;
    let obj = req.body;
    // const { id, pw } = req.body;
    console.log(obj);
    console.log(obj.params.id);
    let responseData = {};
    let query = 'SELECT * FROM members WHERE memberid = ? AND pw = ?';
    connection.query(query, [obj.params.id, obj.params.pw], (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        responseData.state = 'error';
      } else if (rows.length > 0) {
        // 로그인 성공
        responseData.state = 'ok';
        console.log(responseData.state);
        responseData.info = rows[0]; // 로그인된 사용자 정보 전송
      } else {
        // 로그인 실패
        responseData.state = 'none';
        console.log(responseData.state);
      }
      res.json(responseData);
    });
  });
  app.post('/register', (req, res) => {
    const { memberid, pw, name, phone, email, birthdate, gender } = req.body;
    const query = 'INSERT INTO members (memberid, pw, name, phone, email, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    connection.query(query, [memberid, pw, name, phone, email, birthdate, gender], (err, results) => {
      if (err) {
        console.error('Registration error:', err);
        res.status(500).json({ state: 'error', message: 'Database error during registration', detail: err.message });
      } else {
        res.json({ state: 'ok' });
      }
    });
  });

  app.post('/reserve', (req, res) => {
    const { rsvnum, rsvdate, rsv_memberid } = req.body;
    const query = 'INSERT INTO rsv (rsvnum, rsvdate, rsv_memberid) VALUES (?, ?, ?)';
    
    connection.query(query, [rsvnum, rsvdate, rsv_memberid], (error, results) => {
      if (error) {
        console.error('DB 에러:', error);
        res.status(500).send('데이터베이스 오류');
        return;
      }
      res.send('예약 성공');
    });
  });
  

  