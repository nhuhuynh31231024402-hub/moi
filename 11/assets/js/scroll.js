window.addEventListener("scroll", () => {
    const h = document.getElementById("main-header");
    // Thay đổi logic cuộn để phù hợp với border-b trong header
    if (window.scrollY > 50) {
        h.classList.add("shadow-md", "bg-white/95");
        h.classList.remove("bg-cream/80");
    } else {
        h.classList.remove("shadow-md", "bg-white/95");
        h.classList.add("bg-cream/80");
    }
});
