const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const path = require('path')

const database = require('../db') 

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





router.post('/',redirectSearch,async (req,res)=>{
    const data = req.body

    const checkDocs = await database.getUser(data.email)
    // console.log(checkDocs,' this is from loginJS')

    if(!checkDocs.length){
        res.status(403).send('<h1>Sorry user not found </h1> <br> try after registering here <a href="/register">Register</a>' )
        return
    }
    if(checkDocs.length!==1){
        res.status(500).send('<h1>Sorry there was as issue in parsing your request')
        return
    }
    const [user] = checkDocs
    const {email,username,password:hashed,_id:id} = user
    

    async function checkUser(plainPassword,hashedDbPassword){
        const match = await bcrypt.compare(plainPassword,hashedDbPassword)
        try{
            if(match) return true
            else return false
        }
        catch{
            res.status(500).send('<h1>sorry there was an internal error</h1>')
            console.log('sorry there was an error')
        }
    }

    const passwordsMatched = await checkUser(data.password,hashed)

    console.log(passwordsMatched);
    if(!passwordsMatched){
        console.log(`user password did not match for ${email}`)  
        res.send(`<h1>wrong password for ${email}</h1>`)
        return
    }
        req.session.userId = id
        req.session.username = username
        req.session.email = email
        res.redirect('/search')
   
})

router.get('/',redirectSearch,(req,res)=>{
    res.sendFile(path.join(__dirname,'../public','login.html'))
})

module.exports = router
