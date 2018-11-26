import { Router } from 'express'
import { SignUp, SingIn } from '../controllers/userController'
import SignUpValidation from '../validations/signUpValidation'
import SignInValidation from '../validations/signInValidation'

const route = Router()

route.post('/register', SignUpValidation, SignUp)
route.post('/auth', SignInValidation, SingIn)

export default route