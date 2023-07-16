let scores = {
    team1: 0,
    team2: 0,
};

let team1Name = "Team 1";
let team2Name = "Team 2";
let timeLeft = 0;
let timerInterval;

let shotClocks = {
    team1: 24,
    team2: 24,
};

let shotClockIntervals = {
    team1: null,
    team2: null,
};

let shotClockPaused = {
    team1: true,
    team2: true,
};

function addScore(points, team) {
    scores[team] += points;
    updateScore(team);
}

function resetScore(team) {
    scores[team] = 0;
    updateScore(team);
}

function updateScore(team) {
    document.getElementById(`${team}Score`).textContent = scores[team];
}

function submitNames() {
    const team1NameInput = document.getElementById("team1Name");
    const team2NameInput = document.getElementById("team2Name");

    team1Name = team1NameInput.value.trim() || "Team 1";
    team2Name = team2NameInput.value.trim() || "Team 2";

    team1NameInput.disabled = true;
    team2NameInput.disabled = true;

    document.getElementById("team1Name").placeholder = team1Name;
    document.getElementById("team2Name").placeholder = team2Name;
}

function startGame() {
    const minutes = parseInt(document.getElementById("gameDuration").value);
    if (!isNaN(minutes)) {
        timeLeft = minutes * 60;
        startClock();
    } else {
        alert("Please enter a valid number of minutes.");
    }
}

function startClock() {
    timerInterval = setInterval(updateClock, 1000);
}

function updateClock() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time's up! Game over.");
    }
    updateClockDisplay();
}

function updateClockDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.getElementById("clock").textContent = formattedTime;
}

function resetShotClock(team) {
    shotClocks[team] = 24;
    shotClockPaused[team] = true;
    updateShotClockDisplay(team);
}

function startShotClock(team) {
    if (shotClocks[team] === 24) {
        shotClockPaused[team] = false;
        shotClockIntervals[team] = setInterval(updateShotClock, 1000, team);
    }
}

function updateShotClock(team) {
    if (!shotClockPaused[team]) {
        shotClocks[team]--;
        if (shotClocks[team] <= 0) {
            clearInterval(shotClockIntervals[team]);
            resetShotClock(team);
        }
        updateShotClockDisplay(team);
    }
}

function updateShotClockDisplay(team) {
    document.getElementById(`${team}ShotClock`).textContent = shotClocks[team];
}