
import mongoose from 'mongoose'
import { PROTOCOLS } from '../constants.js'
import { URL_REGEX } from './constants.js'

const tagSchema = new mongoose.Schema({ name: String })

const urlCheckSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },

  name: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: URL_REGEX
  },

  path: { type: String },

  port: { type: Number },

  webhook: {
    type: String,
    trim: true,
    match: URL_REGEX
  },

  timeout: {
    type: Number,
    default: 5
  },

  interval: {
    type: Number,
    default: 10
  },

  threshold: {
    type: Number,
    default: 1
  },

  assert: {
    statusCode: {
      type: Number
    }
  },

  authentication: {
    username: { type: String },
    password: { type: String }
  },

  httpHeaders: {
    type: [mongoose.Schema.Types.Mixed]
  },

  tags: {
    type: [tagSchema]

  },

  ignoreSSL: {
    type: Boolean,
    required: true
  },

  protocol: {
    type: String,
    enum: [PROTOCOLS],
    required: true
  }

})

export default urlCheckSchema
