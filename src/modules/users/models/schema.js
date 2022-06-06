import mongoose from 'mongoose'
import { PENDING, VERIFIED } from './constants.js'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
