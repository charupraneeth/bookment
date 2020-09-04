const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
// const Datastore = require('nedb')
const path = require('path')

// const db = new Datastore('database.db')
// db.loadDatabase()
const database =    require('../db-users') 


function redirectLogin(req,res,next){
    if(!req.session.userId) {
        res.redirect('/login')
    }else{
        next()
    }
}

function redirectSearch(req,res,next){
    if(req.session.userId) {
        res.redirect('/search')
    }else{
        next()
    }
}


router.get('/',redirectSearch,(req,res)=>{
    res.sendFile(path.join(__dirname,'../public','register.html'))
})


router.post('/', redirectSearch,async (req,res)=>{
    const data = req.body
    console.log(data)


    // finding if user exists in DB

    const checkDocs = await database.getUser(data.email)
    // console.log(checkDocs,' this is from registerJS')
    if(!checkDocs.length){
    const timestamp = Date.now()

                try{
                     const salt = await bcrypt.genSalt(10)
                     const hash = await bcrypt.hash(data.password,salt)
                    //  data.password = hash
                    database.addUser(data.name,data.email,hash,timestamp)
                    res.send('<h1>succesfully registered</h1>'+'<br>'+'<a href="/login">Sign in</a>')
                    }
                 catch{
                     res.status(500).send('<h1>sorry there was an error ,try again later</h1>')
                    }

    }
    if(checkDocs.length>=1){
        res.send("<h1>Looks like you're already registered , try loggin in</h2>"+'<br>'+'<a href="/login">Sign in</a>')
    }
})


module.exports = router