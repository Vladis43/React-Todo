import {Router} from 'express'
import userController from '../controllers/userController'
import SignUpValidation from '../middlewares/signUpValidation'
import SignInValidation from '../middlewares/signInValidation'

const route = Router()

route.post('/registration', SignUpValidation, userController.SignUp)
route.post('/verification/:user', userController.Verification)
route.post('/authorization', SignInValidation, userController.SingIn)

export default route