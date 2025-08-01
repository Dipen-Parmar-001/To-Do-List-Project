let editingTask = null;

function showForm(isEdit = false) {
  document.getElementById("task-form").style.display = "block";
  document.getElementById("add-button").style.display = "none";
  document.getElementById("form-title").innerText = isEdit ? "Edit Task" : "Add New Task";

  if (!isEdit) {
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    editingTask = null;
  }
}

function hideForm() {
  document.getElementById("task-form").style.display = "none";
  document.getElementById("add-button").style.display = "block";
}

function saveTask() {
  const title = document.getElementById("task-title").value.trim();
  const desc = document.getElementById("task-desc").value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  if (editingTask) {
    editingTask.querySelector(".task-title").innerText = title;
    editingTask.querySelector(".task-desc").innerText = desc;
    editingTask = null;
  } else {
    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      li.classList.toggle("completed");
      updateTaskSummary();
    });
    
    checkbox.addEventListener("change", () => {
      if(checkbox.checked) {
        checkbox.disabled = true;
      }
    })

    const taskDetails = document.createElement("div");
    taskDetails.className = "task-details task-content";

    const taskTitle = document.createElement("div");
    taskTitle.className = "task-title";
    taskTitle.innerText = title;

    const taskDesc = document.createElement("div");
    taskDesc.className = "task-desc";
    taskDesc.innerText = desc;

    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(taskDesc);

    const menu = document.createElement("div");
    menu.className = "menu";

    const menuBtn = document.createElement("button");
    menuBtn.className = "menu-btn";
    menuBtn.innerText = "⋮";
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      closeAllMenus();
      menuOptions.style.display = "block";
    };

    const menuOptions = document.createElement("div");
    menuOptions.className = "menu-options";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editTask(li, title, desc);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => {
      li.remove();
      updateTaskSummary();
    };

    menuOptions.appendChild(editBtn);
    menuOptions.appendChild(deleteBtn);

    menu.appendChild(menuBtn);
    menu.appendChild(menuOptions);

    li.appendChild(checkbox);
    li.appendChild(taskDetails);
    li.appendChild(menu);
    
    

    document.getElementById("task-list").appendChild(li);
  }

  updateTaskSummary();
  hideForm();
}

function updateTaskSummary() {
  const allTasks = document.querySelectorAll("li.task-item");
  const completedTasks = document.querySelectorAll("li.task-item.completed");

  document.getElementById("completed-count").innerText = `Completed: ${completedTasks.length}`;
  document.getElementById("incomplete-count").innerText = `Incomplete: ${allTasks.length - completedTasks.length}`;

  // ✅ If all tasks are completed, delete them all
  if (allTasks.length > 0 && allTasks.length === completedTasks.length) {
    document.getElementById("task-list").innerHTML = "";
    
    // Optional: Reset summary
    document.getElementById("completed-count").innerText = `Completed: 0`;
    document.getElementById("incomplete-count").innerText = `Incomplete: 0`;
  }
}

function editTask(taskItem, title, desc) {
  editingTask = taskItem;
  document.getElementById("task-title").value = title;
  document.getElementById("task-desc").value = desc;
  showForm(true);
}

// Hide menus when clicking outside
document.addEventListener("click", () => {
  closeAllMenus();
});

function closeAllMenus() {
  document.querySelectorAll(".menu-options").forEach(menu => {
    menu.style.display = "none";
  });
}

let completedCount = parseInt(document.querySelector("#completed-count").innerText.split(":")[1].trim());
let incompleteCount = parseInt(document.querySelector("#incomplete-count").innerText.split(":")[1].trim());

let totalCount = completedCount + incompleteCount;

if (completedCount === totalCount && totalCount > 0) {
  document.querySelector("#task-list").innerHTML = "";
}

      
