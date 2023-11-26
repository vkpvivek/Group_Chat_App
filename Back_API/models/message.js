const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Message = sequelize.define('message', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Sender: {
        type: Sequelize.STRING
    },
    msg: {
        type: Sequelize.STRING
    }
});


module.exports = Message;