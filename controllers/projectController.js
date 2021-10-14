const Project = require('../models/Project')

// sent data into db, new project created
exports.createProject = function(req, res) {
    let project = new Project(req.body, req.session.user._id)
    project.createProject().then(function() {
      res.send("New project created.")
    }).catch(function(errors) {
      res.send(errors)
    })
  }


  
  //get all projects from db
 exports.getAllProjects =  function(req, res){
    let project = new Project(req.body)
    project.getAllProjects().then((data)=>{
        console.log("toto su data z Controllera",data)
        res.send("uspech")
    }).catch((err)=>{
        res.send("problem")
    })
} 
 
