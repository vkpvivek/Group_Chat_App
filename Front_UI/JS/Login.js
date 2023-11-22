const myForm=document.querySelector('#my-form');
const emailInput = document.querySelector('#email');
const passInput=document.querySelector('#password');

myForm.addEventListener('submit',onSubmit);


function onSubmit(e){
    e.preventDefault();

    if(emailInput.value === ''|| passInput==='') {
        //alert("Please enter all fields");
        console.log("enter all field");
    } 
    else {
        let myObj={
            email:emailInput.value,
            password:passInput.value
        };

        console.log(myObj);


        axios.post("http://localhost:3000/login",myObj)
            .then((response)=>{
    
                //redirect to index if password match i.e, Login successfullly
                if(response.data.success===true){
                    console.log(response.data);

                    //const UserId=response.data.Uid;
                    // localStorage.setItem("Token",response.data.token);
                    // window.location.href = "Expanse/index.html";
                }
            })
            .catch((err)=>{
                console.log(err);
            })

      }  
}