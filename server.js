
const express = require('express') // 익스프레스 라이브러리 쓰겟다
const app = express()  // 익스프레스 라이브러리 쓰겟다



app.use(express.static(__dirname + '/public'))
// 퍼블릭파일 등록방법


app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})  // 서버만드는 코드


app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/index.html')
})    // 메인페이지 접속시 '반갑다' 실행



app.get('/news',function(요청, 응답) {
  응답.send('오늘비움')
})    // /news 페이지로 라우트  ,펑션 or 애로우평션  , 콜백함수
