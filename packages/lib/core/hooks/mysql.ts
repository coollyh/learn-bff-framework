import mysql from 'mysql2/promise'
import { App, DiudiuProcess } from '../types'

export default async (app: App) => {
  const mysqlConfig = app.config.mysql
  try {
    const connection = await mysql.createPool(mysqlConfig)
    // connection.connect()
    const c = { cyan: "\x1b[36m", red: "\x1b[31m", end: "\x1b[39m" }
    app.mysqlConMsg = `mysql connect success. host:${c.cyan}${mysqlConfig.host}${c.end}`
    app.use((ctx, next) => {
      ctx.mysql = connection
      return next()
    })
  } catch (error) {
    (process as DiudiuProcess).emit("error", error)
  }
}