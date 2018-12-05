import {Router} from 'express'
import {SignUp, Verification, SingIn} from '../controllers/userController'
import SignUpValidation from '../validations/signUpValidation'
import SignInValidation from '../validations/signInValidation'

const route = Router()

route.post('/registration', SignUpValidation, SignUp)
route.post('/verification/:vCode', Verification)
route.post('/authorization', SignInValidation, SingIn)

export default route