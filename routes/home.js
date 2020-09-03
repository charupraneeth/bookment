const express = require('express')

const app = express()
const router = express.Router()

function redirectLogin(req,res,next){
    if(!req.session.userId) {
        res.redirect('/login')
    }else{
        next()
    }
}

function redirectHome(req,res,next){
    if(req.session.userId) {
        res.redirect('/home')
    }else{
        next()
    }
}

router.get('/',redirectLogin,(req,res)=>{
    res.send(`<h1>Successfully logged in </h1>
    <ul>
    <li>Name :${req.session.username}</li>
    <li>Email :${req.session.email}</li>
    </ul>
    <a href="/logout">Logout</a>
    `)
})

module.exports = router