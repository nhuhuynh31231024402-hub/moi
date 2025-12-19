// ===== 7. SLIDER =====
export function slideMoments(direction) {
    const track = document.getElementById("momentsTrack");
    // Lấy chiều rộng của item (min-w-full trên mobile, min-w-[23%] trên desktop) + gap-6/8
    const itemWidth =
        track.firstElementChild.offsetWidth +
        (window.innerWidth >= 768 ? 32 : 24); // 32px=gap-8, 24px=gap-6
    track.scrollBy({ left: direction * itemWidth, behavior: "smooth" });
}
window.slideMoments = slideMoments;

// ===== 8. LIKE BUTTON =====
export function toggleLike(btn) {
    const icon = btn.querySelector("i");
    const countSpan = btn.querySelector("span");
    let count = parseInt(countSpan.innerText);

    if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas", "text-red-500", "heart-bounce");
        btn.classList.add("text-red-500");
        countSpan.innerText = count + 1;
        createFloatingHeart(btn);
    } else {
        icon.classList.remove("fas", "text-red-500", "heart-bounce");
        icon.classList.add("far");
        btn.classList.remove("text-red-500");
        countSpan.innerText = count - 1;
    }
}
window.toggleLike = toggleLike;

export function createFloatingHeart(btn) {
    const rect = btn.getBoundingClientRect();
    const heart = document.createElement("div");
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.classList.add(
        "fixed",
        "text-red-500",
        "text-xl",
        "z-50",
        "pointer-events-none"
    );
    heart.style.left = rect.left + rect.width / 2 - 10 + "px";
    heart.style.top = rect.top + "px";
    heart.style.transition = "all 1s ease-out";
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
        heart.style.transform = "translateY(-100px) scale(1.5)";
        heart.style.opacity = "0";
    });
    setTimeout(() => heart.remove(), 1000);
}
window.createFloatingHeart = createFloatingHeart;

// ===== 11. TIMER (CHỈ GỌI 1 LẦN!) =====
export function startTimer() {
    let h = 14,
        m = 45,
        s = 30;
    setInterval(() => {
        s--;
        if (s < 0) {
            s = 59;
            m--;
        }
        if (m < 0) {
            m = 59;
            h--;
        }
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    }, 1000);
}
window.startTimer = startTimer;

// ===== 12. Hiệu ứng Tuyết =====
export function createSnow() {
    const f = document.createElement("div");
    f.classList.add("snowflake");
    f.innerHTML = "❄";
    f.style.left = Math.random() * 100 + "%";
    f.style.fontSize = Math.random() * 10 + 10 + "px";
    f.style.opacity = Math.random() * 0.5 + 0.2;
    f.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.getElementById("snow-container").appendChild(f);
    setTimeout(() => f.remove(), 7000);
}
window.createSnow = createSnow;
