// const path=require('path');
// const fs=require('fs');

const express = require('express');
const sequelize=require('./util/database');
const bodyParser=require('body-parser');
const cors=require('cors');

const app = express();
app.use(express.json());  //to parse JSON request bodies

const userRoutes=require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({
//     origin:"*",
//     //origin:"https://localhost:3000",
//     //methods:["GET","POST"],
//     //credentials:true
//   })
// );    //put this before routes middlewarer, otherwise it will generate error


app.use(userRoutes);


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


