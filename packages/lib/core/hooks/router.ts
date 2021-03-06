import glob from 'glob'
import path from 'path'
import compose from 'koa-compose'
import { App } from '../types'
import { Context, Next } from 'koa'

export default async (app: App) => {
  const { router } = app.config
  const fileList = glob.sync(path.resolve(app.appPath, "./controller", `**/*${app.extName}`))

  // 如果是文件路由类型
  if (router === 'file') {
    // 文件路由映射表
    let routerMap = {}
    for (let item of fileList) {
      // 获取解构方式，导出对象中的method属性和handler属性
      const controller = await import(item)
      // 默认给method一个GET请求
      const { method="GET", handler } = controller.default;
      // 获取和actions目录的相对路径，例如goods/getInfo.js
      const relative = path.relative(`${app.appPath}/controller/`, item)

      // 获取文件后缀.js
      const extname = path.extname(item)
      // 剔除文件后缀.js，并在前面加一个"/"，例如：/goods/getInfo
      const fileRouter = "/" + relative.split(extname)[0]
      // 连接method，形成唯一请求，例如：_GET/goods/getInfo
      const key = "_" + method + "_" + fileRouter
      // 保存在路由表里
      routerMap[key] = handler
    }
    app.use(async (ctx: Context, next: Next) => {
      const { path, method } = ctx
      // 构建和文件路由匹配的形式：_GET_路由
      const key = "_" + method + "_" + path
      // console.log(routerMap,key)
      // 如果匹配到，就执行对应的handler
      if (routerMap[key]) {
        await routerMap[key](ctx)
      } else {
        await ctx.render('404')
        // ctx.body = "no this router"
      }
      return next()
    })
  }
  else if (router === "koa-router") {
    const routerFiles = glob.sync(path.resolve(app.appPath, "./routers", `**/*${app.extName}`));
    const registerRouter = async () => {
      let routers: any[] = []
      for (let file of routerFiles) {
        const router = await import(file)
        routers.push(router.default.routes())
      }
      return compose(routers)
    }
    app.use(await registerRouter())
  }
}