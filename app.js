const express = require('express')
require('dotenv').config()
const path = require('path')
const app = express()

const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const databaseQuery = require('./db')

const NedbStore = require('nedb-session-store')(session);

// const Datastore = require('nedb')
// const db = new Datastore({filename: './databases/books.db'})
// db.loadDatabase()

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// app.get('/',(req,res)=>{
//     res.render('home')
// })


const port = process.env.PORT || 1337

app.listen(port,console.log(`port ${port} is currently on`))

app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set('trust proxy',1)

app.use(express.static(path.join(__dirname,'public')))

const inProduction =  app.get('env') === 'production'
app.use(session({
    name:process.env.SESSION_NAME,
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET,
    cookie:{
        maxAge:1000*60*3,
        sameSite:true,
        secure:inProduction
    },
    store: new NedbStore({filename:'./databases/sessions.db'}),
    unset:"destroy"
}))

// setting up limit of json 
// app.use(express.json({limit:'1mb'}))

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

app.use('/api',require('./routes/api'))

// getting terms route
app.get('/terms',(req,res)=>{
    res.status(500).send(`<div style="text-align:center"><h1 >We'll post it <br> as soon as we make it</h1><a href='/register'>Go back</a></div>`)
})

app.use('/register',require('./routes/register'))

app.use('/login',require('./routes/login'))

app.use('/search',require('./routes/search'))


// app.use('/home',redirectLogin,require('./routes/home'))



app.use('/search', require('./routes/search'))


app.get('/logout',redirectLogin,(req,res)=>{
    // databaseQuery.removeSession(req.session.userId)
    req.session.destroy(err=>{
        if(err) return res.redirect('/search')
    })

    res.clearCookie(process.env.SESSION_NAME)

    res.redirect('/login')
})

