import mongoose from 'mongoose'

var Schema = mongoose.Schema

var todosDataSchema = new Schema({
    title: String,
    completed: Boolean
},
    {versionKey: false})
