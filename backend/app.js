const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require("path");
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config("./");


// express 기본 설정
const app = express();
app.use(cookieParser()); // 쿠키
app.use(bodyParser.json());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);



app.use("/signup", require("./routes/signupRoute.js"));
app.get('/table', (req, res) => { res.sendFile(path.join(__dirname, 'public/table/table.html')) });
app.get('/admin', (req, res) => { res.sendFile(path.join(__dirname, 'public/admin/admin.html')) });

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('data', (data) => { socket.broadcast.emit('update', data) }); // 다른 클라이언트들에게 데이터 전송
    socket.on('disconnect', () => {}); // 클라이언트 종료
});

server.listen(4000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});