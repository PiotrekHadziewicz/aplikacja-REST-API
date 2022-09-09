const jwt = require("jsonwebtoken")
const { User } = require('../../models/schema')
const { SECRET_KEY } = process.env

const authorization = async (req, res, next) => {
  const { auth = "" } = req.headers
  const [bearer, token] = auth.split(" ")
  if (bearer !== "Bearer") {
    next(res.status(401).json({ message: "Not authorized" }))
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.token) {
      next(res.status(401))
    }
    req.user = user
    next()
  } catch (error) {
    next(res.status(401).json({ message: "Not authorized" }))
  }
}

module.exports = { authorization }