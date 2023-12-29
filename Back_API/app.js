const path=require('path');
const express = require('express');
const sequelize=require('./util/database');
const bodyParser=require('body-parser');
const cors=require('cors');

//-->Socket.io
const http=require('http');
const {Server}=require("socket.io");
// const io=require("socket.io")(3000)
// io.on("connection",socket=>{
//   console.log(socket.id);
// })


const app = express();
app.use(express.json());  //to parse JSON request bodies

//models:
const User=require('./models/user');
const Message=require('./models/message');
const Group=require('./models/group');
const User_Group=require('./models/usergroup');

//routes
const userRoutes=require('./routes/user');
const chatRoutes=require('./routes/chat');
const groupRoutes=require('./routes/group');

// ChronJob -->
const cronService = require('./services/Cron');
//cronService.job.start();
const websocketService = require('./services/websocket');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);

// Define the associations
Group.hasMany(Message);
Message.belongsTo(Group);


User.belongsToMany(Group, { through: User_Group, foreignKey: 'userId' });
Group.belongsToMany(User, { through: User_Group, foreignKey: 'groupId' });

// User.belongsToMany(Group,{through:User_Group});
// Group.belongsToMany(User,{through:User_Group});


app.get('/', (req, res) => {
  res.send('Successful response.');
});

//-->Socket.io
const server=http.createServer(app);
const io= new Server(server,{
  cors:{
    origin: '*',
  }
});
io.on('connection', websocketService );

// io.on("connection",socket=>{
//   console.log("Spcket_Id:"+ socket.id);

//   socket.on("sendMessage",(data)=>{
//     console.log(data);
//     console.log("............................$$$....");
//     socket.broadcast.emit("receiveMessage",data);
//     //socket.emit("receiveMessage",data);
//   })
// })


sequelize
    .sync()
    //.sync({force:true})
    .then(result=>
        console.log("databse successfully setup")
    )
    .catch(err=>console.log(err));


//-->Socket.io
server.listen(3000, () =>
    console.log('Example app is listening on port 3000.')
);
  

// app.listen(3000, () =>
//      console.log('Example app is listening on port 3000.')
// );


