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
        rating: 4.8,
        reviewCount: 127,
        address: "294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh",
        logo: "../../assets/images/stores/PetWow/logo_petwow.png",
      }
    };
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
/**
 * Tạo HTML cho sao đánh giá - Tạo các icon sao dựa trên điểm đánh giá (0-5)
 * @param {number} rating - Điểm đánh giá (ví dụ: 4.8)
 * @returns {string} - HTML string chứa các icon sao
 */
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let html = "";
  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    html += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    html += '<i class="far fa-star"></i>';
  }
  return html;
}

/**
 * Load và hiển thị thông tin cửa hàng - Lấy từ sessionStorage và hiển thị lên trang
 */
function loadStoreInfo() {
  // Đảm bảo storesData đã được load
  if (!storesData || Object.keys(storesData).length === 0) {
    console.warn('storesData not loaded yet, retrying in 100ms...');
    setTimeout(loadStoreInfo, 100);
    return;
  }
  
  // Đảm bảo DOM elements đã sẵn sàng
  const nameEl = document.getElementById('storeName');
  if (!nameEl) {
    console.warn('DOM elements not ready yet, retrying in 50ms...');
    setTimeout(loadStoreInfo, 50);
    return;
  }
  
  const savedStore = sessionStorage.getItem('selectedStore');
  if (!savedStore) {
    console.warn('No store found in sessionStorage');
    console.log('Available sessionStorage keys:', Object.keys(sessionStorage));
    return;
  }
  
  try {
    const store = JSON.parse(savedStore);
    console.log('Loading store from sessionStorage:', store);
    console.log('Available stores in storesData:', Object.keys(storesData));
    
    const storeData = storesData[store.id];
    if (!storeData) {
      console.error('Store data not found for ID:', store.id);
      console.error('Available store IDs:', Object.keys(storesData));
      console.error('Trying to find store with lowercase ID...');
      // Thử với lowercase
      const lowerId = store.id.toLowerCase();
      if (storesData[lowerId]) {
        console.log('Found store with lowercase ID:', lowerId);
        updateStoreInfo(storesData[lowerId]);
        return;
      }
      return;
    }
    
    console.log('Found store data:', storeData);
    updateStoreInfo(storeData);
    
  } catch (e) {
    console.error('Error parsing savedStore:', e);
    console.error('Raw savedStore value:', savedStore);
  }
}

/**
 * Cập nhật UI với thông tin cửa hàng
 */
function updateStoreInfo(storeData) {
  // Cập nhật tên cửa hàng
  const nameEl = document.getElementById('storeName');
  if (nameEl) {
    nameEl.textContent = storeData.name;
    console.log('Updated store name to:', storeData.name);
  }
  
  // Cập nhật logo - đảm bảo dùng logo từ local
  const imgEl = document.getElementById('storeImage');
  if (imgEl) {
    // Điều chỉnh đường dẫn logo từ stores.json (từ root) thành relative từ templates/pages/
    let logoPath = storeData.logo;
    if (logoPath.startsWith('assets/images/')) {
      logoPath = '../../' + logoPath;
    }
    console.log('Updating logo to:', logoPath);
    imgEl.src = logoPath;
    imgEl.alt = storeData.name;
    // Thêm error handler để fallback nếu logo không tồn tại
    imgEl.onerror = function() {
      console.warn('Logo failed to load:', storeData.logo, 'Using fallback');
      this.src = '../../assets/images/logo/LOGO PAWJOY.png';
      this.onerror = null; // Tránh loop vô hạn
    };
  }
  
  // Cập nhật sao đánh giá
  const starsEl = document.getElementById('storeRatingStars');
  if (starsEl) starsEl.innerHTML = generateStars(storeData.rating);
  
  const ratingValueEl = document.getElementById('storeRatingValue');
  if (ratingValueEl) ratingValueEl.textContent = storeData.rating;
  
  const reviewCountEl = document.getElementById('storeReviewCount');
  if (reviewCountEl) reviewCountEl.textContent = `(${storeData.reviewCount})`;
  
  // Cập nhật địa chỉ
  const addressEl = document.getElementById('storeAddress');
  if (addressEl) addressEl.textContent = storeData.address;
  
  // Cập nhật title
  document.title = `Chọn thời gian - ${storeData.name} | Paw Joy`;
  
  console.log('Store info updated successfully');
}

