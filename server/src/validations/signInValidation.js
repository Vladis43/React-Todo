import { Router } from 'express'

const route = Router()

route.use('/', (request, response, next) => {
    request.checkBody('email', 'Email is required!').notEmpty()
    request.checkBody('email', 'Email is not valid!').isEmail()
    request.checkBody('password', 'Password is required!').notEmpty()
    request.checkBody('password', 'Password must be at least 8 characters!').len({min: 8})

    next()
})

export default route