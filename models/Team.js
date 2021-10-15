
const usersCollection = require('../db').db().collection("users")
const ObjectID = require('mongodb').ObjectID

let Team = function(data) {
    this.data = data
    this.errors = []
  }

//get request get all members
Team.prototype.getAllMembers = function(){
    return new Promise (async (resolve, reject) => {
        try{
            let allMembers = await usersCollection.find({}).toArray()
              resolve(allMembers)
        }catch{
            reject()
        }
    })
}


  module.exports = Team