// ============================================
// DỮ LIỆU BOOKING
// ============================================
/**
 * Danh sách dịch vụ đã chọn - Lấy từ sessionStorage
 */
const services = JSON.parse(sessionStorage.getItem('bookingServices') || '[]');

/**
 * Trạng thái lựa chọn ngày và giờ - Lưu ngày và giờ người dùng đã chọn
 */
const selectedState = {
  date: null, // Ngày đã chọn (format: YYYY-MM-DD)
  time: null, // Giờ đã chọn (format: HH:MM)
};

// ============================================
// TẠO DỮ LIỆU KHUNG GIỜ
// ============================================
/**
 * Tạo danh sách khung giờ có sẵn - Mô phỏng dữ liệu từ django-appointment (mỗi 15 phút một slot)
 * @returns {string[]} - Mảng các khung giờ có sẵn (ví dụ: ["09:00", "09:30", ...])
 */
function generateSlots() {
  const base = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "14:30", "15:00", "16:00", "16:30"];
  // Randomly trim some slots to simulate availability
  return base.filter(() => Math.random() > 0.15);
}

/**
 * Danh sách 14 ngày kể từ hôm nay - Mỗi ngày có danh sách khung giờ có sẵn
 */
const days = [];
const today = new Date();
for (let i = 0; i < 14; i++) {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  const key = d.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  days.push({
    key, // Key để so sánh (YYYY-MM-DD)
    date: d, // Object Date
    slots: generateSlots(), // Danh sách khung giờ có sẵn
  });
}

/**
 * Vị trí bắt đầu hiển thị - Dùng để phân trang (mỗi lần hiển thị 7 ngày)
 */
let currentStartIndex = 0;

// ============================================
// RENDER FUNCTIONS
// ============================================
/**
 * Hiển thị nhãn tháng - Cập nhật text hiển thị tháng và năm hiện tại
 */
function renderMonthLabel() {
  const date = days[currentStartIndex].date;
  const formatter = new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' });
  document.getElementById('monthLabel').textContent = formatter.format(date);
}

/**
 * Format thông tin ngày để hiển thị - Chuyển đổi Date object thành định dạng hiển thị
 * @param {Date} dateObj - Object Date cần format
 * @returns {{day: string, dayNum: number}} - Tên thứ (viết tắt) và số ngày
 */
function formatDayCard(dateObj) {
  const day = new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(dateObj);
  const dayNum = dateObj.getDate();
  return { day, dayNum };
}

/**
 * Render danh sách ngày - Hiển thị 7 ngày bắt đầu từ currentStartIndex
 */
