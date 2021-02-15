module.exports = {
  database: {
    dbName: 'mzlblog',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '本地数据库密码' // github
    
  },
  security:{
    secretKey:'mzl@#$a324#$%#$asd',
    expiresIn: 60 * 60 * 24// 60 * 60一个小时
  }
}