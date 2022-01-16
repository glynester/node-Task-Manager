const mongoose = require('mongoose');
const validator = require('validator');   // Validation package


//Define model
const User = mongoose.model('User',{
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if (!validator.isEmail(value)){
        throw new Error('Email format is wrong')
      }
      
    }
  },
  age: {
    type: Number,
    default: 0,
    // Custom validation provided by using validate function.
    validate(value){
      if (value<0){
        throw new Error('Age must be a positive number')
      }
    }
  },
  password:{
    type: String,
    trim:true,
    required:true,
    minLength:7,
    validate(value){
      const val=value.trim().toLowerCase();
      if (val.includes('password')){
        throw new Error("Password can't equal 'password'")
      } /*else if (val.length<7){
        throw new Error("Password must be longer than 6 chars")
      }*/
    }

  }
});

module.exports = User;

