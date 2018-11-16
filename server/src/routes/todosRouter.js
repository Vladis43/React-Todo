import { Router } from 'express'

const route = Router()

route.post('/', (req, res) => {
    console.log(req.body)
})

module.exports = route