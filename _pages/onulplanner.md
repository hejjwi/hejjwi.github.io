---
layout: single
title: "Onul Planner"
description: "A custom scheduling page based on Daily Routine"
permalink: /onulplanner/
hidden: true
---

<div class="page__content">
    <h1>Onul Planner</h1>
    <div class="planner-container">
        <form>
            <label for="start-time">Start Time:</label>
            <input type="time" id="start-time" required>

            <label for="end-time">End Time:</label>
            <input type="time" id="end-time" required>

            <label for="interval">Interval (minutes):</label>
            <select id="interval">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="60">60</option>
            </select>

            <button type="button" onclick="generateTimeSlots()">Generate</button>
        </form>

        <div id="time-slots" class="time-slots">
            <!-- Generated time slots will appear here -->
        </div>
    </div>
</div>

<script src="assets/js/onulplanner.js"></script>
<link rel="stylesheet" href="assets/css/onulplanner.css">
