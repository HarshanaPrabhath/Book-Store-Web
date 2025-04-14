const questionsArray = [
    {
        question: "What types of books do you sell?",
        answer: "We offer a wide range of books including fiction, non-fiction, academic, children's books, and more."
    },
    {
        question: "How can I place an order?",
        answer: "You can place an order by browsing our collection, adding items to your cart, and proceeding to checkout."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards, net banking, UPI, and popular digital wallets."
    },
    {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 3-7 business days depending on your location. Express delivery options are also available."
    },
    {
        question: "Can I return or exchange a book?",
        answer: "Yes, returns and exchanges are accepted within 7 days of delivery, provided the book is in original condition."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we only ship within the country. We are working on adding international delivery soon."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, a tracking number will be shared via email or SMS for real-time updates."
    },
    {
        question: "Do you have a loyalty or membership program?",
        answer: "Yes! Our Book Lovers Club offers points on every purchase and exclusive member discounts."
    },
    {
        question: "Can I gift wrap an order?",
        answer: "Yes, gift wrapping is available at checkout for a small additional charge."
    },
    {
        question: "How do I contact customer support?",
        answer: "You can reach us via our Contact Us page, or email support@yourbookshop.com."
    }
];

// palce that FAQ Card puts on
const questionsContainer=document.getElementById("container-box");

// function that call to get question 
const  questionsArrayShow= () => {
    // loop the array call questions Array
    questionsArray.map((data) => {
        questionsContainer.innerHTML +=
        `
        <div class="problem-box">
            
            <h2>${data.question}</h2>
            
            <p>
                ${
                    data.answer
                }    
            </p>

        </div>
        `
    });
};


// calling function
questionsArrayShow();

