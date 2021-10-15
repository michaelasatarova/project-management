const Project = require('../models/Project')

// sent data into db, new project created
exports.createProject = function(req, res) {
    let project = new Project(req.body, req.session.user._id)
    project.createProject().then(function() {
      req.flash("success", "New post successfully created.")
      res.redirect("/")
    }).catch(function(errors) {
      res.send(errors)
    })
  }


  //delete item according to id
exports.delete = function(req, res){
    Project.delete(req.params.id).then(() =>{
        req.session.save(() => {res.redirect("/")})
    }).catch(function() {
      res.send("Err")
    })
}
  
//show edit item according to id
exports.viewEditScreen = function(req, res){
    let test = Project.viewEditScreen(req.params.id).then((data) =>{
        req.session.save(() => {res.render("editProjectForm", {data: data})
      })
    }).catch(function() {
      res.send("Err")
    })
}

//update edit item according to id
exports.edit = function(req, res){
   let project = new Project(req.body, req.params.id)
    project.update(req.params.id).then(()=>{
        res.redirect("/")
   }).catch(() =>{
    res.send("Err")
   })
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
 
