const express = require("express");
const { countDocuments } = require("../models/userModel");
const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require('bcryptjs') 




router.post("/login", async(req, res) => { 
      const username  = req.body.username;

      try {
          const user = await User.findOne({username})
          let validRequest = true;
          if (user == null) {
             res.send({
                 'loginError' : true,
                 'message' : 'No user with email' + ' ' + username + ' ' +'registered us'});
             return;
          }
         
          validRequest = bcrypt.compare(req.body.password, user.password, function(error, valid) {
                     return valid;
                }) ?? validRequest;
        if (!validRequest) {
            validRequest = false;
            res.send({
                'loginError' : true,
                'message' : 'Incorrect password'});
        }
        res.send(user)
        
      } catch (error) {
        return res.status(400).json(error);
      }
  
});

router.post("/register", async(req, res) => {
    try {
        const username  = req.body.username;
        const user = await User.findOne({username})
        if (user) {
            res.send({
                'loginError' : true,
                'message' :  username + 'already registered with us'});
            return;
         }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password , salt);
        req.body.password  = hash;
        const newuser = new User(req.body);
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) { 
      return res.status(400).json(error); 
    }

});

router.get("/getallUsers" , async(req,res) => {

    try{
        const users = await User.find()
        res.send(users)
    } catch (error) {
       return res.status(400).json(error);
    }
});

router.post("/makeAdmin" , async(req,res) => {
    const filter = { username: req.body.username};
    const update = { role: 'admin' };
    const user =  await User.findOneAndUpdate(filter, update);
    await User.findOne(filter);
    await User.updateOne(filter, update);
    res.send({
        'message' :  req.body.username + 'is now admin'});
    return;
});


module.exports = router

