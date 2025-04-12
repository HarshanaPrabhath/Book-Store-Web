document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitBtn");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const feedbackInput = document.getElementById("message");
    const feedbackContainer = document.getElementById("feedbackSection");

    submitBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const feedback = feedbackInput.value.trim();

        if (name && email && feedback) {

            const card = document.createElement("div");
            card.className = "container-feed-Card";
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
            feedbackContainer.appendChild(card);
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
