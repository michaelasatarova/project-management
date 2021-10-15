const projectCollection = require('../db').db().collection("projects")
const ObjectID = require('mongodb').ObjectID
const User = require('./User')

const Project = function(data){
    this.data = data
    this.errors = []
}

//post request create new project
Project.prototype.createProject = function(){
    return new Promise (async (resolve, reject) => {
        await projectCollection.insertOne(this.data).then((info) =>{
           /*  console.log(info) */
            resolve()
        })
    })
}

//get request get all projects
Project.prototype.getAllProjects = function(){
    return new Promise (async (resolve, reject) => {
      let allProjects = await projectCollection.find({}).toArray()
        resolve(allProjects)
        })
    }



Project.prototype.validate = function () {
    if (this.data.project_name == "") { this.errors.push("You must provide a title.") }
  }

//todo
//pridat validacie a dokoncit všetky funkcie druhu čast




//delete single project
Project.delete = function(postIdToDelete){
    return new Promise(async (resolve, reject) => {
          let itemToDelete =  await projectCollection.deleteOne({_id: new ObjectID(postIdToDelete)})
            resolve(itemToDelete)
        }
    )
}

//display edit screen for single project
Project.viewEditScreen = function(postIdToDelete){
    return new Promise(async (resolve, reject) => {
          let testik =  await projectCollection.findOne({_id: new ObjectID(postIdToDelete)})
            resolve(testik)
        }
    )
}

//update
Project.prototype.update = function(postIdToDelete){
    return new Promise (async (resolve, reject) => {
        
        let test = await projectCollection.findOneAndUpdate({_id: new ObjectID(postIdToDelete)}, {$set: 
            {project_name: this.data.project_name,
            project_description: this.data.project_description,
            deadline: this.data.deadline,
            status: this.data.status
            }}, { new: true } )
             console.log("toto posles", postIdToDelete)/
            resolve("success")
        })
}
    

  module.exports = Project