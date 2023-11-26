const express=require('express');
const chatController=require('../controllers/chatAPI');
const userAuthentication=require('../middleware/Auth');


const router=express.Router();


router.post('/sendMessage',userAuthentication.authenticate ,chatController.sendMessage);

router.get('/getMessages', chatController.getMessage);


module.exports=router;