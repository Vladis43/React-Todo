import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import todosRouter from './routes/todosRouter'

const app = express()

app.use(bodyParser.urlencoded({exception: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/todos', todosRouter)


module.exports = app