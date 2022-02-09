import path from 'path/posix'
import { App } from '../types'

export default async (app: App) => {
  const { middlewares } = app.config

  // 按照middlewares数组的顺序加载中间件
  for (let m of middlewares) {
    const curMiddleWarePath = path.resolve(app.appPath, "./middleware", `${m}${app.extName}`)
    const curMiddleware = await import(curMiddleWarePath);
    app.use(curMiddleware.default(app))
  }
}