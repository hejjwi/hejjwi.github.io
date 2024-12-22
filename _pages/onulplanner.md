---
layout: single
title: "**Onul**Planner"
description: "A custom scheduling page based on Minimal Mistakes theme."
permalink: /onul-planner/
---

<div class="page__content">
    <h1>Onul Planner</h1>
    <div class="planner-container">
        <form>
            <label for="start-time">Start Time:</label>
            <select id="start-time"></select>

            <label for="end-time">End Time:</label>
            <select id="end-time"></select>

            <label for="interval">Interval (minutes):</label>
            <select id="interval"></select>

            <button type="button" id="generate-button">Generate</button>
        </form>

        <div id="time-slots" class="time-slots">
            <!-- Generated time slots will appear here -->
        </div>
    </div>
</div>

<script src="assets/js/onulplanner.js"></script>
<link rel="stylesheet" href="assets/css/onulplanner.css">
