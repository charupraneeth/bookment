const express = require('express')
const bodyParser = require('body-parser')
const databaseQuery = require('../db')

// const Datastore = require('nedb')
// const db = new Datastore({filename: './databases/books.db'})
// db.loadDatabase()

const router = express.Router()

router.use(bodyParser.urlencoded({extended:true}))

router.post('/',async (req,res)=>{
    const radioValue = req.body.formRadio
    const searchValue = req.body.search

    function capitalizeFirstLettersOfString(str) 
    {
        if(!isNaN(str)) return str
        str = str.split(" ");

        for (let i = 0 ; i < str.length; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substring(1);
        }

        return str.join(" ");
    }



    try{
        const bookCount = await databaseQuery.getBookCount(radioValue,capitalizeFirstLettersOfString(searchValue))
        const bookInfo = await databaseQuery.getBookInfo(radioValue,capitalizeFirstLettersOfString(searchValue))
        console.log(bookCount);
        if(!bookCount) return  res.send('sorry no books found')
        let html = ''
        const mappedBooks = bookInfo.map(book =>{
            return html+=`<div style="background:black;color:white">
                <p>${book.title}</p>
                <p>${book.author}</p>
                <p>${book.isbn}</p>
                <p>${book.year}</p>
            </div>`
        })

        console.log(mappedBooks)
        res.send(html)
    }catch(err){
        console.log(err)
    }

})


module.exports = router