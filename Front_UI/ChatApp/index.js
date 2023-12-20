//import { io } from "socket.io-client";

const messageForm=document.querySelector('#messageForm');
//const groupForm=document.querySelector('#groupForm');
const inputMsg=document.querySelector('#msg');
const inputGroupName=document.querySelector('#inputGroupName');
const crgp=document.querySelector('#cr-gp');

crgp.addEventListener('click',CreateGroup);


const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to server');
});


//messageForm.addEventListener('submit',testMessage);

function testMessage(e){
    e.preventDefault();
    //console.log(inputMsg.value);
    socket.emit('sendMessage', { 
        user: 'John', 
        message: inputMsg.value
    });

    socket.on("receiveMessage",(data)=>{
        alert(data.message);
    })
}


function CreateGroup(e){
    e.preventDefault();
    console.log(inputGroupName.value);

    if( inputGroupName.value === '') {
        console.log("enter all field");
    } 
    else {

        let myObj={
            gpName:inputGroupName.value,
            //sender:"Vivek"
        };

        axios.post("http://localhost:3000/createGroup",myObj)
            .then((response)=>{

                console.log("response");
                // if(response.data.success===true){
                //     console.log(response.data.message); 
                //     //const UserId=response.data.Uid;
                //     // localStorage.setItem("Token",response.data.token);
                //     // window.location.href = "ChatApp/index.html";
                //     showChats(response.data.message);  
                // }
            })
            .catch((err)=>{
                //console.log(err);
                console.log(myObj);
            })
      }  
}

messageForm.addEventListener('submit',sendMessage);

function sendMessage(e){
    e.preventDefault();

    console.log(inputMsg.value);

    if( inputMsg.value === '') {
        console.log("enter all field");
    } 
    else {

        const grpId=localStorage.getItem('groupId');

        let myObj={
            msg:inputMsg.value,
            groupId:grpId,
        };

        const token=localStorage.getItem('Token');
        console.log(myObj.sender+": "+myObj.msg);

       
        axios.post("http://localhost:3000/sendMessage",myObj,{ headers :{"Authorization":token}})
            .then((response)=>{

                if(response.data.success===true){
                    console.log(response.data.message); 
                    //const UserId=response.data.Uid;
                    // localStorage.setItem("Token",response.data.token);
                    // window.location.href = "ChatApp/index.html";
                    showChats(response.data.message);  
                }
            })
            .catch((err)=>{
                console.log(err);
            })

      }  


}

function showGroupChat_byID(groupId){

    const logMessage = [];

    console.log(groupId);

    const myObj={
        groupId:groupId,
    }

    
    
    axios.post(`http://localhost:3000/Get-groupMessage`,myObj)
        .then((response)=>{

            if(response.data.success===true){
                msg=response.data.messageDetails;
                //console.log(msg.length);
                for(let i=0;i<msg.length;i++){
                    console.log(msg[i]);
                    logMessage.push(msg[i]);
                    //showChats(msg[i]);
                }
                localStorage.setItem("msgArr",JSON.stringify(logMessage));
                localStorage.setItem("groupId",groupId); 
                location.reload();
            }
        })
        .catch((err)=>{
            console.log(err);
        })

}


//Get All Group of User
window.addEventListener("DOMContentLoaded",async ()=>{

    const token=localStorage.getItem('Token');

    axios.get(`http://localhost:3000/Get-allGroups`,{ headers :{"Authorization":token}})
        .then((response)=>{

            for( var i=0;i<response.data.group_info.length;i++){
                showGroups(response.data.group_info[i]);
            }          
        })
        .catch((err)=>{
            console.log(err);
        })
})


window.addEventListener("DOMContentLoaded",async ()=>{

    const msgLog = JSON.parse(localStorage.getItem("msgArr") || "[]");
    let lastID=0;
    console.log("test");


    //const users=[];
    const grpId=localStorage.getItem('groupId');
    const resp=await axios.get(`http://localhost:3000/Get-GroupsUser?groupId=${grpId}`);


    for( var i=0;i<resp.data.newUserDetails.length;i++){
        //users.push(resp.data.newUserDetails[i].userId);
        const userId=resp.data.newUserDetails[i].userId;
        const userInfo=await axios.get(`http://localhost:3000/Get-userDetails?userId=${userId}`);
        //users.push(userInfo.data.newUserDetails[0].username);
        showGroupUser(userInfo.data.newUserDetails[0]);
    }
    //console.log(users);


    for(let i=0;i<msgLog.length;i++){
        //console.log(msgLog[i]);
        showChats(msgLog[i]);
        lastID=msgLog[i].Id;
    }
    //getBatchMessage(lastID);   //  -->Uncomment this<--






    // await axios.get(`http://localhost:3000/getAllUser`)
    //     .then((response)=>{
    //         // console.log(response.data.newUserDetails);
    //         for( var i=0;i<response.data.newUserDetails.length;i++){
    //             // console.log(user);
    //             //console.log(response.data.newUserDetails[i]);
    //             //showUser(response.data.newUserDetails[i]);
    //             //showGroupUser(response.data.newUserDetails[i]);
    //         }
    //     })
    //     .then(()=>{

    //         // for(let i=0;i<msgLog.length;i++){
    //         //     //console.log(msgLog[i]);
    //         //     showChats(msgLog[i]);
    //         //     lastID=msgLog[i].Id;
    //         // }
    //         //showAdminTab();
    //         //getBatchMessage(lastID);   //  -->Uncomment this<--

    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
})



