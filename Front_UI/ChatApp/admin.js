const inputUserDetail=document.querySelector('#inputUserDetail');

const addMember=document.querySelector('#add-mb');
const addAdmin=document.querySelector('#add-ad');
const remMember=document.querySelector('#rm-mb');


addMember.addEventListener('click',Add_Member);
addAdmin.addEventListener('click',Add_Admin);
remMember.addEventListener('click',Rem_Member);



async function Add_Member(e){
    e.preventDefault();

    const userDetails=inputUserDetail.value;
    console.log(userDetails);
    console.log("add member");

    const grpId=localStorage.getItem('groupId');
    let myObj={
        gpEmail:userDetails,
        groupId:grpId,
    };
    console.log(myObj);


    try {
        //Get UserId
        const response = await axios.post("http://localhost:3000/Get-userId", myObj);
        console.log(response.data); // Access the data property of the response here

        if (response.data.success === true) {
            UserId = response.data.newUserDetails[0].id;
        }

        //Add UserId to Group
        const newObj={
            userId:UserId,
            groupId:grpId,
        }
        console.log(newObj);

        const addMem = await axios.post("http://localhost:3000/Add-GeoupMembers", newObj);
        console.log(addMem);


    } catch (error) {
        console.error(error);
    }


    
}


async function Add_Admin(e){
    e.preventDefault();

    const userDetails=inputUserDetail.value;
    console.log(userDetails);
    console.log("add admin");

    const grpId=localStorage.getItem('groupId');
    let myObj={
        gpEmail:userDetails,
        groupId:grpId,
    };
    console.log(myObj);


    try {
        //Get UserId
        const response = await axios.post("http://localhost:3000/Get-userId", myObj);
        console.log(response.data); // Access the data property of the response here

        if (response.data.success === true) {
            UserId = response.data.newUserDetails[0].id;
        }

        //Add UserId as Admin
        const newObj={
            userId:UserId,
            groupId:grpId,
        }
        console.log(newObj);

        const setAdmin = await axios.post("http://localhost:3000/Add-Admin", newObj);
        console.log(setAdmin);


    } catch (error) {
        console.error(error);
    }
}


async function Rem_Member(e){
    e.preventDefault();

    const userDetails=inputUserDetail.value;
    console.log(userDetails);
    console.log("Remove User from Gp");

    const grpId=localStorage.getItem('groupId');
    let myObj={
        gpEmail:userDetails,
        groupId:grpId,
    };
    console.log(myObj);


    try {
        //Get UserId
        const response = await axios.post("http://localhost:3000/Get-userId", myObj);
        console.log(response.data); // Access the data property of the response here

        if (response.data.success === true) {
            UserId = response.data.newUserDetails[0].id;
        }

        //Remove UserId from Group
        const newObj={
            userId:UserId,
            groupId:grpId,
        }
        console.log(newObj);

        const remUser = await axios.post("http://localhost:3000/remove-User", newObj);
        console.log(remUser);


    } catch (error) {
        console.error(error);
    }
}


