const express=require('express');
const User=require('../models/user');
const auth=require('../middleware/auth')
const router=new express.Router();
// router.get('/test',(req,res)=>{
//   res.send('New user route working!!!');
// })
// Need to change app.post to router.post. "app" no longer exists in this file.

// Authentication reqd for every route besides signup and login
// New user creation route
// Creates an auth token as they are obviously who they say they are.
router.post('/users',async(req,res)=>{
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user,token,loginStatus:"YOU ARE (in theory) LOGGED IN!!!"});
  } catch(e){
    res.status(400).send(e);
  }
})

// Plain text passwords might be provided to our app at create user and update user.

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

// Login route
// Creates an auth token
router.post('/users/login',async (req, res)=>{
  try {
    const user=await User.findByCredentials(req.body.email,req.body.password);  // our own function
    const token= await user.generateAuthToken(); // generateAuthToken lives on the user instance
    // Amend user object with custom "getPublicProfile" so that sensitive data is not sent back.
    // res.status(200).send({user:user.getPublicProfile(), token});
    res.status(200).send({user, token});
  } catch(e){
    res.status(400).send(e);
  }
})

// Only want to log out of one device - not all devices.
router.post('/users/logout',auth, async (req, res)=>{
  try {
    // console.log("1):",req.user.tokens);
    req.user.tokens=req.user.tokens.filter(token=>token.token!==req.token);
    await req.user.save();
    // console.log("2):",req.user.tokens);
    res.status(200).send({success:"You've logged out!"});
  } catch(e){
    res.status(500).send(e);
  }
})

router.post('/users/logoutAll', auth, async (req,res)=>{
  try {
    req.user.tokens=[];
    await req.user.save();
    res.status(200).send({success:"You've logged out of all acounts!"});
  } catch(e){
    res.status(500).send(e);
  }
})

// Route in its current form (after adding auth) is no longer needed as we will see other user's data. Route will be repurposed to send back the user's data.
// router.get('/users', auth, async(req,res)=>{
//   try {
//     const users=await User.find({});
//     return res.status(200).send(users);
//   } catch(e){
//     return res.status(500).send(e);
//   } 
// })
// Repurposed route taken from commented out "get all users" route above. Will bring back user's own data only.
router.get('/users/me', auth, async(req,res)=>{
  res.send(req.user);   // Custom property added to "req" by auth function. Now used as a awy to send back the user's own data.
})

// app.get('/users',(req,res)=>{
//   User.find({}).then((users)=>{
//     res.status(200).send(users);
//   }).catch((error)=>{
//     res.status(500).send();    // 500 Internal Server Error
//   })
// })

// This route is now not required.
// router.get('/users/:id',async (req,res)=>{
//   const _id=req.params.id;  // Mongoose auto converts string ID into object ID. No need to run ObjectId(_id),
//   try {
//     const user=await User.findById(_id);
//     if (!user){
//       return res.status(404).send();
//     }
//     res.status(200).send(user); 
//   } catch(e){
//     res.status(500).send(e);
//   }
// })

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
// Route amended because we no longer update by any ID
// router.patch('/users/:id',async (req, res)=>{
router.patch('/users/me', auth, async (req, res)=>{
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
    // const user=await User.findById(req.params.id);
    // if (!user){
    //   return res.status(404).send({error:"User not found"});
    // }
    // console.log("Prior to upates and save: ", user)
    updates.forEach(update=>req.user[update]=req.body[update]);
    // console.log("After upates but before save: ", user)
    await req.user.save();    // Middleware can now be used as it runs "pre" to 'save' running.
    res.status(202).send(req.user);
  } catch(e){
    res.status(400).send(e);
  }
  
})

// Now can't delete any user by profile
// router.delete('/users/:id',async (req,res)=>{
router.delete('/users/me', auth, async (req,res)=>{
  try {
    // const user=await User.findByIdAndDelete(req.params.id);
    // Using the middleware makes req.user._id available
    // const user=await User.findByIdAndDelete(req.user._id);
    // if (!user){
    //   return res.status(404).send({error: "No such user"})
    // }
    // Will now use remove method on mongoose document
    await req.user.remove();
    // res.status(200).send(user);
    res.status(200).send(req.user);
  } catch(e){
    res.status(500).send(e);
  }
})


module.exports=router;