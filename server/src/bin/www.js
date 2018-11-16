import app from './../app'

app.get('/', (req, res) => {
    res.send('Server is running...')
})

app.listen(3001, () => {
    console.log('Server is listening to port 3001')
})