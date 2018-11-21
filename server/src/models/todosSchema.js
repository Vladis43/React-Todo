import mongoose from 'mongoose'

const Schema = mongoose.Schema

const todosSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {versionKey: false})

const Todo = mongoose.model('Todo', todosSchema)

module.exports = Todo