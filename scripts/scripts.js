"use strict";
const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = JSON.parse(localStorage.getItem("todoData"))
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach(function (item, index) {
    const li = document.createElement("li");

    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    localStorage.setItem("todoData", JSON.stringify(todoData));

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector(".todo-complete");
    btnTodoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });

    const todoRemove = li.querySelector(".todo-remove");
    todoRemove.addEventListener("click", function (event) {
      li.remove();

      todoData.splice(index, 1);

      localStorage.setItem("todoData", JSON.stringify(todoData));

      render();
    });
  });

  headerInput.value = "";
};

// Нажатие мышкой на кнопку плюс
todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };

  if (headerInput.value.trim() !== "") {
    todoData.push(newTodo);
  }

  render();
});
// Нажатие мышкой на кнопку плюс

// Нажатие кнопкой Enter
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const newTodo = {
      value: headerInput.value,
      completed: false,
    };

    if (headerInput.value.trim() !== "") {
      todoData.push(newTodo);
    }

    render();
  }
});
// Нажатие кнопкой Enter

render();
