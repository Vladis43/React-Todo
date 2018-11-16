import { Router } from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/todo_db')

const route = Router()

route.post('/', (req, res) => {
    console.log(req.body)
})

module.exports = route