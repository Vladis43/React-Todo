import mongoose from 'mongoose'

const Schema = mongoose.Schema

const todo = new Schema({
        title: {
            type: Schema.Types.String,
            required: true
        },
        completed: {
            type: Schema.Types.Boolean,
            default: false
        }
    })

const Todo = mongoose.model('Todo', todo)

export default Todo