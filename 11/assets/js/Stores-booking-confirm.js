// ============================================
// MENU MOBILE
// ============================================
/**
 * Bật/tắt menu mobile - Hiển thị hoặc ẩn menu trên thiết bị di động
 */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden'); // Thêm/xóa class 'hidden' để hiển thị/ẩn menu
}

// ============================================
// FOOTER
// ============================================
/**
 * Bật/tắt các mục trong footer trên mobile - Chỉ hoạt động trên màn hình < 1024px
 * @param {HTMLElement} header - Phần tử header của mục footer (có chứa mũi tên)
 */
function toggleFooter(header) {
  if (window.innerWidth < 1024) { // Chỉ hoạt động trên mobile/tablet
    const ul = header.nextElementSibling; // Lấy phần tử danh sách bên dưới header
    const icon = header.querySelector('.fa-chevron-down').parentElement; // Lấy icon mũi tên
    ul.classList.toggle('hidden'); // Hiển thị/ẩn danh sách
    icon.classList.toggle('rotate-180'); // Xoay mũi tên 180 độ
  }
}

// ============================================
// HIỆU ỨNG HEADER KHI SCROLL
// ============================================
/**
 * Thay đổi style của header khi cuộn trang - Header sẽ có shadow và nền trắng khi scroll xuống
 */
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  if (window.scrollY > 50) { // Khi cuộn xuống hơn 50px
    header.classList.add('shadow-md', 'bg-white/95'); // Thêm shadow và nền trắng
    header.classList.remove('bg-cream/80'); // Bỏ nền cream
  } else { // Khi ở đầu trang
    header.classList.remove('shadow-md', 'bg-white/95'); // Bỏ shadow và nền trắng
    header.classList.add('bg-cream/80'); // Thêm lại nền cream
  }
});

// ============================================
// DỮ LIỆU CỬA HÀNG
// ============================================
/**
 * Object chứa thông tin các cửa hàng - Được load từ file JSON
 */
let storesData = {};

/**
 * Load dữ liệu cửa hàng từ file JSON - Lấy thông tin tất cả cửa hàng từ data/stores.json
 * @returns {Promise<void>}
 */
async function loadStoresData() {
  try {
    const response = await fetch('../../data/stores.json');
    storesData = await response.json();
  } catch (error) {
    console.error('Error loading stores data:', error);
    // Dữ liệu dự phòng nếu không load được file JSON
    storesData = {
      petwow: {
        id: "petwow",
        name: "Pet Wow",
        address: "294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh",
        logo: "../../assets/images/stores/PetWow/logo_petwow.png",
      }
    };
  }
}

/**
 * Load và hiển thị thông tin cửa hàng - Lấy từ sessionStorage và hiển thị lên trang
 */
function loadStoreInfo() {
  // Đảm bảo storesData đã được load
  if (!storesData || Object.keys(storesData).length === 0) {
    console.warn('storesData not loaded yet, retrying...');
    setTimeout(loadStoreInfo, 100);
    return;
  }
  
  // Đảm bảo DOM elements đã sẵn sàng
  const nameEl = document.getElementById('confirmStoreName');
  if (!nameEl) {
    console.warn('DOM elements not ready yet, retrying...');
    setTimeout(loadStoreInfo, 50);
    return;
  }
  
  const savedStore = sessionStorage.getItem('selectedStore');
  if (!savedStore) {
    console.warn('No store found in sessionStorage');
    // Không redirect, chỉ hiển thị thông báo
    if (nameEl) nameEl.textContent = 'Chưa chọn cửa hàng';
    return;
  }
  
  try {
    const store = JSON.parse(savedStore);
    console.log('Loading store from sessionStorage:', store);
    console.log('Available stores in storesData:', Object.keys(storesData));
    
    // Thử tìm store với ID chính xác
    let storeData = storesData[store.id];
    
    // Nếu không tìm thấy, thử với lowercase
    if (!storeData && store.id) {
      const lowerId = store.id.toLowerCase();
      storeData = storesData[lowerId];
      if (storeData) {
        console.log('Found store with lowercase ID:', lowerId);
      }
    }
    
    if (!storeData) {
      console.error('Store data not found for ID:', store.id);
      console.error('Available store IDs:', Object.keys(storesData));
      if (nameEl) nameEl.textContent = 'Không tìm thấy cửa hàng';
      return;
    }
    
    console.log('Found store data:', storeData);
    
    // Cập nhật tên cửa hàng
    if (nameEl) nameEl.textContent = storeData.name;
    
    // Cập nhật logo - đảm bảo dùng logo từ local
    const imgEl = document.getElementById('confirmStoreImage');
    if (imgEl) {
      // Điều chỉnh đường dẫn logo từ stores.json (từ root) thành relative từ templates/pages/
      let logoPath = storeData.logo;
      if (logoPath.startsWith('assets/images/')) {
        logoPath = '../../' + logoPath;
      }
      imgEl.src = logoPath;
      imgEl.alt = storeData.name;
      // Thêm error handler để fallback nếu logo không tồn tại
      imgEl.onerror = function() {
        this.src = '../../assets/images/logo/LOGO PAWJOY.png';
        this.onerror = null; // Tránh loop vô hạn
      };
    }
    
    const addressEl = document.getElementById('confirmStoreAddress');
    if (addressEl) addressEl.textContent = storeData.address;
    
    document.title = `Xác nhận đặt lịch - ${storeData.name} | Paw Joy`;
    
    console.log('Store info loaded successfully');
    
  } catch (e) {
    console.error('Error loading store info:', e);
    console.error('Raw savedStore value:', savedStore);
  }
}

