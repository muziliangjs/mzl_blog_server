const requireDirctory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app){
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRoutes()
    InitManager.loadHttpExeption()
  }
  //初始化全局路由
  static initLoadRoutes(){
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirctory(module, apiDirectory, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    })
  }

  // 初始全局错误  exception
  static loadHttpExeption(){
    const errors = require('./http-exception')
    global.errs = errors
  }

}

 module.exports = InitManager