function getBatchMessage(lastID){
    //e.preventDefault();

    const logMessage = JSON.parse(localStorage.getItem("msgArr") || "[]");

    let msgID=lastID;
    if(msgID){
        console.log("last msg-id :"+msgID);
    }else{
        msgID=-1;
        console.log("last msg-id :"+msgID);
    }
    

    console.log("message-test");

    axios.get(`http://localhost:3000/getMessages?msgID=${msgID}`) 
            .then((response)=>{
                if(response.data.success===true){
                    msg=response.data.messageDetails;
                    //console.log(msg.length);
                    for(let i=0;i<msg.length;i++){
                        //console.log(msg[i]);
                        //showChats(msg[i]);
                        //logMessage.push({id:msg[i].Id,msg:msg[i].msg});

                        if(msg[i].Id>msgID){
                            logMessage.push(msg[i]);
                            console.log(msg[i].Id+"..."+msgID);                         
                        }

                        console.log(logMessage[i]);
                    } 

                    console.log(logMessage);
                    localStorage.setItem("msgArr",JSON.stringify(logMessage));
                }

            })
            .catch((err)=>{
                console.log(err);
            })
}

function getMessage(e){
    //e.preventDefault();

    console.log("message-test");
    axios.get("http://localhost:3000/getMessages") 
            .then((response)=>{
                if(response.data.success===true){
                    msg=response.data.messageDetails;
                    //console.log(msg.length);
                    for(let i=0;i<msg.length;i++){
                        //console.log(msg[i]);
                        showChats(msg[i]);
                    } 
                    
                }
            })
            .catch((err)=>{
                console.log(err);
            })
}

function showUser(obj){

    //console.log(obj.username);

    const parElem=document.getElementById('UserDetail');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';

    //childElem.textContent=" Joined the chat";
    childElem.textContent= obj.username +" Joined the chat";

    parElem.appendChild(childElem);

}

function showGroupUser(obj){

    const parElem=document.getElementById('groupUser');
    const childElem=document.createElement('li');
    childElem.className='nav-item';

    const subChild=document.createElement('a');
    subChild.className="nav-link";
    subChild.href="#";
    subChild.textContent=obj.username;
    childElem.appendChild(subChild);

    parElem.appendChild(childElem);

}


function showChats(obj){


    //console.log(obj);

    const parElem=document.getElementById('ChatDetail');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';

    //childElem.textContent=" Joined the chat";
    childElem.textContent= obj.Sender +" ::"+obj.msg;

    parElem.appendChild(childElem);

}


function showGroups(response){

    const parElem=document.getElementById('groupDetails');

        gpName=response.groupName;
        const childElem=document.createElement('button');
        // childElem.className='w3-bar-item w3-button btn btn-light'; 
        childElem.className='w3-bar-item w3-button btn btn-outline-secondary';
        //childElem.id='groupBTN';
        childElem.href='#';
        childElem.value=response.id;
        childElem.textContent=gpName;

        childElem.onclick=()=>{
            showGroupChat_byID(childElem.value);
        }

        parElem.appendChild(childElem);
}


function showAdminTab(){

    const parElem=document.getElementById('AdminDetail');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';
    // childElem.textContent= "Admin Details";

    const userChild=document.createElement('input');
    userChild.type="text";
    userChild.id="inpUserDetail";
    userChild.placeholder="email";
    childElem.append(userChild);

    //Remove Member from Group
    const subChild3=document.createElement('button');
    subChild3.className="btn btn-primary badge-pill";
    subChild3.id="removeMember";
    subChild3.style="float:right"
    subChild3.textContent='Remove Member';
    subChild3.onclick=()=>{
       console.log("Remove Member");
    }
    childElem.appendChild(subChild3);


    //Add memeber
    const subChild=document.createElement('button');
    subChild.className="btn btn-primary badge-pill";
    subChild.id="addMember";
    subChild.style="float:right";
    // subChild.data-toggle="modal";
    // subChild.data-target="#addGroup";
    subChild.textContent='Add Member';
    subChild.onclick=()=>{
        console.log("Add Member");
    }
    childElem.appendChild(subChild);


    //Add admin
    const subChild2=document.createElement('button');
    subChild2.className="btn btn-primary badge-pill";
    subChild2.id="addAdmin";
    subChild2.style="float:right"
    subChild2.textContent='Add Admin';
    subChild2.onclick=()=>{
        console.log("Add Admin");
    }
    childElem.appendChild(subChild2);


    parElem.appendChild(childElem);

}



// Refresh page
// window.addEventListener("DOMContentLoaded",()=>{
//     startRefreshingPage();
// })

// function startRefreshingPage() {
//     setInterval(() => {
//         location.reload(); // Reload the page every 1 second
//     }, 1000);
// }


