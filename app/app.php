<?php
include '../conn.php';
include '../link.php';
session_start();
$username = "";
$userid = "";
if (isset($_SESSION['id'])) {
    $username = $_SESSION['username'];
    $userid = $_SESSION['id'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<div id="panel_btn">
    <img onclick="navclose()" src="../svg/panel.svg" alt="">
</div>

<div class="sidebar" id="sidebar">
    <div class="details">
        <img src="" alt="">
        <h4><?php echo $username; ?>
        </h4>
        <img src="../svg/bell.svg" alt="">
        <img onclick="navopen()" src="../svg/panel.svg" alt="">
    </div>
    <div>
        <ul id="sidebar-nav">
            <span class="showAddTaskButton">
                <img src="../svg/add.svg" alt="" class="add-img">
                <span>
                    Add task
                </span>
            </span>

            <li id="nav-search">Search</li>
            <li id="nav-inbox" data-src="inbox.php">
                <div>

                    <div>

                        Inbox
                    </div>

                    <div id="task_num">

                    </div>
                </div>
            </li>
            <li id="nav-today" class="active" data-src="today.php">
                <div>

                    <div>

                        Today
                    </div>
                    <div id="today_task_li">

                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- <div>
        <h4>My Projects</h4>
    </div> -->
</div>

<div class="overlay"></div>

<div class="addtask" id="addtask">
    <form id="task-form">
        <input class="task-input" type="text" name="task_name" placeholder="Task name" required>
        <input class="task-input" type="text" name="description" placeholder="Description" required>
        <input class="task-input" type="text" name="user_id" value="<?php echo $userid ?>" style="display:none" readonly>
        <br>
        <br>
        <div>
            <span class="task-cat" id="day">Due date</span>
            <span class="task-cat" id="priority">Priority</span>
            <span class="task-cat" id="reminder">Reminder</span>
        </div>
        <div class="btns">
            <div>
                <button class="btn">Inbox</button>
            </div>
            <div>
                <button type="reset" class="btn">Clear</button>
                <button type="submit" class="start-btn btn">Add Task</button>
            </div>
        </div>
    </form>
</div>

</div>
<div id="date-picker-panel" class="date-picker-panel">
    <div class="date-picker-header">
        <button id="close-btn">&times;</button>
        <span id="selected-date">17 May</span>
    </div>
    <div class="date-picker-options">
        <div class="option">Tomorrow <span>Sat</span></div>
        <div class="option">Next weekend <span>Sat 25 May</span></div>
        <div class="option">Next week <span>Mon 20 May</span></div>
        <div class="option">No Date</div>
    </div>
    <div class="calendar">
        <div class="month">
            <div class="month-header">
                <button id="prev-month">&lt;</button>
                <span>May 2024</span>
                <button id="next-month">&gt;</button>
            </div>
            <div class="days">
                <!-- Generate days dynamically with JavaScript -->
            </div>
        </div>
        <div class="month">
            <div class="month-header">
                <span>Jun 2024</span>
            </div>
            <div class="days">
                <!-- Generate days dynamically with JavaScript -->
            </div>
        </div>
    </div>
    <div class="time">
        <button>Time</button>
    </div>
</div>

<div id="priority-panel" class="priority-panel">
    <div class="priority-option" style="background-color: #ff0000;">P1</div>
    <div class="priority-option" style="background-color: #ffa500;">P2</div>
    <div class="priority-option" style="background-color: #00ff00;">P3</div>
</div>



<div class="msg" id="msg_div">
    <p id="msg"></p><span class="undo">undo</span><span class="close" onclick="msgclose()">&times;</span>
</div>


</body>

<script src="fetch.js"></script>

</html>