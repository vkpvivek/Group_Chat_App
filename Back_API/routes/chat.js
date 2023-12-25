const express=require('express');
const chatController=require('../controllers/chatAPI');
const userAuthentication=require('../middleware/Auth');
const multerMiddleware=require('../middleware/multer');
const upload=multerMiddleware.multer.single('inpFile');


const router=express.Router();

router.post('/sendMessage',userAuthentication.authenticate ,chatController.sendMessage);

router.post('/sendFile', userAuthentication.authenticate, upload, chatController.saveImage);

router.get('/getMessages', chatController.getMessage);


module.exports=router;