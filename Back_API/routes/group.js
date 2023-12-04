const express = require("express");
const router = express.Router();

// const middleware = require("../../middleware/auth").authenticate;
const groupController = require("../controllers/group");


router.get("/Get-groupsAllUser", groupController.getUser_Group);

router.post("/createGroup", groupController.makeAGroup);

router.get("/Get-allGroups", groupController.getAllGroups);

router.get('/Get-groupMessage', groupController.getGroupsMessage);

// router.post("/get-grp-msg", middleware, groupController.getGroupMessages); //post is used because group id is sended via routes
// router.post("/post-grp-msg", middleware, groupController.postGrouppMessages);

module.exports = router;