const fs = require('fs')
const url = require('url')
const controller = require('./controller')

module.exports = (req, res) => {
  if (req.method === 'GET') {
    console.log(url.parse(req.url, true).query.id)
    if(req.url === '/') {
      controller.index(res)
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
      controller.user(require('querystring').parse(data), res)
    })
  }
}