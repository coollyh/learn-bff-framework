import bodyParser from 'koa-bodyparser'
import { App } from '../types'
export default async (app: App) => {
  const bodyparserConfig = app.config.bodyparser
  app.use(bodyParser(bodyparserConfig))
}