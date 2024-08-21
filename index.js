let taskArray = []; // Tasks holder array

// For task adding exisiting tasks from localStroage
let oldTasks = JSON.parse(localStorage.getItem("tasks"));
function existingTasks (tasks){
	if(oldTasks === null){
		return
	}
	for(let i = 0; i < tasks.length; i++){
		addTaskItem (tasks[i])
	}

}
existingTasks(oldTasks);

// For task adding button
document.querySelector("#add-task").addEventListener("click", function (){
	let task = document.querySelector("#task");
	inputFieldChecker(task.value, addTaskItem);
});

// Preventing Enter to submit
document.addEventListener("keypress", function(event){
	if(event.key === "Enter"){
		event.preventDefault();
	}
});

// New List Item Adding Function - Task
function addTaskItem (todo){
	let task = document.querySelector(".task-items");
	let newTaskItem = document.createElement("li");
	newTaskItem.classList.add("task-todo");
	newTaskItem.textContent = todo;
	let newTaskItemButton = document.createElement("button");
	newTaskItemButton.textContent = "Delete";
	newTaskItemButton.classList.add("delete-task", "btn", "danger");
	newTaskItem.append(newTaskItemButton);
	task.append(newTaskItem);
	
	// THESE ARE ADDED IN THIS FUNCTION BECAUSE 
	// "localStorage" IS DEPENDENT ON "taskArray"
	// AS SOON AS THE PAGE GETS RELOADED THE ARRAY BECOMES EMPTY
	// THIS EMPTY ARRAY THEN OVERWRITES THE EXISTING "localStorage" WHEN NEW TASK IS ADDED CAUSING THE TASKS FROM PREVIOUS SESSIONS DISAPPER
	// ADD THESE TWO LINES IN "inputFieldChecker" FUNCTION UNDER "callback(todo)" AND FOLLOW THE BELOW STEPS:
	// 1. ADD 3 TASKS. ALSO console the "taskArray" and "localStorage"
	// 2. RELOAD. ALSO console the "taskArray" and "localStorage"
	// 3. ADD 2 NEW TASKS. ALSO console the "taskArray" and "localStorage"
	// 4. RELOAD. ALSO console the "taskArray" and "localStorage"
	taskArray.push(todo);
	localStorage.setItem("tasks", JSON.stringify(taskArray));
}


// Preventing Empty task adding
function inputFieldChecker(todo, callback) {
	if(todo === ""){
		return;
	}
	else{
		callback(todo);
	}
}


// Listener to clear the localStorage aka All previous tasks
document.querySelector("#delete-all").addEventListener("click", function () {
	delete localStorage.tasks;
	location.reload();
});


// Listener to Delete a specific task
/* for(let i = 0; i < taskArray.length; i++){
	document.querySelector(".task"+i).addEventListener("click", function(){
		this.parentElement.remove();
	});
} */


$(document).on("click", ".delete-task", function(){
	let taskText = this.parentElement.textContent;
	taskText = taskText.slice(0, taskText.length-6);
	console.log(taskText);
	let deletedTaskIndex = taskArray.indexOf(taskText);
	console.log(deletedTaskIndex);
	console.log(taskArray.splice(deletedTaskIndex, 1));
	localStorage.setItem("tasks", JSON.stringify(taskArray));
	this.parentElement.remove();
});