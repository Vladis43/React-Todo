import app from '../app'

app.get('/', (req, res) => {
    res.send('Server is running...')
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})