import express from 'express'
import expressValidator from 'express-validator'
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './config/database'

import todoRouter from './routes/todoRouter'
import cardRouter from './routes/cardRouter'
import userRouter from './routes/userRouter'

mongoose.connect(config.DATABASE)

const app = express()

//Middleware
app.use(bodyParser.urlencoded({exception: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(expressValidator())

//Routes
app.use('/todos', todoRouter)
app.use('/cards', cardRouter)
app.use('/users', userRouter)

export default app