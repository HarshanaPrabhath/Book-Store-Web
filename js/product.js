const arrayData = [
    {
        id: 1,
        imageUrl: "./assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
        bookName: "The Silent Echo",
        author: "John Rivers",
        price: "Rs. 2,900",
        description: "A thrilling mystery novel with unexpected twists.",
    },
    {
        id: 2,
        imageUrl: "./assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
        bookName: "Whispers of the Wind",
        author: "Ella Brooks",
        price: "Rs. 1,800",
        description: "A poetic journey through love and loss.",
    },
    {
        id: 3,
        imageUrl: "./assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
        bookName: "Digital Fortress",
        author: "Dan Croft",
        price: "Rs. 3,200",
        description: "A cyber-thriller that explores the dangers of encryption.",
    },
    {
        id: 4,
        imageUrl: "./assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
        bookName: "Shadow of Destiny",
        author: "Liam Carter",
        price: "Rs. 2,750",
        description: "A gripping fantasy novel set in a parallel world.",
    },
    {
        id: 5,
        imageUrl: "./assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
        bookName: "The Last Heir",
        author: "Sophia Wells",
        price: "Rs. 2,300",
        description: "An epic tale of betrayal and redemption.",
    },
    {
        id: 6,
        imageUrl: "./assets/product page images/matt-ridley-H-LIL57PHCc-unsplash.jpg",
        bookName: "Lost in Time",
        author: "Ethan Blake",
        price: "Rs. 2,100",
        description: "A time-travel adventure with unexpected consequences.",
    },
 
];

// sinhala books rendering
const cardContainer = document.querySelector(".container");

const functionCards = () => {
    arrayData.map((data) => {
        cardContainer.innerHTML += `<div class="containerCard">
        <div class="imageBox">
          <img src="${data.imageUrl}"
            class="img"
          />
        </div>
        <div class="productDetail">
            <p class="bookname">${data.bookName}</p>
            <div class="bookauthor">
            
            <p class="bookauthor">Author : ${data.author}</p>
        </div>
            
           
            <p class="price">${data.price}</p>
            <p class="rate">Ratings : 5.0⭐</p>
            <button class="addCart">Add to Cart</button>
        </div>
      </div>
`
    });
};

//English books rendering
const cardContainer2 = document.getElementById("container2");

const functionCards2 = () => {
    arrayData.map((data) => {
        cardContainer2.innerHTML += `<div class="containerCard">
        <div class="imageBox">
          <img src="${data.imageUrl}"
            class="img"
          />
        </div>
        <div class="productDetail">
            <p class="bookname">${data.bookName}</p>
            <div class="bookauthor">
            
            <p class="bookauthor">Author : ${data.author}</p>
        </div>
            <!-- <p class="description"></p> -->
           
            <p class="price">${data.price}</p>
            <p class="rate">Ratings : 5.0⭐</p>
            <button class="addCart">Add to Cart</button>
        </div>
      </div>
`
    });
};

//Tamil book rendering
const cardContainer3 = document.getElementById("container3");

const functionCards3 = () => {
    arrayData.map((data) => {
        cardContainer3.innerHTML += `<div class="containerCard">
        <div class="imageBox">
          <img src="${data.imageUrl}"
            class="img"
          />
        </div>
        <div class="productDetail">
            <p class="bookname">${data.bookName}</p>
            <div class="bookauthor">
            
            <p class="bookauthor">Author : ${data.author}</p>
        </div>
            <!-- <p class="description"></p> -->
           
            <p class="price">${data.price}</p>
            <p class="rate">Ratings : 5.0⭐</p>
            <button class="addCart">Add to Cart</button>
        </div>
      </div>
`
    });
};

functionCards();
functionCards2();
functionCards3();
