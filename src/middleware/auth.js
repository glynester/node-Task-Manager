const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next)=>{
  // console.log("auth middleware");
  try {
    const token=req.header("authorisation").replace('bearer ','');  // Looks for header that user has to provide.
    // console.log(token);
    const decoded=jwt.verify(token,'thisismysecret');  // validates
    const user = await User.findOne({_id:decoded._id,'tokens.token':token});  // Look inside tokens array to find one that matches. Brings back associated user.
    if (!user){
      throw new Error();
    }
    req.user=user;  // Adding a CUSTOM "user" property onto req object. This will save the route from having to look up the user again.
    next();
  } catch(e){
    res.status(401).send({error: "Please authenticate!"});
  }
}

module.exports = auth;