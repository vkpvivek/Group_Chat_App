
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const passInput=document.querySelector('#password');

myForm.addEventListener('submit',onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === '') {
        //msg.innerHTML = 'Please enter all fields';
        console.log("enter all field");
  
    } else {

        let myObj={
            username:nameInput.value,
            email:emailInput.value,
            password:passInput.value,
            phone:phoneInput.value
        };

        console.log(myObj);

        // axios.post("http://localhost:3000/add-user",myObj)
        //     .then((response)=>{
        //         console.log(response.data.newUserDetails);
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //     })
      }  
};


