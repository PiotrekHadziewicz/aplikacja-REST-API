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
})

const updateStatusSchema = joi.object({
  favorite: joi.boolean().required(),
})

const contactSchemas = {
  addContact: addSchema,
  updateStatusContact: updateStatusSchema,
}

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    avatarURL: {
      type: String,
      required: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
)

const registrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(6).required(),
})

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().min(6).required(),
})

const emailSchema = joi.object({
  email: joi.string().required(),
})

const userSchemas = {
  registration: registrationSchema,
  login: loginSchema,
  email: emailSchema,
}

const User = mongoose.model('user', user)

module.exports = {
  Contact,
  contactSchemas,
  User,
  userSchemas,
}