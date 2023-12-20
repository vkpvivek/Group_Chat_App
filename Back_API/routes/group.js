const express = require("express");
const router = express.Router();

const userAuthentication=require('../middleware/Auth');
// const middleware = require("../../middleware/auth").authenticate;
const groupController = require("../controllers/group");


router.get("/Get-groupsAllUser", groupController.getUser_Group);

router.post("/createGroup", groupController.makeAGroup);

router.get("/Get-allGroups", userAuthentication.authenticate, groupController.getAllGroups);
//router.get("/Get-allGroups", groupController.getAllGroups);

router.post('/Get-groupMessage', groupController.getGroupsMessage);

router.get('/Get-GroupsUser',groupController.getGroupsUser);

//Admin Feature
router.post('/Add-GeoupMembers', groupController.addGroupMember);
router.post('/Add-Admin', groupController.setAsAdmin);
router.post('/remove-User', groupController.removeMember);

//Group Admin Routes




// router.post("/get-grp-msg", middleware, groupController.getGroupMessages); //post is used because group id is sended via routes
// router.post("/post-grp-msg", middleware, groupController.postGrouppMessages);


module.exports = router;