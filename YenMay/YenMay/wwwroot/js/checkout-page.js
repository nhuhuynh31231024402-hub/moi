// js/checkout-page.js
document.addEventListener('sharedScriptsReady', function () {
    console.log("Checkout Page Script: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic cho trang thanh toán...");
    // Các hàm getCart, saveCart, formatCurrency, updateCartCount, SHIPPING_FEE, LOCAL_STORAGE_CURRENT_USER_KEY, LOCAL_STORAGE_USERS_KEY đã có từ shared.js

    const checkoutFormElement = document.getElementById('checkout-form');
    if (checkoutFormElement) {
        // DOM Elements cho trang Checkout
        const checkoutSubtotalAmountEl = document.getElementById('checkout-subtotal-amount');
        const checkoutShippingFeeEl = document.getElementById('checkout-shipping-fee');
        const checkoutGrandTotalEl = document.getElementById('checkout-grand-total');
        const checkoutFormArea = document.getElementById('checkout-form-area'); // Div chứa form và summary
        const orderInvoiceSection = document.getElementById('order-invoice-section'); // Div chứa hóa đơn/thông báo

        const checkoutDiscountRow = document.getElementById('checkout-discount-row');
        const checkoutDiscountAmountEl = document.getElementById('checkout-discount-amount');
        const invoiceDiscountRow = document.getElementById('invoice-discount-row'); // Cần trong HTML hóa đơn
        const invoiceDiscountAmountEl = document.getElementById('invoice-discount-amount'); // Cần trong HTML hóa đơn

        const paymentMethodRadios = document.querySelectorAll('input[name="payment_method"]');
        const bankTransferInfo = document.getElementById('bank-transfer-info');
        const ewalletInfo = document.getElementById('ewallet-info');
        const orderIdPlaceholder = document.getElementById('checkout-order-id-placeholder');

        const nameInput = document.getElementById('billing_name');
        const phoneInput = document.getElementById('billing_phone');
        const addressInput = document.getElementById('billing_address');
        const emailInput = document.getElementById('billing_email'); // Optional, nhưng nếu nhập thì validate
        const orderNotesInput = document.getElementById('order_notes');
        const paymentErrorFeedback = document.getElementById('payment-error-feedback'); // Thêm div này vào HTML nếu chưa có

        // DOM Elements cho Hóa đơn
        const invoiceOrderIdEl = document.getElementById('invoice-order-id');
        const invoiceOrderDateEl = document.getElementById('invoice-order-date');
        const invoiceCustomerNameEl = document.getElementById('invoice-customer-name');
        const invoiceCustomerPhoneEl = document.getElementById('invoice-customer-phone');
        const invoiceCustomerEmailEl = document.getElementById('invoice-customer-email');
        const invoiceCustomerAddressEl = document.getElementById('invoice-customer-address');
        const invoiceOrderNotesEl = document.getElementById('invoice-order-notes');
        const invoiceItemsBody = document.getElementById('invoice-items-body');
        const invoiceSubtotalEl = document.getElementById('invoice-subtotal');
        const invoiceShippingFeeEl = document.getElementById('invoice-shipping-fee');
        const invoiceGrandTotalValueEl = document.getElementById('invoice-grand-total-value');
        const invoicePaymentMethodEl = document.getElementById('invoice-payment-method');
        const printInvoiceButton = document.querySelector('.btn-print-invoice');

        function updateCheckoutSummary() {
            const cart = getCart();
            let subtotal = 0;
            if (cart && cart.length > 0) {
                subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
            }

            const discountThreshold = 5000000; // Ví dụ: 5 triệu
            const discountRate = 0.10; // 10%
            let discountAmount = 0;
            if (subtotal >= discountThreshold) {
                discountAmount = subtotal * discountRate;
            }

            if (checkoutDiscountRow && checkoutDiscountAmountEl) {
                if (discountAmount > 0) {
                    checkoutDiscountAmountEl.textContent = `- ${formatCurrency(discountAmount)}`;
                    checkoutDiscountRow.style.display = 'flex'; // Hoặc block tùy theo CSS
                } else {
                    checkoutDiscountRow.style.display = 'none';
                }
            }

            const grandTotal = subtotal - discountAmount + SHIPPING_FEE;

            if (checkoutSubtotalAmountEl) checkoutSubtotalAmountEl.textContent = formatCurrency(subtotal);
            if (checkoutShippingFeeEl) checkoutShippingFeeEl.textContent = formatCurrency(SHIPPING_FEE);
            if (checkoutGrandTotalEl) checkoutGrandTotalEl.textContent = formatCurrency(grandTotal);
        }

        function displayOrderInvoice(details) {
            if (!orderInvoiceSection) { console.error("Checkout Page: #order-invoice-section không tìm thấy."); return; }

            const displayOrderId = details.orderId || `YMY${Date.now().toString().slice(-7)}`;
            const displayOrderDate = details.orderDate ? new Date(details.orderDate).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');

            if (invoiceOrderIdEl) invoiceOrderIdEl.textContent = displayOrderId;
            if (invoiceOrderDateEl) invoiceOrderDateEl.textContent = displayOrderDate;
            if (invoiceCustomerNameEl) invoiceCustomerNameEl.textContent = details.customer?.name || 'N/A';
            if (invoiceCustomerPhoneEl) invoiceCustomerPhoneEl.textContent = details.customer?.phone || 'N/A';
            if (invoiceCustomerEmailEl) invoiceCustomerEmailEl.textContent = details.customer?.email || 'Không có';
            if (invoiceCustomerAddressEl) invoiceCustomerAddressEl.textContent = details.customer?.address || 'N/A';
            if (invoiceOrderNotesEl) invoiceOrderNotesEl.textContent = details.notes || 'Không có';

            if (invoiceItemsBody) {
                invoiceItemsBody.innerHTML = '';
                if (details.items && Array.isArray(details.items) && details.items.length > 0) {
                    details.items.forEach((item, index) => {
                        const row = invoiceItemsBody.insertRow();
                        row.insertCell().textContent = index + 1;
                        row.insertCell().textContent = item.name || 'N/A';
                        row.cells[1].style.textAlign = 'left';
                        row.insertCell().textContent = item.quantity || 0;
                        row.cells[2].classList.add('text-center');
                        row.insertCell().textContent = formatCurrency(item.price || 0);
                        row.cells[3].classList.add('text-end');
                        row.insertCell().textContent = formatCurrency((item.price || 0) * (item.quantity || 0));
                        row.cells[4].classList.add('text-end');
                    });
                } else {
                    invoiceItemsBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted fst-italic">Không có thông tin sản phẩm.</td></tr>';
                }
            }

            if (invoiceDiscountRow && invoiceDiscountAmountEl) {
                if (details.discountAmount && details.discountAmount > 0) {
                    invoiceDiscountAmountEl.textContent = `- ${formatCurrency(details.discountAmount)}`;
                    invoiceDiscountRow.style.display = 'flex'; // Hoặc 'table-row' nếu nó là <tr>
                } else {
                    invoiceDiscountRow.style.display = 'none';
                }
            }

            if (invoiceSubtotalEl) invoiceSubtotalEl.textContent = formatCurrency(details.subtotal || 0);
            if (invoiceShippingFeeEl) invoiceShippingFeeEl.textContent = formatCurrency(details.shippingFee || 0);
            if (invoiceGrandTotalValueEl) invoiceGrandTotalValueEl.textContent = formatCurrency(details.grandTotal || 0);

            let paymentMethodText = "Chưa xác định";
            if (details.paymentMethod === 'cod') paymentMethodText = "Thanh toán khi nhận hàng (COD)";
            else if (details.paymentMethod === 'bank_transfer') paymentMethodText = "Chuyển khoản ngân hàng";
            else if (details.paymentMethod === 'e_wallet') paymentMethodText = "Ví điện tử (MoMo/ZaloPay)";
            if (invoicePaymentMethodEl) invoicePaymentMethodEl.textContent = paymentMethodText;

            if (checkoutFormArea) checkoutFormArea.style.display = 'none';
            orderInvoiceSection.style.display = 'block';
            window.scrollTo(0, 0); // Cuộn lên đầu trang
        }

        function autoFillUserInfo() {
            const currentUserEmail = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
            if (currentUserEmail) {
                const allUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
                const currentUserData = allUsers.find(user => user.email === currentUserEmail);
                if (currentUserData) {
                    console.log("Checkout Page: Người dùng đã đăng nhập, tự động điền form:", currentUserData);
                    if (nameInput && currentUserData.name) nameInput.value = currentUserData.name;
                    if (phoneInput && currentUserData.phone) phoneInput.value = currentUserData.phone;
                    if (addressInput && currentUserData.address) addressInput.value = currentUserData.address;
                    if (emailInput && currentUserData.email) emailInput.value = currentUserData.email;
                }
            }
        }

        function renderCheckoutPage() {
            if (!checkoutFormElement || !checkoutFormArea || !orderInvoiceSection) {
                console.error("Checkout Page: Thiếu các phần tử HTML quan trọng.");
                return false; // Không thể render
            }
            const cart = getCart();
            const isInvoiceVisible = orderInvoiceSection.style.display !== 'none';

            if (cart.length === 0 && !isInvoiceVisible) { // Giỏ hàng trống và chưa ở màn hình thành công
                alert("Giỏ hàng của bạn hiện đang trống. Vui lòng thêm sản phẩm trước khi tiến hành thanh toán.");
                try { setTimeout(() => { window.location.href = 'cart.html'; }, 50); } catch (e) { console.error("Lỗi chuyển hướng:", e); }
                return false; // Báo hiệu không thể tiếp tục render form
            } else if (cart.length === 0 && isInvoiceVisible) { // Giỏ hàng trống nhưng đang ở màn hình thành công (ví dụ load lại trang)
                if (checkoutFormArea) checkoutFormArea.style.display = 'none';
                return true; // Vẫn hiển thị hóa đơn
            }

            // Nếu có hàng hoặc đang ở màn hình hóa đơn (nhưng form sẽ bị ẩn nếu hóa đơn hiện)
            updateCheckoutSummary();
            updateCartCount();

            if (!isInvoiceVisible) { // Chỉ hiển thị form và tự điền nếu hóa đơn đang ẩn
                if (checkoutFormArea) {
                    checkoutFormArea.style.display = 'block'; // Hoặc 'flex', 'grid' tùy theo layout của bạn
                    autoFillUserInfo(); // Tự động điền thông tin
                }
            } else {
                if (checkoutFormArea) checkoutFormArea.style.display = 'none'; // Đảm bảo form ẩn nếu hóa đơn hiển thị
            }
            return true; // Báo hiệu render thành công (hoặc đang ở màn hình hóa đơn)
        }


        if (paymentMethodRadios && paymentMethodRadios.length > 0) {
            paymentMethodRadios.forEach(radio => {
                radio.addEventListener('change', function () {
                    if (bankTransferInfo) bankTransferInfo.style.display = (this.id === 'bank_transfer' && this.checked) ? 'block' : 'none';
                    if (ewalletInfo) ewalletInfo.style.display = (this.id === 'e_wallet' && this.checked) ? 'block' : 'none';
                    if (orderIdPlaceholder && this.id === 'bank_transfer' && this.checked) {
                        orderIdPlaceholder.textContent = `YMY${Date.now().toString().slice(-7)}`; // Cập nhật mã đơn hàng cho nội dung chuyển khoản
                    }
                });
            });
        }

        checkoutFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log("Checkout Page: Form thanh toán đã submit. Bắt đầu kiểm tra...");

            const billingName = nameInput?.value.trim() ?? '';
            const billingPhone = phoneInput?.value.trim() ?? '';
            const billingAddress = addressInput?.value.trim() ?? '';
            const billingEmail = emailInput?.value.trim() ?? '';
            const orderNotesText = orderNotesInput?.value.trim() ?? ''; // Đổi tên biến để tránh trùng với orderNotes là đối tượng
            const selectedPaymentMethodInput = document.querySelector('input[name="payment_method"]:checked');
            const paymentMethodValue = selectedPaymentMethodInput ? selectedPaymentMethodInput.value : null;

            let isValid = true;
            const fieldsToValidate = [nameInput, phoneInput, addressInput, emailInput];
            fieldsToValidate.forEach(input => {
                if (input) input.classList.remove('is-invalid');
            });
            if (paymentErrorFeedback) paymentErrorFeedback.style.display = 'none';
            const paymentContainer = document.getElementById('payment-methods-container');
            if (paymentContainer) paymentContainer.classList.remove('is-invalid');


            if (!billingName) { isValid = false; if (nameInput) { nameInput.classList.add('is-invalid'); const f = nameInput.nextElementSibling; if (f) f.textContent = "Vui lòng nhập họ tên."; } }
            const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])(\d{7})$/;
            if (!billingPhone) { isValid = false; if (phoneInput) { phoneInput.classList.add('is-invalid'); const f = phoneInput.nextElementSibling; if (f) f.textContent = "Vui lòng nhập SĐT."; } }
            else if (!phoneRegex.test(billingPhone)) { isValid = false; if (phoneInput) { phoneInput.classList.add('is-invalid'); const f = phoneInput.nextElementSibling; if (f) f.textContent = "SĐT không hợp lệ."; } }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (billingEmail && !emailRegex.test(billingEmail)) { isValid = false; if (emailInput) { emailInput.classList.add('is-invalid'); const f = emailInput.nextElementSibling; if (f) f.textContent = "Email không hợp lệ."; } }
            if (!billingAddress) { isValid = false; if (addressInput) { addressInput.classList.add('is-invalid'); const f = addressInput.nextElementSibling; if (f) f.textContent = "Vui lòng nhập địa chỉ."; } }
            if (!paymentMethodValue) {
                isValid = false;
                if (paymentErrorFeedback) { paymentErrorFeedback.style.display = 'block'; paymentErrorFeedback.textContent = 'Vui lòng chọn phương thức thanh toán.'; }
                if (paymentContainer) paymentContainer.classList.add('is-invalid');
            }

            if (!isValid) {
                alert('Vui lòng kiểm tra lại thông tin còn thiếu hoặc chưa chính xác.');
                const firstInvalidField = checkoutFormElement.querySelector('.is-invalid, #payment-methods-container.is-invalid');
                if (firstInvalidField) {
                    const inputEl = firstInvalidField.querySelector('input, textarea');
                    if (inputEl) inputEl.focus(); else firstInvalidField.focus();
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            const currentCart = getCart();
            if (!currentCart || currentCart.length === 0) {
                alert("Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm.");
                window.location.href = 'cart.html';
                return;
            }

            const subtotal = currentCart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
            const discountThreshold = 5000000;
            const discountRate = 0.10;
            let discountAmount = 0;
            if (subtotal >= discountThreshold) { discountAmount = subtotal * discountRate; }
            const grandTotal = subtotal - discountAmount + SHIPPING_FEE;
            const orderId = `YMY${Date.now().toString().slice(-7)}`;
            const orderDate = new Date().toISOString();
            const loggedInUserEmail = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
            const orderUserEmail = loggedInUserEmail || billingEmail || 'guest_checkout';

            const orderDetails = {
                orderId: orderId, orderDate: orderDate, userEmail: orderUserEmail, items: currentCart,
                customer: { name: billingName, phone: billingPhone, email: billingEmail, address: billingAddress },
                notes: orderNotesText, paymentMethod: paymentMethodValue, subtotal: subtotal,
                discountAmount: discountAmount, shippingFee: SHIPPING_FEE, grandTotal: grandTotal
            };

            try {
                const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
                allOrders.push(orderDetails);
                localStorage.setItem('orders', JSON.stringify(allOrders));
                console.log("Checkout Page: Đơn hàng đã được lưu vào localStorage.");
                saveCart([]); // Xóa giỏ hàng sau khi đặt thành công
                updateCartCount();
                displayOrderInvoice(orderDetails);
            } catch (e) {
                console.error("Checkout Page: Lỗi khi lưu đơn hàng:", e);
                alert('Đã có lỗi xảy ra khi lưu đơn hàng. Vui lòng thử lại.');
            }
        });

        if (printInvoiceButton) {
            printInvoiceButton.addEventListener('click', function () { window.print(); });
        }

        // Render trang thanh toán lần đầu
        const canProceed = renderCheckoutPage();
        if (!canProceed) {
            console.log("Checkout Page: Không thể render trang thanh toán (có thể do giỏ hàng trống và đã chuyển hướng).");
            // Không thực thi thêm logic nếu không thể render
        }
    } else {
        console.warn("Checkout Page: Form thanh toán (#checkout-form) không tìm thấy.");
    }
    console.log("Checkout Page Script: Khởi tạo hoàn tất.");
});