function renderDates() {
  const container = document.getElementById('dateList');
  container.innerHTML = '';
  const slice = days.slice(currentStartIndex, currentStartIndex + 7);
  slice.forEach((item) => {
    const { day, dayNum } = formatDayCard(item.date);
    const selected = selectedState.date === item.key;
    const isToday = item.key === today.toISOString().split('T')[0];
    const hasManySlots = item.slots.length >= 6;

    const card = document.createElement('button');
    card.className = `
      paw-hover paw-trail w-full rounded-xl border ${selected ? 'border-brand bg-brandLight' : 'border-gray-200 bg-white'}
      p-3 text-left transition hover:border-brand
    `;
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wide ${selected ? 'text-brand' : 'text-gray-500'}">${day}</p>
          <p class="text-2xl font-serif font-bold text-dark">${dayNum}</p>
          <p class="text-xs text-gray-500">${item.date.toLocaleDateString('vi-VN')}</p>
        </div>
        <span class="w-2 h-2 rounded-full ${hasManySlots ? 'bg-brand' : 'bg-gray-200'}"></span>
      </div>
      ${isToday ? '<span class="inline-flex mt-2 text-[11px] text-brand font-semibold px-2 py-1 bg-brandLight rounded-full">Hôm nay</span>' : ''}
    `;
    card.onclick = () => selectDate(item.key);
    container.appendChild(card);
  });

  document.getElementById('prevWeekBtn').disabled = currentStartIndex === 0;
  document.getElementById('nextWeekBtn').disabled = currentStartIndex + 7 >= days.length;
  renderMonthLabel();
}

/**
 * Render tóm tắt dịch vụ đã chọn - Hiển thị danh sách dịch vụ và tổng tiền
 */
function renderServicesSummary() {
  const container = document.getElementById('selectedServices');
  const totalEl = document.getElementById('servicesTotal');
  const feeEl = document.getElementById('serviceFee');

  // Nếu chưa chọn dịch vụ nào
  if (!services.length) {
    container.innerHTML = '<p class="text-sm text-gray-500 text-center py-4">Không có dịch vụ nào được chọn</p>';
    totalEl.textContent = '0 VNĐ';
    feeEl.textContent = '15.000 VNĐ';
    return;
  }

  // Tính tổng tiền và render danh sách dịch vụ
  let total = 0;
  container.innerHTML = services
    .map((service) => {
      const price = service.price;
      total += price;
      return `
        <div class="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex-1">
            <h5 class="font-bold text-sm text-dark mb-1">${service.name}</h5>
            <p class="text-xs text-gray-500">${service.duration}</p>
          </div>
          <span class="font-serif font-bold text-dark">${price.toLocaleString('vi-VN')} VNĐ</span>
        </div>
      `;
    })
    .join('');

  // Cập nhật tổng tiền và phí dịch vụ
  totalEl.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
  feeEl.textContent = '15.000 VNĐ';
}

// ============================================
// SELECTION FUNCTIONS
// ============================================
/**
 * Chọn ngày - Khi người dùng click vào một ngày
 * @param {string} key - Key của ngày (format: YYYY-MM-DD)
 */
function selectDate(key) {
  selectedState.date = key;
  selectedState.time = null;
  renderDates();
  renderSlots();
  updateSelectedDateTime();
  document.getElementById('confirmBtn').disabled = true;
  document.getElementById('confirmBtn').classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
  document.getElementById('confirmBtn').classList.remove('bg-dark', 'text-white', 'hover:bg-brand');
}

/**
 * Render danh sách khung giờ - Hiển thị các khung giờ có sẵn cho ngày đã chọn
 */
function renderSlots() {
  const container = document.getElementById('timeSlots');
  const label = document.getElementById('selectedDateLabel');
  const hint = document.getElementById('timeHint');

  // Nếu chưa chọn ngày
  if (!selectedState.date) {
    container.innerHTML = '<p class="text-sm text-gray-500 bg-white border border-dashed border-gray-200 rounded-lg p-4">Hãy chọn một ngày để xem các khung giờ còn trống.</p>';
    label.textContent = '';
    hint.textContent = 'Chọn ngày để xem khung giờ. Nguồn dữ liệu mô phỏng từ django-appointment.';
    return;
  }

  // Lấy danh sách khung giờ của ngày đã chọn
  const dayObj = days.find((d) => d.key === selectedState.date);
  const slots = dayObj?.slots || [];
  label.textContent = dayObj.date.toLocaleDateString('vi-VN');

  // Nếu không còn khung giờ nào
  if (!slots.length) {
    container.innerHTML = '<p class="text-sm text-gray-500 bg-white border border-dashed border-gray-200 rounded-lg p-4">Hết chỗ trong ngày này. Vui lòng chọn ngày khác.</p>';
    return;
  }

  // Render các button khung giờ
  container.innerHTML = '';
  slots.forEach((slot) => {
    const btn = document.createElement('button');
    const isSelected = selectedState.time === slot;
    btn.className = `
      paw-hover paw-trail w-full text-left px-4 py-3 rounded-xl border ${isSelected ? 'border-brand bg-brandLight text-brand font-semibold' : 'border-gray-200 bg-white text-dark'}
      hover:border-brand transition
    `;
    btn.textContent = slot;
    btn.onclick = () => {
      selectedState.time = slot; // Lưu giờ đã chọn
      renderSlots(); // Render lại để highlight giờ đã chọn
      updateSelectedDateTime(); // Cập nhật box hiển thị
      enableConfirm(); // Bật nút xác nhận
    };
    container.appendChild(btn);
  });
  hint.textContent = `${slots.length} khung giờ trống trong ngày được lấy từ dữ liệu mô phỏng.`;
}

/**
 * Cập nhật box hiển thị ngày giờ đã chọn - Hiển thị thông tin ngày và giờ đã chọn với animation
 */
function updateSelectedDateTime() {
  const box = document.getElementById('selectedDateTime');
  if (!selectedState.date || !selectedState.time) {
    box.textContent = 'Bạn chưa chọn ngày và giờ.';
    return;
  }
  const dayObj = days.find((d) => d.key === selectedState.date);
  box.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-brandLight text-brand flex items-center justify-center">
        <i class="fas fa-clock"></i>
      </div>
      <div>
        <p class="text-sm font-semibold text-dark">${selectedState.time}</p>
        <p class="text-xs text-gray-500">${dayObj.date.toLocaleDateString('vi-VN')}</p>
      </div>
      <span class="stamp-paw"><i class="fas fa-paw"></i>Đã chọn</span>
    </div>
  `;
  const stamp = box.querySelector('.stamp-paw');
  if (stamp) {
    stamp.classList.remove('stamp-animate');
    void stamp.offsetWidth;
    stamp.classList.add('stamp-animate');
  }
}

/**
 * Bật nút xác nhận - Khi đã chọn đủ ngày và giờ, cho phép người dùng xác nhận
 */
function enableConfirm() {
  const btn = document.getElementById('confirmBtn');
  btn.disabled = false;
  btn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed'); // Bỏ style disabled
  btn.classList.add('bg-dark', 'text-white', 'hover:bg-brand'); // Thêm style active
}

/**
 * Xác nhận đặt lịch - Lưu ngày giờ vào sessionStorage và chuyển sang trang xác nhận
 */
function confirmBooking() {
  if (!selectedState.date || !selectedState.time) return; // Kiểm tra đã chọn đủ chưa
  // Lưu vào sessionStorage để trang confirm có thể đọc
  sessionStorage.setItem('bookingDate', selectedState.date);
  sessionStorage.setItem('bookingTime', selectedState.time);
  btnFlash(); // Hiệu ứng flash
  setTimeout(() => {
    window.location.href = 'stores-booking-confirm.html'; // Chuyển trang sau 200ms
  }, 200);
}

/**
 * Hiệu ứng flash cho nút - Thêm ring animation khi click
 */
function btnFlash() {
  const btn = document.getElementById('confirmBtn');
  btn.classList.add('ring-2', 'ring-brand'); // Thêm ring
  setTimeout(() => btn.classList.remove('ring-2', 'ring-brand'), 800); // Bỏ ring sau 800ms
}

// ============================================
// EVENT LISTENERS
// ============================================
// Nút quay lại tuần trước
document.getElementById('prevWeekBtn').addEventListener('click', () => {
  if (currentStartIndex === 0) return; // Đã ở đầu danh sách
  currentStartIndex = Math.max(0, currentStartIndex - 7); // Giảm 7 ngày
  renderDates(); // Render lại
});

// Nút chuyển đến tuần sau
document.getElementById('nextWeekBtn').addEventListener('click', () => {
  if (currentStartIndex + 7 >= days.length) return; // Đã ở cuối danh sách
  currentStartIndex = currentStartIndex + 7; // Tăng 7 ngày
  renderDates(); // Render lại
});

// Nút xác nhận đặt lịch
document.getElementById('confirmBtn').addEventListener('click', confirmBooking);

// ============================================
// INITIALIZATION
// ============================================
/**
 * Khởi tạo trang - Đợi DOM và data sẵn sàng rồi mới render
 */
async function init() {
  // Đợi load dữ liệu cửa hàng trước
  await loadStoresData();
  console.log('Stores data loaded:', storesData);
  console.log('SessionStorage selectedStore:', sessionStorage.getItem('selectedStore'));
  
  // Đảm bảo DOM đã sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM loaded, initializing...');
      loadStoreInfo();
      renderDates();
      renderServicesSummary();
    });
  } else {
    // DOM is already ready
    console.log('DOM already ready, initializing...');
    // Đợi một chút để đảm bảo tất cả elements đã render
    setTimeout(() => {
      loadStoreInfo();
      renderDates();
      renderServicesSummary();
    }, 50);
  }
}

init();

