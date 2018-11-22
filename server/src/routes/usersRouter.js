import { Router } from 'express'
import { SignUp, SingIn } from '../controllers/userController'
import Todo from "../models/Todo"

const route = Router()

route.get('/register', async (request, response) => {
    try {
        response.status(200).json('register')
    } catch (err) {
        response.status(404).json(err)
    }
})

route.post('/register', SignUp)
route.post('/auth', SingIn)

export default route