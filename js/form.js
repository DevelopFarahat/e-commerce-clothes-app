const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");
	  loginBtn = document.querySelector(".login-to-sign");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", (e )=>{
        e.preventDefault();
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        e.preventDefault();
        container.classList.remove("active");
    });


        const loader = document.querySelector('.loader');
        let successf;
        // select inputs 
        const submitBtn = document.querySelector('.submit-btn');
        const names = document.querySelector('#name');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const notification = document.querySelector('#notification');
        const  confirmPassword= document.querySelector("#confirmPassword");

        submitBtn.addEventListener('click', () => {
            if(names.value.length < 3){
                showAlert('name must be 3 letters long');
            } else if(!email.value.length){
                showAlert('enter your email');
            } else if(password.value.length < 8){
                showAlert('password should be 8 letters long');
            } else if(confirmPassword.value != password.value){
                showAlert('please Chek your Password');  
            }else{
                // successf ="good"
                const user = username.value;
                const pass = loginpassword.value;
                    localStorage.setItem('username', user);
                    localStorage.setItem('password', pass);
				container.classList.remove("active");
            }
        });

            // alert function
            const showAlert = (msg) => {
                let alertBox = document.querySelector('.alert-box');
                let alertMsg = document.querySelector('.alert-msg');
                alertMsg.innerHTML = msg;
                alertBox.classList.add('show');
                setTimeout(() => {
                    alertBox.classList.remove('show');
                }, 1000);
            }

              //local storage
            const username = document.getElementById("name");
            const loginpassword = document.getElementById("password");
            const inputLocalStorage = document.getElementById("inputLocalStorage");


          
            let loginUsername   =    document.querySelector("[placeholder='Enter Your Name']");
            let loginPassword   =     document.querySelector("[placeholder='Enter your password']");
            loginBtn.addEventListener('click', () => {
                if(localStorage.getItem('username') !== null && localStorage.getItem('password') !== null){
                    
                    if(loginUsername.value == localStorage.getItem('username') &&  loginPassword.value == localStorage.getItem('password')){
                        window.location.href = window.location.protocol + '//' + window.location.host+"/index.html";
                    }
                }
            });