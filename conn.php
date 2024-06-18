<?php
// Database credentials
$servername = "localhost"; // Change this if your database server is hosted on a different machine
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$database = "todolist"; // Replace with the name of your database
// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>