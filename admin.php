<?php
// Include the database connection
include 'config/db_connection.php';

// ===================================================
// === BOOK MANAGEMENT SECTION ===
// ===================================================

// 1️⃣ Fetch all books
$books = [];
$bookQuery = "SELECT * FROM books ORDER BY id DESC";
$result = mysqli_query($conn, $bookQuery);

while ($row = mysqli_fetch_assoc($result)) {
    $books[] = $row;
}

// Default book form values
$book = ['bookName' => '', 'author' => '', 'category' => '', 'price' => '', 'description' => '', 'imageUrl' => ''];
$editBookMode = false;

// 2️⃣ Edit book (fetch book data)
if (isset($_GET['edit_book'])) {
    $editBookMode = true;
    $bookId = $_GET['edit_book'];

    $editQuery = "SELECT * FROM books WHERE id = $bookId";
    $result = mysqli_query($conn, $editQuery);
    $book = mysqli_fetch_assoc($result);
}

// 3️⃣ Add or Update book
if (isset($_POST['book_submit'])) {
    $bookName = $_POST['bookName'];
    $author = $_POST['author'];
    $category = $_POST['category'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $imageUrl = $_POST['imageUrl'];

    if ($editBookMode) {
        // Update existing book
        $updateQuery = "UPDATE books SET 
            bookName='$bookName', 
            author='$author', 
            category='$category', 
            price='$price', 
            description='$description', 
            imageUrl='$imageUrl' 
            WHERE id=$bookId";
        mysqli_query($conn, $updateQuery);
    } else {
        // Add new book
        $insertQuery = "INSERT INTO books (bookName, author, category, price, description, imageUrl) 
                        VALUES ('$bookName', '$author', '$category', '$price', '$description', '$imageUrl')";
        mysqli_query($conn, $insertQuery);
    }

    header("Location: admin.php");
    exit;
}

// 4️⃣ Delete book
if (isset($_GET['delete_book'])) {
    $deleteId = $_GET['delete_book'];
    $deleteQuery = "DELETE FROM books WHERE id=$deleteId";
    mysqli_query($conn, $deleteQuery);

    header("Location: admin.php");
    exit;
}

// ===================================================
// === FAQ MANAGEMENT SECTION ===
// ===================================================

// 1️⃣ Fetch all FAQs
$faqs = [];
$faqQuery = "SELECT * FROM faq ORDER BY id DESC";
$result = mysqli_query($conn, $faqQuery);

while ($row = mysqli_fetch_assoc($result)) {
    $faqs[] = $row;
}

// Default FAQ form values
$faq = ['question' => '', 'answer' => ''];
$editFaqMode = false;

// 2️⃣ Edit FAQ
if (isset($_GET['edit_faq'])) {
    $editFaqMode = true;
    $faqId = $_GET['edit_faq'];

    $editQuery = "SELECT * FROM faq WHERE id = $faqId";
    $result = mysqli_query($conn, $editQuery);
    $faq = mysqli_fetch_assoc($result);
}

// 3️⃣ Add or Update FAQ
if (isset($_POST['faq_submit'])) {
    $question = $_POST['question'];
    $answer = $_POST['answer'];

    if ($editFaqMode) {
        // Update FAQ
        $updateQuery = "UPDATE faq SET question='$question', answer='$answer' WHERE id=$faqId";
        mysqli_query($conn, $updateQuery);
    } else {
        // Add FAQ
        $insertQuery = "INSERT INTO faq (question, answer) VALUES ('$question', '$answer')";
        mysqli_query($conn, $insertQuery);
    }

    header("Location: admin.php");
    exit;
}

// 4️⃣ Delete FAQ
if (isset($_GET['delete_faq'])) {
    $deleteId = $_GET['delete_faq'];
    $deleteQuery = "DELETE FROM faq WHERE id=$deleteId";
    mysqli_query($conn, $deleteQuery);

    header("Location: admin.php");
    exit;
}

// Close database
mysqli_close($conn);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Books & FAQs</title>
    <link rel="stylesheet" href="./css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="sidebar">
        <div class="logo">
            <i class="fas fa-book-reader"></i>
            <h2>BookStore Admin</h2>
        </div>
        <nav class="nav-menu">
            <a href="#books" class="nav-item active">
                <i class="fas fa-book"></i>
                <span>Books</span>
            </a>
            <a href="#faqs" class="nav-item">
                <i class="fas fa-question-circle"></i>
                <span>FAQs</span>
            </a>
        </nav>
    </div>

    <div class="main-content">
        <header class="top-header">
            <h1>Dashboard</h1>
            <div class="header-actions">
                <div class="stats">
                    <div class="stat-card">
                        <i class="fas fa-book"></i>
                        <div>
                            <span class="stat-number"><?= count($books) ?></span>
                            <span class="stat-label">Books</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-question-circle"></i>
                        <div>
                            <span class="stat-number"><?= count($faqs) ?></span>
                            <span class="stat-label">FAQs</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- ==================== BOOK MANAGEMENT ==================== -->
        <section id="books" class="content-section">
            <div class="section-header">
                <h2><i class="fas fa-book"></i> Book Management</h2>
            </div>

            <div class="form-card">
                <h3><?= $editBookMode ? '<i class="fas fa-edit"></i> Edit Book' : '<i class="fas fa-plus-circle"></i> Add New Book' ?></h3>
                <form method="POST" class="modern-form">
                    <div class="form-grid">
                        <div class="form-group">
                            <label><i class="fas fa-book"></i> Book Name</label>
                            <input type="text" name="bookName" placeholder="Enter book name" value="<?= htmlspecialchars($book['bookName']) ?>" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Author</label>
                            <input type="text" name="author" placeholder="Enter author name" value="<?= htmlspecialchars($book['author']) ?>" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-tag"></i> Category</label>
                            <select name="category" required>
                                <option value="">Select Category</option>
                                <?php
                                $categories = ['Sinhala', 'English', 'Tamil'];
                                foreach ($categories as $c) {
                                    $selected = $book['category'] == $c ? 'selected' : '';
                                    echo "<option value='$c' $selected>$c</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-dollar-sign"></i> Price</label>
                            <input type="number" name="price" placeholder="Enter price" value="<?= htmlspecialchars($book['price']) ?>" step="0.01" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-align-left"></i> Description</label>
                        <textarea name="description" placeholder="Enter book description" rows="3" required><?= htmlspecialchars($book['description']) ?></textarea>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-image"></i> Image URL</label>
                        <input type="text" name="imageUrl" placeholder="Enter image URL" value="<?= htmlspecialchars($book['imageUrl']) ?>" required>
                    </div>
                    <button type="submit" name="book_submit" class="btn btn-primary">
                        <i class="fas <?= $editBookMode ? 'fa-save' : 'fa-plus' ?>"></i>
                        <?= $editBookMode ? 'Update Book' : 'Add Book' ?>
                    </button>
                    <?php if ($editBookMode): ?>
                        <a href="admin.php" class="btn btn-secondary"><i class="fas fa-times"></i> Cancel</a>
                    <?php endif; ?>
                </form>
            </div>

            <div class="table-card">
                <h3><i class="fas fa-list"></i> All Books</h3>
                <div class="table-responsive">
                    <table class="modern-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($books as $b): ?>
                            <tr>
                                <td><?= $b['id'] ?></td>
                                <td><img src="<?= $b['imageUrl'] ?>" alt="Book" class="table-image"></td>
                                <td class="text-bold"><?= htmlspecialchars($b['bookName']) ?></td>
                                <td><?= htmlspecialchars($b['author']) ?></td>
                                <td><span class="badge badge-<?= strtolower($b['category']) ?>"><?= htmlspecialchars($b['category']) ?></span></td>
                                <td class="text-bold">$<?= htmlspecialchars($b['price']) ?></td>
                                <td class="text-truncate"><?= htmlspecialchars($b['description']) ?></td>
                                <td>
                                    <div class="action-buttons">
                                        <a href="admin.php?edit_book=<?= $b['id'] ?>" class="btn-icon btn-edit" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="admin.php?delete_book=<?= $b['id'] ?>" class="btn-icon btn-delete" title="Delete" onclick="return confirm('Delete this book?')">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- ==================== FAQ MANAGEMENT ==================== -->
        <section id="faqs" class="content-section">
            <div class="section-header">
                <h2><i class="fas fa-question-circle"></i> FAQ Management</h2>
            </div>

            <div class="form-card">
                <h3><?= $editFaqMode ? '<i class="fas fa-edit"></i> Edit FAQ' : '<i class="fas fa-plus-circle"></i> Add New FAQ' ?></h3>
                <form method="POST" class="modern-form">
                    <div class="form-group">
                        <label><i class="fas fa-question"></i> Question</label>
                        <input type="text" name="question" placeholder="Enter question" value="<?= htmlspecialchars($faq['question']) ?>" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-comment-dots"></i> Answer</label>
                        <textarea name="answer" placeholder="Enter answer" rows="4" required><?= htmlspecialchars($faq['answer']) ?></textarea>
                    </div>
                    <button type="submit" name="faq_submit" class="btn btn-primary">
                        <i class="fas <?= $editFaqMode ? 'fa-save' : 'fa-plus' ?>"></i>
                        <?= $editFaqMode ? 'Update FAQ' : 'Add FAQ' ?>
                    </button>
                    <?php if ($editFaqMode): ?>
                        <a href="admin.php" class="btn btn-secondary"><i class="fas fa-times"></i> Cancel</a>
                    <?php endif; ?>
                </form>
            </div>

            <div class="table-card">
                <h3><i class="fas fa-list"></i> All FAQs</h3>
                <div class="table-responsive">
                    <table class="modern-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($faqs as $f): ?>
                            <tr>
                                <td><?= $f['id'] ?></td>
                                <td class="text-bold"><?= htmlspecialchars($f['question']) ?></td>
                                <td><?= htmlspecialchars($f['answer']) ?></td>
                                <td>
                                    <div class="action-buttons">
                                        <a href="admin.php?edit_faq=<?= $f['id'] ?>" class="btn-icon btn-edit" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="admin.php?delete_faq=<?= $f['id'] ?>" class="btn-icon btn-delete" title="Delete" onclick="return confirm('Delete this FAQ?')">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>

    <script>
        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    </script>
</body>
</html>