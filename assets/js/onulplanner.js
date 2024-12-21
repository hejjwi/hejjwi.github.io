// 로컬 스토리지에서 일정 데이터 가져오기
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// DOM 요소 선택
const scheduleList = document.getElementById("schedule-list");
const newTaskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");

// 일정 렌더링 함수
function renderTasks() {
    scheduleList.innerHTML = ""; // 기존 목록 초기화
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        // 삭제 버튼 추가
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.onclick = () => deleteTask(index);
        li.appendChild(deleteBtn);

        scheduleList.appendChild(li);
    });
}

// 일정 추가 함수
function addTask() {
    const task = newTaskInput.value.trim();
    if (task) {
        tasks.push(task); // 새로운 일정 추가
        localStorage.setItem("tasks", JSON.stringify(tasks)); // 로컬 스토리지에 저장
        renderTasks(); // 목록 다시 렌더링
        newTaskInput.value = ""; // 입력 필드 초기화
    }
}

// 일정 삭제 함수
function deleteTask(index) {
    tasks.splice(index, 1); // 해당 인덱스의 일정 삭제
    localStorage.setItem("tasks", JSON.stringify(tasks)); // 로컬 스토리지 업데이트
    renderTasks(); // 목록 다시 렌더링
}

// 이벤트 리스너 추가
addTaskBtn.onclick = addTask;

// 초기 데이터 렌더링
renderTasks();
