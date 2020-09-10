const Datastore = require('nedb');
const db= {}
db.books = new Datastore({filename:'./databases/books.db',autoload:true})
db.users = new Datastore({filename:'./databases/users.db',autoload:true})
db.reviews = new Datastore({filename:'./databases/reviews.db',autoload:true})
// db.sessions = new Datastore({filename:'./databases/sessions.db'})
// db.sessions.loadDatabase()




exports.getBookCount = (radioValue,searchValue)=>{
    return new Promise((resolve,reject)=>{

        const regexTitle = new RegExp("\\b"+searchValue+"\\b",'ig')
        const regexAuthor = new RegExp(searchValue,'ig')

        if(radioValue === 'title'){
        db.books.count({title:{$regex:regexTitle}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'author'){
        db.books.count({author:{$regex:regexAuthor}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'isbn'){
        db.books.count({isbn:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'year'){

        db.books.count({year:searchValue},(err,count)=>{
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
        db.books.find({title:{$regex:regexTitle}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'author'){
        db.books.find({author:{$regex: regexAuthor}},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'isbn'){
        db.books.find({isbn:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    else if(radioValue === 'year'){

        db.books.find({year:searchValue},(err,count)=>{
            if(err) reject(err)
            resolve(count)
        })
    }
    })
}


// from users.db
exports.addUser = (name,email,password,timestamp)=>{
    user = {
        username:name,
        email:email,
        password:password,
        timestamp:timestamp
    }
    db.users.insert(user)
}

exports.getUser = (email)=>{

    return new Promise((resolve,reject)=>{
        db.users.find({email:email},(err,docs)=>{
            if(err) reject(err)
            resolve(docs)
        })

    })       
}

// from sessions.db

// exports.removeSession = (id)=>{
//     db.sessions.remove({_id:id},{multi:true},(err,numRemoved)=>{
//         if(err) return console.log(err)
//         return console.log(numRemoved+" session columns removed")
//     })
// }

// from reviews.db

exports.getReview = (isbn)=>{
    return new Promise((resolve,reject)=>{
        db.reviews.findOne({isbn:isbn},(err,docs)=>{
            if(err) reject(err)
            resolve(docs)
        })
    })
}
exports.createReview = (data)=>{
    return new Promise((resolve,reject)=>{
        db.reviews.insert(data,(err,docs)=>{
            if(err) reject(err)
            resolve(docs)
        })
    })  
}
exports.addReview = (isbn,reviewObject)=>{
    return new Promise((resolve,reject)=>{
        db.reviews.update({isbn:isbn},{$push:{reviews:reviewObject}},(err,docs)=>{
            if(err) reject(err)
            resolve(docs)
        })
    })
}
