const socket = io();

document.querySelector("#test").addEventListener("click", function () {
  // 체크된 항목만 배열로 수집
  const menu = Array.from(document.querySelectorAll("input[type=checkbox]")).filter(c=>c.checked==true)
  // 서버로 데이터 전송
  socket.emit('data', menu);
})