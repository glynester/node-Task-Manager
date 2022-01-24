// New file created for "supertest". Essentially duplicates index.js but has no app.listen call.
// To load in app only for testing, use app.js. dev will continue to use index.js
// Reason for restructuring - We want to access espress application without calling app.listen
const express = require('express');
require('./db/mongoose'); 
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');

const app = express();
// const port = process.env.PORT; // Not required here

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Exported for "supertest"
module.exports = app;
