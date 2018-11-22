import { Router } from 'express'
import { SignUp, SingIn } from '../controllers/userController'

const route = Router()

route.post('/register', SignUp)
route.post('/auth', SingIn)

export default route