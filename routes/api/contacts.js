const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

const router = express.Router()
const joi = require('joi')
const contactSchema = joi.object({
  name:joi.string().required(),
  email:joi.string().required(),
  phone:joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await getContactById(id)
    if (!result || result === undefined) {
      res.status(404).json({ message: 'Not found' })
    } else {
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(404).json({ message: error.message})
    } else {
      const result = await addContact(name, email, phone)
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await removeContact(id)
    if (!result) {
      res.status(404).json({ message: 'Not found'})
    } else {
      res.status(204).json({ message: 'User deleted'})
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone } = req.body
  const { error } = contactSchema.validate(req.body)
  try {
    if (error) {
      res.status(400).json({ message: 'Missing required name field' })
      return
    }
    const result = await updateContact(id, { name, email, phone })
    if (!result) {
      res.status(404).json({ message: 'Not found'})
    } else {
      res.json(result)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
