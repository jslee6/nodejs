
const express = require('express') // 익스프레스 라이브러리 쓰겟다
const app = express()  // 익스프레스 라이브러리 쓰겟다
app.use(express.json())
app.use(express.urlencoded({extended:true})) 
  //  요청.body 쓰려면 필요.



app.use(express.static(__dirname + '/public'))
// 퍼블릭파일 등록방법
app.set('view engine', 'ejs')  // ejs 사용하겟다


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

app.get('/list', async (요청, 응답) => {
  let result = await db.collection('post').find().toArray()
  응답.render('list.ejs',{ 글목록 : result }) //뷰아래경로는 그냥 파일명만 입력, 오브젝트형으로 생성{}2
})//// 응답.send(result[0].title) ,  await 를 넣어야함 db post할떄 파인트 투어레이 이런건 문법

app.get('/time',  (요청, 응답) => {
  응답.render('time.ejs',{ data : new Date()  }) 
})

app.get('/write',  (요청, 응답) => {
  응답.render('write.ejs') 
})  

app.post('/add', async (요청, 응답) => {
  await db.collection('post').insertOne({ title : 요청.body.title, content : 요청.body.content })
  응답.redirect('/list')
})