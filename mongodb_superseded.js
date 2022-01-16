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
  
  // db.collection('users').deleteMany({
  //   age: 21,
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // })

});


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


