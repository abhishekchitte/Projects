// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const taskInput = document.getElementById('taskInput');        // Input field for new tasks
    const addTaskButton = document.getElementById('addTask');      // Button to add new tasks
    const todoList = document.getElementById('todoList');         // Container for the list of tasks

    // Initialize tasks array from localStorage or create empty array if no stored tasks exist
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to display all tasks in the DOM
    function renderTasks() {
        // Clear the current list
        todoList.innerHTML = '';
        // Loop through each task and create list items
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            // Add 'completed' class if task is marked as done
            if (task.completed) li.classList.add('completed');

            // Create task item with complete and delete buttons
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="complete-btn" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            todoList.appendChild(li);
        });
        // Save the updated task list to localStorage
        saveTasks();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task to the list
    function addTask(text) {
        // Only add task if the text is not empty (after trimming whitespace)
        if (text.trim() !== '') {
            tasks.push({ text, completed: false });  // Add new task object to array
            renderTasks();                          // Update the display
            taskInput.value = '';                   // Clear the input field
        }
    }

    // Function to toggle task completion status
    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;  // Toggle the completed status
        renderTasks();                                    // Update the display
    };

    // Function to remove a task from the list
    window.deleteTask = (index) => {
        tasks.splice(index, 1);  // Remove task at specified index
        renderTasks();           // Update the display
    };

    // Set up event listeners for adding tasks
    addTaskButton.addEventListener('click', () => addTask(taskInput.value));     // Add task on button click
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(taskInput.value);                         // Add task on Enter key
    });

    // Display initial tasks when page loads
    renderTasks();
}));