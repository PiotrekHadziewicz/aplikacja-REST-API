const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const path = require("path")
const fs = require("fs").promises
const avatarsDir = path.join(process.cwd(), "public", "avatars")
const { User, userSchemas } = require('../../models/schema')
const { SECRET_KEY } = process.env

const listCurrent = async (req, res) => {
  const { name, email, subscription } = req.user
  res.json({
    name,
    email,
    subscription,
  })
}

const registration = async (req, res) => {
  const { error } = userSchemas.registration.validate(req.body)
  if (error) {
    res.status(400).json({ message: "Incorrect format of entered data" })
    return
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(409).json({ message: "Email in use" })
    return
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const result = await User.create({ ...req.body, password: hashPassword, avatarURL })
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
      avatarURL: avatarURL,
    },
  })
}

const login = async (req, res) => {
  const { error } = userSchemas.login.validate(req.body)
  if (error) {
    res.status(400).json({ message: "Incorrect format of entered data" })
    return
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" })
    return
  }
  const comparePassword = await bcrypt.compare(password, user.password)
  if (!comparePassword) {
    res.status(401).json({ message: "Email or password is wrong" })
    return
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: "" })
  res.status(204).send()
}

const setAvatar = async (req, res) => {
  try {
    const { _id } = req.user
    const { path: tempPath, originalname } = req.file
    const [extension] = originalname.split(".").reverse()
    const newName = `${_id}.${extension}`
    const uploadPath = path.join(avatarsDir, newName)
    await fs.rename(tempPath, uploadPath)
    const avatarURL = path.join("avatars", newName)
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
      avatarURL,
    })
  } catch (error) {
    await fs.unlink(req.file.path)
    throw error
  }
}

module.exports = {
  listCurrent,
  login,
  logout,
  registration,
  setAvatar,
}