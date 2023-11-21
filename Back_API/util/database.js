const Sequelize=require('sequelize');


const sequelize=new Sequelize('group_chat','root','zxcvbnm123',{
    dialect:'mysql',
    host:'localhost'
});


module.exports=sequelize;