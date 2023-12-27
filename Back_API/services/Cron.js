const { CronJob } = require('cron');
const {Op} = require('sequelize');
const ChatHistory = require('../models/message');
const ArchivedChat = require('../models/archeived-chat');


exports.job = new CronJob(
    '0 0 * * *', 
    function () {
        archiveOldRecords();
    },
    null,
    false,
    'Asia/Kolkata'
);


// async function archiveOldRecords() {
//     try {
//       console.log('Running Chron');

//     } catch (error) {
//       console.error('Error ');
//     }
// }


//--> Uncomment this to work

async function archiveOldRecords() {
    try {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      // Find records to archive
      const recordsToArchive = await ChatHistory.findAll({
        where: {
            createdAt: {
            [Op.lt]: tenDaysAgo,
          },
        },
      });
  
      await Promise.all(
        recordsToArchive.map(async (record) => {
          await ArchivedChat.create({
            Id: record.Id,
            msg: record.msg,
            date_time: record.createdAt,
            isImage:record.isImage,
            Sender: record.Sender,
            groupId: record.groupId
          });
          //await record.destroy();
        })
      );
      
      // for(let i=0;i<recordsToArchive.length;i++){
      //   console.log(":-----------------------------------:");
      //   console.log(i+"::"+recordsToArchive[i].Id);
      //   console.log(i+"::"+recordsToArchive[i].msg);
      //   console.log(i+"::"+recordsToArchive[i].createdAt);
      //   console.log(i+"::"+recordsToArchive[i].groupId);
      //   console.log(i+"::"+recordsToArchive[i].isImage);
      //   console.log(i+"::"+recordsToArchive[i].Sender);
      // }
      console.log("recordsToArchive");

    } catch (error) {

      console.error('Error archiving old records, OLD record already updated');
    }
  }
