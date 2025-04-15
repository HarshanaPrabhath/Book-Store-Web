const arrayDataSinhala = [
  {
    id: 1,
    imageUrl: "assets/product page images/S1.jpg",
    bookName: "Corona Dosthara",
    author: "John Rivers",
    price: "1800",
    description: "A thrilling mystery novel with unexpected twists.",
  },
  {
    id: 2,
    imageUrl: "assets/product page images/S2.jpg",
    bookName: "Sinahal Anduwa",
    author: "Ella Brooks",
    price: "1200",
    description: "A poetic journey through love and loss.",
  },
  {
    id: 3,
    imageUrl: "assets/product page images/S3.jpg",
    bookName: "Ganga Addara",
    author: "Dan Croft",
    price: "2300",
    description: "A cyber-thriller that explores the dangers of encryption.",
  },
  {
    id: 4,
    imageUrl: "assets/product page images/S4.jpg",
    bookName: "Gangaru Puda Kavi",
    author: "Liam Carter",
    price: "950",
    description: "A gripping fantasy novel set in a parallel world.",
  },
  {
    id: 5,
    imageUrl: "assets/product page images/S5.jpg",
    bookName: "Sinhala Sahithya",
    author: "Sophia Wells",
    price: "2700",
    description: "An epic tale of betrayal and redemption.",
  },
  {
    id: 6,
    imageUrl: "assets/product page images/S6.jpg",
    bookName: "Viyarana Yathura",
    author: "Ethan Blake",
    price: "1700",
    description: "A time-travel adventure with unexpected consequences.",
  },
];
const arrayDataEnglish = [
  {
    id: 7,
    imageUrl: "assets/product page images/1.jpg",
    bookName: "How Innovation Books",
    author: "Matt Ridley",
    price: "1800",
    description: "A thrilling mystery novel with unexpected twists.",
  },
  {
    id: 8,
    imageUrl: "assets/product page images/2.png",
    bookName: "Revision WorkBook",
    author: "Ella Brooks",
    price: "1200",
    description: "A poetic journey through love and loss.",
  },
  {
    id: 9,
    imageUrl: "assets/product page images/3.png",
    bookName: "Student Diary",
    author: "Dan Croft",
    price: "2300",
    description: "A cyber-thriller that explores the dangers of encryption.",
  },
  {
    id: 10,
    imageUrl: "assets/product page images/4.png",
    bookName: "Sell English",
    author: "Liam Carter",
    price: "950",
    description: "A gripping fantasy novel set in a parallel world.",
  },
  {
    id: 11,
    imageUrl: "assets/product page images/5.png",
    bookName: "Crafting Idea",
    author: "Sophia Wells",
    price: "2700",
    description: "An epic tale of betrayal and redemption.",
  },
  {
    id: 12,
    imageUrl: "assets/product page images/6.png",
    bookName: "Bussiness Report",
    author: "Ethan Blake",
    price: "1700",
    description: "A time-travel adventure with unexpected consequences.",
  },
];
const arrayDataTamil = [
  {
    id: 13,
    imageUrl: "assets/product page images/T1.jpg",
    bookName: "Thirukkaral",
    author: "W.H.Drew",
    price: "1800",
    description: "A thrilling mystery novel with unexpected twists.",
  },
  {
    id: 14,
    imageUrl: "assets/product page images/T2.jpg",
    bookName: "Indulaima",
    author: "D.H.Kavilma",
    price: "1200",
    description: "A poetic journey through love and loss.",
  },
  {
    id: 15,
    imageUrl: "assets/product page images/T3.jpg",
    bookName: "Pongatuk",
    author: "Ramanisanthiran",
    price: "2300",
    description: "A cyber-thriller that explores the dangers of encryption.",
  },
  {
    id: 16,
    imageUrl: "assets/product page images/T4.jpg",
    bookName: "Odu Malar",
    author: "Liam Carter",
    price: "950",
    description: "A gripping fantasy novel set in a parallel world.",
  },
  {
    id: 17,
    imageUrl: "assets/product page images/T5.jpg",
    bookName: "Katikiyan",
    author: "Sophia Wells",
    price: "2700",
    description: "An epic tale of betrayal and redemption.",
  },
  {
    id: 18,
    imageUrl: "assets/product page images/T6.jpg",
    bookName: "Penmani",
    author: "Ethan Blake",
    price: "1700",
    description: "A time-travel adventure with unexpected consequences.",
  },
];

// Function to render books (Sinhala, English, Tamil)
const renderBooks = (container, array) => {
  let html = "";
  array.forEach((data) => {
    html += `
        <div class="containerCard">
          <div class="imageBox">
            <img src="${data.imageUrl}" class="img" />
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
  container.innerHTML = html;
};

// Rendering books for different categories (Sinhala, English, Tamil)
const cardContainer = document.querySelector(".container");
const cardContainer2 = document.getElementById("container2");
const cardContainer3 = document.getElementById("container3");

// calling functions
renderBooks(cardContainer, arrayDataSinhala);
renderBooks(cardContainer2, arrayDataEnglish);
renderBooks(cardContainer3, arrayDataTamil);

// Cart functionality
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".addCart"); // get all button on the page

  // each button performe on click run this code segmentation
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // create product object to save Cart
      const product = {
        image: button.dataset.image,
        id: button.dataset.id,
        title: button.dataset.title,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image,
        quantity: 1,
      };

      // Get cart from localStorage ====> to check is Product Avilibility
      let cart = JSON.parse(localStorage.getItem("Cart")) || [];

      // Check if product exists
      let isProduct = null;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
          isProduct = cart[i];
          break;
        }
      }

      // Update the cart
      if (isProduct) {
        isProduct.quantity += 1;
      } else {
        cart.push(product);
      }

      // Save the localStorage to =====> cart Array
      localStorage.setItem("Cart", JSON.stringify(cart));

      alert(`${product.title} added to cart!`);
    });
  });
});
