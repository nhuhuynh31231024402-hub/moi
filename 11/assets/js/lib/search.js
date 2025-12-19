export function toggleRegionList(event) {
    // Mở / đóng danh sách Quận – Huyện
    event.stopPropagation();
    const list = document.getElementById("regionList");
    const arrow = document.getElementById("regionArrow");
    list.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
}
window.toggleRegionList = toggleRegionList;

export function selectRegion(regionName) {
    // Chọn quận/huyện và cập nhật UI
    document.getElementById("selectedRegionText").innerText = regionName; // Hiển thị tên đã chọn lên nút/label
    document.getElementById("regionList").classList.add("hidden"); // Ẩn/hiện danh sách bằng class 'hidden'
    document.getElementById("regionArrow").classList.remove("rotate-180"); // Xoay mũi tên 180° khi mở
}
window.selectRegion = selectRegion;

// Hiển thị thông báo tìm kiếm trên UI (thay cho alert)
export function showSearchMessage(message, isError = true) {
    const msgDiv = document.getElementById("searchMessage"); // Khung hiển thị thông điệp
    msgDiv.innerText = message; // Gán nội dung thông báo

    msgDiv.className = `mt-4 text-center text-sm font-bold transition-all duration-300 p-2 h-auto opacity-100 ${
        // Set class cho style + hiệu ứng (dùng Tailwind): nền, màu chữ, bo góc, chuyển cảnh
        isError
            ? "bg-red-50 text-red-500 rounded-lg"
            : "bg-green-50 text-accent rounded-lg" // Style nổi bật cho lỗi
    }`;

    // Tự ẩn sau 5s: mờ dần, thu chiều cao, bỏ các class màu đã set (reset sạch)
    setTimeout(() => {
        msgDiv.classList.add("opacity-0", "h-0"); // Ẩn bằng hiệu ứng
        msgDiv.classList.remove(
            "p-2",
            "h-auto",
            "bg-red-50",
            "bg-green-50",
            "text-red-500",
            "text-accent",
            "rounded-lg"
        ); // Loại bỏ padding/height + nền
    }, 5000); // Loại bỏ màu chữ/bo góc
}
window.showSearchMessage = showSearchMessage;

// ===== 3. SEARCH FUNCTION ( CHUYỂN HƯỚNG NGAY LẬP TỨC) =====
export function handleSearch() {
    const petName = document.getElementById("petName").value; // Lấy giá trị tên thú cưng từ input
    const selectedRegionText =
        document.getElementById("selectedRegionText").innerText; // Lấy tên quận/huyện đã chọn

    // CHECK VALIDATION
    if (!petName.trim() || selectedRegionText.includes("Chọn Quận/Huyện")) {
        // Kiểm tra: tên trống hoặc chưa chọn quận/huyện
        // Hiển thị thông báo lỗi ngắn gọn trên UI
        showSearchMessage("Vui lòng điền thông tin.", true);
        return; // Dừng hàm nếu thiếu thông tin
    }

    // INSTANT REDIRECT UPON SUCCESS
    window.location.href = "services.html"; // Điều hướng ngay sang trang dịch vụ khi hợp lệ
}
window.handleSearch = handleSearch;
