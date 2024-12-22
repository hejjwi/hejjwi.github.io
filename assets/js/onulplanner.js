document.addEventListener("DOMContentLoaded", function () {
    const startTimeDropdown = document.getElementById("start-time");
    const endTimeDropdown = document.getElementById("end-time");
    const intervalDropdown = document.getElementById("interval");
    const generateButton = document.getElementById("generate-button");

    // Populate time dropdowns with 30-minute increments
    for (let hour = 0; hour < 24; hour++) {
        for (let minute of [0, 30]) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            const optionStart = new Option(formatAMPM(time), time);
            const optionEnd = new Option(formatAMPM(time), time);
            startTimeDropdown.add(optionStart);
            endTimeDropdown.add(optionEnd);
        }
    }

    // Set default preset (8:00AM to 12:00PM)
    startTimeDropdown.value = "08:00";
    endTimeDropdown.value = "12:00";

    // Populate interval dropdown (5 minutes to maximum interval)
    function populateIntervals() {
        intervalDropdown.innerHTML = ""; // Clear existing intervals
        const startTime = new Date(`1970-01-01T${startTimeDropdown.value}:00`);
        const endTime = new Date(`1970-01-01T${endTimeDropdown.value}:00`);
        const maxInterval = Math.floor((endTime - startTime) / (1000 * 60));

        for (let i = 5; i <= maxInterval; i += 5) {
            const option = new Option(`${i} minutes`, i);
            intervalDropdown.add(option);
        }
    }

    // Update intervals when start or end time changes
    startTimeDropdown.addEventListener("change", populateIntervals);
    endTimeDropdown.addEventListener("change", populateIntervals);

    // Initial interval population
    populateIntervals();

    // Generate time slots
    generateButton.addEventListener("click", function () {
        const container = document.getElementById("time-slots");
        container.innerHTML = ""; // Clear previous slots

        const startTime = new Date(`1970-01-01T${startTimeDropdown.value}:00`);
        const endTime = new Date(`1970-01-01T${endTimeDropdown.value}:00`);
        const interval = parseInt(intervalDropdown.value);

        if (startTime >= endTime) {
            alert("End time must be later than start time.");
            return;
        }

        for (let time = startTime; time < endTime; time.setMinutes(time.getMinutes() + interval)) {
            const timeStr = formatAMPM(`${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`);
            const input = document.createElement("div");
            input.className = "time-slot";
            input.innerHTML = `${timeStr} - <input type="text" placeholder="Enter task here">`;
            container.appendChild(input);
        }
    });

    // Format time to AM/PM
    function formatAMPM(time) {
        const [hour, minute] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${String(minute).padStart(2, '0')} ${ampm}`;
    }
});
