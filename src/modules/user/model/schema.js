import mongoose from 'mongoose'

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

  password: { type: String, minlength: 6, required: true },

  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },

  verificationCode: {
    type: String,
    unique: true
  }

})

export default UserSchema
