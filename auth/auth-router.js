const router = require('express').Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../database/dbConfig")
const restrict = require("./authenticate-middleware")

// const Users = require("./user-model")

router.post('/register', async (req, res, next) => {
    try {
        const { username } = req.body
        const credentials = req.body

        const hash = bcrypt.hashSync(credentials.password, 12)
        credentials.password = hash

        const user = await db("users").select("id", "username", "password").where({ username })
        
        if (user === { username }) {
            return res.status(409).json({
                message: "The username is already taken please try again"
            })
        }

        res.status(201).json(await db("users").insert(credentials))
    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await db("users").select("id", "username", "password").where({username}).first()

        const passValid = await bcrypt.compare(password, user.password)

        if(!user || !passValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const payload = {
            userId: user.id
        }

        const token = jwt.sign(payload, process.JWT_SECRET)

        Response.cookie("token", token)

        res.status(200).json({
            message: `Welcome ${user.username}`
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
});

module.exports = router;
