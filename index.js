const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var shortid = require('shortid')

var animalRoutes = require('./route/animals.route')

var db = require('./db')

const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'None'
    })
})

app.use('/animals', animalRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})