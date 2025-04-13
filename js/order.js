document.addEventListener("DOMContentLoaded", () => {
  const orderList = document.getElementById("orderList");

  // Try to get orders from localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Check if orders exist
  if (orders.length === 0) {
    orderList.innerHTML = "<p>No orders found.</p>";
    return;
  }

  orders.forEach((order, index) => {
    const orderElement = document.createElement("div");
    orderElement.className = "order";

    const formattedDate = order.orderDate
      ? new Date(order.orderDate).toLocaleString()
      : "Unknown Date";

    let itemsHTML = "";
    let total = 0;

    if (Array.isArray(order.items)) {
      order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        itemsHTML += `
          <div class="item">
            <div><strong>${item.title}</strong></div>
            <div>Qty: ${item.quantity}</div>
            <div>Price: Rs. ${item.price}</div>
            <div>Subtotal: Rs. ${itemTotal}</div>
            <hr>
          </div>
        `;
      });
    }

    orderElement.innerHTML = `
      <h3>Order #${index + 1}</h3>
      <div class="order-date">Date: ${formattedDate}</div>
      <p><strong>Customer:</strong> ${order.user?.name || "Unknown"} (${order.user?.email || "N/A"})</p>
      <div class="items">${itemsHTML}</div>
      <div class="total"><strong>Total:</strong> Rs. ${total}</div>
    `;

    orderList.appendChild(orderElement);
  });
});
