// js/cart-page.js
document.addEventListener('sharedScriptsReady', function () {
    console.log("Cart Page Script: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic cho trang giỏ hàng...");
    // allProductsData đã có sẵn từ shared.js (nếu cần tham chiếu)
    // Các hàm getCart, saveCart, formatCurrency, updateCartCount đã có từ shared.js

    const cartItemsBody = document.getElementById('cart-items-body');
    if (cartItemsBody) {
        const cartSubtotalAmountEl = document.getElementById('cart-subtotal-amount');
        const emptyCartMessageEl = document.getElementById('empty-cart-message');
        const cartTable = document.querySelector('.cart-table');
        const cartSummaryDiv = document.querySelector('.cart-summary'); // Div chứa tóm tắt và nút thanh toán

        function renderCartPage() {
            console.log("Cart Page: Đang render lại trang giỏ hàng...");
            const cart = getCart();
            cartItemsBody.innerHTML = ''; // Xóa các item cũ

            if (cart.length === 0) {
                if (emptyCartMessageEl) emptyCartMessageEl.style.display = 'block';
                if (cartTable) cartTable.style.display = 'none';
                if (cartSummaryDiv) cartSummaryDiv.style.display = 'none'; // Ẩn cả phần tóm tắt
                console.log("Cart Page: Giỏ hàng trống.");
            } else {
                if (emptyCartMessageEl) emptyCartMessageEl.style.display = 'none';
                if (cartTable) cartTable.style.display = 'table'; // Hoặc 'block' tùy CSS
                if (cartSummaryDiv) cartSummaryDiv.style.display = 'flex'; // Hiển thị lại phần tóm tắt

                let subtotal = 0;
                cart.forEach(item => {
                    const itemQuantity = item.quantity || 0;
                    const itemPrice = item.price || 0;
                    const itemTotal = itemPrice * itemQuantity;
                    subtotal += itemTotal;

                    const row = document.createElement('tr');
                    row.classList.add('cart-item');
                    row.dataset.id = item.id;
                    // Thêm data-label cho từng td để dùng trong CSS responsive
                    row.innerHTML = `
                        <td class="product-thumbnail" data-label="Ảnh"><img src="${item.img || 'placeholder.jpg'}" alt="${item.name || ''}"></td>
                        <td class="product-name" data-label="Sản phẩm"><a href="product_detail.html?id=${item.id}">${item.name || 'N/A'}</a></td>
                        <td class="product-price text-end" data-label="Giá">${formatCurrency(itemPrice)}</td>
                        <td class="product-quantity text-center" data-label="Số lượng">
                            <div class="quantity-controls input-group input-group-sm justify-content-center">
                                <button class="btn btn-outline-secondary quantity-button decrease-qty" type="button" data-id="${item.id}" aria-label="Giảm số lượng">-</button>
                                <input type="number" class="quantity-input form-control text-center px-1" value="${itemQuantity}" min="1" data-id="${item.id}" readonly style="max-width: 55px; flex: 0 0 auto;">
                                <button class="btn btn-outline-secondary quantity-button increase-qty" type="button" data-id="${item.id}" aria-label="Tăng số lượng">+</button>
                            </div>
                        </td>
                        <td class="product-subtotal text-end" data-label="Tạm tính">${formatCurrency(itemTotal)}</td>
                        <td class="product-remove text-center" data-label="Xóa">
                            <button class="remove-item-button btn btn-sm btn-outline-danger" data-id="${item.id}" aria-label="Xóa sản phẩm ${item.name || ''}"><i class="fas fa-trash-alt"></i></button>
                        </td>`;
                    cartItemsBody.appendChild(row);
                });

                if (cartSubtotalAmountEl) {
                    cartSubtotalAmountEl.textContent = formatCurrency(subtotal);
                }
            }
            updateCartCount(); // Cập nhật lại icon giỏ hàng (từ shared.js)
        }

        cartItemsBody.addEventListener('click', function (event) {
            const target = event.target;
            const actionElement = target.closest('[data-id]'); // Tìm nút có data-id
            if (!actionElement) return;

            const productId = actionElement.dataset.id;
            let cart = getCart();
            const itemIndex = cart.findIndex(item => item.id === productId);

            if (itemIndex === -1) {
                console.warn(`Cart Page: Sản phẩm với ID ${productId} không tìm thấy trong giỏ.`);
                return;
            }

            let cartChanged = false;
            const currentItem = cart[itemIndex];

            if (actionElement.classList.contains('increase-qty')) {
                currentItem.quantity++;
                cartChanged = true;
            } else if (actionElement.classList.contains('decrease-qty')) {
                if (currentItem.quantity > 1) {
                    currentItem.quantity--;
                    cartChanged = true;
                } else { // Số lượng là 1, giảm nữa là xóa
                    if (confirm(`Bạn có chắc muốn xóa "${currentItem.name}" khỏi giỏ hàng?`)) {
                        cart.splice(itemIndex, 1);
                        cartChanged = true;
                    }
                }
            } else if (actionElement.classList.contains('remove-item-button')) {
                if (confirm(`Bạn có chắc muốn xóa "${currentItem.name}" khỏi giỏ hàng?`)) {
                    cart.splice(itemIndex, 1);
                    cartChanged = true;
                }
            }

            if (cartChanged) {
                saveCart(cart);
                renderCartPage(); // Vẽ lại toàn bộ bảng và tổng tiền
            }
        });

        renderCartPage(); // Gọi lần đầu để hiển thị giỏ hàng
    } else {
        console.warn("Cart Page: Container cho các mục giỏ hàng (#cart-items-body) không tìm thấy.");
    }
    console.log("Cart Page Script: Khởi tạo hoàn tất.");
});