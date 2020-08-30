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

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }

        return str.join(" ");
    }



    try{
        const bookCount = await databaseQuery.getBookCount(radioValue,capitalizeFirstLettersOfString(searchValue))
        const bookInfo = await databaseQuery.getBookInfo(radioValue,capitalizeFirstLettersOfString(searchValue))
        console.log(bookCount);
        if(!bookCount) return  res.send('sorry no books found')
        res.send(bookInfo)
    }catch(err){
        console.log(err)
    }

})


module.exports = router