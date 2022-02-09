import request from "supertest"
import child_process from 'child_process'

describe("hooks测试", () => {
  it("action text 调用通过", async () => {
    const res = await request("http://localhost:8888/").get("user/getinfo")
    expect(String(res.status)).toMatch(/200|302/)
    // expect(res.text).toEqual("my name is luyuhong")
  })
})