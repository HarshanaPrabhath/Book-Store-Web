const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});




// Sign-UP
document.getElementById("sign-UP").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = { name:name, email:email, password:password };
    console.log(user);
    

    
    let users = JSON.parse(localStorage.getItem("users")) || [];

    

    let userExists = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            userExists = true;
            break;
        }
    }

    if (userExists) {
        alert("User with this email already exists!");
        return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Account created successfully!");
    
    clearTextFeild();
});



function clearTextFeild() {

  document.getElementById('name').value="";
  document.getElementById('email').value="";
  document.getElementById('password').value="";

}


// Sign-IN
document.getElementById("sign-IN").addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById('L_password').value;
    const email = document.getElementById('L_email').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {

        alert("Welcome back, " + foundUser.name + "!");
        document.getElementById('L_password').value;
        document.getElementById('L_email').value;
        window.location.href = "index.html";

    } else {
        alert("Invalid email or password.");
    }
});
