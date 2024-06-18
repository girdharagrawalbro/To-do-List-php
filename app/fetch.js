document.addEventListener('DOMContentLoaded', function() {
    // Function to format the date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            const options = { month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
    }

    // Function to fetch tasks and update task list
    function fetchTasks() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../app/ajax/fetch_tasks.php', true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Request was successful, update task list
                var response = JSON.parse(xhr.responseText);
                document.getElementById('task_num').textContent = response.task_count;  
                
                // Update general task list if it exists
                var taskListContainer = document.getElementById('task-list');
                if (taskListContainer) {
                    taskListContainer.innerHTML = ''; // Clear existing content

                    if (response.task_count > 0) {
                        response.tasks.forEach(function(task) {
                            var li = document.createElement('li');

                            var divFlex1 = document.createElement('div');
                            divFlex1.className = 'flex';

                            var imgDiv = document.createElement('div');
                            var img1 = document.createElement('img');
                            img1.className = 'dot-img';

                            img1.src = '../svg/dots.svg'; // Add the correct source for the image
                            imgDiv.appendChild(img1);

                            var radioDiv = document.createElement('div');
                            var radioInput = document.createElement('input');
                            radioInput.type = 'radio';
                            radioInput.value = task.task_id;
                            radioInput.addEventListener('change', function(event) {
                                if (event.target.checked) {
                                    // Call your function here
                                    statuschange(event.target.value);
                                }
                            });
                            
                            radioDiv.appendChild(radioInput);

                            var textDiv = document.createElement('div');
                            var title = document.createElement('h4');
                            title.textContent = task.title;
                            var description = document.createElement('p');
                            description.textContent = task.description;
                            textDiv.appendChild(title);
                            textDiv.appendChild(description);

                            divFlex1.appendChild(imgDiv);
                            divFlex1.appendChild(radioDiv);
                            divFlex1.appendChild(textDiv);

                            var divFlex2 = document.createElement('div');
                            divFlex2.className = 'flex';

                            var img2 = document.createElement('img');
                            img2.src = '../svg/'; // Add the correct source for the image
                            img2.alt = '';
                            var img3 = document.createElement('img');
                            img3.src = '../svg/'; // Add the correct source for the image
                            img3.alt = '';
                            var img4 = document.createElement('img');
                            img4.src = '../svg/'; // Add the correct source for the image
                            img4.alt = '';

                            divFlex2.appendChild(img2);
                            divFlex2.appendChild(img3);
                            divFlex2.appendChild(img4);

                            li.appendChild(divFlex1);
                            li.appendChild(divFlex2);

                            taskListContainer.appendChild(li);
                        });
                    } else {
                        var noTasksMessage = document.createElement('p');
                        noTasksMessage.textContent = response.message;
                        taskListContainer.appendChild(noTasksMessage);
                    }
                }

                // Update today's task list if it exists
                document.getElementById('today_task_li').textContent = response.today_task_count;  
                var todayTaskListContainer = document.getElementById('today-task-list');
                if (todayTaskListContainer) {
                    todayTaskListContainer.innerHTML = ''; // Clear existing content
                    document.getElementById('today_task').textContent = response.today_task_count;  

                    // Get today's date in yyyy-mm-dd format
                    var today = new Date().toISOString().split('T')[0];
                    response.tasks.forEach(function(task) {
                        if (task.due_date === today) {
                            var li = document.createElement('li');

                            var divFlex1 = document.createElement('div');
                            divFlex1.className = 'flex';

                            var imgDiv = document.createElement('div');
                            var img1 = document.createElement('img');
                            img1.className = 'dot-img';

                            img1.src = '../svg/dots.svg'; // Add the correct source for the image
                            imgDiv.appendChild(img1);

                            var radioDiv = document.createElement('div');
                            var radioInput = document.createElement('input');
                            radioInput.type = 'radio';
                            radioInput.value = task.task_id;
                            radioDiv.appendChild(radioInput);
                            radioInput.addEventListener('change', function(event) {
                                if (event.target.checked) {
                                    // Call your function here
                                    statuschange(event.target.value);
                                }
                            });
                            
                            var textDiv = document.createElement('div');
                            var title = document.createElement('h4');
                            title.textContent = task.title;
                            var description = document.createElement('p');
                            description.textContent = task.description;
                            textDiv.appendChild(title);
                            textDiv.appendChild(description);

                            divFlex1.appendChild(imgDiv);
                            divFlex1.appendChild(radioDiv);
                            divFlex1.appendChild(textDiv);

                            var divFlex2 = document.createElement('div');
                            divFlex2.className = 'flex';

                            var img2 = document.createElement('img');
                            img2.src = '../svg/edit.svg'; // Add the correct source for the image
                            var img3 = document.createElement('img');
                            img3.src = '../svg/'; // Add the correct source for the image
                            img3.alt = '';
                            var img4 = document.createElement('img');
                            img4.src = '../svg/'; // Add the correct source for the image
                            img4.alt = '';

                            divFlex2.appendChild(img2);
                            divFlex2.appendChild(img3);
                            divFlex2.appendChild(img4);

                            li.appendChild(divFlex1);
                            li.appendChild(divFlex2);

                            todayTaskListContainer.appendChild(li);
                        }
                    });

                    if (todayTaskListContainer.children.length === 0) {
                        var noTasksMessage = document.createElement('p');
                        noTasksMessage.textContent = 'No tasks due today.';
                        todayTaskListContainer.appendChild(noTasksMessage);
                    }
                }

                // Update overdue task list if it exists
                var overdueTaskListContainer = document.getElementById('overdue-task-list');
                if (overdueTaskListContainer) {
                    overdueTaskListContainer.innerHTML = ''; // Clear existing content

                    // Get today's date in yyyy-mm-dd format
                    var today = new Date().toISOString().split('T')[0];
                    response.tasks.forEach(function(task) {
                        if (task.due_date < today) {
                            var li = document.createElement('li');

                            var divFlex1 = document.createElement('div');
                            divFlex1.className = 'flex';

                            var imgDiv = document.createElement('div');

                            var img1 = document.createElement('img');
                            img1.className = 'dot-img';

                            img1.src = '../svg/dots.svg'; // Add the correct source for the image
                            imgDiv.appendChild(img1);

                            var radioDiv = document.createElement('div');
                            var radioInput = document.createElement('input');
                            radioInput.type = 'radio';
                            radioInput.value = task.task_id;

                            radioDiv.appendChild(radioInput);
                            radioInput.addEventListener('change', function(event) {
                                if (event.target.checked) {
                                    // Call your function here
                                    statuschange(event.target.value);
                                }
                            });
                            
                            var textDiv = document.createElement('div');
                            var title = document.createElement('h4');
                            title.textContent = task.title;
                            var description = document.createElement('p');
                            description.textContent = task.description;
                            var dueDate = document.createElement('span');
                            dueDate.textContent = formatDate(task.due_date);
                            
                            textDiv.appendChild(title);
                            textDiv.appendChild(description);
                            textDiv.appendChild(dueDate);

                            divFlex1.appendChild(imgDiv);
                            divFlex1.appendChild(radioDiv);
                            divFlex1.appendChild(textDiv);

                            var divFlex2 = document.createElement('div');
                            divFlex2.className = 'flex';

                            var img2 = document.createElement('img');
                            img2.src = '../svg/edit.svg'; // Add the correct source for the image
                            var img3 = document.createElement('img');
                            img3.src = '../svg/'; // Add the correct source for the image
                            img3.alt = '';
                            var img4 = document.createElement('img');
                            img4.src = '../svg/'; // Add the correct source for the image
                            img4.alt = '';

                            divFlex2.appendChild(img2);
                            divFlex2.appendChild(img3);
                            divFlex2.appendChild(img4);

                            li.appendChild(divFlex1);
                            li.appendChild(divFlex2);

                            overdueTaskListContainer.appendChild(li);
                        }
                    });

                    if (overdueTaskListContainer.children.length === 0) {
                        var noTasksMessage = document.createElement('p');
                        noTasksMessage.textContent = 'No overdue tasks.';
                        overdueTaskListContainer.appendChild(noTasksMessage);
                    }
                }

              
                // Attach event listeners to checkboxes after tasks are rendered
            } else {
                // Request failed, handle error
                console.error(xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Request failed');
        };
        xhr.send();
        
    }
    

