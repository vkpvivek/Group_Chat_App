const messageForm=document.querySelector('#messageForm');
//const groupForm=document.querySelector('#groupForm');
const inputMsg=document.querySelector('#msg');
const inputGroupName=document.querySelector('#inputGroupName');
const crgp=document.querySelector('#cr-gp');


crgp.addEventListener('click',CreateGroup);

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

        let myObj={
            msg:inputMsg.value,
            //sender:"Vivek"
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
    console.log(groupId);

    const myObj={
        groupId:groupId,
    }

    axios.get(`http://localhost:3000/Get-groupMessage`,myObj)
        .then((response)=>{
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })

}

//Get All Group of User
window.addEventListener("DOMContentLoaded",()=>{

    axios.get(`http://localhost:3000/Get-allGroups`)
        .then((response)=>{

            for( var i=0;i<response.data.group_info.length;i++){
                showGroups(response.data.group_info[i]);
            }          
        })
        .catch((err)=>{
            console.log(err);
        })
})


window.addEventListener("DOMContentLoaded",()=>{

    const msgLog = JSON.parse(localStorage.getItem("msgArr") || "[]");
    let lastID=0;
    console.log("test");


    axios.get(`http://localhost:3000/getAllUser`)
        .then((response)=>{
            // console.log(response.data.newUserDetails);
            for( var i=0;i<response.data.newUserDetails.length;i++){
                // console.log(user);
                //showUser(response.data.newUserDetails[i]);
                showGroupUser(response.data.newUserDetails[i]);
            }
        })
        .then(()=>{

            for(let i=0;i<msgLog.length;i++){
                //console.log(msgLog[i]);
                showChats(msgLog[i]);
                lastID=msgLog[i].Id;
            }
            getBatchMessage(lastID);

        })
        .catch((err)=>{
            console.log(err);
        })
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



// Refresh page
// window.addEventListener("DOMContentLoaded",()=>{
//     startRefreshingPage();
// })

// function startRefreshingPage() {
//     setInterval(() => {
//         location.reload(); // Reload the page every 1 second
//     }, 1000);
// }


