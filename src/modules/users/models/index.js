import mongoose from 'mongoose'
import UserSchema from './schema.js'

export const Users = mongoose.model('users', UserSchema)
