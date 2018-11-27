import { Router } from 'express'
import { SignUp, Verification, SingIn } from '../controllers/userController'
import SignUpValidation from '../validations/signUpValidation'
import verificationValidation from '../validations/verificationValidation'
import SignInValidation from '../validations/signInValidation'

const route = Router()

route.post('/register', SignUpValidation, SignUp)
route.post('/verification/:vCode', verificationValidation, Verification)
route.post('/auth', SignInValidation, SingIn)

export default route