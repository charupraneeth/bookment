const Datastore = require('nedb')
const db = new Datastore({filename: './databases/books.db'})
db.loadDatabase()

exports.getBookCount = (radioValue,searchValue)=>{
    return new Promise((resolve,reject)=>{

        if(radioValue === 'title'){
        db.count({title:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'author'){
        db.count({author:searchValue},(err,count)=>{
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

        if(radioValue === 'title'){
        db.find({title:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'author'){
        db.find({author:searchValue},(err,count)=>{
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