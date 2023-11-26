const express = require('express');
const Message = require('../models/message');
// const bcrypt = require('bcrypt');
//const jwt=require('jsonwebtoken');


exports.sendMessage= async(req,res,next)=>{
    const msg = req.body.msg;
    const sender = req.user.username;
    // const user = req.user;  //.userId;
    // console.log(user.username);

    console.log(sender+":::"+msg);
    
    const obj={
        sender:sender,
        msg:msg
    }

    try {

        const data = await Message.create({ Sender:sender, msg });

        res.status(201).json({success:true, message:data});

    } catch (err) {
        console.error("Error:", err);
        res.status(201).json({ message: "USer Already Exist Please Login" });
    }

}