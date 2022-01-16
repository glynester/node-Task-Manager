const mongoose = require('mongoose');
// const validator = require('validator');   // Validation package

const Task = mongoose.model('Task',{
  description: {
    type: String,
    trim: true,
    required:true,
  },
  completed: {
    type: Boolean,
    default: false, 
  }
})

module.exports=Task;


// const task=new Task({
//   description: "         Start to do list.    ",
//   // completed: false,
// })
// task.save().then(()=>{
//   console.log(task);
// }).catch((error)=>{
//   console.log(error);
// })


// db.collection('tasks').updateMany({
  //   completed:false,
  // },{
  //   $set:{
  //     completed: true,
  //   }
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // })
  
  

  // db.collection('tasks').findOne({_id:ObjectId("61e081f9d317d63e11b0b8a9")},(error,task)=>{
  //   console.log(task);
  // })

  // db.collection('tasks').find({completed:false}).toArray((error, tasks)=>{
  //   if (error){
  //     return console.log('Can\'t find tasks');
  //   }
  //   console.log(tasks);
  // })
