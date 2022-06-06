import mongoose from 'mongoose'
import { EMAIL_REGEX, PENDING, VERIFIED } from './constants.js'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: EMAIL_REGEX
  },

  password: { type: String, minlength: 8, required: true },

  status: {
    type: String,
    enum: [PENDING, VERIFIED],
    default: PENDING
  },

  verificationToken: {
    type: String,
    unique: true
  }

})

export default UserSchema
