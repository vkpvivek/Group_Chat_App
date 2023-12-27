const Sequelize = require('sequelize');
const database = require('../util/database');


const ArchivedChat = database.define('ArchivedChat',{
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    msg: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    isImage:{
      type : Sequelize.BOOLEAN , 
      defaultValue : false
    },

    date_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    Sender:{
      type: Sequelize.STRING,
    },
    groupId:{
      type: Sequelize.INTEGER,
    }
  },
  {
    timestamps: false
  }
);

module.exports = ArchivedChat;