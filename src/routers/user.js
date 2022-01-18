const express=require('express');
const User=require('../models/user')
const router=new express.Router();
// router.get('/test',(req,res)=>{
//   res.send('New user route working!!!');
// })
// Need to change app.post to router.post. "app" no longer exists in this file.
router.post('/users',async(req,res)=>{
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch(e){
    res.status(400).send(e);
  }
})

// Plain text passwords might be provided to our app at creat user and update user.

// app.post('/users',(req,res)=>{
//   const user=new User(req.body);
//   user.save().then(()=>{
//     res.status(201).send(user); // more appropriate status code - "201 Created"
//   }).catch((error)=>{
//     res.status(400).send(error); // Good RESTful practice to set correct status code. Do before res.send()
//   });
//   // console.log(req.body);
//   // res.send('testing');
// })

router.get('/users',async(req,res)=>{
  try {
    const users=await User.find({});
    return res.status(200).send(users);
  } catch(e){
    return res.status(500).send(e);
  } 
})

// app.get('/users',(req,res)=>{
//   User.find({}).then((users)=>{
//     res.status(200).send(users);
//   }).catch((error)=>{
//     res.status(500).send();    // 500 Internal Server Error
//   })
// })

router.get('/users/:id',async (req,res)=>{
  const _id=req.params.id;  // Mongoose auto converts string ID into object ID. No need to run ObjectId(_id),
  try {
    const user=await User.findById(_id);
    if (!user){
      return res.status(404).send();
    }
    res.status(200).send(user); 
  } catch(e){
    res.status(500).send(e);
  }
})

// app.get('/users/:id',(req,res)=>{
//   const _id=req.params.id;  // Mongoose auto converts string ID into object ID. No need to run ObjectId(_id),
//   User.findById(_id).then((user)=>{
//     // console.log(req.params);    // { id: '61e3efd0f58abbec4eb8a56b' }
//     if (!user){
//       return res.status(404).send();
//     }
//     res.status(200).send(user);   // Defaults to 200 anyway so don't really need to set it.
//   }).catch((error)=>{
//     res.status(500).send(error);
//   })
// })

// Update routes are the most complex.
router.patch('/users/:id',async (req, res)=>{
  const updates=Object.keys(req.body);
  const allowedUpdates=['name','email','password','age'];  // Without this mongoose doesn't throw an error if you try to update something that doesn't exist like {'religion':'agnostic'}
  if (!updates.every(v=>allowedUpdates.includes(v))){
    return res.status(400).send({error: "Property to update doesn't exist"})
  }
  try {
    // const user=await User.findByIdAndUpdate(req.params.id,
      // req.body,{
      //   new:true, 
      //   runValidators:true,
      // });
    // 
    // The lines below (up to await user.save()) replace commented code above. Need to split out findByIdAndUpdate so that the middleware can be used, as it runs "pre" to 'save' running.  
    const user=await User.findById(req.params.id);
    if (!user){
      return res.status(404).send({error:"User not found"});
    }
    // console.log("Prior to upates and save: ", user)
    updates.forEach(update=>user[update]=req.body[update]);
    // console.log("After upates but before save: ", user)
    await user.save();    // Middleware can now be used as it runs "pre" to 'save' running.
    res.status(202).send(user);
  } catch(e){
    res.status(400).send(e);
  }
  
})

router.delete('/users/:id',async (req,res)=>{
  try {
    const user=await User.findByIdAndDelete(req.params.id);
    if (!user){
      return res.status(404).send({error: "No such user"})
    }
    res.status(200).send(user);
  } catch(e){
    res.status(500).send(e);
  }
})


module.exports=router;