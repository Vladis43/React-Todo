import { Router } from 'express'
import Todo from '../models/Todo'

const route = Router()

route.get('/', async (request, response) => {
    try {
        const todo = await Todo.find({})
        response.status(200).json(todo)
    } catch (err) {
        response.status(404).json(err)
    }
})

route.post('/', async (request, response) => {
    const todoTitle = request.body.title

    try {
        const todo = await Todo({title: todoTitle}).save()

        response.status(200).json(todo)
    } catch (err) {
        response.status(404).json(err)
    }
})

route.patch('/:id', async (request, response) => {
    const id = request.params.id
    const completed = request.body.completed

    try {
        const todo = await Todo.findByIdAndUpdate(id, {completed: completed})
        response.status(200).json(todo)
    } catch (err) {
        response.status(404).json(err)
    }
})

route.delete('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const todo = await Todo.findByIdAndDelete(id)
        response.status(200).json(todo)
    } catch (err) {
        response.status(404).json(err)
    }
})

export default route