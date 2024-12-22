function generateTimeSlots() {
    const current = new Date();
    const defaultStartHour = current.getHours();
    const defaultStartMinute = Math.floor(current.getMinutes() / 30) * 30; // Round to nearest 30 minutes

    const startTime = document.getElementById("start-time").value || `${String(defaultStartHour).padStart(2, '0')}:${String(defaultStartMinute).padStart(2, '0')}`;
    const endTime = document.getElementById("end-time").value || "12:00";

    const startParts = startTime.split(":"),
          endParts = endTime.split(":"),
          start = new Date(current.getFullYear(), current.getMonth(), current.getDate(), parseInt(startParts[0]), parseInt(startParts[1])),
          end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), parseInt(endParts[0]), parseInt(endParts[1]));

    const intervalDropdown = document.getElementById("interval");

    // Clear previous interval options
    intervalDropdown.innerHTML = "";

    // Calculate maximum interval in minutes
    const maxInterval = Math.floor((end - start) / (1000 * 60));

    // Populate interval dropdown with options from 5 minutes to maxInterval
    for (let i = 5; i <= maxInterval; i += 5) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${i} minutes`;
        intervalDropdown.appendChild(option);
    }

    const interval = parseInt(intervalDropdown.value) || 30;
    const container = document.getElementById("time-slots");

    container.innerHTML = ""; // Clear previous slots

    if (start >= end) {
        alert("End time must be later than start time.");
        return;
    }

    for (let time = start; time < end; time.setMinutes(time.getMinutes() + interval)) {
        const hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format
        const timeStr = `${formattedHours}:${minutes} ${ampm}`;

        const input = document.createElement("div");
        input.className = "time-slot";
        input.innerHTML = `${timeStr} - <input type="text" placeholder="Enter task here">`;
        container.appendChild(input);
    }
}
