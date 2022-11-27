// const { MongoClient } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'test';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const cc = db.collection('cc');

//   await cc.insert({ name: '张三', age: 22 });
//   const query = await cc.find();
//   return query.toArray();
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

/**
 * 数据库连接方法
 * @param {String} dbName 数据库名
 * @param {String} cName 集合名
 * @returns Promise
 */
const clientConnect = async (dbName, cName) => {
  await client.connect();
  console.log('********* Connected successfully to server **********');
  const db = client.db(dbName);
  return db.collection(cName);
}

async function main() {
  const cc = await clientConnect('test', 'cc');
  // crud 操作
  // await cc.insertOne({ name: 'lisi', age: 20 });
  // const query = await cc.findOne({ age: { $gt: 20 } });
  // await cc.updateOne({ age: { $gt: 20 } }, { $set: { name: 'zhangsan' }})
  // await cc.deleteOne({ name: '张三' });
  // console.log(query)
  return 'done';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());