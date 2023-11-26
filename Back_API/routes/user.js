const express=require('express');
const userController=require('../controllers/user');

const router=express.Router();


router.post('/SignUp',userController.postUser);

router.post('/login', userController.userLogin);

router.get('/getAllUser', userController.getUsers);


router.get('/home',(req,res,next)=>{
    res.send("HomePage");
});

module.exports=router;