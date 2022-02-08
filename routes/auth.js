const router = require('express').Router();
const User  = require("../model/user")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const validator = require("validator");
const cryptr = require("cryptr");
dotenv.config();
const mongoose  = require('mongoose');

/// Register 

router.post("/register", async(req,res)=>{

    try{
          console.log(req.body);
          const {name , email , password } = req.body
          const validate = validator.isEmail(email);
          if(!validate){
              return res.status(400).json({message:"Email is not valid"});
          }

          const user = await User.findOne({email});
          if(user) {
            return  res.status(400).json({mesaage:"Email already exists"});
          }

          // hash the password 
          const salt = await bcrypt.genSalt(10);
          const encreptedpassword = await bcrypt.hash(req.body.password,salt);

          const newUser = new User({
              name:name,
              email:email,
         password:  encreptedpassword,
          });

          if (newUser == 0) {
            return res.status(400).json({ msg: "There is some problem!" });
        }
        //Saving user in database

        await newUser.save();
        res.json({message:"successfully registered"});

     /*     
      // hash the passwword
      const salt =  await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
    
    const user  = new User({
        name:req.body.name,
        email:req.body.email,
        password // hash password
    });
      
        const saveUser = await user.save();
        res.status(200).send(saveUser);
    }
    catch(err){
        res.status(400).send(err);
    }
    */
}catch(err){
  res.status(500).json({message:err.mesaage});
}
    
});





// login
router.post("/login",async(req,res)=>{
     try{
        console.log(req.body);
        const {email , password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exists"})
        }

         // check password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        res.status(400).json({message:"Incorrect Password"});
    }
    res.json({
        error: null,
        data: {
          message: "Login successful",
        },
      });
    
      // creating token
      const token = jwt.sign({
        // payload data
        name: user.name,
        id: user._id 
    },
    process.env.TOKEN_SECRET,
    {
     expiresIn: "2h",
   }
    )
    console.log(token);
   
   res.header({
       error:null,
       
       data:{
           token,
       },
       
   });

  

     } catch(err){
        return res.status(500).json({ msg: err.message });
     }
    
    /*
    const  user =   await User.findOne({email:req.body.email});
    if(!user){
        res.status(400).json({msg:"Wrong Email"});
    } 
    // check password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        res.status(400).send("Invlid password");
    }
    res.json({
        error: null,
        data: {
          message: "Login successful",
        },
      });

      // login api - sign jwt token 
      // create token 

       const token = jwt.sign({
           // payload data
           name: user.name,
           id: user._id 
       },
       process.env.TOKEN_SECRET,
       {
        expiresIn: "2h",
      }
       )
       console.log(token);
      
      res.header({
          error:null,
          
          data:{
              token,
          },
          
      });

      */
    
});

module.exports = router;