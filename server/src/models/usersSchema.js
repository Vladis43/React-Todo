import mongoose from 'mongoose'

const Schema = mongoose.Schema

const usersSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        }
    },
    {versionKey: false})

const User = mongoose.model('User', usersSchema)

module.exports = User