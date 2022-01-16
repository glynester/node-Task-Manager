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

app.get('/tasks',(req, res)=>{
  Task.find({}).then((tasks)=>{
    res.status(200).send(tasks);
  }).catch((error)=>{
    res.status(500).send();
  })
})

app.get('/tasks/:id',(req,res)=>{
  const _id = req.params.id;
  Task.findById(_id).then((task)=>{
    if (!task){
      return res.status(404).send();
    }
    res.status(200).send(task);
  }).catch((error)=>{
    res.status(500).send();
  })

})

app.get('/users',(req,res)=>{
  User.find({}).then((users)=>{
    res.status(200).send(users);
  }).catch((error)=>{
    res.status(500).send();    // 500 Internal Server Error
  })
})

app.get('/users/:id',(req,res)=>{
  const _id=req.params.id;  // Mongoose auto converts string ID into object ID. No need to run ObjectId(_id),
  User.findById(_id).then((user)=>{
    // console.log(req.params);    // { id: '61e3efd0f58abbec4eb8a56b' }
    if (!user){
      return res.status(404).send();
    }
    res.status(200).send(user);   // Defaults to 200 anyway so don't really need to set it.
  }).catch((error)=>{
    res.status(500).send(error);
  })
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



