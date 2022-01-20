const express = require('express');
require('./db/mongoose');   // Just connects to db.
// const User=require("./models/user");
// const Task=require("./models/task");
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');

const app = express();
const port = process.env.PORT||3000; // heroku => process.env.PORT

// // Maintenance message
// app.use((req,res,next)=>{
//   res.status(503).send({error: "Maintenance in progress. No access until complete."});      // 503 Service Unavailable
// })

// app.use((req, res, next)=>{
//   // console.log(req.method,req.path);
//   if (req.method==='GET'){
//     res.send('No GET requests today!!!')
//   } else {
//     next();   // Have to call next
//   }
// })


app.use(express.json()); // parses incoming JSON to an object.
app.use(userRouter);
app.use(taskRouter);

// const jwt=require('jsonwebtoken');
// const myfunction=async()=>{
//   const secret='thisismysecret';
//   const token = jwt.sign({_id:'abc123'},'thisismysecret',{ expiresIn: "10 seconds"});// Can use plain english for expiresIn, e.g. 2 weeks or 1 year, etc.
//   console.log(token);
 
//   console.log("1) Verified?: ",jwt.verify(token,secret));
//   // 1) Verified?:  { _id: 'abc123', iat: 1642535112, exp: 1642535122 }
//   try {
//     jwt.verify(token+'XXX',secret);
//   } catch(e){ console.log("2) Verified?: ",e) }
//   // 2) Verified?:  JsonWebTokenError: invalid signature
//   try {
//     jwt.verify(token,secret+'XXX');
//   } catch(e){ console.log("3) Verified?: ",e); }
//   // 3) Verified?:  JsonWebTokenError: invalid signature
//   setTimeout(()=>{
//     try {
//       jwt.verify(token,secret);
//     } catch(e){ console.log("1) Verified?: ",e) }
//     // 1) Verified?:  TokenExpiredError: jwt expired
//     // expiredAt: 2022-01-18T19:45:22.000Z
//     try {
//       jwt.verify(token+'XXX',secret);
//     } catch(e){ console.log("2) Verified?: ",e) }
//     // 2) Verified?:  JsonWebTokenError: invalid signature
//     try {
//       jwt.verify(token,secret+'XXX');
//     } catch(e){ console.log("3) Verified?: ",e); }
//     // 3) Verified?:  JsonWebTokenError: invalid signature
//   },12000);
// }
// myfunction();



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



// demo of features we now have access to
// const Task = require('./models/task');
// const User = require('./models/user');
// const main = async ()=>{
//   // const task = await Task.findById('61e98d1fc3045617555ac01f');
//   // // NB Populate allows us to populate data from a relationship.
//   // // In my version of mongoose the command "task.populate('owner').execPopulate()" is just task.populate('owner')
//   // await task.populate('owner');
//   // // task.owner will now be the whole profile document. Before the populate line was included only the ID of the owner ws returned.
//   // console.log(task.owner);
//   //~~~~~~~~~~~~~~~~~~~
//   const user=await User.findById('61e987435d8384fb55971e80');
//   await user.populate('tasks');
//   console.log(user.tasks);
// }
// main();

// const pet ={
//   name: "BooBoo"
// }

// pet.toJSON=function(){
//   console.log("this=>",this);    // this=> { name: 'BooBoo', toJSON: [Function (anonymous)] }
//   return this;  
//   // return {};          // {}
// }

// calls toJSON
// console.log("JSON.stringify=>",JSON.stringify(pet));   
// JSON.stringify=> {"name":"BooBoo"}
// OR
// JSON.stringify=> {}


