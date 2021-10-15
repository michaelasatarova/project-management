
const Team = require('../models/Team')

exports.home = function(req, res) {
    //when user is log in
    if (req.session.user) {
     let teamMember = new Team(req.body)
      teamMember.getAllMembers().then((data)=>{
          if(data){
            console.log("toto su data", data)
            res.render('members', {data: data })
          }else{
            res.send("on this page are no data")
          }
      }).catch((err)=>{
          res.send("problem")
      }) 
      //when user is not log in, flash tie errory z db automaticky vymaze po pouziti
    } else {
      res.render('login', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
  }