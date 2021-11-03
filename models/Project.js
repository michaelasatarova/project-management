const projectCollection = require('../db').db().collection("projects")
const usersCollection = require('../db').db().collection("users")
const ObjectID = require('mongodb').ObjectID

const Project = function(data){
    this.data = data
    this.errors = []
}

//clean input fields before start typing
Project.prototype.cleanUp = function() {
    if (typeof(this.data.project_name) != "string") {this.data.project_name = ""}
    if (typeof(this.data.project_description) != "string") {this.data.project_description = ""}
    if (typeof(this.data.deadline) != "string") {this.data.deadline = ""}
    if (typeof(this.data.status) != "string") {this.data.status = ""}
  }


//validation for projects, every project must have at least title
Project.prototype.validate = function () {
    if (this.data.project_name == "") { this.errors.push("You must provide at least title.")}
  }


//post request create new project
Project.prototype.createProject = function(){
    return new Promise (async (resolve, reject) => {
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
            await projectCollection.insertOne(this.data).then((info) =>{
               /*  console.log(info) */
                resolve(info)
            }).catch(() =>{
                //server error
                this.errors.push("Please try again later.")
                reject(this.errors)
            })
        }else{
             //validation error
            reject(this.errors)
        }
    })
}

//get request get all projects
Project.prototype.getAllProjects = function(){
    return new Promise (async (resolve, reject) => {
        try{
            let allProjects = await projectCollection.find({}).toArray()
            let allUsers = await usersCollection.find({}).toArray()
            let arr3 = [...allProjects, ...allUsers]
              resolve(arr3)
        }catch{
            reject()
        }
    })
}


//delete single project
Project.delete = function(postIdToDelete){
    return new Promise(async (resolve, reject) => {
            try{
                let itemToDelete =  await projectCollection.deleteOne({_id: new ObjectID(postIdToDelete)})
                resolve(itemToDelete)
            }catch{
                reject()
            }
        }
    )
}

//display edit screen for single project
Project.viewEditScreen = function(postIdToRead){
    return new Promise(async (resolve, reject) => {
        try{
            let itemToRead =  await projectCollection.findOne({_id: new ObjectID(postIdToRead)})
              resolve(itemToRead)
        }catch{
            reject()
        }
        }
    )
}

//update
Project.prototype.update = function(postIdToDelete){
    return new Promise (async (resolve, reject) => {   
        try{
            let test = await projectCollection.findOneAndUpdate({_id: new ObjectID(postIdToDelete)}, {$set: 
                {project_name: this.data.project_name,
                project_description: this.data.project_description,
                deadline: this.data.deadline,
                status: this.data.status
                }}, { new: true } )
                resolve("success")
        }catch{
            reject()
        }
    })
}
    

  module.exports = Project
