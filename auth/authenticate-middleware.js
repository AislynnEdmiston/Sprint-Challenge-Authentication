const jwt = require("jsonwebtoken")

function restrict() {
  const authErr = {
    message: "invalid credentials",
  }

  return async (req, res, next) => {
    try {
      const { token } = req.cookies

      if(!token) {
        return res.status(401).json(authErr)
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authErr)
        }

        req.token = decoded

        next()
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restrict


