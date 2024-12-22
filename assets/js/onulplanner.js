document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const timeUnitSelect = document.getElementById('time-unit');
    const timeBlocksDiv = document.getElementById('time-blocks');

    document.getElementById('set-interval').addEventListener('click', () => {
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;

        if (!startTime || !endTime || startTime >= endTime) {
            alert('올바른 시작 시간과 종료 시간을 입력하세요.');
            return;
        }

        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        const minutes = (end - start) / (1000 * 60);

        timeUnitSelect.innerHTML = '';
        for (let i = 5; i <= minutes; i += 5) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i}분`;
            timeUnitSelect.appendChild(option);
        }

        step1.style.display = 'none';
        step2.style.display = 'block';
    });

    document.getElementById('set-time-unit').addEventListener('click', () => {
        const selectedUnit = parseInt(timeUnitSelect.value, 10);
        if (!selectedUnit) {
            alert('시간 단위를 선택하세요.');
            return;
        }

        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        let currentTime = start;
        timeBlocksDiv.innerHTML = '';

        while (currentTime < end) {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'time-block';

            const blockEnd = new Date(currentTime.getTime() + selectedUnit * 60000);
            const timeLabel = `${formatTime(currentTime)} - ${formatTime(blockEnd)}`;

            blockDiv.innerHTML = `
                <h3>${timeLabel}</h3>
                <ul class="task-list" id="task-list-${timeLabel}"></ul>
                <input type="text" placeholder="할 일을 입력하세요" />
                <button onclick="addTask('${timeLabel}')">추가</button>
            `;

            timeBlocksDiv.appendChild(blockDiv);
            currentTime = blockEnd;
        }

        step2.style.display = 'none';
        step3.style.display = 'block';
    });

    function formatTime(date) {
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    function addTask(timeLabel) {
        const input = document.querySelector(`.time-block h3:contains('${timeLabel}') ~ input`);
        const task = input.value.trim();

        if (!task) return;

        const taskList = document.getElementById(`task-list-${timeLabel}`);
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);

        input.value = '';
    }
});
