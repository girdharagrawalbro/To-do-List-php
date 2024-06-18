<?php
// Assuming you have already established a database connection
include '../../conn.php';
$today = date("Y-m-d");
session_start();
$status = '0';
$userid = $_SESSION['id'];
$sql = "SELECT * FROM tasks WHERE user_id = '$userid' AND `status` = '$status'";
$result = mysqli_query($conn, $sql);
$task_num = mysqli_num_rows($result);
$sql1 = "SELECT * FROM tasks WHERE user_id = '$userid' AND `status` = '$status' AND due_date = '$today'";
$today_task_num = mysqli_num_rows(mysqli_query($conn, $sql1));
// Create an array to hold the response data
$response = array();
$response['today_task_count'] = $today_task_num;
$response['task_count'] = $task_num;
$response['tasks'] = array();

// Check if there are any tasks
if ($task_num > 0) {
    // Fetch tasks and add them to the response array
    while ($row = mysqli_fetch_assoc($result)) {
        $task = array(
            'task_id' => htmlspecialchars($row['task_id']),
            'title' => htmlspecialchars($row['title']),
            'description' => htmlspecialchars($row['description']),
            'due_date' => htmlspecialchars($row['due_date']),
            'priroity' => htmlspecialchars($row['priority']),
        );
        array_push($response['tasks'], $task);
    }
} else {
    // No tasks found
    $response['message'] = 'No tasks found.';
}

// Free result set
mysqli_free_result($result);

// Close connection
mysqli_close($conn);

// Set the content type to JSON
header('Content-Type: application/json');

// Output the JSON-encoded response
echo json_encode($response);
?>
