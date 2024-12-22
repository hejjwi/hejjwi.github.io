const timeIntervalSelect = document.getElementById('time-interval');
const scheduleDiv = document.getElementById('schedule');

// 로컬 스토리지에서 데이터 가져오기
let tasks = JSON.parse(localStorage.getItem('scheduler_tasks')) || {};

// 시간 블록 생성
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

    // 저장된 할 일 렌더링
    if (tasks[timeLabel]) {
      renderTasks(timeLabel, tasks[timeLabel]);
    }
  }
}

// 할 일 추가
function addTask(timeLabel) {
  const input = document.querySelector(`.time-block[data-time="${timeLabel}"] input`);
  const task = input.value.trim();

  if (!task) return;

  if (!tasks[timeLabel]) tasks[timeLabel] = [];
  tasks[timeLabel].push(task);

  localStorage.setItem('scheduler_tasks', JSON.stringify(tasks));
  renderTasks(timeLabel, tasks[timeLabel]);

  input.value = '';
}

// 할 일 렌더링
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

// 할 일 삭제
function deleteTask(timeLabel, index) {
  tasks[timeLabel].splice(index, 1);
  if (tasks[timeLabel].length === 0) delete tasks[timeLabel];

  localStorage.setItem('scheduler_tasks', JSON.stringify(tasks));
  renderTasks(timeLabel, tasks[timeLabel]);
}

// 시간 간격 변경 이벤트
timeIntervalSelect.addEventListener('change', (e) => {
  createTimeBlocks(parseInt(e.target.value, 10));
});

// 초기 화면 렌더링
createTimeBlocks(parseInt(timeIntervalSelect.value, 10));
