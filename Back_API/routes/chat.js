const express=require('express');
const chatController=require('../controllers/chatAPI');

const router=express.Router();


router.post('/sendMessage',chatController.sendMessage);




module.exports=router;