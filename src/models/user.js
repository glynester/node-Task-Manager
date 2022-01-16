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

// Create instance
// const me=new User({
//   name:'     Renata    ',
//   age: 67 ,
//   email: '  rens@poota.cOm   ',
//   password: '123456',
// })
// // Save instance to database - use method on instance
// me.save().then(()=>{
//   console.log(me);
// }).catch((error)=>{
//   console.log('Error: ',error);
// })

// db.collection('users').updateOne({
  //   _id: new ObjectId('61e06dfc46973ff8605a2a59')
  // },{
  //   $inc:{
  //     age:1
  //   },
  //   // $set: {
  //   //   name:"BobCat"
  //   // },
  //   // If we were using callbacks we would provide a 3rd argument here.
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // })

// 61e07d77a2f395efe3d996f2
  //Search object examples: {name:"g2",age:1,}
  // db.collection('users').findOne({_id:new ObjectId("61e07d77a2f395efe3d996f2"),},(error,user)=>{
  //   if (error){
  //     return console.log('Can\'t find user');
  //   }
  //   console.log(user);
  // })
  // db.collection.find( { qty: { $gt: 4 } } )

  // db.collection('users').find({age:21}).toArray((error,users)=>{
  //   if (error){
  //     return console.log('Can\'t find users');
  //   }
  //   console.log(users,users.length);
  // })
  // db.collection('users').find({age:21}).count((error,countUsers)=>{
  //   if (error){
  //     return console.log('Can\'t find users');
  //   }
  //   console.log(countUsers);
  // })

  // db.collection('users').insertOne({
  //   // _id: id,
  //   name:'Jon',
  //   age: 33,
  // },(error, result)=>{
  //   if (error){
  //     return console.log('Unable to insert user');
  //   }
  //   // NB ops property - see API docs
  //   console.log("result=>",result);  // {acknowledged: true, insertedId: new ObjectId("61e07bbf9a799ced6bee2be3")}
  // })
  // db.collection('users').insertMany([
  //   {
  //     name:'g1',
  //     age: 30
  //   },
  //   {
  //     name:'g2',
  //     age: 31
  //   }
  // ],(error, result)=>{
  //   if (error){
  //     return console.log('Unable to insert multiple users');
  //   }
  //   console.log("result=>",result);
  // })
  // db.collection('tasks').insertMany([
  //   {
  //     description:"Iron sheets",
  //     completed: true,
  //   },
  //   {
  //     description:"Bake cakes",
  //     completed: false,
  //   }, 
  //   {
  //     description:"Paint bedroom",
  //     completed: false,
  //   }
  // ],(error,result)=>{
  //   if (error){
  //       return console.log('Unable to insert multiple users');
  //     }
  //     console.log("result=>",result);
  // })