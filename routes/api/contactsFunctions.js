const { Contact, contactSchemas } = require('../../models/schema')

const get = async (req, res) => {
    const result = await Contact.find()
    return res.json(result)
}

const getById = async (req, res) => {
  const { id } = req.params
    const result = await Contact.findById(id)
    if (!result || result === undefined) {
      res.status(404).json({ message: 'Not found' })
    } else {
      res.json(result)
    }
}

const remove = async (req, res) => {
  const { id } = req.params
    const result = await Contact.findByIdAndRemove(id)
    if (!result) {
      res.status(404).json({ message: 'Not found'})
    } else {
      res.status(204).json({ message: 'User deleted'})
    }
}

const add = async (req, res) => {
    const { error } = contactSchemas.addContact.validate(req.body)
    if (error) {
      res.status(400).json({ message: "missing required name field"})
    } else {
      const result = await Contact.create(req.body)
      res.status(201).json(result)
    }
}

const update = async (req, res) => {
  const { id } = req.params
  const { error } = contactSchemas.addContact.validate(req.body)
    if (error) {
      res.status(400).json({ message: 'Missing required name field' })
      return
    }
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    if (!result) {
      res.status(404).json({ message: 'Not found'})
    } else {
      res.json(result)
    }
}

const updateStatus = async (req, res) => {
  const { id } = req.params
  const { error } = contactSchemas.updateStatusContact.validate(req.body)
    if (error) {
      res.status(400).json({ message: "missing field favorite" })
      return
    }
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    if (!result) {
      res.status(404).json({ message: "Not found" })
      return
    }
    res.json(result)
}

module.exports = {
    get,
    getById,
    remove,
    add,
    update,
    updateStatus,
}