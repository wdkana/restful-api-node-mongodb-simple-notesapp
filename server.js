const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

//db connect
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('====================================');
    console.log('database connected');
    console.log('====================================');
}).catch(err => {
    console.log('====================================');
    console.log('database unconnected');
    console.log('====================================');
    process.exit()
})


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.json({"messages: ": "Hello bray this is homepage"})
})

require('./app/routes/note.routes.js')(app)
app.listen(8001, () => {
    console.log('====================================');
    console.log('server running now...');
    console.log('====================================');
})