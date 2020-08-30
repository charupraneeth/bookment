const express = require('express')
const path = require('path')
const app = express()
// const Datastore = require('nedb')
// const db = new Datastore({filename: './databases/books.db'})
// db.loadDatabase()


const port = process.env.PORT || 1337

app.listen(port,console.log(`port ${port} is currently on`))

app.use(express.static(path.join(__dirname,'public')))

app.use('/api',require('./routes/api'))

app.use('/search', require('./routes/search'))