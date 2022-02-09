import { sign, decode } from 'jsonwebtoken'
import { Context, Next } from 'koa'
import { App } from '../types'
export default async (app: App) => {
  
  const loginConfig = app.config.login
  const { secret } = loginConfig
  const { cookieOption } = loginConfig

  if (loginConfig?.needLogin) {
    // 检测是否已经登陆
    
    const checkLogin = (ctx: Context, next: Next) => {
      // 这里默认检测，用户名存在，则通过检测
      const token = ctx.cookies.get("diudiu_token")
      console.log("执行")
      if (!token) {
        // 如果没有token，则需要进行登陆操作
        const jwt = login()
        ctx.cookies.set("diudiu_token", jwt, cookieOption);
        ctx.status = 302
        ctx.redirect(ctx.url)
      }
      else {
        const user = decode(token)
        console.log(user)
        if (user) {
          ctx.user = user
        }
      }
      return next()
    }

    // 这里对接公司内部的SSO的login策略，此处用JWT方式替换
    const login = () => {
      const jwt = sign({ username: "horn" }, secret, { expiresIn: "1h" })
      return jwt
    }
    app.use(checkLogin)
  }
}