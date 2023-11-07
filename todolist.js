document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <button class="edit" data-index="${index}">Edit</button>
            <button class="delete" data-index="${index}">Hapus</button>
        `;
        taskList.appendChild(li);
      });

      const editButtons = document.querySelectorAll("button.edit");
      editButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          const taskText = tasks[index];
          const editedTask = prompt("Edit tugas:", taskText);
          if (editedTask !== null) {
            tasks[index] = editedTask;
            saveTasks();
            renderTasks();
          }
        });
      });

      // Attach click event to delete buttons
      const deleteButtons = document.querySelectorAll("button.delete");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
      });
    }

    renderTasks();

    addTaskButton.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
    });
  });