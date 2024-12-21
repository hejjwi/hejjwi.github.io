// 스케줄 데이터 저장
const scheduleList = document.getElementById("schedule-list");
const newTaskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 일정 렌더링
function renderTasks() {
    scheduleList.innerHTML = ""; // 기존 내용을 초기화
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.onclick = () => deleteTask(index);
        li.appendChild(deleteBtn);
        scheduleList.appendChild(li);
    });
}

// 새로운 일정 추가
function addTask() {
    const task = newTaskInput.value.trim();
    if (task) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        newTaskInput.value = ""; // 입력창 초기화
    }
}

// 일정 삭제
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// 이벤트 리스너
addTaskBtn.onclick = addTask;
renderTasks();
