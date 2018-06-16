var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText)  {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position)  {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true){
        completedTodos++;
      }
    })
    this.todos.forEach(function(todo){
      if (completedTodos === totalTodos){
        todo.completed = false;
      }
      else{
        todo.completed = true;
      }
    })
  }
};

var toggleAllButton = document.getElementById('toggleAllButton');
var addTodoButton = document.getElementById('addTodoButton');
var changeTodoButton = document.getElementById('changeTodoButton');
var deleteButton = document.getElementById("deleteButton");
var toggleCompletedButton = document.getElementById("toggleCompletedButton");

toggleAllButton.addEventListener('click', function() {
  todoList.toggleAll();
  view.displayTodos();
});

addTodoButton.addEventListener('click', function() {
  var addTodoTextInput = document.getElementById("addTodoTextInput");
  todoList.addTodo(addTodoTextInput.value);
  addTodoTextInput.value = '';
  view.displayTodos();
});

changeTodoButton.addEventListener('click', function() {
  var changePosition = document.getElementById("changeTodoPosition");
  var changeText = document.getElementById("changeTodoInput");
  todoList.changeTodo(changePosition.valueAsNumber, changeText.value);
  changePosition.value = '';
  changeText.value = '';
  view.displayTodos();
});

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
      if (todo.completed === true){
        todoTextWithCompletion = '(X) ' + todo.todoText + ' ';
      }
      else{
        todoTextWithCompletion = '( ) ' + todo.todoText + ' ';
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createToggleButton());
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    
    return deleteButton;
  },
  createToggleButton: function(){
    var toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle";
    toggleButton.className = "toggleButton";
    
    return toggleButton;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      var elementId = parseInt(elementClicked.parentNode.id);
      if (elementClicked.className === "deleteButton"){
        todoList.deleteTodo(elementId);
        view.displayTodos();
      }
      else if (elementClicked.className === "toggleButton"){
        todoList.toggleCompleted(elementId);
        view.displayTodos();
      }
    });
  }
};

view.setUpEventListeners();