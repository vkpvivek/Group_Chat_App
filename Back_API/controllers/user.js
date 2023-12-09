
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


function generateAccessToken(id, username ){
    return jwt.sign({userId:id , username },'xxxSecretKeyxxx')
}


exports.postUser = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    console.log(username + "...." + email + "....." + phone + "...." + password);

    const saltrounds = 5;

    try {
        const hash = await bcrypt.hash(password, saltrounds);
        const data = await User.create({ username, email, phone, password: hash });

        res.status(201).json({
            newUserDetails: data
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(201).json({ message: "USer Already Exist Please Login" });
    }
};


exports.userLogin= async (req,result,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    const obj= await User.findAll({
        where:{
            email:email
        }
    });
    console.log("length --> "+obj.length);
    console.log(email+".."+password);
    

    if(obj.length>0){
        //check if password matches
        const pass=obj[0].password;
        const UserId=obj[0].id;
       
        bcrypt.compare(password, pass, (err,res) =>{
            if(err){
                result.status(500).json({ success:false, message:"Something Went Wrong" });
            }


            if(res===true)
            {
                result.status(200).json({ success:true, message:"Loged in Successfully", token :generateAccessToken( UserId , obj[0].username )});  
            }else{
                result.status(401).json({ success:false, message:"Password is Incorrect" });
            }
        })


    }else{
        return result.status(404).json({ success:false, message:"User Not Found" });
    }

};

exports.getUsers= async (req,res,next)=>{

    const obj= await User.findAll();
    //console.log(obj);
    console.log("Get all Users");


    res.status(201).json({success:true, newUserDetails:obj})
}


// get userDetails by emailId
exports.getUsersId= async (req,res,next)=>{

    const mailId=req.body.gpEmail;

    const obj= await User.findAll({
        where:{
            email:mailId 
        }
    });
    //console.log(obj);
    //console.log(obj);

    res.status(201).json({success:true, newUserDetails:obj})
}

//get user details by id
exports.getUsersDetails= async (req,res,next)=>{

    const userId=req.query.userId;
    console.log(userId);
    //const userId=1;

    const obj= await User.findAll({
        where:{
            id:userId
        }
    });
    //console.log(obj);
    //console.log(obj);

    res.status(201).json({success:true, newUserDetails:obj})
}
