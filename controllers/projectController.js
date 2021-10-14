const Project = require('../models/Project')

exports.createProject = function(req, res){
    let project = new Project(req.body)
    project.create().then(()=>{
  /*       req.projects ={project_name: project_name} */
        console.log(req.bod)
    /*     req.projects.save(() =>{
            res.redirect('/') */
        })
    }).catch((err) =>{
        console.log(err)
    })
}

