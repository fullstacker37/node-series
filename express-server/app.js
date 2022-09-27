const express = require('express')
const db = require('./db')

const app = express()

// app.use(express.urlencoded())
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const jsonData = await db.getDb()
    res.send(jsonData.users)
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.post('/', async (req, res) => {
  // console.log(req.headers)
  // console.log(req.body) // { username: 'lisan', age: 22 }
  let body = req.body
  if(!body) {
    res.status(403).json({
      error: '缺少用户信息'
    })
  }
  const jsonData = await db.getDb()
  body.id = jsonData.users[jsonData.users.length - 1].id + 1
  jsonData.users.push(body)
  try {
    const result = await db.writeDb(jsonData)
    console.log(result)
    if (!result) {
      res.status(200).send({ message: '添加成功' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.put('/:id', async (req, res) => {
  // req.params.id
  try {
    const userInfo = await db.getDb()
    const userId = Number.parseInt(req.params.id)
    const user = userInfo.users.find(item => item.id === userId)
    if (!user) {
      res.status(403).json({
        status: -1,
        message: '用户不存在'
      })
    }
    const body = req.body
    user.username = body.username || user.username
    user.age = body.age || user.age
    userInfo.users[userId - 1] = user
    if (!await db.writeDb(userInfo)) {
      res.status(201).send({ message: '修改成功' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.listen(3000, () => {
  console.log('run http://127.0.0.1:3000')
})