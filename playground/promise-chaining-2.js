require('../src/db/mongoose');
const Task=require('../src/models/task');


// Model.findByIdAndDelete()
// Task.findByIdAndDelete('61e3e90d9eed0dcd59ba4b90').then((task)=>{
//   console.log(task);
//   return Task.countDocuments({completed:false});
// }).then((countIncompTasks)=>{
//   console.log(countIncompTasks);
// }).catch((error)=>{
//   console.log(error);
// })
//++++++++++++++++++++++++++++++++++++++++++++++

// Above code now converted to async await

const deleteTaskAndCount=async(id)=>{
  const deleted=await Task.findByIdAndDelete(id);  // If not using value can just have "await Task.findByIdAndDelete(id);" without assigning to a variable.
  const count=await Task.countDocuments({completed:true});
  // return count;
  return {deleted,count}
}

deleteTaskAndCount("61e3f969bdec976c1c6249aa").then((result)=>{
  // console.log("Incomplete tasks ="+result);
  console.log("Deleted: "+result.deleted+" Incomplete tasks ="+result.count);
}).catch((e)=>{
  console.log(e);
})
