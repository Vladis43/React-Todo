import { Router } from 'express'

const route = Router()

route.use('/', (request, response, next) => {
    request.checkBody('verificationCode', 'Field is required!').notEmpty()
    request.checkBody('verificationCode', 'Code must be a number!').isNumeric()

    next()
})

export default route