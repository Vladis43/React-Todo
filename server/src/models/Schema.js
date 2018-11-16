import mongoose from 'mongoose'

const Schema = mongoose.Schema

const todosSchema = new Schema({
    title: String,
    completed: Boolean
},
    {versionKey: false})

const Todo = mongoose.model('Todo', todosSchema)

module.exports = Todo