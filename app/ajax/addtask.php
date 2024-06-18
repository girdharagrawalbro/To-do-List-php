<?php
// Assuming you have already established a database connection
include '../../conn.php';
// Function to parse the due date
function parseDueDate($dateStr) {
    $dateStr = strtolower(trim($dateStr));
    $today = new DateTime();
    $date = $today;

    if ($dateStr == 'today') {
        $date = $today;
    } elseif ($dateStr == 'tomorrow') {
        $date = (clone $today)->modify('+1 day');
    } elseif (preg_match('/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i', $dateStr)) {
        $date = new DateTime('next ' . $dateStr);
        if ($date < $today) {
            $date = new DateTime('last ' . $dateStr);
        }
    } else {
        $date = DateTime::createFromFormat('F j', $dateStr);
        if (!$date) {
            // Try other date formats if necessary
            $date = DateTime::createFromFormat('Y-m-d', $dateStr);
        }
    }

    return $date ? $date->format('Y-m-d') : null;
}
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $taskName = $_POST['task_name'];
    $description = $_POST['description'];
    $userid = $_POST['user_id'];
    $priorityStr = $_POST['priority'];
    $dueDateStr = $_POST['due_date'];

    // Map priority to a number
    $priority = 0;
    if ($priorityStr == 'P1') {
        $priority = 1;
    } elseif ($priorityStr == 'P2') {
        $priority = 2;
    } elseif ($priorityStr == 'P3') {
        $priority = 3;
    }

    // Parse the due date
    $dueDate = parseDueDate($dueDateStr);

    // Prepare SQL statement to insert data into the database
    $sql = "INSERT INTO tasks (`title`, `description`, `priority`, `due_date`, `user_id`) VALUES (?, ?, ?, ?, ?)";

    // Prepare the SQL statement
    $stmt = mysqli_prepare($conn, $sql);

    // Bind parameters to the prepared statement
    mysqli_stmt_bind_param($stmt, "ssisi", $taskName, $description, $priority, $dueDate , $userid);

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
    } else {
        echo "Error: " . mysqli_error($conn);
    }
    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($conn);
?>
