const timeIntervalSelect = document.getElementById('time-interval');
const scheduleDiv = document.getElementById('schedule');

let tasks = JSON.parse(localStorage.getItem('onulplanner_tasks')) || {};

function createTimeBlocks(interval) {
    scheduleDiv.innerHTML = '';
    const totalMinutes = 24 * 60;

    for (let i = 0; i < totalMinutes; i += interval) {
        const hour = Math.floor(i / 60);
        const minute = i % 60;
        const timeLabel = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

        const blockDiv = document.createElement('div');
        blockDiv.classList.add('time-block');
        blockDiv.dataset.time = timeLabel;

        blockDiv.innerHTML = `
            <h2>${timeLabel}</h2>
            <ul class="task-list" id="task-list-${timeLabel}"></ul>
            <input type="text" placeholder="할 일을 입력하세요" />
            <button onclick="addTask('${timeLabel}')">추가</button>
        `;

        scheduleDiv.appendChild(blockDiv);

        if (tasks[timeLabel]) {
            renderTasks(timeLabel, tasks[timeLabel]);
        }
    }
}

function addTask(timeLabel) {
    const input = document.querySelector(`.time-block[data-time="${timeLabel}"] input`);
    const task = input.value.trim();
    if (!task) return;

    if (!tasks[timeLabel]) tasks[timeLabel] = [];
    tasks[timeLabel].push(task);

    localStorage.setItem('onulplanner_tasks', JSON.stringify(tasks));
    renderTasks(timeLabel, tasks[timeLabel]);

    input.value = '';
}

function renderTasks(timeLabel, taskList) {
    const taskListUl = document.getElementById(`task-list-${timeLabel}`);
    taskListUl.innerHTML = '';

    taskList.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => deleteTask(timeLabel, index);

        li.appendChild(deleteBtn);
        taskListUl.appendChild(li);
    });
}

function deleteTask(timeLabel, index) {
    tasks[timeLabel].splice(index, 1);
    if (tasks[timeLabel].length === 0) delete tasks[timeLabel];

    localStorage.setItem('onulplanner_tasks', JSON.stringify(tasks));
    renderTasks(timeLabel, tasks[timeLabel]);
}

timeIntervalSelect.addEventListener('change', (e) => {
    createTimeBlocks(parseInt(e.target.value, 10));
});

createTimeBlocks(parseInt(timeIntervalSelect.value, 10));
