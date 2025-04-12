document.getElementById('myForm').onsubmit = function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let customerObj = {
        name: name,
        email: email,
        message: message
    };


    // // Get existing messages from localStorage
    // let messages = JSON.parse(localStorage.getItem("customerMessages")) || [];

    // // Add new message
    // messages.push(customerObj);

    // // Save back to localStorage
    // localStorage.setItem("customerMessages", JSON.stringify(messages));

    console.log("Saved:", customerObj);
    
    //console.log("All messages:", messages);

    clearTextFeilds();
};


function clearTextFeilds() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}