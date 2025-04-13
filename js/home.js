document.addEventListener("DOMContentLoaded", () => {
    // Slideshow setup
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    // Book rendering
    const arrayData = [
        {
            id: 1,
            imageUrl: "/assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
            bookName: "The Silent Echo",
            author: "John Rivers",
            price: "2300",
            description: "A thrilling mystery novel with unexpected twists.",
        },
        {
            id: 2,
            imageUrl: "/assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
            bookName: "Whispers of the Wind",
            author: "Ella Brooks",
            price: "2400",
            description: "A poetic journey through love and loss.",
        },
        {
            id: 3,
            imageUrl: "/assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
            bookName: "Digital Fortress",
            author: "Dan Croft",
            price: "2500",
            description: "A cyber-thriller that explores the dangers of encryption.",
        },
        {
            id: 4,
            imageUrl: "/assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
            bookName: "Shadow of Destiny",
            author: "Liam Carter",
            price: "2600",
            description: "A gripping fantasy novel set in a parallel world.",
        },
        {
            id: 5,
            imageUrl: "/assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
            bookName: "The Last Heir",
            author: "Sophia Wells",
            price: "2700",
            description: "An epic tale of betrayal and redemption.",
        },
        {
            id: 6,
            imageUrl: "/assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
            bookName: "Lost in Time",
            author: "Ethan Blake",
            price: "2800",
            description: "A time-travel adventure with unexpected consequences.",
        },
    ];

    const renderBooks = (container) => {
        arrayData.forEach((data) => {
            container.innerHTML += `
                <div class="containerCard">
                    <div class="imageBox">
                        <img src="${data.imageUrl}" class="card-img" />
                    </div>
                    <div class="productDetail">
                        <p class="bookname">${data.bookName}</p>
                        <div class="bookauthor">
                            <p class="bookauthor">Author : ${data.author}</p>
                        </div>
                        <p class="price">Rs.${data.price}</p>
                        <p class="rate">Ratings : 5.0⭐</p>
                        <button class="addCart" 
                            data-id="${data.id}"
                            data-title="${data.bookName}"
                            data-price="${data.price}"
                            data-image="${data.imageUrl}">
                            Add to Cart
                        </button>
                    </div>
                </div>`;
        });
    };

    const container1 = document.querySelector(".container-Featured-Book");
    const container2 = document.querySelector(".container-New-Book");
    renderBooks(container1);
    renderBooks(container2);

    // Cart functionality
    const buttons = document.querySelectorAll(".addCart");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const product = {
                id: button.dataset.id,
                title: button.dataset.title,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("Cart")) || [];

            let existing = cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem("Cart", JSON.stringify(cart));
            alert(`${product.title} added to cart!`);
        });
    });

});
