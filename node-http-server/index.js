const http = require('http')
const router = require('./router')

const server = http.createServer()
server.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})

server.on('request', (req, res) => {
  // console.log('request')
  // res.setHeader('Content-type', 'text/plain;charset=utf-8')
  // res.setHeader('Content-type', 'text/html;charset=utf-8')
  // res.write('你好')
  // res.end()
  router(req, res)
})