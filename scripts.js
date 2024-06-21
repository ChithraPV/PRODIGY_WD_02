const timerDisplay = document.getElementById("timer-display");
let isRunning = false;
let timer;
let totalTime;
let bal_Time;
const lapsContainer = document.getElementById("laps");

function updateDisplay(time) {
  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  const time = parseInt(document.getElementById("input-time").value, 10);
  if (isRunning || isNaN(time) || time <= 0) return;
  totalTime = time * 60;
  bal_Time = totalTime;
  isRunning = true;
  
  function countdown() {
    bal_Time--;
    updateDisplay(bal_Time);
    if (bal_Time <= 0) {
      clearInterval(timer);
      isRunning = false;
    }
  }

  updateDisplay(totalTime);
  timer = setInterval(countdown, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function restartTimer() {
  if (isRunning || bal_Time <= 0) return;
  isRunning = true;

  function countdown() {
    bal_Time--;
    updateDisplay(bal_Time);
    if (bal_Time <= 0) {
      clearInterval(timer);
      isRunning = false;
    }
  }

  timer = setInterval(countdown, 1000);
}

function resetTimer() {
  stopTimer();
  bal_Time = totalTime;
  updateDisplay(bal_Time);
  lapsContainer.innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  const lapTime = totalTime - bal_Time;
  const hours = String(Math.floor(lapTime / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((lapTime % 3600) / 60)).padStart(2, "0");
  const seconds = String(lapTime % 60).padStart(2, "0");
  const lapItem = document.createElement("li");
  lapItem.textContent = `${hours}:${minutes}:${seconds}`;
  lapsContainer.appendChild(lapItem);
}

document.getElementById("start-button").addEventListener("click", startTimer);
document.getElementById("stop-button").addEventListener("click", stopTimer);
document.getElementById("reset-button").addEventListener("click", resetTimer);
document.getElementById("restart-button").addEventListener("click", restartTimer);
document.getElementById("lap-button").addEventListener("click", recordLap);

updateDisplay(0);
