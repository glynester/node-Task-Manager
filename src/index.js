const express = require('express');
require('./db/mongoose');   // Just connects to db.
// const User=require("./models/user");
// const Task=require("./models/task");
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');

const app = express();
const port = process.env.PORT||3000; // heroku => process.env.PORT

app.use(express.json()); // parses incoming JSON to an object.
app.use(userRouter);
app.use(taskRouter);

// // bcryptjs uses promises
// const bcrypt=require('bcryptjs');
// const myfunction=async()=>{
//   const password="Red12345";
//   const hashedPassword=await bcrypt.hash(password,8);  // 2nd arguments is number of hashing rounds to complete.
//   console.log(password);
//   console.log(hashedPassword);
//   const isMatch = await bcrypt.compare(password,hashedPassword)
//   const isNoMatch = await bcrypt.compare("Red123456",hashedPassword)
//   console.log(isMatch?"Match :)":"No Match!!! :(");
//   console.log(isNoMatch?"Match :)":"No Match!!! :(");
// }
// myfunction();

// const router = new express.Router();
// router.get('/test',(req,res)=>{
//   res.send('This is from Test router!!!');
// });
// app.use(router);    // register route with express

app.listen(port,()=>{
  console.log("Server is up and running on port "+port);
});



