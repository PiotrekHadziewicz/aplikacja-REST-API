const express = require('express')
const { authorization } = require('./usersAuth')
const {
  listCurrent,
  login,
  logout,
  registration,
} = require('./usersFunctions')

const router = express.Router()

router.post('/signup', registration)

router.post('/login', login)

router.get('/logout', authorization, logout)

router.get('/current', authorization, listCurrent)

module.exports = router