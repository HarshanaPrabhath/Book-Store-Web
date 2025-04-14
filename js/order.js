

function renderOrders() {
  // Rendering place
  const orderList = document.getElementById("Order-List");
  
  // get Orders Array from LocalStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  // get Order's on the array outter loop
  orders.forEach((order, index) => {
    const formattedDate = (order.orderDate) // Format Date
      ? new Date(order.orderDate).toLocaleString()
      : "Unknown Date";

    let total = 0;//get total of iteams
    let orderedItems = ""; //to get order items in array

    // get iteams on the array inner loop
    order.items.forEach(item => {
      const itemTotal = item.price * item.quantity; // calculate iteam wise total
      total += itemTotal;
      orderedItems +=
      `
        <div class="item">
            
            <div><strong>${item.title}</strong></div>
            <div>Qty: ${item.quantity}</div>
            <div>Price: Rs. ${item.price}</div>
            
        </div>

      `;
    });

    
    // set Orders-cards to Rendering place
    orderList.innerHTML +=
      `
    <div class="card-order">
        <h2>Order #<span id="count-of-order">${index + 1}</span></h2>
        <p>Order Date: <span id="order-date-time">${formattedDate}</span></p>
        <h2 style="margin-top:10px;margin-bottom:10px;">Product that You Buy:</h2>
        <hr>
        <div class="container-products">${orderedItems}</div>
        <hr>
        <h3 style="margin-top:10px;">Total price of Order is: Rs.<span id="order-total">${total}</span></h3>
      </div>

    `;

  });
}

// Calling Function
renderOrders();
