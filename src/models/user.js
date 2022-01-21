const mongoose = require('mongoose');
const validator = require('validator');   // Validation package
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Task=require('./task');
// Pass model object to schema
// const userSchema = new mongoose.Schema({*user_model_object});

// After setting unique: true we need to drop database.
// Hash the plain text password before saving.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    unique: true,
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

  },
  tokens:[{
    token: {
      type: String,
      required: true,
    }
  }],
  avatar: {
    type: Buffer,
  }
},{
  timestamps:true,
})

// Reference between user and task is on a virtual field. We don't change what we store for the user document.
userSchema.virtual('tasks',{
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// Instance method to limit data being sent back to user.
// userSchema.methods.getPublicProfile = function(){
  // Second method is just to rename method to "toJSON". In this form it doesn't need to be specifically called on the routes as it did when called "getPublicProfile".
  // How does "toJSON" run without being explicitly called? res.send calls JSON.stringify behind the scenes. The toJSON method runs and only the properties we want to expose are sent back - 
  // see code explanation on index.js
  userSchema.methods.toJSON = function(){
  const user=this;
  const userObject=user.toObject(); // Just raw profile data.
  delete userObject.tokens;
  delete userObject.password;
  return userObject;
}

// Attached to schema methods. Will be accessible on INSTANCES.
// Will need this binding so use a standard function
userSchema.methods.generateAuthToken=async function(){
  const user=this;
  const token = jwt.sign({_id: user._id.toString()},'thisismysecret');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

// Will be accessible on MODEL once set up on statics. 
userSchema.statics.findByCredentials = async(email,password)=>{
  const user=await User.findOne({email});
  if (!user){
    throw new Error('No user with that email - unable to log in');
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if (!isMatch){
    throw new Error('Incorrect password - unable to log in');
  }
  return user;
}

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

// Middleware to delete user tasks when user is removed.
userSchema.pre('remove', async function(next){
  const user=this;
  await Task.deleteMany({
    owner: user._id,
  })

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

