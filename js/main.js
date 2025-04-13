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


    // Login/logout 
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const userInfo = document.getElementById("user-info");
    const authAction = document.getElementById("auth-action");

    if (user) {
        userInfo.style.display = "inline-block";
        userInfo.innerHTML = `<p class="user-logged">${user.name}</p>`;
        authAction.innerText = "Logout";
        authAction.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("loggedInUser");
            location.reload();  //page reload
        });
    } else {
        userInfo.style.display = "none";
        authAction.innerText = "Sign In";
        authAction.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "loginPage.html";
        });
    }