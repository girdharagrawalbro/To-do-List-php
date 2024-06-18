<?php
// Include your database connection script
include '../../conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['task_id'])) {
        $taskId = intval($_POST['task_id']);
        $status = '1';
        // Prepare and execute the SQL statement to update the task status
        $stmt = $conn->prepare('UPDATE tasks SET status = ? WHERE task_id = ?');
        $stmt->bind_param('ii', $status, $taskId);
        
        if ($stmt->execute()) {
            echo 'Task completed successfully';
        } else {
            http_response_code(500);
            echo 'Failed to update task status';
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo 'Invalid request';
    }
} else {
    http_response_code(405);
    echo 'Method not allowed';
}

$conn->close();
?>
