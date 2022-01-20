const express=require('express');
const Task=require('../models/task');
const auth=require('../middleware/auth');
const router=new express.Router();

// router.get('/test',(req,res)=>{
//   res.send('Router from task!!!');
// })
// router.post('/tasks',async (req,res)=>{
router.post('/tasks', auth, async (req,res)=>{
  // const task=new Task(req.body);
  const task = new Task({
    // spread operator used to incorporate original object into new object.
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

// app.post('/tasks',(req,res)=>{
//   const task=new Task(req.body);
//   task.save().then(()=>{
//     res.status(201).send(task); // more appropriate status code - "201 Created"
//   }).catch((error)=>{
//     res.status(400).send(error);
//   })
// })

router.get('/tasks',auth, async(req, res)=>{
  try {
    // 2 ways to do this. First option:
    // const tasks=await Task.find({
    //   owner: req.user._id,
    // });
    // Need to send(task) for 1st option.
    // 2nd option:
    await req.user.populate('tasks');
    res.status(200).send(req.user.tasks);
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

router.get('/tasks/:id', auth, async(req,res)=>{
  const _id = req.params.id;
  try {
    // const task=await Task.findById(_id);
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

router.patch('/tasks/:id', auth, async (req, res)=>{
  const updates=Object.keys(req.body);
  const allowedUpdates=['description','completed'];  // Without this mongoose doesn't throw an error if you try to update something that doesn't exist like {'religion':'agnostic'}
  if (!updates.every(v=>allowedUpdates.includes(v))){
    return res.status(400).send({error: "Property to update doesn't exist"})
  }
  try {
    // Need to split out the "save" action so it can be intercepted by the middleware to do a "pre" save update of the plain text password to a hashed password.
    // const task=await Task.findByIdAndUpdate(req.params.id,req.body,{
    //   new:true,
    //   runValidators:true,
    // })
    // The lines below (up to 'await task.save()') replace commented code above. Need to split out findByIdAndUpdate so that the middleware can be used, as it runs "pre" to 'save' running. 
    // const task=await Task.findById(req.params.id);
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

// router.delete('/tasks/:id',async (req,res)=>{
router.delete('/tasks/:id', auth, async (req,res)=>{
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
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