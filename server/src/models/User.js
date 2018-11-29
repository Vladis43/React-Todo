import mongoose from 'mongoose'

const Schema = mongoose.Schema

const user = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    age: {
        type: Schema.Types.Number,
        required: true,
    },
    sex: {
        type: Schema.Types.String,
        required: true,
    },
    country: {
        type: Schema.Types.String,
        required: true,
    },
    city: {
        type: Schema.Types.String,
        required: true,
    },
    verificationCode: {
        type: Schema.Types.String
    },
    active: {
        type: Schema.Types.Boolean,
        default: false
    }
})

const User = mongoose.model('User', user)

export default User