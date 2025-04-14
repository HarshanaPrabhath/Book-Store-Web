const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});




//=======================>Sign-UP<=============================
document.getElementById("sign-UP").addEventListener("submit", (e) => {
    e.preventDefault(); // perevent default submit

    // get input boxes values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // create user object to save loaclstorage
    const user = { name:name, email:email, password:password };
    
    console.log(user);
    
    // get user Array on localstorage to check user avilibility
    let users = JSON.parse(localStorage.getItem("users")) || [];

    
    // checking user avilibility
    let userExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            userExists = true;
            break;
        }
    }

    // if user exists
    if (userExists) {
        alert("User with this email already exists!");
        return; //to stop function
    }

    //save user that not exists on the array 
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Account created successfully!");
    
    // to clear all input text boxes
    clearTextFeild();
});


function clearTextFeild() {
  document.getElementById('name').value="";
  document.getElementById('email').value="";
  document.getElementById('password').value="";
}



//===========================> Sign-IN<===================================
document.getElementById("sign-IN").addEventListener("submit", function (e) {
    e.preventDefault();// perevent default submit

    // get values that input feilds
    const password = document.getElementById('L_password').value;
    const email = document.getElementById('L_email').value;

    // get user array that on local storage to check user aviliblity
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check user aviliblity
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            foundUser = users[i];
            break;
        }
    }

    // user that found
    if (foundUser) {
        alert("Welcome back, " + foundUser.name + "!");

        // Save current user to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
});
