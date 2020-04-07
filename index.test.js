const supertest = require("supertest")
const db = require("./database/dbConfig")
const server = require("./api/server")

test("login route", async () => {
    const res = await supertest(server).get("/api/auth/login")
    // console.log(res)
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("text/html")
})

test("register route", async () => {
    const res = await supertest(server).get("/api/auth/register")
    expect(res.type).toBe("text/html")
})

test("jokes route", async () => {
    // const res = await supertest(server).get("/api/jokes")
    // expect(res.statusCode).toBe(200)
})