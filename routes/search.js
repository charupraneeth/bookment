const express = require('express')
const bodyParser = require('body-parser')
const databaseQuery = require('../db')
const path = require('path')
const fetch = require('node-fetch')

// const Datastore = require('nedb')
// const db = new Datastore({filename: './databases/books.db'})
// db.loadDatabase()

const router = express.Router()
const bookObject = {
    title:'',
    author:'',
    year:'',
    isbn:'',
    rating:''
}

router.use(bodyParser.urlencoded({extended:true}))

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

router.get('/',redirectLogin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../public','search.html'))
})


router.post('/',redirectLogin,async (req,res)=>{
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
        // const bookCount = await databaseQuery.getBookCount(radioValue,capitalizeFirstLettersOfString(searchValue))
        const bookInfo = await databaseQuery.getBookInfo(radioValue,capitalizeFirstLettersOfString(searchValue))
        // console.log(bookCount);
        if(!bookInfo.length) return  res.render('search-book',{message:'Sorry no books found'})
        // let html = ''
        // const mappedBooks = bookInfo.map(book =>{
        //     return html+=`<div style="background:black;color:white">
        //         <p>${book.title}</p>
        //         <p>${book.author}</p>
        //         <p>${book.isbn}</p>
        //         <p>${book.year}</p>
        //     </div>`
        // })
        res.render('search',{books:bookInfo})
    }catch(err){
        console.log(err)
    }
})

router.get('/:isbn',redirectLogin,async (req,res)=>{
    const isbn = req.params.isbn
    if(isNaN(isbn)){
        return res.render('search-book',{message:"Sorry the book you have been looking was not found "})
    }
    try {
        const book = await databaseQuery.getBookInfo('isbn',isbn) 
        if(!book.length){
            return res.render('search-book',{message:"Sorry the book you have been looking was not found "})
        }
        const endpoint = `https://www.goodreads.com/book/review_counts.json?key=${process.env.API_KEY}&isbns=${isbn}`
        const json = await fetch(endpoint)
        const response = await json.json()
        const rating = response.books[0].average_rating
        const docs = await databaseQuery.getReview(isbn)
    
        
        const {title,author,year} = book[0]
        
        // bookObject.title = title
        // bookObject.author = author
        // bookObject.year = year
        // bookObject.rating = rating
        if(docs) return res.render('search-book',{title,author,year,isbn,rating,reviews:docs.reviews})
        return res.render('search-book',{title,author,year,isbn,rating})
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
router.post('/:isbn',async(req,res)=>{

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    const review = req.body.review
    const isbn = req.params.isbn
    const data = {isbn,reviews:[{email:req.session.email,dateTime,review:review}]}
    const reviewObject = {email:req.session.email,review:review} 
    try{
    const reviews = await databaseQuery.getReview(isbn)

    if(reviews){
        const response = await databaseQuery.addReview(isbn,reviewObject)
    }
    else{
        const response = await databaseQuery.createReview(data)
    }
    
    res.redirect(`/search/${isbn}`)
}catch(err){
    console.log(err)
    res.send(err)
}
    // res.render('search-book',{title,author,year,isbn,rating,review})

})


module.exports = router