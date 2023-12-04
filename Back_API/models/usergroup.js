const Sequelize=require('sequelize');
const database=require('../util/database');
const User = require('../models/user'); // Import the User model
const Group = require('../models/group');


const User_Group=database.define('user_group',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }
   
});
module.exports=User_Group;