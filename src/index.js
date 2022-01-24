const app = require('./app');
const port = process.env.PORT; 

app.listen(port,()=>{
  console.log("Server is up and running on port "+port);
});


// Original file is now mainly in app.js and linked into this file.
// This reconfiguration is to support supertest.