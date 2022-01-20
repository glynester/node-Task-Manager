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


