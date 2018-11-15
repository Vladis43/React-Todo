import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.urlencoded({exception: true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world Gaben!')
})

app.post('/todos', (req, res) => {
    console.log(req.body)
})

app.listen(3001, () => {
    console.log('Server is listening to port 3001')
})