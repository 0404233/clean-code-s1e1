// Get references to the DOM elements
var taskInput = document.querySelector(".add-item__form__new-task"); // Add a new task.
var addButton = document.getElementsByTagName("button")[0]; // First button
var incompleteTaskHolder = document.querySelector(".tasks-list_incomplited"); // ul of incomplete tasks
var completedTasksHolder = document.querySelector(".tasks-list_completed"); // ul of completed tasks

// Create a new task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");

  // Create elements
  var checkBox = document.createElement("input"); // Checkbox
  var label = document.createElement("label"); // Label
  var editInput = document.createElement("input"); // Edit input
  var editButton = document.createElement("button"); // Edit button
  var deleteButton = document.createElement("button"); // Delete button
  var deleteButtonImg = document.createElement("img"); // Delete button image

  // Set properties
  checkBox.type = "checkbox";
  checkBox.id = taskString;
  label.innerText = taskString;
  label.setAttribute('for', taskString);
  label.className = "task";
  editInput.type = "text";
  editInput.className = "input-field";
  editButton.innerText = "Edit";
  editButton.className = "edit-btn btn";
  deleteButton.className = "delete-btn btn";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Delete";
  deleteButton.appendChild(deleteButtonImg);

  // Append elements to the list item
  listItem.className = 'tasks-list__task';
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Add a new task
var addTask = function () {
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = ""; // Clear the input
};

// Edit an existing task
var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = this;

  var containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

// Delete a task
var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem); // Remove the list item
};

// Mark a task as completed
var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete
var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// Bind events to list items' children
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector(".edit-btn");
  var deleteButton = taskListItem.querySelector(".delete-btn");

  // Bind events
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Cycle over incompleteTaskHolder's children to bind events
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder's children to bind events
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Add event listener for the Add button
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
