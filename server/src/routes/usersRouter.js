import { Router } from 'express'
import { SignUp, SingIn } from '../controllers/userController'
import SignUpValidation from '../validations/signUpValidation'

const route = Router()

route.post('/register', SignUpValidation, SignUp)
route.post('/auth', SingIn)

export default route