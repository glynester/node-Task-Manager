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



