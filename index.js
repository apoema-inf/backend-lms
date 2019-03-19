const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const cors = require('cors');

//Middleware for CORS
app.use(cors());

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/conta', db.getContas)
app.get('/mercador', db.getItens)
app.get('/conta/:time', db.getContaByTime)
app.post('/conta', db.createConta)
app.post('/time', db.createTime)
app.get('/time/:id', db.getTimeByNome)
app.put('/conta/:id', db.updateConta)
app.delete('/conta/:id', db.deleteConta)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})