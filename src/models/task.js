const mongoose = require('mongoose');
// const validator = require('validator');   // Validation package
// Certain things can only be customised when we have an explicitly created schema - such as enabling time stamps.
const taskSchema=new mongoose.Schema({
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
},{
  timestamps: true,
})

const Task = mongoose.model('Task',taskSchema);

module.exports=Task;

// ref: 'User' -> refers to User model.



