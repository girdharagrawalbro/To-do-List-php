document.addEventListener('DOMContentLoaded', function() {
    // Function to show the addtask form and dim the background
    function showAddTask() {
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.addtask').style.display = 'block';
    }

    // Function to hide the addtask form and remove the dim background
    function hideAddTask() {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.addtask').style.display = 'none';
    }

    // Get all "Add Task" buttons and attach event listeners
    var addTaskButtons = document.querySelectorAll('.showAddTaskButton');
    addTaskButtons.forEach(function(button) {
        button.addEventListener('click', showAddTask);
    });

    // Hide the addtask form when clicking on the overlay
    document.querySelector('.overlay').addEventListener('click', hideAddTask);

    const taskNameInput = document.querySelector('.task-input[placeholder="Task name"]');
    const daySpan = document.getElementById('day');
    const prioritySpan = document.getElementById('priority');
    const datePickerPanel = document.getElementById('date-picker-panel');
    const priorityPanel = document.getElementById('priority-panel');
    const closeBtn = document.getElementById('close-btn');
    const selectedDateSpan = document.getElementById('selected-date');

    taskNameInput.addEventListener('input', function() {
        checkForKeywords(this.value.toLowerCase());
    });

    function checkForKeywords(input) {
        let priority = '';
        let date = '';
        // Priority mapping
        if (input.includes('p1')) {
            priority = 'P1';
            prioritySpan.className = 'task-cat red';
        } else if (input.includes('p2')) {
            priority = 'P2';
            prioritySpan.className = 'task-cat orange';
        } else if (input.includes('p3')) {
            priority = 'P3';
            prioritySpan.className = 'task-cat green';
        } else {
            prioritySpan.textContent = 'Priority';
            prioritySpan.className = 'task-cat';
        }

        // Date mapping
        const keywords = ['today', 'tomorrow', 'next weekend', 'next week', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        let foundKeyword = false;

        keywords.forEach(keyword => {
            if (input.includes(keyword)) {
                foundKeyword = true;
                if (keyword === 'today') {
                    date = 'Today';
                    daySpan.className = 'task-cat red';
                } else if (keyword === 'tomorrow') {
                    date = 'Tomorrow';
                    daySpan.className = 'task-cat orange';
                } else if (keyword === 'next weekend') {
                    const today = new Date();
                    const day = today.getDay();
                    const daysToNextSaturday = (6 - day) + 7; // Days to next Saturday
                    const nextSaturday = new Date(today.getTime() + daysToNextSaturday * 24 * 60 * 60 * 1000);
                    date = 'Next Weekend';
                    daySpan.className = 'task-cat green';
                } else if (keyword === 'next week') {
                    const today = new Date();
                    const day = today.getDay();
                    const daysToNextMonday = (1 - day + 7) % 7; // Days to next Monday
                    const nextMonday = new Date(today.getTime() + daysToNextMonday * 24 * 60 * 60 * 1000);
                    date = 'Next Week';
                    daySpan.className = 'task-cat green';
                } else {
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const currentDay = new Date().getDay();
                    const inputDay = days.indexOf(keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase());
                    const diff = (inputDay + 7 - currentDay) % 7;
                    date = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
                    daySpan.className = 'task-cat green';
                }
            }
        });

        if (foundKeyword) {
            daySpan.textContent = date;
        } else {
            daySpan.textContent = 'Due date';
            daySpan.className = 'task-cat';
        }

        if (priority) {
            prioritySpan.textContent = priority;
        } else {
            prioritySpan.textContent = 'Priority';
        }
    }

    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Adding keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'a') {
            event.preventDefault(); // Prevent the default action
            showaddtask();
        }
    });
    
    function showaddtask() {
        document.getElementById('addtask-btn').style.display = "none";
        document.getElementById('show').style.display = "none";
        document.getElementById('addtask').style.display = "block";
    }

    daySpan.addEventListener('click', function() {
        datePickerPanel.style.display = 'block';
        priorityPanel.style.display = 'none'; // Hide priority panel if open
    });

    prioritySpan.addEventListener('click', function() {
        priorityPanel.style.display = 'block';
        datePickerPanel.style.display = 'none'; // Hide date picker panel if open
    });

    closeBtn.addEventListener('click', function() {
        datePickerPanel.style.display = 'none';
    });

    document.addEventListener('click', function(event) {
        if (!datePickerPanel.contains(event.target) && !daySpan.contains(event.target)) {
            datePickerPanel.style.display = 'none';
        }
        if (!priorityPanel.contains(event.target) && !prioritySpan.contains(event.target)) {
            priorityPanel.style.display = 'none';
        }
    });

    // Function to generate days dynamically for May and June
    function generateDays(monthElement, month, year) {
        const daysElement = monthElement.querySelector('.days');
        daysElement.innerHTML = '';

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            daysElement.appendChild(dayElement);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.className = 'day';
            daysElement.appendChild(dayElement);

            dayElement.addEventListener('click', function() {
                const dateText = `${i} ${monthElement.querySelector('.month-header span').textContent.split(' ')[0]}`;
                daySpan.textContent = dateText;
                selectedDateSpan.textContent = dateText;
                datePickerPanel.style.display = 'none';
                daySpan.style.color = 'green';
            });
        }
    }

    const mayElement = document.querySelectorAll('.month')[0];
    const juneElement = document.querySelectorAll('.month')[1];

    generateDays(mayElement, 4, 2024); // May 2024
    generateDays(juneElement, 5, 2024); // June 2024

    // Priority options handling
    const priorityOptions = document.querySelectorAll('.priority-option');
    priorityOptions.forEach(option => {
        option.addEventListener('click', function() {
            prioritySpan.textContent = this.textContent;
            prioritySpan.style.backgroundColor = this.style.backgroundColor;
            prioritySpan.style.color = 'white'; // Ensure text is readable
            priorityPanel.style.display = 'none';
        });
    });

    const sidebarNav = document.getElementById('sidebar-nav');
    const navItems = sidebarNav.getElementsByTagName('li');

    // Function to set the active item
    function setActiveItem(itemId) {
        // Remove active class from all items
        for (let item of navItems) {
            item.classList.remove('active');
        }
        // Add active class to the selected item
        const activeItem = document.getElementById(itemId);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    // Function to handle item click
    function handleItemClick(event) {
        const itemId = this.id;
        const src = this.getAttribute('data-src');
        localStorage.setItem('activeNavItem', itemId);
        setActiveItem(itemId);

        // Redirect the page to the new URL
        window.location.href = src;
    }

    // Attach event listener to each navigation item
    for (let item of navItems) {
        item.addEventListener('click', handleItemClick);
    }

    // Restore the active item from local storage on page load
    const activeNavItem = localStorage.getItem('activeNavItem');
    if (activeNavItem) {
        setActiveItem(activeNavItem);
    }
});
