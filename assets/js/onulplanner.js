function generateTimeSlots() {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const interval = parseInt(document.getElementById("interval").value);

    const startParts = startTime.split(":"),
          endParts = endTime.split(":"),
          start = new Date(0, 0, 0, parseInt(startParts[0]), parseInt(startParts[1])),
          end = new Date(0, 0, 0, parseInt(endParts[0]), parseInt(endParts[1]));

    const container = document.getElementById("time-slots");

    container.innerHTML = ""; // Clear previous slots

    for (let time = start; time < end; time.setMinutes(time.getMinutes() + interval)) {
        const timeStr = time.toTimeString().substring(0, 5);
        const input = document.createElement("div");
        input.className = "time-slot";
        input.innerHTML = `${timeStr} - <input type="text" placeholder="Enter task here">`;
        container.appendChild(input);
    }
}
