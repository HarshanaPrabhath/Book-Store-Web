<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>READIFY Bookstore</title>
  <link rel="icon" type="image/png" href="/assets/img-title.png">

  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/offers.css">

</head>

<body>

  <body>
    <!--Header -->
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

    <body>
      <header>
        <h1 style="text-align:center;margin-bottom: -20px;">Special Offers</h1>
        <br /><br />
      </header>
      <div class="container">
        <div class="offer">
          <h2>Offer 1: 50% Off on All Items</h2>
          <br />
          <p>
            Get 50% off on all items in our store. This offer is valid till the
            end of the month. Don't miss out on this amazing deal!
          </p>
          <br />
        </div>
        <div class="offer">
          <h2>Offer 2: Buy One Get One Free</h2>
          <br />
          <p>
            Buy one item and get another item of equal or lesser value for free.
            This offer is valid for a limited time only.
          </p>
          <br />
        </div>
        <div class="offer">
          <h2>Offer 3: Free Shipping on Orders Over $50</h2>
          <br />
          <p>
            Enjoy free shipping on all orders over $50. Shop now and save on
            shipping costs!
          </p>
          <br />
        </div>
      </div>
    </body>

    <!-- Footer -->
    <section class="footer">
      <div class="footer-row">
        <div class="footer-col">
          <h4>Useful Links</h4>
          <ul class="links">
            <li><a href="./index.html">Home</a></li>
            <li><a href="./aboutus.php">About Us</a></li>
            <li><a href="./contact.html">Contact Us</a></li>
            <li><a href="./cart.html">Cart</a></li>
            <li><a href="./orders.html">Orders</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul class="links">
            <li><a href="/feedback.html">Customer Feedback</a></li>
            <li><a href="/offers.html">Offers</a></li>
            <li><a href="/payment.html">payment</a></li>
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
          <p>
            Subscribe to our newsletter for a weekly dose of news, updates,
            helpful tips, and exclusive offers.
          </p>
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