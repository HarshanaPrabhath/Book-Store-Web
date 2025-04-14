//================>feedback function<======================
document.addEventListener("DOMContentLoaded", () => {

    // get the we need dom elemets
    const submitBtn = document.getElementById("submitBtn");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const feedbackInput = document.getElementById("message");
    const feedbackContainer = document.getElementById("feedbackSection");

    // if submit button click
    submitBtn.addEventListener("click", () => {
        
        // get input feilds values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const feedback = feedbackInput.value.trim();

        // check value are not ====> null
        if (name && email && feedback) {

            // create html element====> [div]
            const card = document.createElement("div");
            card.className = "container-feed-Card"; //add that div class to style
            card.innerHTML = `
                <div class="feedback-card">
                <div class="user-info">
                    <h3>${name}</h3>
                </div>
                <div class="user-feedback">
                    <p>${feedback}</p>
                </div>
            </div>

            `;
            
            // append the card for showing
            feedbackContainer.appendChild(card);
            // clear input feilds function 
            clearTextFeilds();
        } else {
            alert("Please fill in all fields.");
        }
    });
});


function clearTextFeilds() {
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("message").value="";
}
