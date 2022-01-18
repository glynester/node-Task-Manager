const express=require('express');
const Task=require('../models/task');
const router=new express.Router();

// router.get('/test',(req,res)=>{
//   res.send('Router from task!!!');
// })

router.post('/tasks',async (req,res)=>{
  const task=new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e){
    res.status(400).send(e);
  }
})

// app.post('/tasks',(req,res)=>{
//   const task=new Task(req.body);
//   task.save().then(()=>{
//     res.status(201).send(task); // more appropriate status code - "201 Created"
//   }).catch((error)=>{
//     res.status(400).send(error);
//   })
// })

router.get('/tasks',async(req, res)=>{
  try {
    const tasks=await Task.find({});
    res.status(200).send(tasks);
  } catch(e){
    res.status(500).send(e);
  }
})

// app.get('/tasks',(req, res)=>{
//   Task.find({}).then((tasks)=>{
//     res.status(200).send(tasks);
//   }).catch((error)=>{
//     res.status(500).send();
//   })
// })

router.get('/tasks/:id',async(req,res)=>{
  const _id = req.params.id;
  try {
    const task=await Task.findById(_id);
    if (!task){
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch(e){
    res.status(500).send(e);
  }
})

// app.get('/tasks/:id',(req,res)=>{
//   const _id = req.params.id;
//   Task.findById(_id).then((task)=>{
//     if (!task){
//       return res.status(404).send();
//     }
//     res.status(200).send(task);
//   }).catch((e)=>{
//     res.status(500).send(e);
//   })
// })

router.patch('/tasks/:id',async (req, res)=>{
  const updates=Object.keys(req.body);
  const allowedUpdates=['description','completed'];  // Without this mongoose doesn't throw an error if you try to update something that doesn't exist like {'religion':'agnostic'}
  if (!updates.every(v=>allowedUpdates.includes(v))){
    return res.status(400).send({error: "Property to update doesn't exist"})
  }
  try {
    const task=await Task.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
    })
    if (!task){
      return res.status(404).send({error: "Task doesn't exist"})
    }
    res.status(200).send(task);
  } catch(e){
    res.status(400).send(e);
  }
})

router.delete('/tasks/:id',async (req,res)=>{
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task){
      return res.status(404).send({error: "Task not found"})
    }
    return res.status(200).send(task)
  } catch(e){
    return res.status(500).send(e);
  }
})

module.exports=router;