// Function to handle checkbox changes
function statuschange(id) {
    taskId = id;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'ajax/update_task_status.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request was successful, do something
            document.getElementById('msg_div').style.display="flex";
            document.getElementById('msg').innerText="Task Completd";
            fetchTasks(); 
        } else {
            // Request failed, handle error
            console.error('Error: ' + xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    // Send task ID and new status
    xhr.send('task_id=' + encodeURIComponent(taskId));
}


    fetchTasks();
    document.addEventListener('DOMContentLoaded', function() {
        attachCheckboxEventListeners();
    });
    
    document.getElementById('task-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Get form data
        var formData = new FormData(this);

        // Get priority and due date from span elements
        var priority = document.getElementById('priority').textContent.trim();
        var dueDate = document.getElementById('day').textContent.trim();

        // Append priority and due date to formData
        formData.append('priority', priority);
        formData.append('due_date', dueDate);

        // Send AJAX request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../app/ajax/addtask.php', true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Request was successful, do something
                console.log(xhr.responseText);
                fetchTasks();
                document.querySelector('.overlay').style.display = 'none';
                document.querySelector('.addtask').style.display = 'none';
            } else {
                // Request failed, handle error
                console.error(xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Request failed');
        };
        xhr.send(formData);
    });
});

function navopen(){
    document.getElementById('panel_btn').style.display="block";
    document.getElementById('sidebar').style.display="none";
}

function navclose(){
    document.getElementById('sidebar').style.display="block";
    document.getElementById('panel_btn').style.display="none";
}

function autoHideAlert() {
    setTimeout(function() {
        if (document.getElementById('customAlert').style.display === 'flex') {
            msgclose();
        }
    }, 5000); // 5000 milliseconds = 5 seconds
}

function msgclose(){
    document.getElementById('msg_div').style.display="none";
}

