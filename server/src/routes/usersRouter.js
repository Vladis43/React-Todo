import { Router } from 'express'
import jwt from 'jsonwebtoken'


const route = Router()

route.get('/', (req, res) => {
    res.json({
        message: "Get request is working.."
    })
})

route.post('/', (req, res) => {
    const user = {
        id: 1,
        username: 'Brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({ token })
    })
})

module.exports = route