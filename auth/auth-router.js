const router = require('express').Router();
const bcrypt = require("bcryptjs")
const db = require("../database/dbConfig")

// const Users = require("./user-model")

router.post('/register', async (req, res, next) => {
    try {
        const { username } = req.body
        const password = req.body.password

        console.log({username})
        const user = await db("users").select("id", "username", "password").where({ username })
        const hash = await bcrypt.hash(password, 13)
        console.log(req.body)
        if (user === { username }) {
            return res.status(409).json({
                message: "The username is already taken please try again"
            })
        }

        res.status(201).json(await db("users").insert(user))
    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
