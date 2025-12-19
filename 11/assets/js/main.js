import "./lib/effect.js";
import "./lib/chat.js";
import "./lib/effect.js";
import "./lib/modal.js";
import "./lib/search.js";
import "./lib/wheel.js";

// ===== INIT - CHẠY KHI LOAD TRANG =====
document.addEventListener("DOMContentLoaded", function () {
    // Count up animation
    document.querySelectorAll(".count-up").forEach((c) => {
        const t = +c.getAttribute("data-target");
        let n = 0;
        const inc = t / 100;
        const u = () => {
            n += inc;
            if (n < t) {
                c.innerText = Math.ceil(n);
                requestAnimationFrame(u);
            } else c.innerText = t;
        };
        u();
    });

    // Start timer (CHỈ 1 LẦN!)
    startTimer();

    // Start snow effect
    setInterval(createSnow, 300);

    // Show reminder after 5s
    setTimeout(() => {
        document
            .getElementById("smart-reminder")
            .classList.remove("translate-y-full");
    }, 5000);
});

// ===== EVENT LISTENERS - CHỈ ĐĂNG KÝ =====
document.addEventListener("click", function (e) {
    const regionBox = document.getElementById("regionBox");
    const regionList = document.getElementById("regionList");
    if (regionBox && regionList && !regionBox.contains(e.target)) {
        regionList.classList.add("hidden");
        document.getElementById("regionArrow").classList.remove("rotate-180");
    }
});
