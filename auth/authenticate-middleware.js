// const jwt = require("jsonwebtoken")
const db = require("../database/dbConfig")
const bcrypt = require("bcryptjs")



function restrict() {
  
    const authErr = {
      message: "invalid credentials",
    }

    return async (req, res, next) => {
      try {
        
        if(!req.session || !req.session.user){
          return res.status(401).json(authErr)
        }

        next()
      } catch (error) {
        next(error)
      }
    }
}

module.exports = restrict


