import {Router} from 'express'
import jwt from "jsonwebtoken"

const route = Router()

route.use('/', (request, response, next) => {
    try {
        const bearerHeader = request.headers['authorization']
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY)

        if (!decoded) {
            response.status(401).json({message: 'Unauthorized: Invalid token'})
        } else {
            request.userData = decoded
            next()
        }
    } catch (error) {
        response.status(401).json({message: 'Unauthorized: No token provided'})
    }
})

export default route