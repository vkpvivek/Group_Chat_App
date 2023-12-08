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

    const userId = 1;
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
    
    console.log("------------");
    //const userId= req.body.id;
    const userId=1;

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


exports.addGroupMember = async (req,res,next)=>{

    const group_user=[3];
    const groupId=1;

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

