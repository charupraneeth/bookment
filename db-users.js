const Datastore = require('nedb')
const db = new Datastore({filename:'./databases/users.db'})
db.loadDatabase()



exports.addUser = (name,email,password,timestamp)=>{
    user = {
        username:name,
        email:email,
        password:password,
        timestamp:timestamp
    }
    db.insert(user)
}

exports.getUser = (email)=>{

    return new Promise((resolve,reject)=>{
        db.find({email:email},(err,docs)=>{
            if(err) reject(err)
            resolve(docs)
        })

    })       
}
