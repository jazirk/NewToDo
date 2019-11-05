let taskInput = document.getElementById("new-task"); 
let addButton = document.getElementsByTagName("button")[0];
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
let completedTasksHolder = document.getElementById("completed-tasks"); 

let createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  checkBox.type = "checkBox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
	return listItem;
}

let addTask = function() {
  if(taskInput.value=="")
  {
      alert("Enter the task");
  }
  else{


  console.log("Add Task...");
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
  }
}

let editTask = function(){
    console.log("Edit Task...");
let listItem = this.parentNode;
let editInput = listItem.querySelector("input[type=text]");
let label = listItem.querySelector("label");
let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
      label.innerText = editInput.value;
  } else {
     	editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

let deleteTask = function () {
    console.log("Delete Task...");
  	let listItem = this.parentNode;
  	let ul = listItem.parentNode;
  	ul.removeChild(listItem);
}

let taskCompleted = function() {
   console.log("Task Complete...");
   let listItem = this.parentNode;
   completedTasksHolder.appendChild(listItem);
   bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
  console.log("Task Incomplete...");
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask); 

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  	console.log("Bind List item events");
  	let checkBox = taskListItem.querySelector('input[type="checkbox"]');
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");
  	editButton.onclick = editTask;
 		deleteButton.onclick = deleteTask;
  	checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTasksHolder.children.length; i ++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i ++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
