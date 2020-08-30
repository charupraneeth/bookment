const express = require('express')
const Datastore = require('nedb')
const router = express.Router()

const db = new Datastore({filename: './databases/books.db'})
db.loadDatabase()

const app = express()

router.get('/:isbn',(req,res)=>{
    if(isNaN(req.params.isbn)){
        res.send('sorry ISBN must be a number')
        return
    }
    
    db.findOne({isbn:req.params.isbn},(err,docs)=>{
        if(err) console.log(err)
        if(!docs){
            return res.json({ message: "sorry not found"})
            
        }
        res.json(docs)
    })
    
})


module.exports = router