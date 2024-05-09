// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

console.log("NextID:", nextId);

console.log("TaskList:", taskList);
// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  let currentDate = dayjs().format("DD/MM/YY");
  let dueDate = dayjs(task.dueDate);
  let isOverdue = dueDate.isBefore(currentDate);
  let isNearDeadline = dueDate.diff(currentDate, "m") <= 1 && !isOverdue;
  console.log("isOverdue:", isOverdue, "isNearDeadline:", isNearDeadline);

  let statusClass =
    task.status === "in-progress" || task.status === "done"
      ? "bg-light"
      : isOverdue
      ? "bg-danger"
      : isNearDeadline
      ? "bg-warning"
      : "bg-white";

  let taskCard = $(`
          <div class="${statusClass} task-card card mb-3 text-black"  id="task-${
    task.id
  }"  style="max-width: 20rem;">
          <div class="card-header">
          <h3 class="card-title">${task.title}</h3></div>
          <div class="card-body">
            <p class="card-text">${task.description}</p>
            <p>Due: ${dayjs(dueDate).format("DD/MM/YY")}</p>
            <button class="delete-btn btn btn-danger" data-id="${
              task.id
            }">Delete</button>
            </div>
          </div>
        `);

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $("#todo-cards, #in-progress-cards, #done-cards").empty();
  for (let task of taskList) {
    let card = createTaskCard(task);
    $("#" + task.status + "-cards").append(card);
  }

  $(".task-card").draggable({
    revert: "invalid",
    containment: "document",
    helper: "clone",
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  let title = $("#title").val();
  let description = $("#description").val();
  let dueDate = dayjs($("#due-date").val());
  let status = "todo";

  let newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    dueDate: dueDate,
    status: status,
  };

  taskList.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));

  renderTaskList();
  $("#formModal").modal("hide");
  $("#addTaskForm")[0].reset();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  let taskId = $(event.target).closest(".task-card").attr("id").split("-")[1];
  taskList = taskList.filter(function (task) {
    return task.id != taskId;
  });

  console.log("Delete TaskID", taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  let elId = ui.draggable.attr("id");
  let taskId = elId.split("-")[1];
  let newStatus = $(event.target).data("status");
  let taskIndex = taskList.findIndex(function (task) {
    return task.id == taskId;
  });

  console.log("elID:", elId, "taskId:", taskId);
  console.log("taskIndex:", taskIndex);
  console.log("newStatus:", newStatus);

  if (taskIndex !== -1) {
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  } else {
    console.error("Task not found in taskList. Task ID:", taskId);
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $("#addTaskForm").submit(handleAddTask);

  $(document).on("click", ".delete-btn", handleDeleteTask);

  $(".lane").droppable({
    accept: ".task-card",
    drop: handleDrop,
  });

  $("#due-date").datepicker({
    dateFormat: "dd/mm/yy",
  });
});

