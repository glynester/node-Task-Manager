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
//   dest: 'images',
//   limits: {
//     fileSize: 1000000,     // 1mb
//   },
//   fileFilter(req, file, cb){   // Will be called internally by multer
//     // if (!file.originalname.endsWith('.pdf')){
//      if (!file.originalname.match(/(\.docx?)$/i)){    // or \.(doc|docx)$
//        return cb(new Error('File must be a word document'))  // something goes wrong
//     }
//     cb(undefined, true);  // if things go well
//     // 3 options: 
//     // cb(new Error('File must be a ... type document'))  // something goes wrong
//     // cb(undefined, true);  // if things go well
//     // cb(undefined, false); // would silently reject upload.
//   }
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
