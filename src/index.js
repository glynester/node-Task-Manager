const express = require('express');
require('./db/mongoose');   // Just connects to db.
// const User=require("./models/user");
// const Task=require("./models/task");
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');

const app = express();
const port = process.env.PORT||3000; // heroku => process.env.PORT

// const multer = require('multer');
// const { request } = require('express');
// // destination folder will be automatically created.
// const upload=multer({
//   dest: 'images'
// })
// // Use multer middleware.
// // multer will look for file named 'uploadFile' in the request. Key of file in postman is 'uploadFile'.
// app.post('/upload', upload.single('uploadFile'), (req,res)=>{
//   res.status(200).send({sucess: "File uploaded correctly"});
// })



app.use(express.json()); // parses incoming JSON to an object.
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
  console.log("Server is up and running on port "+port);
});
