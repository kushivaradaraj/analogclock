const deg = 6;
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const pageHeader = document.querySelector(".page-header");

let intervalId;
let isClockRunning = false;
let elapsedTime = 0; 
let isRealTimeMode = true;

const setClock = () => {
  if (isRealTimeMode) {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`;
    sec.style.transform = `rotateZ(${ss}deg)`;
  } else {
    elapsedTime++;
    let hh = Math.floor(elapsedTime / 3600) * 30;
    let mm = Math.floor((elapsedTime % 3600) / 60) * deg;
    let ss = (elapsedTime % 60) * deg;

    hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`;
    sec.style.transform = `rotateZ(${ss}deg)`;
  }
};

const resetClockHands = () => {
  hour.style.transform = "rotateZ(0deg)";
  min.style.transform = "rotateZ(0deg)";
  sec.style.transform = "rotateZ(0deg)";
};

const startStopBtn = document.querySelector(".start-stop-btn");
const toggleModeBtn = document.querySelector(".toggle-mode-btn");
const switchModeBtn = document.querySelector(".switch-btn");

const toggleClock = () => {
  if (isClockRunning) {
    clearInterval(intervalId);
    startStopBtn.textContent = "Start";
  } else {
    intervalId = setInterval(setClock, 1000);
    startStopBtn.textContent = "Stop";
  }
  isClockRunning = !isClockRunning;
};

startStopBtn.addEventListener("click", toggleClock);

const updateToggleButtonText = () => {
  toggleModeBtn.textContent = isRealTimeMode ? "Stopwatch" : "Analog Clock";
  pageHeader.textContent = isRealTimeMode ? "Analog Clock" : "Stopwatch";
};

toggleModeBtn.addEventListener("click", () => {
  if (isRealTimeMode) {
    isRealTimeMode = false;
    updateToggleButtonText();

    elapsedTime = 0;
    clearInterval(intervalId);
    startStopBtn.textContent = "Start";
    isClockRunning = false;
    resetClockHands(); 
  } else {
    isRealTimeMode = true;
    updateToggleButtonText();

    setClock();
    intervalId = setInterval(setClock, 1000);
    startStopBtn.textContent = "Stop";
    isClockRunning = true;
  }
});

const switchTheme = (evt) => {
  const switchBtn = evt.target;
  if (switchBtn.textContent.toLowerCase() === "light") {
    switchBtn.textContent = "dark";
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    switchBtn.textContent = "light";
    document.documentElement.setAttribute("data-theme", "light");
  }
};

switchModeBtn.addEventListener("click", switchTheme, false);

let currentTheme = "dark";

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  switchModeBtn.textContent = currentTheme;
}


setClock();
intervalId = setInterval(setClock, 1000);
startStopBtn.textContent = "Stop";
isClockRunning = true;
