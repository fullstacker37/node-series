const http = require('http')
const fs = require('fs')
const url = require('url')

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
  if (req.method === 'GET') {
    console.log(url.parse(req.url, true).query.id)
    if(req.url === '/') {
      fs.readFile('./index.html', 'utf-8', (err, data) => {
        res.write(data)
        res.end()
      })
    } else {
      fs.readFile('./motuo.png', (err, data) => {
        res.end(data)
      })
    }
  } else if (req.method === 'POST') {
    // 参数在请求体中
    let data
    req.on('data', (d) => {
      data += d
    })
    req.on('end', () => {
      res.end(require('querystring').parse(data))
    })
  }
})