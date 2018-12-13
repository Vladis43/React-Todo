import {Router} from 'express'
import jwt from "jsonwebtoken"

const route = Router()

route.use('/', (request, response, next) => {
    try {
        const bearerHeader = request.headers['authorization']
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        request.userData = jwt.verify(bearerToken, process.env.SECRET_KEY)

        next()
    } catch (error) {
        response.status(403).json({message: 'Authorization failed!'})
    }
})

export default route