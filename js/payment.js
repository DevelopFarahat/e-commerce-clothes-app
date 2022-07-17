let fullname = document.querySelector("[placeholder='Full Name']");
let fullnameError = document.querySelector("[placeholder='Full Name'] + i + span");
let email = document.querySelector("[placeholder='Email Adress']");
let emailError = document.querySelector("[placeholder='Email Adress']+ i + span");
let cardNumber = document.querySelector("[placeholder='Card Number']");
let cardNumberError = document.querySelector("[placeholder='Card Number'] + i + span");
let cardName = document.querySelector("[placeholder='Card Name']");
let cardNameError = document.querySelector("[placeholder='Card Name'] + i + span");
let cardCvv = document.querySelector("[placeholder='Card CVV']");
let cardCvvError = document.querySelector("[placeholder='Card CVV'] + i + span");
let paymentBtn = document.querySelector("[name='payment']");

paymentBtn.addEventListener('click', function () {
    if(fullname.value ==  ''){
        fullnameError.innerHTML = "Full Name is required";
        fullnameError.style.display = "block";  
    }
    let usernamePattern = /[a-z A-Z]{3,}\s{1}[a-z A-Z]{3,}/;
    if(fullname.value !== ''){
        if(!usernamePattern.test(fullname.value)){
            if(fullname.value.match(/\s/) == null){
                fullnameError.innerHTML = "Full Name must contain white space";
                fullnameError.style.display = "block";
            }
        }else{
            fullnameError.style.display = "none";
        }
    }
   
    if(email.value ==  ''){
        emailError.innerHTML = "Email is required";
        emailError.style.display = "block";  
    }
    let emailPattern = /^[a-z A-Z]+[0-9]+@[a-z A-Z]+(.com|.eg)$/;
    if(email.value !== ''){
        if(!emailPattern.test(email.value)){  
           if(email.value.match(/\s/) !== null){
                emailError.innerHTML = "Email must not  a  contain white space";
                emailError.style.display = "block";   
            }
            if(email.value.match(/\d/mg) == null){
                emailError.innerHTML = "Email must contain a number";
                emailError.style.display = "block";
            }
            if(email.value.match(/@/) == null){
                emailError.innerHTML = "Email must contain @";
                emailError.style.display = "block";
            }
            if(email.value.match(/\./) == null){
                emailError.innerHTML = "Email must contain .";
                emailError.style.display = "block";
            }
        }else{
            emailError.style.display = "none";
        }
    }
    if(cardNumber.value ==  ' '){
        cardNumberError.innerHTML = "Card Number is required";
        cardNumberError.style.display = "block";  
    }
    let cardNumberPattern = /^[0-9]{16}$/;
    if(cardNumber.value !==  ' '){
        if(!cardNumberPattern.test(cardNumber.value)){
            cardNumberError.innerHTML = "Card Number must be 16 digits";
            cardNumberError.style.display = "block";
        }else{
            cardNumberError.style.display = "none";
        }
    }
    if(cardCvv.value ==  ''){
        cardCvvError.innerHTML = "Card CVV is required";
        cardCvvError.style.display = "block";
    }
    let cardCvcPattern = /^[0-9]{3}$/;
    if(cardCvv.value !==  ''){
        if(!cardCvcPattern.test(cardCvv.value)){
            cardCvvError.innerHTML = "Card CVV must be 3 digits";
            cardCvvError.style.display = "block";
        }else{
            cardCvvError.style.display = "none";
        }
    }
    if(cardName.value ==  ''){
        console.log("cardName");
        cardNameError.innerHTML = "Card Name is required";
        cardNameError.style.display = "block";  
    }
    let cardNamePattern = /^[a-z A-Z]{3,}/;
    if(cardName.value !==  ''){
        if(!cardNamePattern.test(cardName.value)){
            if(cardName.value.match(/\d/mg) !== null){
                cardNameError.innerHTML = "Card Name must not contain a number";
                cardNameError.style.display = "block";
            }
        }else{
            cardNameError.style.display = "none";
        }
    }

    if(usernamePattern.test(fullname.value) && emailPattern.test(email.value) && cardNumberPattern.test(cardNumber.value) && cardCvcPattern.test(cardCvv.value) && cardNamePattern.test(cardName.value) ){
        window.location.href = "html/clientThanks.html";
    }


});
