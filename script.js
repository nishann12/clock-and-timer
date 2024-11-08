const display = document.getElementById("display");
const switchBtn = document.getElementById("switchBtn");

let timer = null;
let clockTimer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let isClockMode = true;

function showClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startClock() {
    showClock(); 
    clockTimer = setInterval(showClock, 1000);
}

function switchMode() {
    if (isClockMode) {
        clearInterval(clockTimer);
        display.textContent = "00:00:00:00";
        
        switchBtn.textContent = "Switch to Clock";
        isClockMode = false;
    } else {
        reset();
        startClock();
        
        switchBtn.textContent = "Switch to Timer";
        isClockMode = true;
    }
}

function start() {
    if (!isRunning) {
      
        startTime = performance.now() - elapsedTime;
        timer = requestAnimationFrame(update);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        cancelAnimationFrame(timer);
        elapsedTime = performance.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    cancelAnimationFrame(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
}

function update() {
    const currentTime = performance.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;

    if (isRunning) {
        timer = requestAnimationFrame(update);
    }
}

startClock();