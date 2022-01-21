const express=require('express');
const multer=require('multer');
const User=require('../models/user');
const auth=require('../middleware/auth')
const router=new express.Router();

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

router.post('/users/login',async (req, res)=>{
  try {
    const user=await User.findByCredentials(req.body.email,req.body.password);
    const token= await user.generateAuthToken();
    res.status(200).send({user, token});
  } catch(e){
    res.status(400).send(e);
  }
})

router.post('/users/logout',auth, async (req, res)=>{
  try {
    req.user.tokens=req.user.tokens.filter(token=>token.token!==req.token);
    await req.user.save();
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

router.get('/users/me', auth, async(req,res)=>{
  res.send(req.user);   
})

router.patch('/users/me', auth, async (req, res)=>{
  const updates=Object.keys(req.body);
  const allowedUpdates=['name','email','password','age']; 
  if (!updates.every(v=>allowedUpdates.includes(v))){
    return res.status(400).send({error: "Property to update doesn't exist"})
  }
  try {
    updates.forEach(update=>req.user[update]=req.body[update]);
    await req.user.save();
    res.status(202).send(req.user);
  } catch(e){
    res.status(400).send(e);
  }
  
})

router.delete('/users/me', auth, async (req,res)=>{
  try {
    await req.user.remove();    // Middleware on User model runs just before runs to delete the user's tasks
    res.status(200).send(req.user);
  } catch(e){
    res.status(500).send(e);
  }
})

const upload=multer({   // An options object is passed to multer.
  // By removing 'dest', the data is now passed through to our function.
  // dest: 'avatars',      // This folder is autocreated
  limits: {
    fileSize: 1000000,    // 1MB size limit
  },
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(jpe?g|png)$/)){
      return cb(new Error('File not of required image type (jpg, jpeg, png)'))
    }
    cb(undefined, true);    // accepts upload
  }
})
// upload middleware added. Key on the upload file = 'avatar':file_to_up_load.jpg
// Add authorisation middleware before allowing the user to upload a file.
router.post('/users/me/avatar',auth, upload.single('avatar'), async (req, res)=>{
  // we can access the validated image data now because we stopped the save to 'dest' in multer
  req.user.avatar=req.file.buffer;
  await req.user.save();
  res.status(200).send({success: "Avatar uploaded correctly"});
},(error, req, res, next)=>{    // Must have all 4 parameters to handle error correctly
  res.status(400).send({error: error.message});
})

router.delete('/users/me/avatar', auth, async (req,res)=>{
  if (!req.user.avatar){
    return res.send({error: "No avatar to delete"});
  }
  req.user.avatar=undefined;
  try {
    await req.user.save();
    res.status(200).send({success: "Avatar successfully deleted"});
  } catch(e){
    res.status(400).send({error: e.message});
  }
})

// no auth on this route so we can view in browser
router.get('/users/:id/avatar', async (req, res)=>{
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar){
      throw new Error('Problem!!!') 
    }
    res.set('Content-Type','image/jpg');   // header key value pair. Tell requestor what type of data they're getting back. WHen we send json back express auto sets cont-type to "application/json"
    res.send(user.avatar);    // Img can be seen on http://localhost:3000/users/61e9d2f40c663bf37f946823/avatar
  } catch(e){
    res.status(404).send({error:error.message});
  }

})

module.exports=router;