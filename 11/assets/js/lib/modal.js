export function showLeadModal() {
    const modal = document.getElementById("leadModal");
    modal.classList.remove("hidden");
    // Đảm bảo modal được hiển thị trước khi thay đổi opacity và scale
    requestAnimationFrame(() => {
        modal.classList.remove("opacity-0");
        modal.querySelector("div").classList.remove("scale-95");
    });
}
window.showLeadModal = showLeadModal;

export function closeLeadModal() {
    const modal = document.getElementById("leadModal");
    modal.classList.add("opacity-0");
    modal.querySelector("div").classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300);
}
window.closeLeadModal = closeLeadModal;

export function handleLeadSubmit() {
    const btn = document.querySelector('#leadModal button[type="submit"]');
    const phoneInput = document.getElementById("phoneInput");
    const originalContent = btn.innerHTML;

    if (!phoneInput.value) {
        console.error("Vui lòng nhập số điện thoại!");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang lưu...';

    const prize = document.getElementById("winResult").innerText;
    // Lưu data bằng SheetJS
    saveToExcel(phoneInput.value, prize);

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Đã lưu thành công!';
        btn.classList.remove("from-brand", "to-brandDark");
        btn.classList.add("bg-accent"); // Dùng màu xanh accent cho thành công
        setTimeout(() => {
            closeLeadModal();
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalContent;
                btn.classList.add("from-brand", "to-brandDark");
                btn.classList.remove("bg-accent");
                phoneInput.value = "";
            }, 500);
        }, 1500);
    }, 1000);
}
window.handleLeadSubmit = handleLeadSubmit;

export function saveToExcel(phoneNumber, prize) {
    // Hàm này sử dụng thư viện SheetJS đã được import trong head
    try {
        const data = [
            {
                "Số Điện Thoại": phoneNumber,
                "Phần Thưởng": prize,
                "Thời Gian": new Date().toLocaleString("vi-VN"),
            },
        ];
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Trúng Thưởng");
        // Trigger tải file Excel
        XLSX.writeFile(wb, "PawJoy_Leads.xlsx");
    } catch (error) {
        console.error("Lỗi khi xuất file Excel:", error);
    }
}
window.saveToExcel = saveToExcel;
