const mongoose = require('mongoose');
const validator = require('validator');   // Validation package
const bcrypt=require('bcryptjs');
// Pass model object to schema
// const userSchema = new mongoose.Schema({*user_model_object});

const userSchema = new mongoose.Schema({
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
})

// pre and post methods - just before or just after an event.
// first argument is the event name and second is function to run (must be a normal function to bind "this")
userSchema.pre('save',async function(next){
  const user=this;
  // console.log('Just before saving',user);
  // Can now hash password prior to it being saved.
   if (user.isModified('password')){    // Only true when user created or user updates password.
    user.password=await bcrypt.hash(user.password,8);
  }
  // console.log('Just before saving - after pword hash',user);
  next();   // means we're done. Will hang if we don't call next().
})

const User = mongoose.model('User',userSchema);

module.exports = User;


// User model prior to changes for schema to accommodate bcrypt.
// //Define model
// const User = mongoose.model('User',{
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email:{
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value){
//       if (!validator.isEmail(value)){
//         throw new Error('Email format is wrong')
//       }
      
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     // Custom validation provided by using validate function.
//     validate(value){
//       if (value<0){
//         throw new Error('Age must be a positive number')
//       }
//     }
//   },
//   password:{
//     type: String,
//     trim:true,
//     required:true,
//     minLength:7,
//     validate(value){
//       const val=value.trim().toLowerCase();
//       if (val.includes('password')){
//         throw new Error("Password can't equal 'password'")
//       } /*else if (val.length<7){
//         throw new Error("Password must be longer than 6 chars")
//       }*/
//     }

//   }
// });

