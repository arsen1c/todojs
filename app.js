// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTodos)

// Functions
function addTodo(event) {
	// prevent form from submitting
	event.preventDefault();
	// Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo')
	// Create LI
	const newTodo = document.createElement('li')
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.append(newTodo);
	// Add Todo To LocalStorage
	saveLocalTodos(todoInput.value);
	// Check Mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton)
	// Trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton)
	// Append to list
	todoList.appendChild(todoDiv)
	// Clear Todo Input value
	todoInput.value = "";
}

function deleteCheck(e) {
	console.log(e.target)
	const item = e.target;
	// Delete Todo
	if(item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		// Animation
		todo.classList.add('fall')
		removeLocalTodos(todo)
		todo.addEventListener('transitionend', function() {
			todo.remove();
		})
	}

	// Check mark
	if(item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed')
	}

}

// IMPORTANT AF

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";	
				break;	
			case "completed":
				if(todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = "none"
				}
				break;
			case "uncompleted":
			if(!todo.classList.contains('completed')) {
				todo.style.display = 'flex'
			} else {
					todo.style.display = "none"
				}
			break;
		}
	})
}



// Saving to local
function saveLocalTodos(todo){
	// Check...do i already have things in therE?
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	todos.forEach(function(todo) {
		// Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo')
	// Create LI
	const newTodo = document.createElement('li')
	// CHANGED THIS from todoInput.value to todo
	newTodo.innerText = todo;
	newTodo.classList.add('todo-item');
	todoDiv.append(newTodo);
	// Check Mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton)
	// Trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton)
	// Append to list
	todoList.appendChild(todoDiv)
	})
}

function removeLocalTodos(todo) {
		// Check...do i already have things in therE?
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	const todoIndex = todo.children[0].innerText;
	// How many you wanna remove? 1
	todos.splice(todos.indexOf(todoIndex), 1)
	localStorage.setItem("todos", JSON.stringify(todos))
}