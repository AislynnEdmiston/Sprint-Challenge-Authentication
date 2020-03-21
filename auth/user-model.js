const bcrypt = require("bcryptjs")
const db = require("../database/dbConfig")

async function signup(user) {
    user.password = await bcrypt.hash(user.password, 13)

    const [id] = await db("users").insert(user)
    
    return findById(id)
}

async function find() {
    return db("users").select("id", "username")
}

async function findBy(filter) {
    console.log("here")
    return db("users").select("username", "password").where(filter)
}

async function findById(id) {
    return db("users").select("id", "username").where({ id }).first()
}

module.exports = {
    signup,
    find,
    findBy,
    findById
}