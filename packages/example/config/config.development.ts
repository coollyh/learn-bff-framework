import { App } from "diudiu-core/core/types"
import path from "path/posix"

export default (app: App) => {
  return {
    // 环境配置
    devServer: {
      port: 8888
    },
    // router: "koa-router",
    router: "file",
    static: {

    },
    cors: {
      origin: "http://127.0.0.1:5555",
      maxAge: 0
    },
    middlewares: ["two", "one"],
    login: {
      needLogin: true,
      secret: "my_secret"
    },
    CookieOption: {
      path: "/user/getinfo",
      domain: "http://127.0.0.1"
    },
    view: {
      extension: "ejs"
    },
    redis: {
      port: 6379,
      host: "127.0.0.1",
      password: ""
    },
    mysql: {
      host: "localhost",
      user: "root",
      password: "91436318",
      database: "test"
    },
    elasticsearch: {
      host: "localhost:9200"
    },
    log: {
      dir: path.join(__dirname, "../log")
    }
  }
}