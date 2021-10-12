let express = require('express')
const { MongoClient, ObjectId } = require("mongodb");

let app = express()
let db

app.use(express.static('public'))

let connectionString = 'mongodb+srv://todoappuser:Miminka123@cluster0.2hvch.mongodb.net/TaskManagemant?retryWrites=true&w=majority'
MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  db = client.db()
  app.listen(3000)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// to prve musi byt views to druhe je meno foldra kde  mas templates
app.set('views', 'views')
// to prve musi byt views engine to druhe je meno prípony pre files
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index')
})

//ADD Project
app.post('/create-project', function(req, res) {
    db.collection('projects').insertOne({
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        deadline: req.body.deadline,
        coder: req.body.coder,   
        status: req.body.status   
        }, function() {
      /* res.redirect('/') */
      res.send("thank you")
      console.log(req.body.project_name)
    })
  })