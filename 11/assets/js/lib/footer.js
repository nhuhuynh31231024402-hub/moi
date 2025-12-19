// ===== 10. FOOTER =====
export function toggleFooter(header) {
    if (window.innerWidth < 1024) {
        const ul = header.nextElementSibling;
        const icon = header.querySelector(".fa-chevron-down").parentElement;
        ul.classList.toggle("hidden");
        icon.classList.toggle("rotate-180");
    }
}

window.toggleFooter = toggleFooter;
