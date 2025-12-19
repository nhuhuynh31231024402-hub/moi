// ===== 4. Vòng quay =====
let currentDeg = 0;
let isSpinning = false;
const prizes = ["10%", "30K", "12%", "Snack", "20%", "15%"];
const sliceDeg = 60;

export function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    const wheel = document.getElementById("wheel");
    const winningIndex = Math.floor(Math.random() * 6);
    const winningPrize = prizes[winningIndex];
    const centerOffset = 30;
    const targetAngleInWheel = winningIndex * sliceDeg + centerOffset;
    const currentMod = currentDeg % 360;
    let delta = 360 - targetAngleInWheel - currentMod;
    while (delta < 360 * 5) {
        delta += 360;
    }
    currentDeg += delta;
    wheel.style.transform = `rotate(${currentDeg}deg)`;
    setTimeout(() => {
        isSpinning = false;
        document.getElementById("winResult").innerText = winningPrize;
        showLeadModal();
    }, 6000);
}

window.spinWheel = spinWheel;
