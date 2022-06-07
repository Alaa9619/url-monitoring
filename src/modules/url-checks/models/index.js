import mongoose from 'mongoose'
import urlChecksSchema from './schema.js'

export const urlChecks = mongoose.model('urlChecks', urlChecksSchema)
