<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css_js/style.css">
    <title>Signup - Todolist</title>
</head>
<body>
    <nav>
        <div class="logo">
        <h2 onclick="window.location.href='../index.html'">
                todolist
            </h2>
        </div>
        </nav>

        <section class="log">
            <form action="#" method="post">
            <div>
                <h1>
                    Signup
                </h1>
                <button class="log-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="u2emSEy" aria-hidden="true"><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"></path><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"></path><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"></path><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"></path><path d="M0 0h18v18H0z"></path></g></svg>
                    Continue with Google
                </button>   
                <button class="log-btn">
                    Continue with Facebook      
                </button>
                <br>
                <input type="email" name="email" class="log-input" placeholder="Email" required>
                <input type="password" name="password" class="log-input" placeholder="Password" required>        

                <button type="submit" name="submit" class="start-btn btn">  Sign up with Email</button>
                <p>Already signed up ? <a href="login.php">Go to Login</a></p>
                <p style="text-align:center;color:#e34432">
                <?php 
include '../conn.php';

if(isset($_POST['submit'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare the SQL statement to check if the email already exists
    $check_stmt = $conn->prepare('SELECT email FROM user WHERE email = ?');
    $check_stmt->bind_param('s', $email);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        // Email already exists
        echo "This email is already registered.";
        echo "<script>window.location.href = 'login.php';</script>";

    } else {
        // Prepare the SQL statement to insert the new user
        $insert_stmt = $conn->prepare('INSERT INTO user (email, password, created_date) VALUES (?, ?, CURRENT_TIMESTAMP)');
        $insert_stmt->bind_param('ss', $email, $hashed_password);

        // Execute the statement and check for errors
        if ($insert_stmt->execute()) {
            echo "Registration Successful";
            echo "<script>window.location.href = 'login.php';</script>";
        } else {
            echo "Error: " . $insert_stmt->error;
        }

        // Close the insert statement
        $insert_stmt->close();
    }

    // Close the check statement and the connection
    $check_stmt->close();
}
?>

                </p>
            </div>
        </form>

            <div id="none">
<img src="https://todoist.b-cdn.net/assets/images/44245fc51c3e2ab05ee6d92c13e2e08a.png" alt="">
            </div>
        </section>

</body>
</html>