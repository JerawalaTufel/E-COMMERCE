const Mongoose = require('mongoose');
const { USER_TYPE ,ACCOUNT_STATUS } = require('../services/Constant');

const User = new Mongoose.Schema({
    name: {
        type: String,
        maxLength: 60,
        required: true
      },
      email: {
        type: String,
        maxLength: 60,
        trim: true,
        lowercase: true,
        default: null
      },
      password: {
        type: String,
        required: true
      },
      user_type: {
        type: Number,
        enum: [USER_TYPE.SUPER_ADMIN, USER_TYPE.SUB_ADMIN, USER_TYPE.USER],
        default: USER_TYPE.USER,
        required: true
      },
      status: {
        type: Number,
        enum: [ACCOUNT_STATUS.INACTIVE, ACCOUNT_STATUS.ACTIVE, ACCOUNT_STATUS.DELETED],
        default: ACCOUNT_STATUS.INACTIVE
      },
      dob: {
        type: String,
        default: null
      },
      otp: {
        type : Number,
        default: null
      }
})

exports.User = Mongoose.model('User' , User)