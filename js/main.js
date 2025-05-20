document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav");
    const hamburger = document.getElementById("hamburger");
    const closeIcon = document.getElementById("close-icon");

    hamburger.addEventListener("click", () => {
        nav.classList.add("show-nav");
    });

    closeIcon.addEventListener("click", () => {
        nav.classList.remove("show-nav");
    });
});

//================>Login/logout<===============================

// get user that currently LOGIN loggedInUser Array on Localstoreage
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const userInfo = document.getElementById("user-info");
const authAction = document.getElementById("auth-action");

// check user avilibility 
if (user) {
    userInfo.style.display = "inline-block";
    userInfo.innerHTML = `<p class="user-logged">${user.name}</p>`;
    authAction.innerText = "Logout"; //log out text appear

    // if logout text were click remove loggedInUser(so remove current log user) and redirect to login page 
    authAction.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        location.reload();  //page reload

        window.location.href = "loginPage.html"; //redirect to loginPage

    });
} else {
    userInfo.style.display = "none";
    authAction.innerText = "Sign In";
    // if there are not found user on again redirect to LoginPage
    authAction.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "loginPage.html";
    });
}