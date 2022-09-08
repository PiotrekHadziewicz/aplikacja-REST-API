const express = require('express')
const {
  get,
  getById,
  remove,
  add,
  update,
  updateStatus,
} = require('./serviceFunctions')

const router = express.Router()

router.get('/', get)

router.get('/:id', getById)

router.post('/', add)

router.delete('/:id', remove)

router.put('/:id', update)

router.patch('/:id/favorite', updateStatus)

module.exports = router
