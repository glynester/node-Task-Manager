const express=require('express');
const Task=require('../models/task');
const auth=require('../middleware/auth');
const router=new express.Router();

router.post('/tasks', auth, async (req,res)=>{
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  })
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e){
    res.status(400).send(e);
  }
})

// get /tasks?completed=true
router.get('/tasks',auth, async(req, res)=>{
  try {
    const match={};
    if (req.query.completed){
      match.completed=req.query.completed==="true";
    }
    // const tasks=await Task.find({ owner: req.user._id, });  // Another way to do this!
    // await req.user.populate('tasks');
    await req.user.populate({
      path: 'tasks',
      match,
    });
    res.status(200).send(req.user.tasks);
  } catch(e){
    res.status(500).send(e);
  }
})

router.get('/tasks/:id', auth, async(req,res)=>{
  const _id = req.params.id;
  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    })
    if (!task){
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch(e){
    res.status(500).send(e);
  }
})

router.patch('/tasks/:id', auth, async (req, res)=>{
  const updates=Object.keys(req.body);
  const allowedUpdates=['description','completed'];
  if (!updates.every(v=>allowedUpdates.includes(v))){
    return res.status(400).send({error: "Property to update doesn't exist"})
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id, 
      owner: req.user._id,
    })
    if (!task){
      return res.status(404).send({error: "Task doesn't exist"})
    }
    updates.forEach(update=>task[update]=req.body[update]);
    await task.save();
    res.status(200).send(task);
  } catch(e){
    res.status(400).send(e);
  }
})

router.delete('/tasks/:id', auth, async (req,res)=>{
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })
    if (!task){
      return res.status(404).send({error: "Task not found"})
    }
    return res.status(200).send(task)
  } catch(e){
    return res.status(500).send(e);
  }
})

module.exports=router;