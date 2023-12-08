const express = require('express');
const Message = require('../models/message');
// const bcrypt = require('bcrypt');
//const jwt=require('jsonwebtoken');


exports.sendMessage= async(req,res,next)=>{
    const msg = req.body.msg;
    const sender = req.user.username;
    const groupId=req.body.groupId;
    // const user = req.user;  //.userId;
    //console.log(user.username);
    console.log(groupId);


    console.log(sender+":::"+msg);
    
    const obj={
        sender:sender,
        msg:msg
    }

    try {

        const data = await Message.create({ Sender:sender, msg , groupId:groupId});

        res.status(201).json({success:true, message:data});

    } catch (err) {
        console.error("Error:", err);
        res.status(201).json({ message: "USer Already Exist Please Login" });
    }

}


exports.getMessage =async (req,res,next)=>{
    //const groupID=req.query.grpId;
    const lastMsg=req.query.msgID;
    const groupID=1;

    //const lastMsg=10;
    console.log(lastMsg);
    
    
    console.log("test");
    
    const obj= await Message.findAll({
        where: { groupID: groupID },
    });
    //console.log(obj);

    const data=[];

    for(let i=0;i<obj.length;i++){
        if(obj[i].Id>lastMsg){
           data.push(obj[i]);
        }
    }
    
    //console.log(data);
    console.log("Get all message");

    //res.status(201).json({success:true, messageDetails:obj})
    res.status(201).json({success:true, messageDetails:data})

}

