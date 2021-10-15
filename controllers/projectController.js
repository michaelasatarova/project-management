const Project = require('../models/Project')

// sent data into db, new project created
exports.createProject = function(req, res) {
    let project = new Project(req.body, req.session.user._id)
    project.createProject().then(function() {
      res.redirect("/")
    }).catch(function(errors) {
      res.send(errors)
    })
  }


  //delete item according to id
exports.delete = function(req, res){
    Project.delete(req.params.id).then(() =>{
        req.session.save(() => {res.redirect("/")})
    })
}
  
//show edit item according to id
exports.viewEditScreen = function(req, res){
/*     console.log("tu som", req.params.id) */
    let test = Project.viewEditScreen(req.params.id).then((data) =>{
        req.session.save(() => {res.render("editProjectForm", {data: data})
/*         console.log("test",data) */
    })
    })
}

//update edit item according to id
exports.edit = function(req, res){
   let project = new Project(req.body, req.params.id)
    project.update(req.params.id).then(()=>{
        res.redirect("/")
   }).catch(() =>{
    res.send("fail")
   })
   console.log("toto dostanes", project)
}


  //get all projects from db but it is done in exports.home
/*  exports.getAllProjects =  function(req, res){
    let project = new Project(req.body)
    project.getAllProjects().then((data)=>{
        console.log("toto su data z Controllera",data)
        res.send("uspech")
    }).catch((err)=>{
        res.send("problem")
    })
}  */
 