// ============================================
// RENDER FUNCTIONS
// ============================================
// Biến lưu trữ khuyến mãi đang áp dụng
let appliedDiscount = 0;
let appliedVoucherCode = '';

/**
 * Render danh sách dịch vụ đã chọn - Hiển thị dịch vụ với chức năng thay đổi số lượng và xóa
 */
function renderServices() {
  // Lấy dữ liệu từ sessionStorage mỗi lần render
  let services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
  console.log('Rendering services:', services);
  
  const wrap = document.getElementById('confirmServices');
  if (!wrap) {
    console.warn('confirmServices element not found');
    return;
  }
  
  if (!services.length) {
    wrap.innerHTML = '<p class="text-sm text-gray-500">Chưa có dịch vụ. <a href="stores-booking.html" class="text-brand hover:underline">Quay lại chọn dịch vụ</a>.</p>';
    updateTotals(0);
    return;
  }
  
  // Đảm bảo mỗi service có quantity
  services = services.map(s => ({ ...s, quantity: s.quantity || 1 }));
  
  let total = 0;
  wrap.innerHTML = services
    .map((s, index) => {
      const price = s.price * (s.quantity || 1);
      total += price;
      return `
        <div class="flex items-start justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
          <div class="flex-1">
            <p class="font-semibold text-dark">${s.name}</p>
            <p class="text-xs text-gray-500">${s.duration || ''}</p>
          </div>
          <div class="flex items-center gap-3">
            <!-- Điều chỉnh số lượng -->
            <div class="flex items-center gap-2 border border-gray-200 rounded-lg">
              <button 
                onclick="changeQuantity(${index}, -1)"
                class="px-2 py-1 text-gray-600 hover:text-brand hover:bg-gray-100 transition"
                ${(s.quantity || 1) <= 1 ? 'disabled' : ''}
              >
                <i class="fas fa-minus text-xs"></i>
              </button>
              <span class="px-3 py-1 font-semibold text-dark min-w-[2rem] text-center">${s.quantity || 1}</span>
              <button 
                onclick="changeQuantity(${index}, 1)"
                class="px-2 py-1 text-gray-600 hover:text-brand hover:bg-gray-100 transition"
              >
                <i class="fas fa-plus text-xs"></i>
              </button>
            </div>
            <span class="font-serif font-bold text-dark min-w-[120px] text-right">${price.toLocaleString('vi-VN')} VNĐ</span>
            <button 
              onclick="removeService(${index})"
              class="px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
              title="Xóa dịch vụ"
            >
              <i class="fas fa-trash text-sm"></i>
            </button>
          </div>
        </div>
      `;
    })
    .join('');
  
  // Lưu lại services đã cập nhật
  sessionStorage.setItem('bookingServices', JSON.stringify(services));
  
  // Cập nhật tổng tiền
  updateTotals(total);
}

/**
 * Thay đổi số lượng dịch vụ
 */
function changeQuantity(index, delta) {
  let services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
  if (index < 0 || index >= services.length) return;
  
  const currentQty = services[index].quantity || 1;
  const newQty = Math.max(1, currentQty + delta);
  services[index].quantity = newQty;
  
  sessionStorage.setItem('bookingServices', JSON.stringify(services));
  renderServices();
}

/**
 * Xóa dịch vụ
 */
function removeService(index) {
  if (!confirm('Bạn có chắc muốn xóa dịch vụ này?')) return;
  
  let services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
  services.splice(index, 1);
  
  sessionStorage.setItem('bookingServices', JSON.stringify(services));
  renderServices();
  
  // Nếu không còn dịch vụ nào, quay lại trang chọn
  if (services.length === 0) {
    if (confirm('Bạn đã xóa tất cả dịch vụ. Quay lại trang chọn dịch vụ?')) {
      window.location.href = 'stores-booking.html';
    }
  }
}

