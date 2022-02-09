export default {
  method: "GET",
  handler: async (ctx) => {
    if (ctx.user) {
      console.log(ctx.request.body.name)
      const { username } = ctx.user
      console.log(username)
      ctx.body = `my name is luyuhong`
    }
    else { ctx.body = `please login` }
  }
}


// bodyparser
// export default {
//   method: "POST",
//   handler: async (ctx) => {
//     if (ctx.user) {
//       console.log(ctx.request.body.name)
//       const { username } = ctx.user
//       ctx.body = `welcome ${username}`
//     }
//     else { ctx.body = `please login` }
//   }
// }

// redis
// export default {
//   method: "GET",
//   handler: async (ctx) => {
//     await ctx.redis.set(`luyuhong:server`, "luyuhong")
//     ctx.body = "my name is luyuhong"
//   }
// }


// mysql
// export default {
//   method: "GET",
//   handler: async (ctx) => {
//     const sql = `INSERT INTO Students(name,age,score) VALUES(?,?,?)`
//     console.log(ctx.mysql)
//     try {
//       const results = await ctx.mysql.execute(sql, ["lyh", "30", "100"],)
//       console.log("the results is", results)
//     } catch (error) {
//       throw error
//     }

//     ctx.body = `my name is luyuhong`
//   }
// }

// es
// export default {
//   method: "GET",
//   handler: async (ctx) => {
//     await ctx.elasticsearch.create({
//       index: "student",
//       type: "_doc",
//       id: "1",
//       body: {
//         name: "luyuhong",
//         score: "100",
//         age: 29
//       }
//     })
//     ctx.body = `my name is luyuhong`
//   }
// }