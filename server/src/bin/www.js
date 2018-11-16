import app from './../app'

app.get('/', (req, res) => {
    res.send('Server is running...')
})

app.listen(8080, () => {
    console.log('Server is listening to port 8080')
})