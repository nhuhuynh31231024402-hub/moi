// ===== 9. MOBILE MENU =====
export function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
}
window.toggleMobileMenu = toggleMobileMenu;
