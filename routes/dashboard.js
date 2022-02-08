const router = require('express').Router();


 router.get("/",(req,res)=>{
     
     res.json({
         error:null,
         data:{
            title:"my dashboard",
            content:"Dashboard content",
             user: req.user
         }
        }) ;
 });

 module.exports = router;