const mongoose = require('mongoose')
const Schema = mongoose.Schema
const joi = require('joi')

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('Contact', contact)

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const updateStatusSchema = joi.object({
  favorite: joi.boolean().required(),
});

const schemas = {
  addContact: addSchema,
  updateStatusContact: updateStatusSchema,
};

module.exports = {
  Contact,
  schemas,
}