const User= require('../models/userAuthSchema');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const flash = require('connect-flash');





router.route('/signup')
.get(async(req, res)=>{
res.render('SignUp');
})

.post(async(req, res)=>{

   try{
   const {name, age, email ,username, specialization ,country, password} = req.body;
   const user = new User({name, age, email,username, specialization,country});
   const registeredUser=await User.register(user,password);
   req.login(registeredUser, err =>{
     if(err) return console.log(err);

     req.flash('success', 'Hey buddy, Hope you enjoy your session');
     res.redirect('/home');
   })

   }catch(e){
      req.flash('error',e.message);
      res.redirect('/auth/signup');
   }
   });



router.route('/signin')
.get(async(req, res)=>{
res.render('Signin');
})
.post(passport.authenticate('local',{ successRedirect: '/home',
                                       failureRedirect: '/auth/signin' , failureFlash: true}));



module.exports = router;
