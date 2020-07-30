module.exports = {
  database: {
    dbName: 'mzlblog',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '******'
  },
  security:{
    secretKey:"1111",
    expiresIn: 60 * 60 * 24// 60 * 60一个小时
  }
}