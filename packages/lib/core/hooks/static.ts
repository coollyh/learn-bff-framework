import koaStatic from 'koa-static'
import path from 'path/posix'
import { App } from '../types'

export default async (app: App) => {
  const staticConfig = app.config.static
  app.use(koaStatic(path.join(app.appPath, "./static"), staticConfig))
}