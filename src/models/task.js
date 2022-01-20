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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

module.exports=Task;

// ref: 'User' -> refers to User model.



