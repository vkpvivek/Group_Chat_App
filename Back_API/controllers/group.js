const express = require('express');
const User = require('../models/user');
const Group = require("../models/group");
const Message = require('../models/message');
const User_Group=require('../models/usergroup');


exports.makeAGroup = async (req, res, next) => {

    const group_name = req.body.gpName;
    const group_user=[1,2];
    const adminId=1;
    //const group_members = req.body.users_ids;

    console.log(group_name);

    try {

        console.log("===>"+group_name);

        const createGroup = await Group.create({
            admin:adminId,
            groupName: group_name,
        });

        //define memeber in group
        {
            var members=[];
            for(let i=0;i<group_user.length;i++){
                var obj={
                    userId:group_user[i],
                    groupId:createGroup.id
                };
                members.push(obj);
            }
        }

        console.log(members);
      
        //map member in user & group
        const GroupUsers = await User_Group.bulkCreate(members, { returning: true })
                
            .then((result) => {

                res.status(201)
                   .json({ success: true, message: `${createGroup.name}group created` });
                   //.json({ success: true, message: `group created` });
        });

    } 
    catch (err) {
      console.log(err, " in makeAGroup");
    }
        
};


exports.getUser_Group = async (req, res, next) => {

    const userId = 2;
    //const userId = req.body.userId;
    console.log(userId);

    try{

        // const arrayOfGroups = await req.user.getGroups({
        //     attributes : ["id" , "nameOfGroup"]
        // });

        const arrayOfGroups = await Group.findAll({ include: User });

        res.status(200).json(arrayOfGroups);
    }
    catch(err){
        res.status(500).json({message:'Something Went Wrong !'});
    }

    // try {
    //     const userGroups = await Group.fetchAll({
    //         where:
    //     });
    //     res.status(201).json({ success: true, message: `${createGroup.groupName}group created` });
    // } 
    // catch (err) {
    //   console.log(err, " in makeAGroup");
    // }      

};


exports.getAllGroups =async (req, res, next) =>{
    
    console.log("------------"+req.user.id);
    const userId= req.user.id;
    //const userId=2;

    try {

        const grp_id_list = await User_Group.findAll({
          where: { userId: userId },
        });
    
        const result = [];

        grp_id_list.forEach((element) => {
          result.push(element.groupId);
        });
    
        console.log(result);

        await Group.findAll({ where: { id: result } }).then((result) => {
          res.status(200).json({ success: true, group_info: result });
        });


      }
      catch (err) {
        console.log(err, "in getGroupsOnMainPage ");
      }

};


exports.getGroupsMessage= async (req,res,next)=>{
  const groupId=req.body.groupId;
  console.log(groupId);

  
  const obj= await Message.findAll({
    where: { groupID: groupId },
  });


  res.status(201).json({success:true, messageDetails:obj})
  //res.status(201).json({message:'testing.....'});

}

//Get All the Users in the group
exports.getGroupsUser=async(req,res,next)=>{
      const groupId=req.query.groupId;
      //const groupId=1;

      const result = await User_Group.findAll({
        where: {
            groupId: groupId
        }
      });
      //console.log(result)
      res.status(200).json({ success: false, newUserDetails:result });
}


//<------ADMIN------->

//Add User in the Group  [done]
exports.addGroupMember = async (req,res,next)=>{
    const userId=req.body.userId;
    const grpId=req.body.groupId;

    const group_user=[userId];
    const groupId=grpId;
    // console.log(group_user);
    // console.log(groupId);

    try {
      console.log("===>"+"Adding Member to GP");

      {
        var members=[];
        for(let i=0;i<group_user.length;i++){
            var obj={
                userId:group_user[i],
                groupId:groupId
            };
            members.push(obj);
        }
      }

      console.log(members);

      const GroupUsers = await User_Group.bulkCreate(members, { returning: true })  
          .then((result) => {
            res.status(201)
                .json({ success: true, message: `${members}group created` });
      });

    }
    catch (err) {
      console.log(err, " in Adding Group Member");
    }
}

//Remove user from Group [done]
exports.removeMember=async (req,res,next)=>{
  console.log("..remove-Member..");
  const userId=req.body.userId;
  const groupId=req.body.groupId;

  // console.log(userId);
  // console.log(groupId);

    try {
        console.log("Removing Member from Group");

        // Assuming you have a model named User_Group for your association table
        const result = await User_Group.destroy({
            where: {
                userId: userId,
                groupId: groupId
            }
        });

        if (result) {
            res.status(200).json({ success: true, message: `User ${userId} removed from group ${groupId}` });
        } else {
            res.status(404).json({ success: false, message: `User ${userId} not found in group ${groupId}` });
        }

    } catch (err) {
        console.log(err, "Error in Removing Group Member");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

//Set User as Admin--> [ongoing]
exports.setAsAdmin=async (req,res,next)=>{
  const userId=req.body.userId;
  const groupId=req.body.groupId;
  console.log("..set-Admin..");
  // console.log(userId);
  // console.log(groupId);

    try {

      console.log("Making User Admin");

      // Assuming you have a model named User_Group for your association table
      const result = await User_Group.update(
          { isAdmin: true },
          {
              where: {
                  userId: userId,
                  groupId: groupId
              }
          }
      );

        if (result[0] !== 0) {
            res.status(200).json({ success: true, message: `User ${userId} is now an admin in group ${groupId}` });
        } else {
            res.status(404).json({ success: false, message: `User ${userId} not found in group ${groupId}` });
        }

    }
    catch (err) {
        console.log(err, "Error in Making User Admin");
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}


