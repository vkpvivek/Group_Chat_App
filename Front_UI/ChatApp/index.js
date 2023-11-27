const messageForm=document.querySelector('#messageForm');
const inputMsg=document.querySelector('#msg');


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


window.addEventListener("DOMContentLoaded",()=>{

    const msgLog = JSON.parse(localStorage.getItem("msgArr") || "[]");
    let lastID=0;
    console.log("test");


    axios.get(`http://localhost:3000/getAllUser`)
        .then((response)=>{
            // console.log(response.data.newUserDetails);
            for( var i=0;i<response.data.newUserDetails.length;i++){
                // console.log(user);
                showUser(response.data.newUserDetails[i]);
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

    console.log(obj.username);

    const parElem=document.getElementById('UserDetail');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';

    //childElem.textContent=" Joined the chat";
    childElem.textContent= obj.username +" Joined the chat";

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



// Refresh page
// window.addEventListener("DOMContentLoaded",()=>{
//     startRefreshingPage();
// })

// function startRefreshingPage() {
//     setInterval(() => {
//         location.reload(); // Reload the page every 1 second
//     }, 1000);
// }


