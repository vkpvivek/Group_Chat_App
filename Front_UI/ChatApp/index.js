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

    console.log("test");

    axios.get(`http://localhost:3000/getAllUser`)
        .then((response)=>{
            // console.log(response.data.newUserDetails);

            for( var i=0;i<response.data.newUserDetails.length;i++){
                //onsole.log(response.data.newUserDetails[i].username);
                // const user=response.data.newUserDetails[i].username;
                // console.log(user);
                showUser(response.data.newUserDetails[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})



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

    console.log(obj.Sender);

    const parElem=document.getElementById('ChatDetail');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';

    //childElem.textContent=" Joined the chat";
    childElem.textContent= obj.Sender +" ::"+obj.msg;

    parElem.appendChild(childElem);

}


