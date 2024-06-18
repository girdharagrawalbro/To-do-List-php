<title>Inbox - Todolist</title>

<body>
    <section class="container">
        <?php 
        include 'app.php';
        include '../conn.php';
        include '../link.php';
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
                        Inbox
                    </h1>
                </header>
                <br>
                <div class="task-list">
                    <ul id="task-list">

                    </ul>
                    <hr>
                    <br>
                </div>

                <div class="add-task-btn">
                    <span class="showAddTaskButton">
                        <img src="../svg/add.svg" alt="" class="add-img">
                        <span>

                            Add task
                        </span>
                    </span>

                </div>
            </div>


        </div>
    </section>