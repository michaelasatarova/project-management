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
            console.log(info)
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


  module.exports = Project