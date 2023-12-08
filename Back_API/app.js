const path=require('path');
const express = require('express');
const sequelize=require('./util/database');
const bodyParser=require('body-parser');
const cors=require('cors');


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


sequelize
    .sync()
    //.sync({force:true})
    .then(result=>
        console.log("databse successfully setup")
    )
    .catch(err=>console.log(err));


app.listen(3000, () =>
     console.log('Example app is listening on port 3000.')
);


