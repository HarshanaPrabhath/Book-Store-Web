//============>form when submit this trigger<============
document.getElementById('myForm').onsubmit = function (e) {
    e.preventDefault(); //prevent defualt submition 

    // get vaules input feilds
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    // create customer object
    let customerObj = {
        name: name,
        email: email,
        message: message
    };


    // Get localStorage Customer Messages
    let messages = JSON.parse(localStorage.getItem("customerMessages")) || [];

    // push the customer object
    messages.push(customerObj);

    // Save Customer Messages in localStorage
    localStorage.setItem("customerMessages", JSON.stringify(messages));

    //=======>test purpose<===============
    console.log("Saved:", customerObj);    
    console.log("All messages:", messages);

    // clear input feilds
    clearTextFeilds();
};


function clearTextFeilds() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}