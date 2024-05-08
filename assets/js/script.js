// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
return nextId++;
   
}

// Todo: create a function to create a task card
function createTaskCard(task) {
const taskCard = `<div class="task-card" id="task-${task.id}">
<div class="task-title">${task.title}</div>
<div class="task-description">${dayjs(task.dueDate.format('YYYY-MM-DD'))} </div>
<button class="delete-btn" data-id="${task.id}">Delete</button>
</div>`;
return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('.lane').empty(); //clear existing task
    taskList.forEach(task => {
    $('.lane').append(createTaskCard[task]);    
    });
    $('.card').draggable(); 
}



// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
