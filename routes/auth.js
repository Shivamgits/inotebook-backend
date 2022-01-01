const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Shivam123Secured'

//create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "password must be atleast 5 characters long").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password,salt) 
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user:{
          id: user.id,
        }
      }
      const authToken= jwt.sign(data, JWT_SECRET)
      // console.log(authToken)

      // res.json(user);
      res.json({authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
    // .then(user => res.json(user)).catch(err =>{console.log(err)
    // res.json({error: 'Please enter a valid value for email', error: err.message});})

    // res.send(req.body);
  }
);

module.exports = router;
