import { Router } from 'express'
import mongoose from 'mongoose'
import Todo from '../models/Schema'

mongoose.connect('mongodb://localhost:27017/todo_db')

const route = Router()

route.get('/', (req, res) => {
    Todo.find({}, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.post('/', (req, res) => {
    const todoTitle = req.body.title

    Todo({title: todoTitle}).save((err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.patch('/:id', (req, res) => {
    const id = req.params.id
    const completed = req.body.completed

    Todo.findByIdAndUpdate(id, { completed: completed }, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.delete('/:id', (req, res) => {
    const id = req.params.id

    Todo.findByIdAndRemove(id, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

module.exports = route