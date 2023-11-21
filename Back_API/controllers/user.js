// const express=require('express');
// //const User=require('../models/User');

// // const bcrypt=require('bcrypt');
// // const jwt=require('jsonwebtoken');



// exports.postUser= async (req,res,next)=>{
//     const username=req.body.username;
//     const email=req.body.email;
//     const phone=req.body.phone;
//     const password=req.body.password;

//     console.log(username +"...."+ email+"....."+phone+"...."+password);

//     // const saltrounds=5;
//     // bcrypt.hash(password, saltrounds, async (err ,hash)=>{
//     //     console.log(err)

//     //     const data= await  User.create({ username, email, password:hash })

//     //     res.status(201).json({
//     //         newUserDetails:data
//     //     });
//     // })

//     // const data= await User.create({
//     //     username:username,
//     //     email:email,
//     //     password:password
//     // });
//     const data= {
//         username:username,
//         email:email,
//         password:password,
//         phone:phone
//     };

//     res.status(201).json({
//         newUserDetails:data
//     });
// };


const express=require('express');
const User=require('../models/user');
const bcrypt=require('bcrypt');


exports.postUser= async (req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;

    console.log(username +"...."+ email+"....."+phone+"...."+password);

    const saltrounds=5;

    bcrypt.hash(password, saltrounds, async (err ,hash)=>{
        console.log(err)

        const data= await  User.create({ username, email,phone, password:hash })

        res.status(201).json({
            newUserDetails:data
        });
    })

    // const data= await User.create({
    //     username:username,
    //     email:email,
    //     phone:phone,
    //     password:password
    // });

    // res.status(201).json({
    //     newUserDetails:data
    // });
};

