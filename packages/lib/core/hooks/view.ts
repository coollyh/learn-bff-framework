import path from 'path'
import views from 'koa-views'
import { App } from '../types'
const defaultViewConfig = {
  extension: "ejs"
}

export default async (app: App) => {
  const viewConfig = app.config.view
  app.use(views(path.join(app.appPath, "./view"), Object.assign(defaultViewConfig, viewConfig)))
}