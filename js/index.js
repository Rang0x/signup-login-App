var userNameId = document.querySelector("#nameId");
var userEmailId = document.querySelector("#emailId");
var userPwId = document.querySelector("#passwordId");
var closeEmailD = document.querySelector("#closeEmailDialog");
var closeValidateD = document.querySelector("#validateDialog");
var logInError = document.querySelector("#logInError");
var table = document.querySelector("table");
var loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

var signUpBtn = document.querySelector(".signUpbtn");
var loginBtn = document.querySelector(".btn-login");
var logoutBtn = document.querySelector("#logoutBtn");
var signUpImg = document.querySelector(".imgSignup");
var logInImg = document.querySelector(".logInImg");

var usersInfo = [];
var emailExist ;
var userExist ;
var index;

var regExName = /^[A-Z][A-Za-z]{2,}/;
var regExEmail = /^[a-z0-9]{2,}(@)[a-z]{3,}(.com)/;
var regExPass = /^[A-Za-z\d]{5,}/


// ------- Check users info in Local Storage
if(localStorage.getItem("users") == null)
{
    usersInfo = [];
}
else{
    usersInfo = JSON.parse(localStorage.getItem("users"));
}

// ------- Sign Up function to collect data from User
if(signUpBtn)
{
    signUpBtn.addEventListener("click", function()
{
    for (var i = 0; i < usersInfo.length; i++) {
        if(usersInfo[i].userEmail == userEmailId.value)
        {
            openDialog();
            emailExist = true;
            break;
        };
    }
    if(emailExist != true)
    {
        if(regExName.test(userNameId.value) && regExEmail.test(userEmailId.value) && regExPass.test(userPwId.value))
        {
            var userInfo = {
                userName : userNameId.value,
                userEmail : userEmailId.value,
                userPass : userPwId.value,
            } 
            usersInfo.push(userInfo);
            clearInputs();
            localStorage.setItem("users", JSON.stringify(usersInfo));
            window.location.href = "index.html"
        }
        else{
            signUpImg.classList.add("shakeImg");
            document.querySelector("#validateError").showModal();
        }
    }
})
}

function clearInputs()
{
    userNameId.value = "";
    userEmailId.value = "";
    userPwId.value = "";
}

function openDialog()
{
    document.querySelector("#emailError").showModal();
}


// -------- Close both email dialog and validation dialog functions
if(closeEmailD)
{
    closeEmailD.addEventListener("click", function()
    {
        document.querySelector("dialog").close();
        logInImg.classList.remove("shakeImg");
    })
}

if(closeValidateD)
{
    closeValidateD.addEventListener("click", function()
    {
        document.querySelector("#validateError").close();
        signUpImg.classList.remove("shakeImg");
    })
}

// ------- Login function >> Get data and check if valid 
if(loginBtn)
{
    loginBtn.addEventListener("click", function()
    {
        for (var i = 0; i < usersInfo.length; i++) {
            if(usersInfo[i].userEmail == userEmailId.value && usersInfo[i].userPass == userPwId.value)
            {
            window.location.href = "welcome.html";
            userExist = true;
            break;
            }
        }
        if(userExist == true)
        {
            logUser = usersInfo[i];
            sessionStorage.setItem("loggedUser", JSON.stringify(logUser));
        }
        if(userExist != true)
        {
            logInImg.classList.add("shakeImg");
            logInError.showModal();
        }
    })
    
}

// --------Display user information
if(table)
{
    function displayUserInfo()
    {
        table.innerHTML = `
        <tr>
        <td class="w-25">Your Name :</td>
        <td>${loggedUser.userName}</td>
        </tr>
        <tr>
            <td>Your Email :</td>
            <td>${loggedUser.userEmail}</td>
        </tr>
        <tr>
            <td>Password :</td>
            <td><input class="border-0 fs-5" value="${loggedUser.userPass}" type="password"></td>
        </tr>`
    }
    displayUserInfo();}

// -------- Logout button function 
if(logoutBtn)
{
    logoutBtn.addEventListener("click", function()
    {
        window.location.href = "index.html";
    })
}
