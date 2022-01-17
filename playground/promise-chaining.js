require ('../src/db/mongoose');

const User = require('../src/models/user');

// Model.findByIdAndUpdate()
// 61e3eee861a3a4698c4d8abf

// Don't need to use "$set:" as for native mongodb.
// User.findByIdAndUpdate("61e2eedaa997be8d86bd7bd2",{
//   age: 67,
// }).then((user)=>{
//   console.log(user);
//   return User.countDocuments({age:67})
// }).then((usersCnt)=>{
//   console.log(usersCnt);
// })
// .catch((error)=>{
//   console.log(error);
// });
// +++++++++++++++++++++++++++++++++++++++++++++++++

const updateAgeAndCount=async(id,age)=>{
  const user= await User.findByIdAndUpdate(id,{
    age,
  })
  const count= await User.countDocuments({age});
  // Could return an object with user "document" from first await and count (from 2nd await) as properties
  return count;
}
updateAgeAndCount("61e3eee861a3a4698c4d8abf",67).then((result)=>{
  console.log("There were " + result + " users");
}).catch((error)=>{
  console.log(error);
})