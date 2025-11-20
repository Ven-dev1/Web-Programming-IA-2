const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const email=document.getElementById('email');
const dob=document.getElementById('dob');
const username=document.getElementById('username');
const password=document.getElementById('newPassword');
const confirmPass=document.getElementById('confirmPass');
const registerForm=document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');


function stringify(item){
    return JSON.stringify(item);
}

function registerUser(){
    const firstNameValue=firstName.value.trim();
    const lastNameValue=lastName.value.trim();
    const emailValue=email.value.trim();
    const dobValue=dob.value;
    const usernameValue=username.value.trim();
    const passwordValue=password.value.trim();
    const confirmPassValue=confirmPass.value.trim();

    localStorage.setItem('firstName', stringify(firstNameValue));
    localStorage.setItem('lastName', stringify(lastNameValue));
    localStorage.setItem('email', stringify(emailValue));
    localStorage.setItem('dob', stringify(dobValue));
    localStorage.setItem('username', stringify(usernameValue));
    localStorage.setItem('password', stringify(passwordValue));
    localStorage.setItem('confirmPass', stringify(confirmPassValue));
}

function checkInputs(){
    let complete=true;
    const firstNameValue=firstName.value.trim();
    const lastNameValue=lastName.value.trim();
    const emailValue=email.value.trim();
    const dobValue=dob.value;
    const usernameValue=username.value.trim();
    const passwordValue=password.value.trim();
    const confirmPassValue=confirmPass.value.trim();

    if (firstNameValue===''){
        complete=false;
    }

    if (lastNameValue===''){
        complete=false;
    }
    if (emailValue===''){
        complete=false;
    }
    if (dobValue===''){
        complete=false;
    }
    if (usernameValue===''){
        complete=false;
    }
    if (passwordValue===''){
        complete=false;
    }
    if (confirmPassValue===''){
        complete=false;
    }else if (passwordValue!==confirmPassValue){
        complete=false;
         alert('Passwords do not match.');
    }
    return complete;
}

 function redirect(){
            window.location.href = "loginPg.html";
        }


registerBtn.addEventListener('click', function(event){
    event.preventDefault();
    if (checkInputs()){
        registerUser();
        alert('Registration Successful!');
        registerForm.reset();
        redirect();
    } else {
        alert('Please fill in all fields correctly.');
    }
});