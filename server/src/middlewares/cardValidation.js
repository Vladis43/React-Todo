import {Router} from 'express'

const route = Router()

route.use('/', (request, response, next) => {
    request.checkBody('title', 'Title is required!').notEmpty()
    request.checkBody('description', 'Description is required!').notEmpty()

    next()
})

export default route