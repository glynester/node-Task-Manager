// CRUD

// const mongodb=require('mongodb');
// const MongoClient=mongodb.MongoClient;
// const ObjectId=mongodb.ObjectId;
const {MongoClient,ObjectId}=require('mongodb');

const connectionURL='mongodb://127.0.0.1:27017';  // Using localhost instead of 127.0.0.1 seems to cause issues
const databaseName='task-manager';

const id = new ObjectId();
// console.log(id,id.getTimestamp());
// console.log(id.id,id.id.length);
// console.log(id.toHexString(),id.toHexString().length);
//Connecting to db is an asynchronous operation
MongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error, client)=>{
  if (error){
    return console.log('Can\'t connect to database');
  }
  // console.log('Connected to database!!!');
  const db=client.db(databaseName);   // connection for specific database.
  db.collection('tasks').deleteOne({
    description: 'Bake cakes',
  }).then((result)=>{
    console.log(result);
  }).catch((error)=>{
    console.log(error);
  })
  
});

// TASKS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

// USERS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

  // db.collection('users').deleteMany({
  //   age: 21,
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // })

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++



