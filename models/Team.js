
const usersCollection = require('../db').db().collection("users")
const projectsCollection = require('../db').db().collection("projects")
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
            let allprojects = await projectsCollection.find({}).toArray()
            let test = await  usersCollection.aggregate([
                {$lookup: {from: "projects", localField: "username", foreignField: "coder", as: "projects"}},
                {$project: {
                    username:1, 
                    projects:{
                        name:{$arrayElemAt: ["$projects.project_name", 0]},
                        description:{$arrayElemAt: ["$projects.project_description", 0]},
                   },
                    email:1,
                    password:1,
                  }}
              ]).toArray()
            //   console.log(test)
            let arr3 = [...test, ...allprojects]
            resolve(arr3)
        }catch{
            reject()
        }
    })
}

Team.prototype.getProjects = function(){
    return new Promise (async (resolve, reject) => {
        try{
            let allprojects = await projectsCollection.find({}).toArray()
              resolve( allprojects)
        }catch{
            reject()
        }
    })
}



//delete single user
Team.delete = function(userIdToDelete){
  return new Promise(async (resolve, reject) => {
          try{
              let userToDelete =  await usersCollection.deleteOne({_id: new ObjectID(userIdToDelete)})
              console.log("users to delete",userToDelete)
              resolve(userToDelete)
          }catch{
              reject()
          }
      }
  )
}

  module.exports = Team