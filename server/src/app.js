import express from 'express'
import expressValidator from 'express-validator'
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './config/database'

import todosRouter from './routes/todosRouter'
import usersRouter from './routes/usersRouter'

mongoose.connect(config.database)

const app = express()

app.use(bodyParser.urlencoded({exception: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(expressValidator())

app.use('/todos', todosRouter)
app.use('/users', usersRouter)


export default app