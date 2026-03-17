// js/order-history-page.js
document.addEventListener('sharedScriptsReady', function () {
    console.log("Order History Page Script: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");
    // Các hàm formatCurrency, LOCAL_STORAGE_CURRENT_USER_KEY đã có từ shared.js

    const currentUserEmail = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    const orderHistoryBody = document.getElementById('order-history-body');
    const noOrdersMessage = document.getElementById('no-orders-message');

    if (!currentUserEmail) {
        alert("Vui lòng đăng nhập để xem lịch sử đơn hàng.");
        window.location.href = 'login.html';
        return;
    }

    if (!orderHistoryBody || !noOrdersMessage) {
        console.error("Order History Page: Thiếu các phần tử HTML cần thiết (#order-history-body hoặc #no-orders-message).");
        return;
    }

    // Hàm này cần được định nghĩa ở đây hoặc trong shared.js nếu muốn dùng chung cho các modal khác
    function populateOrderDetailModal(order) {
        console.log("Order History Page: Đang hiển thị chi tiết cho đơn hàng:", order.orderId);
        const modalTitle = document.getElementById('orderDetailModalLabel');
        const modalOrderId = document.getElementById('modal-order-id');
        const modalOrderDate = document.getElementById('modal-order-date');
        const modalCustomerName = document.getElementById('modal-customer-name');
        const modalCustomerPhone = document.getElementById('modal-customer-phone');
        const modalCustomerAddress = document.getElementById('modal-customer-address');
        const modalItemsBody = document.getElementById('modal-items-body');
        const modalSubtotal = document.getElementById('modal-subtotal');
        const modalShipping = document.getElementById('modal-shipping');
        const modalDiscount = document.getElementById('modal-discount');
        const modalDiscountRow = document.getElementById('modal-discount-row'); // Row chứa dòng giảm giá
        const modalGrandTotal = document.getElementById('modal-grand-total');
        const modalPaymentMethod = document.getElementById('modal-payment-method');
        const modalNotes = document.getElementById('modal-notes');

        if (!modalTitle || !modalItemsBody /* Thêm các kiểm tra khác nếu cần */) {
            console.error("Order History Page: Một hoặc nhiều phần tử của modal không tìm thấy.");
            return;
        }

        modalTitle.textContent = `Chi tiết đơn hàng #${order.orderId || 'N/A'}`;
        if (modalOrderId) modalOrderId.textContent = order.orderId || 'N/A';
        if (modalOrderDate) modalOrderDate.textContent = order.orderDate ? new Date(order.orderDate).toLocaleString('vi-VN') : 'N/A';
        if (modalCustomerName) modalCustomerName.textContent = order.customer?.name || 'N/A';
        if (modalCustomerPhone) modalCustomerPhone.textContent = order.customer?.phone || 'N/A';
        if (modalCustomerAddress) modalCustomerAddress.textContent = order.customer?.address || 'N/A';
        if (modalNotes) modalNotes.textContent = order.notes || 'Không có';

        modalItemsBody.innerHTML = ''; // Xóa cũ
        if (order.items && Array.isArray(order.items) && order.items.length > 0) {
            order.items.forEach(item => {
                const row = modalItemsBody.insertRow();
                row.insertCell().textContent = item.name || 'N/A';
                row.insertCell().textContent = item.quantity || 0;
                row.cells[1].classList.add('text-center');
                row.insertCell().textContent = formatCurrency(item.price || 0); // formatCurrency từ shared.js
                row.cells[2].classList.add('text-end');
                row.insertCell().textContent = formatCurrency((item.price || 0) * (item.quantity || 0));
                row.cells[3].classList.add('text-end');
            });
        } else {
            modalItemsBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted fst-italic">Không có sản phẩm.</td></tr>';
        }

        if (modalSubtotal) modalSubtotal.textContent = formatCurrency(order.subtotal || 0);
        if (modalShipping) modalShipping.textContent = formatCurrency(order.shippingFee || 0); // SHIPPING_FEE từ shared.js
        if (modalDiscountRow && modalDiscount) {
            if (order.discountAmount && order.discountAmount > 0) {
                modalDiscount.textContent = `- ${formatCurrency(order.discountAmount)}`;
                modalDiscountRow.style.display = ''; // Hiển thị dòng giảm giá (mặc định của tr là table-row)
            } else {
                modalDiscountRow.style.display = 'none'; // Ẩn nếu không có giảm giá
            }
        }
        if (modalGrandTotal) modalGrandTotal.textContent = formatCurrency(order.grandTotal || 0);

        let paymentText = 'N/A';
        if (order.paymentMethod === 'cod') paymentText = "Thanh toán khi nhận hàng (COD)";
        else if (order.paymentMethod === 'bank_transfer') paymentText = "Chuyển khoản ngân hàng";
        else if (order.paymentMethod === 'e_wallet') paymentText = "Ví điện tử (MoMo/ZaloPay)";
        if (modalPaymentMethod) modalPaymentMethod.textContent = paymentText;
    }

    try {
        const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const userOrders = allOrders
            .filter(order => order.userEmail === currentUserEmail)
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Sắp xếp đơn mới nhất lên đầu

        orderHistoryBody.innerHTML = ''; // Xóa nội dung cũ
        if (userOrders.length > 0) {
            noOrdersMessage.style.display = 'none'; // Ẩn thông báo
            userOrders.forEach(order => {
                const row = orderHistoryBody.insertRow();
                row.insertCell().textContent = order.orderId || 'N/A';
                row.cells[0].setAttribute('data-label', "Mã Đơn Hàng");
                row.insertCell().textContent = order.orderDate ? new Date(order.orderDate).toLocaleDateString('vi-VN') : 'N/A';
                row.cells[1].setAttribute('data-label', "Ngày Đặt");
                const totalQuantity = order.items?.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 0), 0) ?? 0;
                row.insertCell().textContent = totalQuantity;
                row.cells[2].setAttribute('data-label', "Số Lượng SP");
                const totalCell = row.insertCell();
                totalCell.textContent = formatCurrency(order.grandTotal || 0); // formatCurrency từ shared.js
                totalCell.style.textAlign = 'right';
                totalCell.setAttribute('data-label', "Tổng Tiền");
                row.insertCell().textContent = order.status || 'Đã hoàn thành'; // Có thể thêm logic trạng thái sau
                row.cells[4].setAttribute('data-label', "Trạng Thái");
                const actionCell = row.insertCell();
                actionCell.style.textAlign = 'center';
                actionCell.setAttribute('data-label', "Thao Tác");
                const viewButton = document.createElement('button');
                viewButton.innerHTML = '<i class="fas fa-eye"></i>';
                viewButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'btn-view-detail');
                viewButton.title = 'Xem chi tiết đơn hàng';
                viewButton.setAttribute('data-bs-toggle', 'modal');
                viewButton.setAttribute('data-bs-target', '#orderDetailModal');
                viewButton.onclick = () => {
                    populateOrderDetailModal(order);
                };
                actionCell.appendChild(viewButton);
            });
        } else {
            noOrdersMessage.style.display = 'block'; // Hiện thông báo
        }
    } catch (e) {
        console.error("Order History Page: Lỗi xử lý lịch sử đơn hàng:", e);
        if (noOrdersMessage) {
            noOrdersMessage.textContent = "Lỗi tải lịch sử đơn hàng.";
            noOrdersMessage.style.display = 'block';
        }
    }
    console.log("Order History Page Script: Khởi tạo hoàn tất.");
});