import { Router } from 'express'
import Todo from '../models/todosSchema'


const route = Router()

route.get('/', async (req, res) => {
    await Todo.find({}, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.post('/', async (req, res) => {
    const todoTitle = req.body.title

    await Todo({title: todoTitle}).save((err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.patch('/:id', async (req, res) => {
    const id = req.params.id
    const completed = req.body.completed

    await Todo.findByIdAndUpdate(id, { completed: completed }, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

route.delete('/:id', async (req, res) => {
    const id = req.params.id

    await Todo.findByIdAndRemove(id, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

module.exports = route