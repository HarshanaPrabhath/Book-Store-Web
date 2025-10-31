<?php
require_once 'config/db_connection.php';

// Start the session to handle the cart
session_start();

// Query to fetch FAQs
$sql = "SELECT * FROM faq";
$result = mysqli_query($conn, $sql);

// Check if query was successful
if (!$result) {
    die("Error retrieving FAQs: " . mysqli_error($conn));
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>READIFY Bookstore</title>
  <link rel="icon" type="image/png" href="/assets/img-title.png">
  <link rel="stylesheet" href="./css/common.css" />
  <link rel="stylesheet" href="./css/FaQ.css" />
</head>

<body>
  <!-- Header -->
  <header class="header">
    <div class="container-inner">
      <a href="index.html" class="logo-link">
        <div class="logo">
          <h1>READIFY</h1>
          <img src="./assets/title.png" alt="BookShop Logo" class="logo-resize" />
        </div>
      </a>
      <button class="hamburger" id="hamburger">&#9776;</button>
      <nav class="nav-link" id="nav">
        <button class="close-icon" id="close-icon">&times;</button>
        <ul>
          <li><a href="./index.html">Home</a></li>
          <li><a href="./product.php">Books</a></li>
         <li><a href="./aboutus.php">About Us</a></li>
          <li><a href="./contact.php">Contact Us</a></li>
          <li><a href="./cart.html">Cart</a></li>
          <li id="user-info"></li>
          <li><a href="#" id="auth-action">Sign In</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <h2 style="text-align: center; margin-bottom: 30px; margin-top: 60px;">FAQs Unraveled: Your Questions Answered!</h2>

  <div class="container-box" id="container-box">
    <?php
    // Loop through and display each FAQ
    while ($faq = mysqli_fetch_assoc($result)) {
        echo "
          <div class='problem-box'>
            <h2>" .($faq['question']) . "</h2>
            <p>" .($faq['answer']). "</p>
          </div>";
    }
    ?>
  </div>

  <!-- Footer -->
  <section class="footer">
    <div class="footer-row">
      <div class="footer-col">
        <h4>Useful Links</h4>
        <ul class="links">
          <li><a href="./index.html">Home</a></li>
          <li><a href="./aboutus.php">About Us</a></li>
          <li><a href="./contact.php">Contact Us</a></li>
          <li><a href="./cart.html">Cart</a></li>
          <li><a href="./orders.html">Orders</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul class="links">
          <li><a href="/feedback.html">Customer Feedback</a></li>
          <li><a href="/offers.html">Offers</a></li>
          <li><a href="/payment.html">Payment</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul class="links">
          <li><a href="/policy.html">Privacy Policy</a></li>
          <li><a href="/FAQ.php">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Newsletter</h4>
        <p>Subscribe to our newsletter for a weekly dose of news, updates, helpful tips, and exclusive offers.</p>
        <form action="#">
          <input type="text" placeholder="Your email" required />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
    </div>
  </section>

  <script src="js/main.js"></script>
</body>

</html>

<?php
mysqli_close($conn);
?>
