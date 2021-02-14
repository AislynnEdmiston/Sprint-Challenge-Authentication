const router = require('express').Router();
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
const db = require("../database/dbConfig")


const Users = require("./user-model")

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

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await Users.findBy({ username }).first();
		const passwordValid = await bcrypt.compare(password, user.password);
		if (!user || !passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials"
			});
		}
		req.session.user = user;
		res.json({
			message: `Welcome ${user.username}!`
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
