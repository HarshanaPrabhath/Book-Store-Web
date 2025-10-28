<?php
// Include database connection file
require_once 'config/db_connection.php';

// Initialize an empty array to store books
$books = [];

// Fetch all books from the database, ordered by ID in descending order (newest first)
$result = mysqli_query($conn, "SELECT * FROM books ORDER BY id DESC");
while ($book = mysqli_fetch_assoc($result)) {
    $books[] = $book;  // Store each book in the $books array
}

// Check if we are in "Edit" mode (editing an existing book)
$editMode = false;
$book = [
    'bookName' => '',
    'author' => '',
    'category' => '',
    'price' => '',
    'description' => '',
    'imageUrl' => ''
];

// If we are editing a book, fetch the existing data from the database
if (isset($_GET['edit'])) {
    $editMode = true;  // Set edit mode to true
    $id = (int)$_GET['edit'];  // Get the book ID from the URL

    // Prepare a SQL query to get the details of the book by its ID
    $stmt = $conn->prepare("SELECT * FROM books WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $book = $result->fetch_assoc();  // Fetch the book's data
    $stmt->close();  // Close the statement
}

// Handle form submission (Add or Edit)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the data from the form fields
    $bookName = $_POST['bookName'];
    $author = $_POST['author'];
    $category = $_POST['category'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $imageUrl = $_POST['imageUrl'];

    if ($editMode) {
        // If we're in Edit mode, update the book in the database
        $stmt = $conn->prepare("UPDATE books SET bookName=?, author=?, category=?, price=?, description=?, imageUrl=? WHERE id=?");
        $stmt->bind_param("sssdssi", $bookName, $author, $category, $price, $description, $imageUrl, $id);
        $stmt->execute();
        $stmt->close();  // Close the statement
    } else {
        // If we're adding a new book, insert it into the database
        $stmt = $conn->prepare("INSERT INTO books (bookName, author, category, price, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssdsd", $bookName, $author, $category, $price, $description, $imageUrl);
        $stmt->execute();
        $stmt->close();  // Close the statement
    }

    // After adding/updating, redirect back to the admin page to avoid form resubmission
    header("Location: admin.php");
    exit;
}

// Handle deleting a book
if (isset($_GET['delete'])) {
    $deleteId = (int)$_GET['delete'];  // Get the book ID from the URL

    // Prepare a SQL query to delete the book
    $stmt = $conn->prepare("DELETE FROM books WHERE id=?");
    $stmt->bind_param("i", $deleteId);
    $stmt->execute();
    $stmt->close();  // Close the statement

    // After deleting, redirect back to the admin page
    header("Location: admin.php");
    exit;
}

// Close the database connection
mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Book Management</title>
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="./css/admin.css">
</head>
<body>

<h1>Admin Dashboard</h1>

<!-- Button to add a new book -->
<button onclick="toggleForm()">Add New Book</button>

<!-- Form for adding or editing a book -->
<div id="bookForm" style="display: <?php echo $editMode ? 'block' : 'none'; ?>">
    <h2><?php echo $editMode ? 'Edit' : 'Add'; ?> Book</h2>
    <form method="POST">
        <label>Book Name:</label><br>
        <input type="text" name="bookName" value="<?php echo htmlspecialchars($book['bookName']); ?>" required><br><br>

        <label>Author:</label><br>
        <input type="text" name="author" value="<?php echo htmlspecialchars($book['author']); ?>" required><br><br>

        <label>Category:</label><br>
        <select name="category" required>
            <option value="">Select Category</option>
            <?php 
            $categories = ['Sinhala', 'English', 'Tamil'];
            foreach($categories as $c) {
                $selected = $book['category'] == $c ? 'selected' : '';  // Pre-select the category
                echo "<option value='$c' $selected>$c</option>";
            }
            ?>
        </select><br><br>

        <label>Price:</label><br>
        <input type="number" name="price" value="<?php echo htmlspecialchars($book['price']); ?>" required><br><br>

        <label>Description:</label><br>
        <textarea name="description" required><?php echo htmlspecialchars($book['description']); ?></textarea><br><br>

        <label>Image URL:</label><br>
        <input type="text" name="imageUrl" value="<?php echo htmlspecialchars($book['imageUrl']); ?>" required><br><br>

        <button type="submit"><?php echo $editMode ? 'Update' : 'Add'; ?> Book</button>
        <button type="button" onclick="toggleForm()">Cancel</button>
    </form>
</div>

<!-- Display all books in a table -->
<h2>All Books</h2>
<table border="1" cellpadding="10">
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
    <?php foreach ($books as $book): ?>
        <tr>
            <td><?php echo $book['id']; ?></td>
            <td><img src="<?php echo $book['imageUrl']; ?>" width="80"></td>
            <td><?php echo $book['bookName']; ?></td>
            <td><?php echo $book['author']; ?></td>
            <td><?php echo $book['category']; ?></td>
            <td><?php echo $book['price']; ?></td>
            <td><?php echo $book['description']; ?></td>
            <td>
                <!-- Links to edit or delete the book -->
                <a href="admin.php?edit=<?php echo $book['id']; ?>">Edit</a> |
                <a href="admin.php?delete=<?php echo $book['id']; ?>" onclick="return confirm('Are you sure?')">Delete</a>
            </td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>

<script>
    // Toggle the visibility of the Add/Edit form
    function toggleForm() {
        const form = document.getElementById('bookForm');
        form.style.display = form.style.display === 'block' ? 'none' : 'block';
    }
</script>

</body>
</html>
