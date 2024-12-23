document.addEventListener("DOMContentLoaded", function () {
    const startTimeDropdown = document.getElementById("start-time");
    const endTimeDropdown = document.getElementById("end-time");
    const intervalDropdown = document.getElementById("interval");
    const generateButton = document.getElementById("generate-button");

    // Populate time dropdowns with 30-minute increments
    function populateTimeDropdown(dropdown) {
        dropdown.innerHTML = ""; // Clear existing options
        for (let hour = 0; hour < 24; hour++) {
            for (let minute of [0, 30]) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                const option = new Option(formatAMPM(time), time);
                dropdown.add(option);
            }
        }
    }

    // Format time to AM/PM with two digits
    function formatAMPM(time) {
        const [hour, minute] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = String(hour % 12 || 12).padStart(2, '0');
        return `${formattedHour}:${String(minute).padStart(2, '0')} ${ampm}`;
    }

    // Calculate default end time 3 hours from start time
    function calculateEndTime(startTime) {
        const [hour, minute] = startTime.split(":").map(Number);
        let newHour = hour + 3; // Add 3 hours
        if (newHour >= 24) newHour -= 24; // Adjust for 24-hour format
        return `${String(newHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }

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
            const timeSlot = document.createElement("div");
            timeSlot.className = "time-slot";

            // Create time label
            const timeLabel = document.createElement("div");
            timeLabel.className = "time-label";
            timeLabel.textContent = `${timeStr}`;

            // Create task input
            const taskInput = document.createElement("input");
            taskInput.type = "text";
            taskInput.placeholder = "Enter task here";

            // Create checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            // Append elements to time slot
            timeSlot.appendChild(timeLabel);
            timeSlot.appendChild(taskInput);
            timeSlot.appendChild(checkbox);
            container.appendChild(timeSlot);
        }
    });

    // Populate dropdowns on page load
    populateTimeDropdown(startTimeDropdown);
    populateTimeDropdown(endTimeDropdown);

    // Set default start and end times
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = Math.ceil(now.getMinutes() / 30) * 30; // Round to the next 30-minute mark
    const defaultStartTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute === 60 ? 0 : currentMinute).padStart(2, '0')}`;
    const defaultEndTime = calculateEndTime(defaultStartTime);

    startTimeDropdown.value = defaultStartTime;
    endTimeDropdown.value = defaultEndTime;
});
