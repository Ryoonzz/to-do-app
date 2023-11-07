
// Fungsi untuk menambahkan tugas
function addTask() {
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
      // Buat objek tugas
      const task = {
        text: taskInput.value,
        id: Date.now(),
      };

      // Simpan tugas dalam Local Storage
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Tambahkan tugas ke daftar tugas
      taskList.appendChild(createTaskElement(task));

      // Reset input
      taskInput.value = "";
    }
  }

  // Fungsi untuk membuat elemen tugas dengan tombol edit dan hapus
  function createTaskElement(task) {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.text;
    taskItem.id = task;

    // Tombol Edit
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      const taskItem = document.getElementById(task); // Temukan elemen tugas berdasarkan ID
      const updatedText = prompt("Edit tugas:", task.text);
      if (updatedText !== null) {
        task.text = updatedText;
        taskItem.textContent = updatedText; // Ubah teks elemen tugas
        location.reload();
        updateTaskInLocalStorage(task);
      }
    };
    // Tombol Hapus
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.onclick = function () {
      const taskItem = document.getElementById(task);

      taskItem.remove();
      deleteTaskFromLocalStorage(task);
    };

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    return taskItem;
  }

  // Fungsi untuk mengupdate tugas di Local Storage
  function updateTaskInLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  // Fungsi untuk menghapus tugas dari Local Storage
  function deleteTaskFromLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
      const taskItem = createTaskElement(task);
      taskList.appendChild(taskItem);
    });
  });