import { App } from "diudiu-core/core/types"

export default (app: App) => {
  return {
    // 环境配置
    devServer: {
      port: 8888
    },
    router: "koa-router",
    // router:"file"
    static: {

    }
  }
}