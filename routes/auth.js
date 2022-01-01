const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');

//create a user using: POST "/api/auth/". Doesn't require Auth
router.post('/',[
  body('name','Enter a valid name').isLength({min:3}),
  body('password','password must be atleast 5 characters long').isLength({min:5}),
  body('email','Enter a valid email').isEmail()
] , (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  }).then(user => res.json(user)).catch(err =>{console.log(err)
  res.json({error: 'Please enter a valid value for email', error: err.message});})
  
  // res.send(req.body); 

})



module.exports = router;