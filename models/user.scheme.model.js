
const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({

    lastName: {
        type: String,
        required: true
    },

        name: {
            type: String,
            required: true
        },

    patronymic: {
        type: String,
        default: "None"
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    message: {
        type: String,
        required: true
    }

}, {versionKey: false})

module.exports = mongoose.model('spamers', UserSchema)