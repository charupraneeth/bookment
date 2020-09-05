const express = require('express')
const Datastore = require('nedb')
const router = express.Router()
const databaseQuery = require('../db')



const app = express()

router.get('/:isbn',async(req,res)=>{
    if(isNaN(req.params.isbn)){
        res.send('sorry ISBN must be a number')
        return
    }

    try {
        const book = await databaseQuery.getBookInfo('isbn',req.params.isbn) 
        if(!book.length){
            return res.send('sorry no books found')
        }
        const {isbn,title,author,year} =json = book[0]
        return res.send({"isbn":isbn,"title":title,"author":author,"year":year})
        
    } catch (error) {
        console.log(error)
        res.send(err)
    }
    
})


module.exports = router