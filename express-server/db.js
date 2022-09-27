const fs = require('fs')
const { promisify } = require('util') // 可以选择将哪一个方法 promise 化

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

exports.getDb = async () => {
  const data = await readFile('./db.json', 'utf-8')
  return JSON.parse(data)
}

exports.writeDb = async (data) => {
  const stringData = JSON.stringify(data)
  return await writeFile('./db.json', stringData)
}