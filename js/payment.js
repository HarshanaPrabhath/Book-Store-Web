document.addEventListener("DOMContentLoaded", () => {
    const summary = document.querySelector(".payment-summary");
    const payButton = document.getElementById("payButton");
    const paymentForm = document.getElementById("paymentForm");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        summary.innerHTML = "<p>No orders found. You must place an order before making payment.</p>";
        if (payButton) {
            payButton.disabled = true;
            payButton.style.opacity = "0.5";
            payButton.style.cursor = "not-allowed";
        }
        return;
    }

    const latestOrder = orders[orders.length - 1];
    const { items, orderDate } = latestOrder;

    let subtotal = 0;
    let itemsHTML = `<ul class="list-product">`;

    items.forEach((item, index) => {
        itemsHTML += `<li>${index + 1}. ${item.title} - Rs. ${item.price.toFixed(2)}</li>`;
        subtotal += item.price;
    });

    itemsHTML += "</ul>";

    const taxRate = 0.10;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const formattedDate = new Date(orderDate).toLocaleString();

    summary.innerHTML = `
        <h3>Order Summary</h3>
        <p><strong>Total Orders:</strong> ${orders.length}</p>
        <p><strong>Order Date:</strong> ${formattedDate}</p>
        ${itemsHTML}
        <p>Subtotal: Rs. ${subtotal.toFixed(2)}</p>
        <p>Credit Card Tax (10%): Rs. ${tax.toFixed(2)}</p>
        <hr />
        <p class="total">Total: <strong>Rs. ${total.toFixed(2)}</strong></p>
        <button id="clearOrder" style="margin-top: 15px; padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 6px; cursor: pointer;">Remove Order</button>
    `;

    // Attach "Remove Order" button event
    const clearOrderBtn = document.getElementById("clearOrder");
    if (clearOrderBtn) {
        clearOrderBtn.addEventListener("click", () => {
            orders.pop();
            localStorage.setItem("orders", JSON.stringify(orders));
            location.reload();
        });
    }

    // Prevent form default and handle payment logic
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission reload

        console.log("Pay button clicked");

        // Remove the latest order
        const paidOrder = orders.pop();

        // Update orders in localStorage
        localStorage.setItem("orders", JSON.stringify(orders));

        // Save to paidOrders
        let paidOrders = JSON.parse(localStorage.getItem("paidOrders")) || [];
        paidOrders.push(paidOrder);
        localStorage.setItem("paidOrders", JSON.stringify(paidOrders));

        window.location.href = "thankyou.html"; 
        
    });
});
