const express = require('express');
require('./db/mongoose');   // Just connects to db.
const User=require("./models/user");
const Task=require("./models/task");

const app = express();
const port = process.env.PORT||3000; // heroku => process.env.PORT

app.use(express.json()); // parses incoming JSON to an object.

app.post('/users',(req,res)=>{
  const user=new User(req.body);
  user.save().then(()=>{
    res.status(201).send(user); // more appropriate status code - "201 Created"
  }).catch((error)=>{
    res.status(400).send(error); // Good RESTful practice to set correct status code. Do before res.send()
  });
  // console.log(req.body);
  // res.send('testing');
})

app.post('/tasks',(req,res)=>{
  const task=new Task(req.body);
  task.save().then(()=>{
    res.status(201).send(task); // more appropriate status code - "201 Created"
  }).catch((error)=>{
    res.status(400).send(error);
  })
})


app.listen(port,()=>{
  console.log("Server is up and running on port "+port);
});



