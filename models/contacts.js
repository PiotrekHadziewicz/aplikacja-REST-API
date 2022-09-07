const fs = require('fs').promises
const path = require('path')
const { nanoid } = require('nanoid')
const contactsPath = path.join(__dirname, 'contacts.json')
const updateContactsFile = async (writtenData) => {
  await fs.writeFile(contactsPath, JSON.stringify(writtenData));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const parseData = JSON.parse(data)
  return parseData
}

const getContactById = async (contactId) => {
  const data = await listContacts()
  const selectContact = data.find((contact) => contact.id == contactId)
  return selectContact
}

const removeContact = async (contactId) => {
  const data = await listContacts()
  const deleteContact = data.find(contact => contact.id === contactId)
  const updateContacts = data.filter(contact => contact.id !== contactId)
  await updateContactsFile(updateContacts)
  return deleteContact
}

const addContact = async ( name, email, phone ) => {
  const data = await listContacts()
  const contactToAdd = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  data.push(contactToAdd)
  await updateContactsFile(data)
  return listContacts()
}

const updateContact = async (contactId, { name, email, phone }) => {
  const data = listContacts()
  const newContact = {
    id: `${contactId}`,
    name,
    email,
    phone,
  }
  const selectContact = data.find(contact => contact.id === contactId)
  const selectContactIndex = data.indexOf(selectContact)
  if (selectContactIndex === -1) {
    return null
  } else {
    data.splice(selectContactIndex, 1, newContact)
    await updateContactsFile(data)
  }
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
