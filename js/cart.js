let cart = JSON.parse(localStorage.getItem("Cart")) || [];

function updateLocalStorage() {
    localStorage.setItem("Cart", JSON.stringify(cart));
}

function renderCart() {
    let cartContainer = document.getElementById("inner-cart");
    cartContainer.innerHTML = "";

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
        cartContainer.appendChild(cartCard);
    });
    
    // Delete functionality
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            cart.splice(index, 1);
            updateLocalStorage();
            renderCart();
        });
    });

    // Increment functionality
    document.querySelectorAll(".btn-plus").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            cart[index].quantity += 1;
            updateLocalStorage();
            renderCart();
        });
    });

    // Decrement functionality
    document.querySelectorAll(".btn-minus").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); 
            }
            updateLocalStorage();
            renderCart();
        });
    });

    // cart price show case 
    let totalSumOfProducts = 0.00;
    for (let i = 0; i < cart.length; i++) {
        totalSumOfProducts += cart[i].price * cart[i].quantity;
    }

    document.getElementById("price").innerText = totalSumOfProducts;


    // place order check user and cart
    document.getElementById("place-order-btn").addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        const cart = JSON.parse(localStorage.getItem("Cart")) || [];
    
        if (!user) {
            alert("You must be logged in to place an order.");
            return;
        }
    
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
    
        const order = {
            user: {
                name: user.name,
                email: user.email
            },
            items: cart,
            orderDate: new Date().toISOString()
        };
    
        // set order into localstorage 
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        

        // Clear cart after placing order
        localStorage.removeItem("Cart");
    
        alert("Order placed successfully!");
    
        
        window.location.href = "thankyou.html"; 
    });
    
}




document.addEventListener("DOMContentLoaded", renderCart);
