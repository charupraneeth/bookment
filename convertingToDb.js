// Inserting books.json to books.db

const Datastore = require('nedb')
const fs = require('fs')

const db = new Datastore({filename:'databases/books.db'})
db.loadDatabase()
fs.readFile('./books.json', (err, data) => {
    if (err)
      console.log(err);
    else {
      const json = JSON.parse(data);
    //your code using json object
    db.insert(json,(err) => console.log(err))
    console.log('inserted')
    }
})