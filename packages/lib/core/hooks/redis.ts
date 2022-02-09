import Redis from 'ioredis'
import { DiudiuProcess } from '../types'

export default async (app) => {
  const redisConfig = app.config.redis
  try {
    debugger
    const redis = new Redis(redisConfig)
    const c = { cyan: "\x1b[36m", red: "\x1b[31m", end: "\x1b[39m" }
    app.redisConMsg = `redis connect success. host:${c.cyan}${redisConfig.port}${c.end}`
    app.use((ctx, next) => {
      ctx.redis = redis
      return next()
    })
  } catch (error) {
    (process as DiudiuProcess).emit("error", error)
  }
}