// js/aboutus.js
document.addEventListener('sharedScriptsReady', () => {
    console.log("aboutus.js: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const slideContainer = document.querySelector('.slide');
    const imageModal = document.getElementById("imageModal");
    const modalImageEl = document.getElementById("modalImage");
    const spanCloseModal = document.querySelector(".close");
    const modalItems = Array.from(document.querySelectorAll('.item'));
    let currentModalIndex = 0;

    if (nextButton && prevButton && slideContainer) {
        nextButton.addEventListener('click', () => {
            const items = slideContainer.querySelectorAll('.item');
            if (items.length > 0) slideContainer.appendChild(items[0]);
        });

        prevButton.addEventListener('click', () => {
            const items = slideContainer.querySelectorAll('.item');
            if (items.length > 0) slideContainer.prepend(items[items.length - 1]);
        });
    } else {
        console.warn("Aboutus.js: Thiếu các nút slider hoặc container.");
    }


    function syncSliderTo(index) {
        if (!slideContainer) return;
        let itemsInSlider = Array.from(slideContainer.querySelectorAll('.item'));
        const targetItem = modalItems[index]; // modalItems là mảng gốc từ DOM lúc đầu

        // Kiểm tra xem targetItem có còn trong DOM không (phòng trường hợp slider thay đổi cấu trúc bất ngờ)
        if (!document.body.contains(targetItem)) {
            console.warn("Aboutus.js: syncSliderTo - targetItem không còn trong DOM.");
            return;
        }

        // Đưa targetItem vào vị trí thứ 2 trong slideContainer
        // Giới hạn số lần lặp để tránh vòng lặp vô hạn nếu có lỗi logic
        let attempts = 0;
        const maxAttempts = itemsInSlider.length * 2; // Gấp đôi số lượng item

        while (itemsInSlider[1] !== targetItem && attempts < maxAttempts) {
            slideContainer.appendChild(itemsInSlider[0]);
            itemsInSlider = Array.from(slideContainer.querySelectorAll('.item')); // Cập nhật lại mảng
            attempts++;
        }
        if (attempts >= maxAttempts) {
            console.warn("Aboutus.js: syncSliderTo - Không thể đồng bộ slider, có thể targetItem không nằm trong slider hiện tại.");
        }
    }

    function openModal(index) {
        if (!imageModal || !modalImageEl || index < 0 || index >= modalItems.length) return;

        const itemToDisplay = modalItems[index];
        const bgImage = itemToDisplay.style.backgroundImage;
        const imageUrl = bgImage.slice(5, -2); // Bỏ "url(" và ")" và dấu nháy
        modalImageEl.src = imageUrl;
        imageModal.style.display = "flex";
        currentModalIndex = index;
        syncSliderTo(index);
    }

    if (modalItems.length > 0 && imageModal && modalImageEl && spanCloseModal) {
        modalItems.forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });

        const modalPrevBtn = document.querySelector('.modal-prev');
        const modalNextBtn = document.querySelector('.modal-next');

        if (modalPrevBtn) {
            modalPrevBtn.addEventListener('click', () => {
                currentModalIndex = (currentModalIndex - 1 + modalItems.length) % modalItems.length;
                openModal(currentModalIndex);
            });
        }
        if (modalNextBtn) {
            modalNextBtn.addEventListener('click', () => {
                currentModalIndex = (currentModalIndex + 1) % modalItems.length;
                openModal(currentModalIndex);
            });
        }

        spanCloseModal.onclick = () => {
            imageModal.style.display = "none";
        };

        window.addEventListener('click', (event) => { // Đổi tên biến event
            if (event.target == imageModal) {
                imageModal.style.display = "none";
            }
        });
    } else {
        console.warn("Aboutus.js: Thiếu các phần tử modal hoặc không có item nào trong slider.");
    }

    // Gọi các hàm toàn cục từ shared.js nếu cần
    if (typeof updateHeaderLoginState === 'function') updateHeaderLoginState();
    if (typeof updateCartCount === 'function') updateCartCount();

    console.log("aboutus.js: Khởi tạo hoàn tất.");
});