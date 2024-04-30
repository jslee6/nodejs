
const express = require('express') // 익스프레스 라이브러리 쓰겟다
const app = express()  // 익스프레스 라이브러리 쓰겟다



app.use(express.static(__dirname + '/public'))
// 퍼블릭파일 등록방법


const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://jslee:qlalf1@cluster0.wqytvou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
}).catch((err)=>{
  console.log(err)
}) 
// 몽고DB 라이브러리 사용법 , 몽고DB에 커넥트하면 포럼 DB에 접속해주세요~ ,  url 맨위에  계정:암호


app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})  // 서버만드는 코드


app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/index.html')
})    // 메인페이지 접속시 '반갑다' 실행



app.get('/news', ()=>{
  // db.collection('post').insertOne({title : '어쩌구'}) // 테스트이여서 주석처리
})
  // 응답.send('오늘비움')
   // /news 페이지로 라우트  ,펑션 or 애로우평션  , 콜백함수