/**
 * Cập nhật tổng tiền (có tính khuyến mãi)
 */
function updateTotals(subtotal) {
  const discount = appliedDiscount;
  const totalAfterDiscount = Math.max(0, subtotal - discount);
  
  const totalEl = document.getElementById('confirmTotal');
  const payEl = document.getElementById('confirmPay');
  const discountRow = document.getElementById('discountRow');
  const discountAmount = document.getElementById('discountAmount');
  
  if (totalEl) totalEl.textContent = subtotal.toLocaleString('vi-VN') + ' VNĐ';
  if (payEl) payEl.textContent = totalAfterDiscount.toLocaleString('vi-VN') + ' VNĐ';
  
  // Hiển thị/ẩn dòng giảm giá
  if (discountRow && discountAmount) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      discountAmount.textContent = '-' + discount.toLocaleString('vi-VN') + ' VNĐ';
    } else {
      discountRow.classList.add('hidden');
    }
  }
}

/**
 * Render thông tin ngày giờ đã chọn - Hiển thị giờ và ngày đã chọn
 */
function renderTime() {
  // Lấy dữ liệu từ sessionStorage mỗi lần render
  const bookingDate = sessionStorage.getItem('bookingDate');
  const bookingTime = sessionStorage.getItem('bookingTime');
  
  console.log('Rendering time - Date:', bookingDate, 'Time:', bookingTime);
  
  const timeEl = document.getElementById('confirmTimeValue');
  if (!timeEl) {
    console.warn('confirmTimeValue element not found');
    return;
  }
  
  // Kiểm tra đã chọn ngày giờ chưa
  if (!bookingDate || !bookingTime) {
    timeEl.innerHTML = '<span class="text-gray-500">Bạn chưa chọn ngày giờ. <a href="stores-booking-time.html" class="text-brand hover:underline">Quay lại bước trước</a>.</span>';
    return;
  }
  
  // Format và hiển thị ngày giờ
  const d = new Date(bookingDate + 'T00:00:00'); // Thêm time để tránh timezone issues
  const dateStr = d.toLocaleDateString('vi-VN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  timeEl.innerHTML = `<span class="font-bold text-base">${bookingTime}</span> · ${dateStr}`;
}

// ============================================
// SUBMIT FUNCTION
// ============================================
/**
 * Bind sự kiện submit form - Xử lý khi người dùng click nút "Xác nhận đặt lịch"
 */
function bindSubmit() {
  const submitBtn = document.getElementById('submitConfirm');
  if (!submitBtn) {
    console.warn('submitConfirm button not found');
    return;
  }
  
  submitBtn.addEventListener('click', () => {
    // Lấy dữ liệu từ sessionStorage mỗi lần kiểm tra
    const services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
    const bookingDate = sessionStorage.getItem('bookingDate');
    const bookingTime = sessionStorage.getItem('bookingTime');
    
    const name = (document.getElementById('contactName').value || '').trim();
    const phone = (document.getElementById('contactPhone').value || '').trim();
    const note = (document.getElementById('contactNote').value || '').trim();
    
    if (!services.length) {
      alert('Bạn chưa chọn dịch vụ.');
      window.location.href = 'stores-booking.html';
      return;
    }
    if (!bookingDate || !bookingTime) {
      alert('Bạn chưa chọn thời gian.');
      window.location.href = 'stores-booking-time.html';
      return;
    }
    if (!name || !phone) {
      alert('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }
    // Hiện popup thanh toán thay vì alert
    openPaymentModal();
  });
}

// ============================================
// PAYMENT MODAL FUNCTIONS
// ============================================
/**
 * Mở popup thanh toán - Hiển thị modal thanh toán với QR code
 */
function openPaymentModal() {
  const modal = document.getElementById('paymentModal');
  const serviceFee = 15000;
  const orderCode = 'PJ-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  
  // Cập nhật thông tin thanh toán
  document.getElementById('paymentAmount').textContent = serviceFee.toLocaleString('vi-VN') + ' VNĐ';
  document.getElementById('orderCode').textContent = orderCode;
  
  // Tạo QR code động với thông tin thanh toán
  const qrData = `https://pawjoy.vn/payment?order=${orderCode}&amount=${serviceFee}`;
  const qrCodeImage = document.getElementById('qrCodeImage');
  const qrCodePattern = document.getElementById('qrCodePattern');
  
  // Sử dụng API QR code
  qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=000000&margin=1`;
  qrCodeImage.classList.remove('hidden');
  qrCodePattern.classList.add('hidden');
  
  // Nếu QR code load lỗi, hiện pattern fallback
  qrCodeImage.onerror = function() {
    this.classList.add('hidden');
    qrCodePattern.classList.remove('hidden');
  };
  
  // Lưu mã đơn vào sessionStorage để dùng cho popup thành công
  sessionStorage.setItem('orderCode', orderCode);
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Ngăn scroll khi popup mở
}

/**
 * Đóng popup thanh toán - Ẩn modal thanh toán
 */
function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  modal.classList.add('hidden');
  document.body.style.overflow = ''; // Cho phép scroll lại
}

/**
 * Xác nhận thanh toán - Hiển thị popup thành công
 */
function confirmPayment() {
  // Đóng popup thanh toán
  closePaymentModal();
  
  // Lấy mã đơn từ sessionStorage
  const orderCode = sessionStorage.getItem('orderCode') || 'PJ-2025-001';
  document.getElementById('successOrderCode').textContent = orderCode;
  
  // Hiện popup thành công sau 300ms
  setTimeout(() => {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }, 300);
}

/**
 * Đóng popup thành công - Ẩn modal và redirect về trang chủ
 */
function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  
  // Redirect về trang chủ
  window.location.href = '../../index.html';
}

/**
 * Lấy danh sách voucher từ admin (khớp với Admin-vouchers.js)
 */
function getVouchersFromAdmin() {
  // Dữ liệu voucher từ admin - chỉ lấy các voucher đang hoạt động
  const allVouchers = [
    {
      id: 1,
      code: 'WELCOME2024',
      name: 'Chào mừng khách hàng mới',
      type: 'percentage',
      value: 20, // 20%
      maxDiscount: 100000, // 100K
      minOrder: 200000, // 200K
      usage: 245,
      maxUsage: 1000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      services: ['Tất cả dịch vụ'],
      conditions: 'Áp dụng cho khách hàng mới đăng ký'
    },
    {
      id: 2,
      code: 'SPA50K',
      name: 'Giảm 50K dịch vụ Spa',
      type: 'fixed',
      value: 50000, // 50K
      maxDiscount: 50000,
      minOrder: 300000, // 300K
      usage: 189,
      maxUsage: 500,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'active',
      services: ['Spa'],
      conditions: 'Áp dụng cho đơn từ 300K'
    },
    {
      id: 3,
      code: 'VET30',
      name: 'Giảm 30% dịch vụ thăm khám',
      type: 'percentage',
      value: 30, // 30%
      maxDiscount: 150000, // 150K
      minOrder: 250000, // 250K
      usage: 156,
      maxUsage: 300,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      status: 'active',
      services: ['Thăm khám'],
      conditions: 'Áp dụng cho dịch vụ thăm khám'
    }
  ];
  
  // Chỉ trả về các voucher đang hoạt động và còn trong thời gian hiệu lực
  const now = new Date();
  return allVouchers.filter(voucher => {
    if (voucher.status !== 'active') return false;
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);
    endDate.setHours(23, 59, 59); // Đến cuối ngày
    return now >= startDate && now <= endDate;
  });
}

/**
 * Render khuyến mãi thường xuyên (từ admin)
 */
function renderPromotions() {
  const container = document.getElementById('availablePromotions');
  if (!container) return;
  
  const vouchers = getVouchersFromAdmin();
  
  if (vouchers.length === 0) {
    container.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">Hiện không có khuyến mãi nào đang áp dụng</p>';
    return;
  }
  
  container.innerHTML = vouchers.map(voucher => {
    const isSelected = appliedVoucherCode === voucher.code;
    const valueDisplay = voucher.type === 'percentage' 
      ? `${voucher.value}%` 
      : `${(voucher.value / 1000).toLocaleString('vi-VN')}K`;
    const minOrderDisplay = `${(voucher.minOrder / 1000).toLocaleString('vi-VN')}K`;
    
    return `
      <div class="flex items-center justify-between p-3 rounded-lg border-2 transition ${
        isSelected 
          ? 'bg-brandLight border-brand' 
          : 'bg-brandLight/50 border-brand/20 hover:bg-brandLight'
      }">
        <div class="flex items-center gap-3 flex-1">
          <input 
            type="checkbox" 
            ${isSelected ? 'checked' : ''}
            onchange="toggleVoucher('${voucher.code}', ${isSelected})"
            class="w-5 h-5 text-brand border-gray-300 rounded focus:ring-brand cursor-pointer"
          />
          <div class="flex-1">
            <p class="font-semibold text-dark text-sm">${voucher.name}</p>
            <div class="flex items-center gap-2 mt-1">
              <p class="text-xs text-gray-600">Mã: <span class="font-mono font-bold text-brand">${voucher.code}</span></p>
              <span class="text-xs text-gray-500">•</span>
              <p class="text-xs text-gray-600">Giảm <span class="font-bold text-brand">${valueDisplay}</span></p>
              <span class="text-xs text-gray-500">•</span>
              <p class="text-xs text-gray-600">Đơn tối thiểu: <span class="font-semibold">${minOrderDisplay}</span></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Toggle voucher (chọn/bỏ chọn)
 */
function toggleVoucher(code, isCurrentlySelected) {
  if (isCurrentlySelected) {
    // Bỏ chọn voucher
    appliedDiscount = 0;
    appliedVoucherCode = '';
    const servicesTotal = JSON.parse(sessionStorage.getItem('bookingServices') || '[]')
      .reduce((sum, s) => sum + (s.price * (s.quantity || 1)), 0);
    updateTotals(servicesTotal);
    renderPromotions(); // Render lại để cập nhật UI
    const messageEl = document.getElementById('voucherMessage');
    if (messageEl) {
      messageEl.textContent = '';
      messageEl.className = 'text-xs mt-2';
    }
    return;
  }
  
  // Áp dụng voucher mới
  applyVoucherByCode(code);
}

/**
 * Áp dụng voucher theo mã (từ admin)
 */
function applyVoucherByCode(code) {
  const vouchers = getVouchersFromAdmin();
  const voucher = vouchers.find(v => v.code === code);
  
  if (!voucher) {
    alert('Mã khuyến mãi không hợp lệ');
    return;
  }
  
  const services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
  const subtotal = services.reduce((sum, s) => sum + (s.price * (s.quantity || 1)), 0);
  
  // Kiểm tra điều kiện đơn tối thiểu
  if (subtotal < voucher.minOrder) {
    const minOrderDisplay = `${(voucher.minOrder / 1000).toLocaleString('vi-VN')}K`;
    alert(`Mã ${code} yêu cầu đơn tối thiểu ${minOrderDisplay}. Đơn của bạn: ${(subtotal / 1000).toLocaleString('vi-VN')}K`);
    return;
  }
  
  // Kiểm tra điều kiện dịch vụ
  if (!voucher.services.includes('Tất cả dịch vụ')) {
    const serviceCategories = services.map(s => {
      if (s.category === 'tam-ve-sinh') return 'Spa';
      if (s.category === 'vet') return 'Thăm khám';
      return null;
    }).filter(Boolean);
    
    const hasMatchingService = voucher.services.some(vService => 
      serviceCategories.includes(vService)
    );
    
    if (!hasMatchingService) {
      alert(`Mã ${code} chỉ áp dụng cho: ${voucher.services.join(', ')}`);
      return;
    }
  }
  
  // Tính toán giảm giá
  let discount = 0;
  
  if (voucher.type === 'percentage') {
    // Áp dụng cho dịch vụ phù hợp
    let applicableTotal = subtotal;
    if (!voucher.services.includes('Tất cả dịch vụ')) {
      applicableTotal = services
        .filter(s => {
          const serviceType = s.category === 'tam-ve-sinh' ? 'Spa' : 
                            s.category === 'vet' ? 'Thăm khám' : null;
          return voucher.services.includes(serviceType);
        })
        .reduce((sum, s) => sum + (s.price * (s.quantity || 1)), 0);
    }
    
    discount = applicableTotal * (voucher.value / 100);
    // Áp dụng giới hạn tối đa
    if (voucher.maxDiscount && discount > voucher.maxDiscount) {
      discount = voucher.maxDiscount;
    }
  } else if (voucher.type === 'fixed') {
    discount = voucher.value;
  }
  
  appliedDiscount = Math.round(discount);
  appliedVoucherCode = code;
  
  // Tính lại tổng
  updateTotals(subtotal);
  
  // Render lại để cập nhật UI
  renderPromotions();
  
  // Hiển thị thông báo
  const messageEl = document.getElementById('voucherMessage');
  if (messageEl) {
    const valueDisplay = voucher.type === 'percentage' 
      ? `${voucher.value}%` 
      : `${(voucher.value / 1000).toLocaleString('vi-VN')}K`;
    messageEl.textContent = `Đã áp dụng mã ${code}! Giảm ${appliedDiscount.toLocaleString('vi-VN')} VNĐ`;
    messageEl.className = 'text-xs mt-2 text-green-600 font-semibold';
  }
}

/**
 * Áp dụng mã khuyến mãi riêng (nhập tay)
 */
function applyVoucher() {
  const codeInput = document.getElementById('voucherCode');
  const messageEl = document.getElementById('voucherMessage');
  
  if (!codeInput || !messageEl) return;
  
  const code = codeInput.value.trim().toUpperCase();
  if (!code) {
    messageEl.textContent = 'Vui lòng nhập mã khuyến mãi';
    messageEl.className = 'text-xs mt-2 text-red-600';
    return;
  }
  
  // Kiểm tra xem mã có trong danh sách voucher từ admin không
  const vouchers = getVouchersFromAdmin();
  const voucher = vouchers.find(v => v.code === code);
  
  if (voucher) {
    // Nếu là voucher từ admin, áp dụng như bình thường
    applyVoucherByCode(code);
    codeInput.value = '';
    renderPromotions(); // Render lại để cập nhật checkbox
    return;
  }
  
  // Nếu không tìm thấy, thử tìm trong mã khuyến mãi riêng (mã cá nhân)
  const privateVouchers = {
    'VIP2025': { discount: 0.25, type: 'percent', minOrder: 0 },
    'LOYAL50K': { discount: 50000, type: 'fixed', minOrder: 0 },
    'BIRTHDAY100K': { discount: 100000, type: 'fixed', minOrder: 0 },
    'SPECIAL30': { discount: 0.3, type: 'percent', minOrder: 0 }
  };
  
  const privateVoucher = privateVouchers[code];
  if (!privateVoucher) {
    messageEl.textContent = 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn';
    messageEl.className = 'text-xs mt-2 text-red-600';
    return;
  }
  
  const services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
  const subtotal = services.reduce((sum, s) => sum + (s.price * (s.quantity || 1)), 0);
  
  // Kiểm tra đơn tối thiểu
  if (privateVoucher.minOrder && subtotal < privateVoucher.minOrder) {
    messageEl.textContent = `Đơn tối thiểu ${(privateVoucher.minOrder / 1000).toLocaleString('vi-VN')}K để sử dụng mã này`;
    messageEl.className = 'text-xs mt-2 text-red-600';
    return;
  }
  
  let discount = 0;
  if (privateVoucher.type === 'percent') {
    discount = subtotal * privateVoucher.discount;
  } else {
    discount = Math.min(privateVoucher.discount, subtotal); // Không giảm quá tổng tiền
  }
  
  appliedDiscount = Math.round(discount);
  appliedVoucherCode = code;
  
  // Tính lại tổng
  updateTotals(subtotal);
  
  messageEl.textContent = `Đã áp dụng mã ${code}! Giảm ${appliedDiscount.toLocaleString('vi-VN')} VNĐ`;
  messageEl.className = 'text-xs mt-2 text-green-600 font-semibold';
  codeInput.value = '';
  
  // Render lại promotions để cập nhật UI
  renderPromotions();
}

/**
 * Lấy danh sách dịch vụ chi tiết cho cửa hàng
 */
function getStoreServices(storeId) {
  // Dữ liệu dịch vụ mẫu cho các cửa hàng
  const storeServicesData = {
    'petwow': [
      { name: 'Cắt mài móng', category: 'cham-soc-mong', duration: '20 phút', price: 40 },
      { name: 'Vệ sinh, nhổ lông tai', category: 'cham-soc-mong', duration: '25 phút', price: 40 },
      { name: 'Tắm sấy', category: 'tam-ve-sinh', duration: '30 phút', price: 170 },
      { name: 'Tắm vệ sinh', category: 'tam-ve-sinh', duration: '45 phút', price: 220 }
    ],
    '2vet': [
      { name: 'Cắt mài móng', category: 'cham-soc-mong', duration: '20 phút', price: 39 },
      { name: 'Vệ sinh, nhổ lông tai', category: 'cham-soc-mong', duration: '20 phút', price: 30 },
      { name: 'Tắm sấy', category: 'tam-ve-sinh', duration: '30 phút', price: 120 },
      { name: 'Khám bệnh cơ bản', category: 'vet', duration: '30 phút', price: 159 }
    ],
    'gauspa': [
      { name: 'Cắt mài móng', category: 'cham-soc-mong', duration: '20 phút', price: 39 },
      { name: 'Vệ sinh, nhổ lông tai', category: 'cham-soc-mong', duration: '20 phút', price: 39 },
      { name: 'Tắm sấy', category: 'tam-ve-sinh', duration: '30 phút', price: 100 }
    ],
    'paopet': [
      { name: 'Cắt mài móng', category: 'cham-soc-mong', duration: '20 phút', price: 40 },
      { name: 'Vệ sinh, nhổ lông tai', category: 'cham-soc-mong', duration: '20 phút', price: 45 },
      { name: 'Tắm sấy', category: 'tam-ve-sinh', duration: '30 phút', price: 99 }
    ],
    'lumipet': [
      { name: 'Tắm sấy', category: 'tam-ve-sinh', duration: '30 phút', price: 79 },
      { name: 'Tắm vệ sinh', category: 'tam-ve-sinh', duration: '45 phút', price: 200 }
    ],
    'tiemnhasau': [
      { name: 'Cắt mài móng', category: 'cham-soc-mong', duration: '20 phút', price: 50 },
      { name: 'Vệ sinh, nhổ lông tai', category: 'cham-soc-mong', duration: '20 phút', price: 50 },
      { name: 'Tắm sấy', category: 'tam-ve-sinh', duration: '30 phút', price: 100 }
    ],
    'petgrocer': [
      { name: 'Vệ sinh, nhổ lông tai, cắt mài móng', category: 'cham-soc-mong', duration: '30 phút', price: 90 },
      { name: 'Tắm sấy', category: 'tam-ve-sinh', duration: '30 phút', price: 100 }
    ],
    'cwellpet': [
      { name: 'Vệ sinh, nhổ lông tai, cắt mài móng', category: 'cham-soc-mong', duration: '30 phút', price: 90 },
      { name: 'Khám bệnh cơ bản', category: 'vet', duration: '30 phút', price: 179 }
    ],
    'petsmin': [
      { name: 'Vệ sinh, nhổ lông tai', category: 'cham-soc-mong', duration: '20 phút', price: 50 },
      { name: 'Khám bệnh cơ bản', category: 'vet', duration: '30 phút', price: 179 }
    ],
    'nasapet': [
      { name: 'Vệ sinh, nhổ lông tai, cắt mài móng', category: 'cham-soc-mong', duration: '30 phút', price: 70 },
      { name: 'Khám bệnh cơ bản', category: 'vet', duration: '30 phút', price: 199 }
    ],
    'petpro': [
      { name: 'Khám bệnh cơ bản', category: 'vet', duration: '30 phút', price: 169 },
      { name: 'Xét nghiệm máu cơ bản', category: 'vet', duration: '30 phút', price: 339 }
    ]
  };
  
  // Thử tìm với ID chính xác hoặc lowercase
  const services = storeServicesData[storeId] || storeServicesData[storeId?.toLowerCase()];
  
  // Nếu không tìm thấy, trả về dịch vụ mặc định
  return services || [
    { name: 'Cắt mài móng', category: 'cham-soc-mong', duration: '20 phút', price: 40 },
    { name: 'Vệ sinh, nhổ lông tai', category: 'cham-soc-mong', duration: '20 phút', price: 40 }
  ];
}

/**
 * Render sản phẩm mua kèm
 */
function renderSuggestedServices() {
  const container = document.getElementById('suggestedServices');
  if (!container) return;
  
  const services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
  const savedStore = sessionStorage.getItem('selectedStore');
  
  if (!savedStore) {
    container.innerHTML = '<p class="text-sm text-gray-500">Đang tải...</p>';
    // Thử lại sau 500ms
    setTimeout(renderSuggestedServices, 500);
    return;
  }
  
  try {
    const store = JSON.parse(savedStore);
    const storeId = store.id || store.id?.toLowerCase();
    
    if (!storeId) {
      container.innerHTML = '<p class="text-sm text-gray-500">Không có thông tin cửa hàng</p>';
      return;
    }
    
    // Lấy danh sách dịch vụ của cửa hàng
    const allServices = getStoreServices(storeId);
    
    if (!allServices || allServices.length === 0) {
      container.innerHTML = '<p class="text-sm text-gray-500">Không có dịch vụ gợi ý</p>';
      return;
    }
    
    // Lấy các dịch vụ chưa được chọn, ưu tiên dịch vụ bổ sung (chăm sóc móng, vệ sinh tai)
    const selectedServiceNames = services.map(s => s.name);
    let suggested = allServices
      .filter(s => !selectedServiceNames.includes(s.name))
      .filter(s => s.category === 'cham-soc-mong' || s.name.toLowerCase().includes('móng') || s.name.toLowerCase().includes('tai'))
      .slice(0, 3);
    
    if (suggested.length === 0) {
      // Nếu không có dịch vụ bổ sung, lấy 2 dịch vụ khác
      const otherServices = allServices
        .filter(s => !selectedServiceNames.includes(s.name))
        .slice(0, 2);
      suggested = otherServices;
    }
    
    if (suggested.length === 0) {
      container.innerHTML = '<p class="text-sm text-gray-500">Bạn đã chọn tất cả dịch vụ có sẵn</p>';
      return;
    }
    
    container.innerHTML = suggested.map(service => {
      // Escape các ký tự đặc biệt trong tên dịch vụ để tránh lỗi onclick
      const escapedName = service.name.replace(/'/g, "\\'");
      const category = service.category || '';
      const duration = service.duration || '';
      // Giá được lưu theo đơn vị nghìn, cần nhân 1000 khi lưu vào bookingServices
      // Nhưng hiển thị thì hiển thị theo format "40.000 VNĐ"
      const displayPrice = service.price * 1000;
      
      return `
        <div class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-brand transition cursor-pointer" onclick="addSuggestedService('${escapedName}', ${displayPrice}, '${category}', '${duration}')">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <i class="fas fa-check-circle text-accent text-sm"></i>
              <p class="font-semibold text-dark text-sm">${service.name}</p>
            </div>
            <p class="text-xs text-gray-500">${duration}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-serif font-bold text-dark text-sm">${displayPrice.toLocaleString('vi-VN')} VNĐ</span>
            <button class="px-3 py-1 bg-accent hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition">
              Thêm
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Error rendering suggested services:', e);
    container.innerHTML = '<p class="text-sm text-gray-500">Không thể tải gợi ý. Vui lòng thử lại.</p>';
  }
}

/**
 * Thêm dịch vụ gợi ý vào danh sách
 */
function addSuggestedService(name, price, category, duration) {
  let services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');
  
  // Kiểm tra xem dịch vụ đã có chưa
  const existingIndex = services.findIndex(s => s.name === name);
  if (existingIndex >= 0) {
    // Nếu đã có, tăng số lượng
    services[existingIndex].quantity = (services[existingIndex].quantity || 1) + 1;
  } else {
    // Nếu chưa có, thêm mới
    services.push({
      name: name,
      price: price,
      category: category,
      duration: duration,
      quantity: 1
    });
  }
  
  sessionStorage.setItem('bookingServices', JSON.stringify(services));
  renderServices();
  renderSuggestedServices(); // Render lại để cập nhật danh sách
  
  // Hiển thị thông báo
  const message = existingIndex >= 0 ? 'Đã tăng số lượng dịch vụ' : 'Đã thêm dịch vụ vào đơn';
  alert(message);
}

// Export functions to global scope để có thể gọi từ HTML
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.confirmPayment = confirmPayment;
window.closeSuccessModal = closeSuccessModal;
window.changeQuantity = changeQuantity;
window.removeService = removeService;
window.toggleVoucher = toggleVoucher;
window.applyVoucher = applyVoucher;
window.addSuggestedService = addSuggestedService;

// ============================================
// INITIALIZATION
// ============================================
/**
 * Khởi tạo trang - Đợi DOM và data sẵn sàng rồi mới render
 */
async function init() {
  await loadStoresData(); // Đợi load dữ liệu cửa hàng
  console.log('Stores data loaded:', storesData);
  console.log('SessionStorage selectedStore:', sessionStorage.getItem('selectedStore'));
  console.log('SessionStorage bookingServices:', sessionStorage.getItem('bookingServices'));
  console.log('SessionStorage bookingDate:', sessionStorage.getItem('bookingDate'));
  console.log('SessionStorage bookingTime:', sessionStorage.getItem('bookingTime'));
  
  // Đảm bảo DOM đã sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM loaded, initializing...');
      loadStoreInfo(); // Load thông tin cửa hàng
      renderServices(); // Render danh sách dịch vụ
      renderTime(); // Render ngày giờ đã chọn
      renderPromotions(); // Render khuyến mãi
      renderSuggestedServices(); // Render sản phẩm mua kèm
      bindSubmit(); // Bind sự kiện submit
    });
  } else {
    // DOM is already ready
    console.log('DOM already ready, initializing...');
    // Đợi một chút để đảm bảo tất cả elements đã render
    setTimeout(() => {
      loadStoreInfo(); // Load thông tin cửa hàng
      renderServices(); // Render danh sách dịch vụ
      renderTime(); // Render ngày giờ đã chọn
      renderPromotions(); // Render khuyến mãi
      renderSuggestedServices(); // Render sản phẩm mua kèm
      bindSubmit(); // Bind sự kiện submit
    }, 50);
  }
}

// Chạy hàm init khi load trang
init();

