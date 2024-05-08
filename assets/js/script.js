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
event.preventDefault();
const title = $('#title').val();
const description = $('#description').val();
const dueDate = $('#due-date').val();

if (!title || !description || !dueDate) return;
//this is an object identified w/{}
const task = {
id: generateTaskId(), 
title, 
description, 
dueDate    
};
taskList.push(task);
localStorage.setItem('tasks',
JSON.stringify(taskList));
localStorage.setItem('nextId', nextId);
renderTaskList();
$('#formModal').modal('hide');
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
const taskId = $(event.target).data('id');
taskList = taskList.filter(task => task.id !== taskId);
localStorage.setItem('tasks', 
JSON.stringify(taskList));
renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
const taskId = ui.draggable.attr('id').split('-')[1];
const status = $(event.target).data('status');
const taskindex = taskList.findIndex(task => task.id == taskId);
taskList[taskIndex].status = status;
localStorage.setItem('tasks', JSON.stringify(taskList));


}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
renderTaskList(); 
$('#formModal').submit(handleAddTask);
$('#delete-btn').click(handleDeleteTask);
$('.lane').droppable({
    drop: handleDrop
});
$('#due-date').datepicker();
});
