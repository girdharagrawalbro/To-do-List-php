<title>Today - Todolist</title>

<section class="container">
    <?php
    include 'app.php';
    $today = date("Y-m-d");
    include '../conn.php';
    include '../link.php';
  
    $sql = "SELECT * FROM `tasks` WHERE due_date='$today' and user_id=' $userid' ";
    $task = mysqli_query($conn, $sql);
    $task_num = mysqli_num_rows($task);
    ?>
    <div class="main-screen">
        <div class="mark">
            <h4>
                Mark all as read
            </h4>
        </div>
        <div class="main-content">
            <header>
                <h1>
                    Today
                </h1>
                <br>
                <span class="flex gap"><img src="../svg/tick.svg" alt=""> <span id="today_task"> </span> task</span>
            </header>
            <br>
            <div class="task-list">
                <div class="flex j-bet">
                    
                    <h4>Overdue</h4><h4>
                          Reschdule
                    </h4>
                </div>
    <hr>
    <ul id="overdue-task-list"></ul>
    <hr>
    <br>
</div>

            <?php if ($task_num > 0) { ?>
                <div class="task-list">
                    <h4>
                    <?php
echo date('j F');
?>
 .  Today . <?php
echo date('l');
?>

                    </h4>
                    <hr>

                    <ul id="today-task-list">

                    </ul>
                    
                    <hr>
                    <br>
                </div>
            <?php } ?>

            <div class="add-task-btn">
                <span class="showAddTaskButton">
                    <img src="../svg/add.svg" alt="" class="add-img">
                    <span>

                        Add task
                    </span>
                </span>

            </div>
        </div>

        <?php if ($task_num == 0) { ?>

        <div class="show" id="show">
            <img src="https://todoist.b-cdn.net/assets/images/9b83bf5d1895df53ed06506fd3cd381c.png" alt="">
            <h1>
                What you need to get done today?
            </h1>
            <span>
                By default, tasks added here will be due today.
                <br>
                Click + to add a task.
            </span>
        </div>
<?php } ?>
    </div>
</section>