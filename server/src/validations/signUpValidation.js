import { Router } from 'express'

const route = Router()

route.use('/', (request, response, next) => {
    request.checkBody('username', 'Username is required!').notEmpty()
    request.checkBody('username', 'Username must be at least 3 characters!').len({min: 3})
    request.checkBody('username', 'Only latin characters!').isAlphanumeric()
    request.checkBody('email', 'Email is required!').notEmpty()
    request.checkBody('email', 'Email is not valid!').isEmail()
    request.checkBody('password', 'Password is required!').notEmpty()
    request.checkBody('password', 'Password must be at least 8 characters!').len({min: 8})
    request.checkBody('passwordConfirm', 'Password do not match!').equals(request.body.password)
    request.checkBody('age', 'Age is required!').notEmpty()
    request.checkBody('age', 'Age must be a number!').isNumeric()
    request.checkBody('sex', 'Sex is required!').notEmpty()
    request.checkBody('country', 'Country is required!').notEmpty()
    request.checkBody('country', 'Only latin characters!').isAlpha()
    request.checkBody('city', 'City is required!').notEmpty()
    request.checkBody('city', 'Only latin characters!').isAlpha()

    next()
})

export default route