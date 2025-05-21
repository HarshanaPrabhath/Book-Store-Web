// get Cart on the Localstorage
let cart = JSON.parse(localStorage.getItem("Cart")) || [];

// function that save loacl storeage on the cart array {this function i create to for [code clean] }
function updateLocalStorage() {
    localStorage.setItem("Cart", JSON.stringify(cart));
}

// Render Cart Items
function renderCart() {

    // showing card on the DOM
    let cartContainer = document.getElementById("inner-cart");
    cartContainer.innerHTML = "";
    
    // cart array looping
    cart.forEach((data, index) => {
        let cartCard = document.createElement("div");
        cartCard.classList.add("cart-Card");
        cartCard.innerHTML = `
            <img src="${data.image}" alt="Product Image" class="image-resize">
            <div class="description">${data.title}</div>
            <div class="price">Rs.<span>${data.price}</span></div>
            <div class="btn-increment">
                <button class="btn-plus" data-index="${index}">+</button>
                <button class="btn-minus" data-index="${index}">-</button>
            </div>
            <div class="quantity">${data.quantity}</div>
            <div class="total">Rs.<span>${data.price * data.quantity}</span></div>
            <div class="btn-cancel">
                <button class="delete-btn" data-index="${index}">X</button>
            </div>
        `;

        // append the cartCard to showing on the DOM
        cartContainer.appendChild(cartCard);
    });

        // Delete functionality
    document.querySelectorAll(".delete-btn").forEach(button => { //get all button on the cart [delete-btn]
        button.addEventListener("click", (e) => { //one of button click trigger
            const index = e.currentTarget.dataset.index;
            cart.splice(index, 1); // remove the object that on the array 
            updateLocalStorage();  // notify the localstoreage
            renderCart();          // render card function again so we can see the what happens
        });
    });


    // Increment functionality
    document.querySelectorAll(".btn-plus").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            cart[index].quantity += 1; // Increment the object that have quantity on the array 
            updateLocalStorage();     // notify the localstoreage
            renderCart();            // render card function again so we can see the what happens
        });
    });


    // Decrement functionality
    document.querySelectorAll(".btn-minus").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            if (cart[index].quantity > 1) {  // check the quantity is more than 1
                cart[index].quantity -= 1;   // decrement the value of quatity
            } else {
                cart.splice(index, 1);       // check the quantity is ===> 1 [remove that object from the cart array]
            }
            updateLocalStorage();            //notify the localstoreage
            renderCart();                   // render card function again so we can see the what happens
        });
    });

    // cart price show case 
    let totalSumOfProducts = 0.00;
    for (let i = 0; i < cart.length; i++) {
        totalSumOfProducts += cart[i].price * cart[i].quantity;
    }

    // set the value to DOM
    document.getElementById("price").innerText = totalSumOfProducts;
    
}


// Place Order
document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    
    const placeOrderBtn = document.getElementById("place-order-btn");
    
    // place order check user and cart
    placeOrderBtn.addEventListener("click", () => {

        // currently log user get AND  get Cart of that user
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        
        // check user avilibility
        if (!user) {
            alert("You must be logged in to place an order.");
            return;
        }

        // check cart length
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // create order Object
        const order = {
            user: {
                name: user.name,
                email: user.email
            },
            items: cart,
            orderDate: new Date().toISOString()
        };

        // get order into localstorage 
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear cart after placing order
        localStorage.removeItem("Cart");

        // redirect to thankyou.html page
        window.location.href = "payment.html";
    });
});
