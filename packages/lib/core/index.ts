import Koa from 'koa'
import path from 'path'
import { deepMerge, getHooks } from './utils'
import { App, DiudiuProcess, Hook } from './types'
const hooks = ["elasticsearch", "mysql", "redis", "bodyparser", "view", "login", "custom-middlewares", "cors", "static", "router", "lift"]

type Params = {
  appPath: string
}

export default async function Diudiu(params: Params) {
  const app: App = (new Koa()) as App
  const { appPath } = params
  app.appPath = appPath

  // 获取所有的config
  const env = process.env.NODE_ENV
  const extName = app.extName = env === "development" ? ".ts" : ".js";
  const baseConfig = await import(path.join(appPath, `config/config.base${extName}`))
  const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`))
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app))

  // 获取所有的hooks逻辑
  const allHooks: Hook[] = await getHooks(hooks)
  for (const hook of allHooks) {
    try {
      await hook.default(app)
    } catch (error) {
      // TODO:后续章节会进行处理
      (process as DiudiuProcess).emit("error", error)
    }
  }

  app.on("error", error => {
    (process as DiudiuProcess).emit("error", error)
  })
}