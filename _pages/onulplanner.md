---
layout: single
title: "Onul Planner"
permalink: /onulplanner/
hidden: true
toc: false
classes: wide
---

<div id="onulplanner">
    <h1>하루의 시작은 '오늘이'</h1>
    <div id="time-selector">
        <label for="time-interval">시간 간격 선택:</label>
        <select id="time-interval">
            <option value="5">5분</option>
            <option value="15">15분</option>
            <option value="30">30분</option>
            <option value="60" selected>1시간</option>
            <option value="120">2시간</option>
        </select>
    </div>
    <div id="schedule">
        <!-- 스케줄 시간이 동적으로 추가됩니다 -->
    </div>
</div>

<script src="{{ site.baseurl }}/assets/js/onulplanner.js"></script>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/onulplanner.css">
