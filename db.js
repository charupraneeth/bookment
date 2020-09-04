const Datastore = require('nedb')
const db = new Datastore({filename: './databases/books.db',autoload:true})


exports.getBookCount = (radioValue,searchValue)=>{
    return new Promise((resolve,reject)=>{

        const regexTitle = new RegExp("\\b"+searchValue+"\\b",'ig')
        const regexAuthor = new RegExp(searchValue,'ig')

        if(radioValue === 'title'){
        db.count({title:{$regex:regexTitle}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'author'){
        db.count({author:{$regex:regexAuthor}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'isbn'){
        db.count({isbn:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'year'){

        db.count({year:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    })
}


exports.getBookInfo = (radioValue,searchValue)=>{
    return new Promise((resolve,reject)=>{

        const regexTitle = new RegExp("\\b"+searchValue+"\\b",'ig')
        const regexAuthor = new RegExp(searchValue,'ig')

        // const regex = new RegExp(searchValue,'ig')

        if(radioValue === 'title'){
        db.find({title:{$regex:regexTitle}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'author'){
        db.find({author:{$regex: regexAuthor}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'isbn'){
        db.find({isbn:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'year'){

        db.find({year:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    })
}