const supertest = require("supertest")
const db = require("./database/dbConfig")
const server = require("./api/server")

beforeAll(async () => {
    return db.migrate.rollback(), await db.migrate.latest()
})
afterAll(async () => {
    return await db.migrate.rollback()
})

test("register route", async () => {
    const res = await supertest(server).post("/api/auth/register").send({username: "jane123", password: "password"});
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json")
})

test("login route", async () => {
    const res = await supertest(server).post("/api/auth/login").send({username: "jane123", password: "password"});
    // console.log(res)
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json")
})

test("jokes route", async () => {
    const superTestServer =  supertest(server);

    const res = await superTestServer.get("/api/jokes");

    expect(res.statusCode).toBe(401)
    expect(res.type).toBe("application/json")
})