import { Router } from 'express'
import mongoose from 'mongoose'
import Todo from '../models/Schema'

mongoose.connect('mongodb://localhost:27017/todo_db')

const route = Router()

route.get('/', (req, res) => {
    //get data from mongodb and pass it to view
    Todo.find({}, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.post('/', (req, res) => {
    //get data from the view and add it to mongodb
    const newTodo = Todo(req.body).save((err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.delete('/:id', (req, res) => {
    //delete the requested item from mongodb
    Todo.findByIdAndRemove({_id: req.params.id}, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

module.exports = route