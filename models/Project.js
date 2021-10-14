const projectCollection = require('../db').db().collection("projects")
const ObjectID = require('mongodb').ObjectID
const User = require('./User')

let Project = function(data){
    this.data = data
    this.errors = []
}

Project.prototype.createProject = function(){
    return new Promise (async (resolve, reject) => {
        await projectCollection.insertOne(this.data).then((info) =>{
            console.log(info)
            resolve()
        })
    })
}