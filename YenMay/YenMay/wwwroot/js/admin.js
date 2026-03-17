document.addEventListener('sharedScriptsReady', () => {
    console.log("admin.js: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic admin...");

    const loginScreen = document.getElementById('login-screen');
    const adminDashboard = document.getElementById('admin-dashboard');
    const loginBtn = document.getElementById('login-btn');
    const adminUserInput = document.getElementById('admin-user');
    const adminPassInput = document.getElementById('admin-pass');
    const logoutBtn = document.getElementById('logout-btn');

    const LOCAL_STORAGE_PRODUCTS_KEY = 'adminProducts_yenmay'; // Key để lưu sản phẩm
    let revenueChart = null;

    // Lấy sản phẩm từ localStorage hoặc allProductsData
    function getProductsAdmin() {
        const storedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
        if (storedProducts) {
            try {
                return JSON.parse(storedProducts);
            } catch (e) {
                console.error("Lỗi phân tích sản phẩm từ localStorage:", e);
            }
        }
        return allProductsData; // Mặc định dùng allProductsData từ shared.js
    }

    // Lưu sản phẩm vào localStorage
    function saveProductsAdmin(products) {
        try {
            localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
        } catch (e) {
            console.error("Lỗi lưu sản phẩm vào localStorage:", e);
        }
    }

    let productsAdmin = getProductsAdmin();
    let accountsAdmin = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');

    if (loginBtn && adminUserInput && adminPassInput && loginScreen && adminDashboard) {
        loginBtn.onclick = () => {
            const user = adminUserInput.value;
            const pass = adminPassInput.value;
            if (user === 'admin@gmail.com' && pass === '1') {
                loginScreen.style.display = 'none';
                adminDashboard.style.display = 'flex';
                loadAllAdminData();
            } else {
                alert('Tài khoản hoặc mật khẩu admin không đúng!');
            }
        };
    }

    if (logoutBtn && loginScreen && adminDashboard) {
        logoutBtn.onclick = () => {
            if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?")) {
                adminDashboard.style.display = 'none';
                loginScreen.style.display = 'block';
                if (adminUserInput) adminUserInput.value = '';
                if (adminPassInput) adminPassInput.value = '';
            }
        };
    }

    // Sửa logic click sidebar để chỉ hiển thị một section
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.onclick = e => {
            e.preventDefault();
            // Xóa class active khỏi tất cả section và link
            document.querySelectorAll('.sidebar nav a').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('#admin-dashboard .section').forEach(s => s.classList.remove('active'));
            // Thêm class active cho section và link được chọn
            const sectionId = link.dataset.section;
            const sectionElement = document.getElementById(sectionId);
            if (sectionElement) {
                sectionElement.classList.add('active');
                link.classList.add('active');
            }
            // Render nội dung tương ứng
            if (sectionId === 'dashboard') renderDashboard();
            if (sectionId === 'sales') renderSalesAdmin();
            if (sectionId === 'products') renderProductsAdmin();
            if (sectionId === 'accounts') renderAccountsAdmin();
        };
    });

    // Thêm sự kiện khôi phục danh sách sản phẩm
    document.getElementById('restore-products')?.addEventListener('click', () => {
        if (confirm('Xác nhận khôi phục danh sách sản phẩm từ file gốc? Dữ liệu hiện tại trong admin sẽ bị xóa.')) {
            localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_KEY);
            productsAdmin = allProductsData;
            renderProductsAdmin();
            alert('Đã khôi phục danh sách sản phẩm từ file gốc.');
        }
    });

    function loadAllAdminData() {
        // Chỉ hiển thị Dashboard mặc định
        document.querySelectorAll('#admin-dashboard .section').forEach(s => s.classList.remove('active'));
        document.querySelector('#dashboard').classList.add('active');
        document.querySelector('.sidebar nav a[data-section="dashboard"]').classList.add('active');
        renderDashboard();
        renderProductsAdmin();
        renderAccountsAdmin();
    }

    // Dashboard Handlers
    function renderDashboard() {
        const totalOrdersEl = document.getElementById('total-orders');
        const totalRevenueEl = document.getElementById('total-revenue');
        const totalCustomersEl = document.getElementById('total-customers');
        const allOrders = getAllOrders();
        const allUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');

        const totalOrders = allOrders.length;
        const totalRevenue = allOrders.reduce((sum, order) => sum + (order.grandTotal || 0), 0);
        const totalCustomers = allUsers.length;

        if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
        if (totalRevenueEl) totalRevenueEl.textContent = formatCurrency(totalRevenue);
        if (totalCustomersEl) totalCustomersEl.textContent = totalCustomers;

        const revenueData = {};
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toLocaleDateString('vi-VN');
            revenueData[dateStr] = 0;
        }

        allOrders.forEach(order => {
            if (order.orderDate) {
                const orderDate = new Date(order.orderDate).toLocaleDateString('vi-VN');
                if (revenueData.hasOwnProperty(orderDate)) {
                    revenueData[orderDate] += order.grandTotal || 0;
                }
            }
        });

        const labels = Object.keys(revenueData);
        const data = Object.values(revenueData);

        const ctx = document.getElementById('revenue-chart')?.getContext('2d');
        if (ctx) {
            if (revenueChart) revenueChart.destroy();
            revenueChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Doanh thu (₫)',
                        data: data,
                        backgroundColor: '#8F582A',
                        borderColor: '#613613',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => formatCurrency(value)
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    // Products Handlers
    const saveProdBtn = document.getElementById('save-prod');
    const prodNameInput = document.getElementById('prod-name');
    const prodDescInput = document.getElementById('prod-desc');
    const prodPriceInput = document.getElementById('prod-price');
    const prodImgFileInput = document.getElementById('prod-img-file');
    const productListAdminContainer = document.getElementById('product-list');

    if (saveProdBtn && prodNameInput && prodDescInput && prodPriceInput && prodImgFileInput) {
        saveProdBtn.onclick = () => {
            const name = prodNameInput.value.trim();
            const desc = prodDescInput.value.trim();
            const price = parseFloat(prodPriceInput.value);
            const file = prodImgFileInput.files[0];

            if (!name || !desc || isNaN(price) || price < 0) {
                alert('Vui lòng điền đầy đủ và hợp lệ tên, mô tả, và giá sản phẩm!');
                return;
            }
            if (file && !file.type.startsWith('image/')) {
                alert('Vui lòng chọn file ảnh hợp lệ.');
                return;
            }

            const processProductSave = (imgDataUrl = null) => {
                const existingProductIndex = productsAdmin.findIndex(p => p.id === (window.editingProductId || p.name === name));
                let newProductData = {
                    id: existingProductIndex >= 0 ? productsAdmin[existingProductIndex].id : `prod_${Date.now()}`,
                    name: name,
                    desc: desc,
                    price: price,
                    images: imgDataUrl ? [imgDataUrl] : (existingProductIndex >= 0 ? productsAdmin[existingProductIndex].images || [] : []),
                    sold: existingProductIndex >= 0 ? productsAdmin[existingProductIndex].sold || 0 : 0
                };

                if (existingProductIndex >= 0) {
                    productsAdmin[existingProductIndex] = newProductData;
                    alert(`Đã cập nhật sản phẩm: ${name}`);
                } else {
                    productsAdmin.push(newProductData);
                    alert(`Đã thêm sản phẩm mới: ${name}`);
                }
                delete window.editingProductId; // Xóa ID tạm thời sau khi lưu
                saveProductsAdmin(productsAdmin);
                renderProductsAdmin();
                clearProductAdminForm();
                showProductInfoAdmin(name);
            };

            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    processProductSave(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                processProductSave(null);
            }
        };
    }

    function clearProductAdminForm() {
        if (prodNameInput) prodNameInput.value = '';
        if (prodDescInput) prodDescInput.value = '';
        if (prodPriceInput) prodPriceInput.value = '';
        if (prodImgFileInput) prodImgFileInput.value = '';
        const prodInfoDiv = document.getElementById('prod-info');
        if (prodInfoDiv) prodInfoDiv.style.display = 'none';
        delete window.editingProductId; // Xóa ID tạm thời
    }

    function renderProductsAdmin() {
        if (!productListAdminContainer) return;
        productListAdminContainer.innerHTML = `
        <table class="table table-bordered table-striped">
          <thead class="table-light">
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="product-table-body"></tbody>
        </table>
      `;
        const tbody = productListAdminContainer.querySelector('#product-table-body');
        productsAdmin.forEach((p, index) => {
            const row = tbody.insertRow();
            const imgCell = row.insertCell();
            const imgSrc = p.images && p.images.length > 0 ? p.images[0] : (p.img || null);
            imgCell.innerHTML = imgSrc
                ? `<img src="${imgSrc}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover;">`
                : '<span class="text-muted">Không có ảnh</span>';
            row.insertCell().textContent = p.name;
            row.insertCell().textContent = formatCurrency(p.price);
            const actionCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-sm btn-outline-secondary me-2';
            editButton.innerHTML = '<i class="fas fa-edit"></i> Sửa';
            editButton.addEventListener('click', () => showProductInfoAdmin(p.name, true, p.id));
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-sm btn-danger';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Xóa';
            deleteButton.addEventListener('click', () => deleteProductAdmin(index));
            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);
        });
    }

    // Hàm xóa sản phẩm
    function deleteProductAdmin(index) {
        if (index < 0 || index >= productsAdmin.length) {
            console.error("Index sản phẩm không hợp lệ:", index);
            return;
        }
        const productName = productsAdmin[index].name;
        if (confirm(`Xác nhận xóa sản phẩm "${productName}"? Lưu ý: Hành động này sẽ ảnh hưởng đến tất cả các trang, nhưng không thay đổi file dữ liệu gốc.`)) {
            productsAdmin.splice(index, 1);
            saveProductsAdmin(productsAdmin);
            renderProductsAdmin();
            alert(`Đã xóa sản phẩm: ${productName}. Để khôi phục, sử dụng nút "Khôi phục danh sách gốc".`);
        }
    }

    // Gắn hàm deleteProductAdmin vào global scope để sử dụng trong HTML (nếu cần)
    window.deleteProductAdmin = deleteProductAdmin;

    function showProductInfoAdmin(name, isEditing = false, productId = null) {
        const p = productsAdmin.find(x => x.name === name);
        if (!p) {
            alert('Không tìm thấy sản phẩm!');
            return;
        }

        const infoImgEl = document.getElementById('info-img');
        const infoNameEl = document.getElementById('info-name');
        const infoDescEl = document.getElementById('info-desc');
        const infoPriceEl = document.getElementById('info-price');
        const prodInfoDiv = document.getElementById('prod-info');

        const imgSrc = p.images && p.images.length > 0 ? p.images[0] : (p.img || 'https://placehold.co/150x150/eee/ccc?text=No+Image');
        if (infoImgEl) infoImgEl.src = imgSrc;
        if (infoNameEl) infoNameEl.textContent = p.name;
        if (infoDescEl) infoDescEl.textContent = p.desc;
        if (infoPriceEl) infoPriceEl.textContent = formatCurrency(p.price);

        if (prodInfoDiv) prodInfoDiv.style.display = 'block';

        if (isEditing) {
            if (prodNameInput) prodNameInput.value = p.name;
            if (prodDescInput) prodDescInput.value = p.desc;
            if (prodPriceInput) prodPriceInput.value = p.price;
            if (prodImgFileInput) prodImgFileInput.value = '';
            window.editingProductId = productId; // Lưu ID sản phẩm đang chỉnh sửa
            prodNameInput.focus();
        }
    }

    // Sales Handlers
    function renderSalesAdmin() {
        const orderListContainer = document.getElementById('order-list');
        if (!orderListContainer) return;

        const allOrders = getAllOrders();
        orderListContainer.innerHTML = '';
        orderListContainer.classList.add('table-responsive');

        if (allOrders.length === 0) {
            orderListContainer.innerHTML = '<p class="text-muted">Không có đơn hàng nào.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'table table-bordered table-striped order-history-table';
        table.innerHTML = `
        <thead class="table-light">
          <tr>
            <th>Mã Đơn Hàng</th>
            <th>Ngày Đặt</th>
            <th>Khách Hàng</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="order-table-body"></tbody>
      `;

        const tbody = table.querySelector('#order-table-body');
        allOrders.forEach(order => {
            const row = tbody.insertRow();
            row.insertCell().textContent = order.orderId || 'N/A';
            row.insertCell().textContent = order.orderDate ? new Date(order.orderDate).toLocaleDateString('vi-VN') : 'N/A';
            row.insertCell().textContent = order.customer?.name || 'N/A';
            row.insertCell().textContent = formatCurrency(order.grandTotal || 0);
            row.insertCell().textContent = order.status || 'Đã hoàn thành';
            const actionCell = row.insertCell();
            const viewButton = document.createElement('button');
            viewButton.innerHTML = '<i class="fas fa-eye"></i> Xem';
            viewButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'btn-view-detail');
            viewButton.setAttribute('data-bs-toggle', 'modal');
            viewButton.setAttribute('data-bs-target', '#orderDetailModalAdmin');
            viewButton.addEventListener('click', () => populateOrderDetailModalAdmin(order));
            actionCell.appendChild(viewButton);
        });

        orderListContainer.appendChild(table);
    }

    function getAllOrders() {
        try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            return orders;
        } catch (e) {
            console.error("Lỗi khi lấy dữ liệu đơn hàng:", e);
            return [];
        }
    }

    function populateOrderDetailModalAdmin(order) {
        const modalOrderId = document.getElementById('modal-order-id-admin');
        const modalOrderDate = document.getElementById('modal-order-date-admin');
        const modalCustomerName = document.getElementById('modal-customer-name-admin');
        const modalCustomerPhone = document.getElementById('modal-customer-phone-admin');
        const modalCustomerEmail = document.getElementById('modal-customer-email-admin');
        const modalCustomerAddress = document.getElementById('modal-customer-address-admin');
        const modalItemsBody = document.getElementById('modal-items-body-admin');
        const modalSubtotal = document.getElementById('modal-subtotal-admin');
        const modalShipping = document.getElementById('modal-shipping-admin');
        const modalDiscount = document.getElementById('modal-discount-admin');
        const modalDiscountRow = document.getElementById('modal-discount-row-admin');
        const modalGrandTotal = document.getElementById('modal-grand-total-admin');
        const modalPaymentMethod = document.getElementById('modal-payment-method-admin');
        const modalNotes = document.getElementById('modal-notes-admin');

        if (modalOrderId) modalOrderId.textContent = order.orderId || 'N/A';
        if (modalOrderDate) modalOrderDate.textContent = order.orderDate ? new Date(order.orderDate).toLocaleDateString('vi-VN') : 'N/A';
        if (modalCustomerName) modalCustomerName.textContent = order.customer?.name || 'N/A';
        if (modalCustomerPhone) modalCustomerPhone.textContent = order.customer?.phone || 'N/A';
        if (modalCustomerEmail) modalCustomerEmail.textContent = order.customer?.email || 'Không có';
        if (modalCustomerAddress) modalCustomerAddress.textContent = order.customer?.address || 'N/A';
        if (modalNotes) modalNotes.textContent = order.notes || 'Không có';

        if (modalItemsBody) {
            modalItemsBody.innerHTML = '';
            if (order.items && Array.isArray(order.items) && order.items.length > 0) {
                order.items.forEach((item, index) => {
                    const row = modalItemsBody.insertRow();
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
                modalItemsBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted fst-italic">Không có sản phẩm.</td></tr>';
            }
        }

        if (modalSubtotal) modalSubtotal.textContent = formatCurrency(order.subtotal || 0);
        if (modalShipping) modalShipping.textContent = formatCurrency(order.shippingFee || 0);
        if (modalDiscountRow && modalDiscount) {
            if (order.discountAmount && order.discountAmount > 0) {
                modalDiscount.textContent = `- ${formatCurrency(order.discountAmount)}`;
                modalDiscountRow.style.display = 'flex';
            } else {
                modalDiscountRow.style.display = 'none';
            }
        }
        if (modalGrandTotal) modalGrandTotal.textContent = formatCurrency(order.grandTotal || 0);

        let paymentText = 'N/A';
        if (order.paymentMethod === 'cod') paymentText = 'Thanh toán khi nhận hàng (COD)';
        else if (order.paymentMethod === 'bank_transfer') paymentText = 'Chuyển khoản ngân hàng';
        else if (order.paymentMethod === 'e_wallet') paymentText = 'Ví điện tử (MoMo/ZaloPay)';
        if (modalPaymentMethod) modalPaymentMethod.textContent = paymentText;
    }

    // Accounts Handlers
    function renderAccountsAdmin() {
        const accountsListContainer = document.getElementById('accounts-list');
        if (!accountsListContainer) return;
        accountsListContainer.innerHTML = '';
        accountsAdmin = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');

        accountsAdmin.forEach((u, idx) => {
            const div = document.createElement('div');
            div.className = 'item d-flex justify-content-between align-items-center py-2 border-bottom';
            div.innerHTML = `
          <span>${u.name || 'Chưa có tên'} - ${u.email}</span>
          <button class="delete-btn btn btn-sm btn-danger" data-idx="${idx}">Xóa</button>
        `;
            div.querySelector('.delete-btn').addEventListener('click', () => {
                const i = parseInt(div.querySelector('.delete-btn').dataset.idx);
                if (i >= 0 && i < accountsAdmin.length) {
                    if (confirm(`Xác nhận xóa tài khoản ${accountsAdmin[i].email}?`)) {
                        accountsAdmin.splice(i, 1);
                        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(accountsAdmin));
                        renderAccountsAdmin();
                    }
                } else {
                    console.error("Admin.js: Index tài khoản không hợp lệ để xóa.");
                }
            });
            accountsListContainer.appendChild(div);
        });
        if (accountsAdmin.length === 0 && accountsListContainer) {
            accountsListContainer.innerHTML = '<p class="text-muted text-center p-3">Không có tài khoản người dùng nào.</p>';
        }
    }

    function exportAccountsToExcel() {
        const data = JSON.parse(localStorage.getItem('users')) || [];
        if (data.length === 0) {
            return alert('Không có tài khoản để xuất.');
        }
        const ws = XLSX.utils.json_to_sheet(data, {
            header: ['name', 'email', 'createdAt']
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Accounts');
        const fileName = `accounts_${new Date().toISOString().slice(0, 10)}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }

    document.getElementById('export-accounts').addEventListener('click', exportAccountsToExcel);
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
    });

    console.log("admin.js: Khởi tạo hoàn tất.");
});