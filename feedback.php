<?php
require_once 'config/db_connection.php';

// Handle feedback form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit_feedback'])) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);

    $sql = "INSERT INTO feedback (name, email, message) VALUES ('$name', '$email', '$message')";
    mysqli_query($conn, $sql);
}

// Fetch all feedbacks
$feedbacks = [];
$result = mysqli_query($conn, "SELECT * FROM feedback ORDER BY created_at DESC");
while ($row = mysqli_fetch_assoc($result)) {
    $feedbacks[] = $row;
}

mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>READIFY Bookstore - Feedback</title>
  <link rel="icon" type="image/png" href="/assets/img-title.png">
  <link rel="stylesheet" href="css/common.css" />
  <link rel="stylesheet" href="css/feedback.css" />
</head>
<body>

<!--Header -->
<header class="header">
    <div class="container-inner">
      <a href="index.php" class="logo-link">
        <div class="logo">
          <h1>READIFY</h1>
          <img src="./assets/title.png" alt="BookShop Logo" class="logo-resize" />
        </div>
      </a>
      <button class="hamburger" id="hamburger">&#9776;</button>
      <nav class="nav-link" id="nav">
        <button class="close-icon" id="close-icon">&times;</button>
        <ul>
          <li><a href="./index.php">Home</a></li>
          <li><a href="./product.php">Books</a></li>
          <li><a href="./aboutus.php">About Us</a></li>
          <li><a href="./contact.php">Contact Us</a></li>
          <li><a href="./cart.html">Cart</a></li>
        </ul>
      </nav>
    </div>
</header>

<!-- Feedback Form -->
<section class="form-of-feedback">
    <div class="container-feedback">
      <div class="inner-feedback">
        <h1 style="text-align: center;margin-bottom: 10px;">Give Us Your Feedback</h1>
        <form method="POST" class="feedback-body">
          <div class="box">
            <p>Enter Name:</p>
            <input type="text" name="name" required>
          </div>

          <div class="box">
            <p>Enter Email:</p>
            <input type="email" name="email" required>
          </div>

          <div class="box">
            <p>Enter Feedback:</p>
            <textarea name="message" required></textarea>
          </div>

          <button type="submit" name="submit_feedback" class="submit-btn">Submit</button>
        </form>
      </div>
    </div>
</section>

<h1 style="text-align: center; margin-top: 60px;">Reviews of Customers</h1>

<!-- Feedbacks -->
<div class="container-feedbacks">
  <?php if (count($feedbacks) == 0): ?>
      <p style="text-align:center;">No feedback yet.</p>
  <?php else: ?>
      <?php foreach ($feedbacks as $fb): ?>
          <div class="feedback-card">
              <p><strong>Name:</strong> <?= htmlspecialchars($fb['name']) ?></p>
              <p><strong>Email:</strong> <?= htmlspecialchars($fb['email']) ?></p>
              <p><strong>Feedback:</strong> <?= htmlspecialchars($fb['message']) ?></p>
              <p class="date"><?= date("d M Y H:i", strtotime($fb['created_at'])) ?></p>
          </div>
      <?php endforeach; ?>
  <?php endif; ?>
</div>

<!-- Footer -->
<section class="footer">
  <div class="footer-row">
    <div class="footer-col">
      <h4>Useful Links</h4>
      <ul class="links">
        <li><a href="./index.php">Home</a></li>
        <li><a href="./aboutus.php">About Us</a></li>
        <li><a href="./contact.php">Contact Us</a></li>
        <li><a href="./cart.html">Cart</a></li>
      </ul>
    </div>
  </div>
</section>

</body>
</html>
