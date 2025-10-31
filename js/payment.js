// Wait for the HTML content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Select the elements needed for displaying summary and handling payments
    const summary = document.querySelector(".payment-summary");
    const payButton = document.getElementById("payButton");
    const paymentForm = document.getElementById("paymentForm");

    // Retrieve the 'orders' array from localStorage or initialize with an empty array
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // If there are no orders, inform the user and disable the payment button
    if (orders.length === 0) {
        summary.innerHTML = "<p>No orders found. You must place an order before making payment.</p>";

        // If the pay button exists, disable it and visually indicate it's inactive
        if (payButton) {
            payButton.disabled = true; 
            payButton.style.opacity = "0.5"; 
            payButton.style.cursor = "not-allowed"; 
        }

        return; // Exit early since there's no order to show
    }

    // Get the most recent order
    const latestOrder = orders[orders.length - 1];
    const { items, orderDate } = latestOrder;

    let subtotal = 0;
    let itemsHTML = `<ul class="list-product">`;

    // Generate HTML for each item and calculate subtotal
    items.forEach((item, index) => {
        itemsHTML += `<li>${index + 1}. ${item.title} - Rs. ${item.price.toFixed(2)}</li>`;
        subtotal += item.price;
    });

    itemsHTML += "</ul>";

    // Calculate tax and total
    const taxRate = 0.10;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Format the order date for display
    const formattedDate = new Date(orderDate).toLocaleString();

    // Update the summary section with full order details
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

    // Attach an event listener to the "Remove Order" button to allow clearing the latest order
    const clearOrderBtn = document.getElementById("clearOrder");
    if (clearOrderBtn) {
        clearOrderBtn.addEventListener("click", () => {
            // Remove the latest order from the array
            orders.pop();
            // Save the updated orders array back to localStorage
            localStorage.setItem("orders", JSON.stringify(orders));
            // Reload the page to update the UI
            location.reload();
        });
    }

    // Handle payment form submission
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log("Pay button clicked");

        // Remove the latest order as it is being paid
        const paidOrder = orders.pop();

        // Update orders in localStorage
        localStorage.setItem("orders", JSON.stringify(orders));

        // Save the paid order into a separate 'paidOrders' list
        let paidOrders = JSON.parse(localStorage.getItem("paidOrders")) || [];
        paidOrders.push(paidOrder);
        localStorage.setItem("paidOrders", JSON.stringify(paidOrders));

        // Redirect the user to a thank you page
        window.location.href = "thankyou.html";
    });
});
