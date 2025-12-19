let currentTab = 'customers';
let currentFilter = { search: '', status: 'all', sort: 'newest' };
let allCustomers = [];
let currentPage = 1;
const itemsPerPage = 10;

// Reviews data
let allReviews = [];
let currentReviewPage = 1;
let currentReviewFilter = { search: '', rating: 'all', partner: '', sort: 'newest' };

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  generateCustomersData();
  generateReviewsData();
  renderCustomers();

  // Event listeners removed - filters now apply manually via "Áp dụng" button

  // Event listeners removed - review filters now apply manually via "Áp dụng" button
});

// Generate 50 customers data
function generateCustomersData() {
  const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương'];
  const middleNames = ['Văn', 'Thị', 'Đức', 'Minh', 'Hồng', 'Thanh', 'Thành', 'Quốc', 'Anh'];
  const lastNames = ['An', 'Bình', 'Chi', 'Dung', 'Em', 'Phương', 'Giang', 'Hà', 'Khoa', 'Linh', 'Mai', 'Nam', 'Oanh', 'Phúc', 'Quân', 'Sang', 'Tâm', 'Uyên', 'Vinh', 'Xuân'];
  const statuses = ['vip', 'active', 'active', 'active', 'frequent_canceller', 'complained'];
  const petData = [
    { name: 'Lucky', type: 'dog', breed: 'Chó Golden Retriever', emoji: '🐕' },
    { name: 'Max', type: 'dog', breed: 'Chó Poodle', emoji: '🐕' },
    { name: 'Mimi', type: 'cat', breed: 'Mèo Ba Tư', emoji: '🐈' },
    { name: 'Coco', type: 'dog', breed: 'Chó Corgi', emoji: '🐕' },
    { name: 'Rocky', type: 'dog', breed: 'Chó Husky', emoji: '🐕' },
    { name: 'Luna', type: 'cat', breed: 'Mèo Anh lông ngắn', emoji: '🐈' },
    { name: 'Bella', type: 'dog', breed: 'Chó Pomeranian', emoji: '🐕' },
    { name: 'Charlie', type: 'dog', breed: 'Chó Shiba', emoji: '🐕' },
    { name: 'Molly', type: 'cat', breed: 'Mèo Munchkin', emoji: '🐈' },
    { name: 'Buddy', type: 'dog', breed: 'Chó Beagle', emoji: '🐕' }
  ];

  allCustomers = Array.from({ length: 30 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const pet = petData[Math.floor(Math.random() * petData.length)];
    
    return {
      id: i + 1,
      name: `${firstName} ${middleName} ${lastName}`,
      email: `${lastName.toLowerCase()}.${firstName.toLowerCase()}@email.com`,
      phone: `09${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      pet: pet,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('vi-VN'),
      totalOrders: Math.floor(Math.random() * 50) + 1,
      totalSpent: (Math.floor(Math.random() * 5000000) + 100000).toLocaleString('vi-VN') + 'đ',
      lastOrder: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('vi-VN')
    };
  });

  updateStatsCards();
}

// Generate Reviews Data
function generateReviewsData() {
  const partners = ['Pet Wow', '2VET', 'GẤU SPA THÚ CƯNG', 'PAO PET', 'Lumi Pet Shop', 'Tiệm nhà Sâu', 'PetGrocer', 'Bệnh Viện Thú Y C.well Pet', 'Phòng Khám Thú Y Pets & Min', 'PHÒNG KHÁM THÚ Y NASA PET', 'Bệnh Viện Thú Y Pet Pro Cộng Hòa'];
  const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương'];
  const middleNames = ['Văn', 'Thị', 'Đức', 'Minh', 'Hồng', 'Thanh', 'Thành', 'Quốc', 'Anh'];
  const lastNames = ['An', 'Bình', 'Chi', 'Dung', 'Em', 'Phương', 'Giang', 'Hà', 'Khoa', 'Linh', 'Mai', 'Nam', 'Oanh', 'Phúc', 'Quân', 'Sang', 'Tâm', 'Uyên', 'Vinh', 'Xuân'];
  const comments = [
    'Dịch vụ rất tốt, nhân viên chuyên nghiệp!',
    'Thú cưng của tôi rất hài lòng, sẽ quay lại lần sau.',
    'Giá cả hợp lý, chất lượng dịch vụ tốt.',
    'Không gian sạch sẽ, nhân viên nhiệt tình.',
    'Dịch vụ nhanh chóng, thú cưng được chăm sóc tốt.',
    'Rất hài lòng với dịch vụ, đáng giá tiền.',
    'Nhân viên có kinh nghiệm, thú cưng được chăm sóc chu đáo.',
    'Dịch vụ tốt nhưng hơi đắt một chút.',
    'Không gian đẹp, dịch vụ chuyên nghiệp.',
    'Thú cưng của tôi rất thích, sẽ giới thiệu cho bạn bè.',
    'Dịch vụ ổn nhưng cần cải thiện thêm.',
    'Nhân viên thân thiện, dịch vụ tốt.',
    'Giá cả phải chăng, chất lượng ổn.',
    'Rất hài lòng, sẽ quay lại.',
    'Dịch vụ không như mong đợi, cần cải thiện.',
    'Nhân viên thiếu chuyên nghiệp, dịch vụ chậm.',
    'Không gian nhỏ, dịch vụ bình thường.',
    'Giá cao nhưng chất lượng không tương xứng.',
    'Dịch vụ tốt, đáng để thử.',
    'Rất hài lòng với dịch vụ này!'
  ];

  // Tạo dữ liệu với phân bố cụ thể để số liệu khớp
  // Phân bố: 10 reviews 5 sao, 5 reviews 4 sao, 15 reviews đánh giá thấp (≤3) = 30 reviews
  // Stats cards: Tổng = 30, 5 sao = 10, 4 sao = 5, Đánh giá thấp (≤3) = 15
  // Tổng các cards: 10 + 5 + 15 = 30 ✓
  const ratingDistribution = [];
  
  // Thêm 10 reviews 5 sao
  for (let i = 0; i < 10; i++) ratingDistribution.push(5);
  // Thêm 5 reviews 4 sao
  for (let i = 0; i < 5; i++) ratingDistribution.push(4);
  // Thêm 15 reviews đánh giá thấp (1-3 sao)
  // 5 reviews 3 sao
  for (let i = 0; i < 5; i++) ratingDistribution.push(3);
  // 5 reviews 2 sao
  for (let i = 0; i < 5; i++) ratingDistribution.push(2);
  // 5 reviews 1 sao
  for (let i = 0; i < 5; i++) ratingDistribution.push(1);
  
  // Tổng: 10 + 5 + 5 + 5 + 5 = 30 reviews
  // Stats: Tổng = 30, 5 sao = 10, 4 sao = 5, Thấp (≤3) = 15 (5 reviews 3 sao + 5 reviews 2 sao + 5 reviews 1 sao)
  
  // Đảm bảo có đúng 30 phần tử
  if (ratingDistribution.length !== 30) {
    console.error('Rating distribution should have 30 items, got:', ratingDistribution.length);
  }
  
  // Shuffle để phân bố ngẫu nhiên
  for (let i = ratingDistribution.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ratingDistribution[i], ratingDistribution[j]] = [ratingDistribution[j], ratingDistribution[i]];
  }

  allReviews = Array.from({ length: 30 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const partner = partners[Math.floor(Math.random() * partners.length)];
    const rating = ratingDistribution[i]; // Sử dụng phân bố đã định sẵn
    const comment = comments[Math.floor(Math.random() * comments.length)];
    
    return {
      id: i + 1,
      customerName: `${firstName} ${middleName} ${lastName}`,
      partner: partner,
      rating: rating,
      comment: comment,
      date: new Date(2025, Math.floor(Math.random() * 2), Math.floor(Math.random() * 28) + 1).toLocaleDateString('vi-VN'),
      dateValue: new Date(2025, Math.floor(Math.random() * 2), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      orderId: `#BK2025${String(i + 1).padStart(4, '0')}`,
      service: ['Tắm sấy', 'Tắm vệ sinh', 'Tắm cạo', 'Tắm vệ sinh cắt tỉa', 'Khám bệnh cơ bản', 'Triệt sản'][Math.floor(Math.random() * 6)]
    };
  });

  updateReviewStats();
  populatePartnerFilter();
}

// Populate Partner Filter
function populatePartnerFilter() {
  const partners = [...new Set(allReviews.map(r => r.partner))].sort();
  const select = document.getElementById('reviewPartnerFilter');
  partners.forEach(partner => {
    const option = document.createElement('option');
    option.value = partner;
    option.textContent = partner;
    select.appendChild(option);
  });
}

// Switch Tab
function switchTab(tab) {
  currentTab = tab;
  
  // Update tab buttons
  const customersTab = document.getElementById('tabCustomers');
  const reviewsTab = document.getElementById('tabReviews');
  const customersContent = document.getElementById('customersTab');
  const reviewsContent = document.getElementById('reviewsTab');
  
  if (tab === 'customers') {
    customersTab.classList.add('text-brand', 'border-b-2', 'border-brand');
    customersTab.classList.remove('text-gray-600');
    reviewsTab.classList.remove('text-brand', 'border-b-2', 'border-brand');
    reviewsTab.classList.add('text-gray-600');
    customersContent.classList.remove('hidden');
    reviewsContent.classList.add('hidden');
  } else {
    reviewsTab.classList.add('text-brand', 'border-b-2', 'border-brand');
    reviewsTab.classList.remove('text-gray-600');
    customersTab.classList.remove('text-brand', 'border-b-2', 'border-brand');
    customersTab.classList.add('text-gray-600');
    reviewsContent.classList.remove('hidden');
    customersContent.classList.add('hidden');
    renderReviews();
  }
}

// Update Stats Cards
function updateStatsCards() {
  document.getElementById('totalCustomers').textContent = allCustomers.length;
  document.getElementById('vipCustomers').textContent = allCustomers.filter(c => c.status === 'vip').length;
  document.getElementById('activeCustomers').textContent = allCustomers.filter(c => c.status === 'active').length;
  document.getElementById('cancellerCustomers').textContent = allCustomers.filter(c => c.status === 'frequent_canceller').length;
  document.getElementById('complainedCustomers').textContent = allCustomers.filter(c => c.status === 'complained').length;
}

// Filter by status from stats cards
function filterByStatus(status) {
  currentFilter.status = status;
  document.getElementById('statusFilter').value = status;
  applyFilters();
}

// Filter and Sort Customers
function getFilteredCustomers() {
  let filtered = [...allCustomers];

  // Search filter
  if (currentFilter.search) {
    const search = currentFilter.search.toLowerCase();
    filtered = filtered.filter(customer =>
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone.includes(search)
    );
  }

  // Status filter
  if (currentFilter.status !== 'all') {
    filtered = filtered.filter(customer => customer.status === currentFilter.status);
  }

  // Sort
  switch (currentFilter.sort) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate));
      break;
    case 'name_asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'orders_desc':
      filtered.sort((a, b) => b.totalOrders - a.totalOrders);
      break;
    case 'spent_desc':
      filtered.sort((a, b) => {
        const spentA = parseInt(a.totalSpent.replace(/[^\d]/g, ''));
        const spentB = parseInt(b.totalSpent.replace(/[^\d]/g, ''));
        return spentB - spentA;
      });
      break;
  }

  return filtered;
}

// Render Customers Table
function renderCustomers() {
  const filtered = getFilteredCustomers();
  
  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCustomers = filtered.slice(startIndex, endIndex);
  
  const statusBadges = {
    'vip': '<span class="badge bg-yellow-100 text-yellow-700">VIP</span>',
    'active': '<span class="badge bg-green-100 text-green-700">Hoạt động</span>',
    'frequent_canceller': '<span class="badge bg-red-100 text-red-700">Hay hủy</span>',
    'complained': '<span class="badge bg-orange-100 text-orange-700">Khiếu nại</span>'
  };

  const html = `
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-cream">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Khách hàng</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Thú cưng</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tổng đơn</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Chi tiêu</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Đơn cuối</th>
              <th class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody id="customersTableBody" class="divide-y divide-gray-100">
            ${pageCustomers.map(customer => `
              <tr class="hover:bg-cream/30 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brandDark text-white flex items-center justify-center font-bold">
                      ${customer.name.charAt(0)}
                    </div>
                    <div>
                      <p class="font-semibold text-dark">${customer.name}</p>
                      <p class="text-sm text-gray-500">${customer.email}</p>
                      <p class="text-sm text-gray-500">${customer.phone}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div>
                    <p class="font-semibold text-dark">${customer.pet.name}</p>
                    <p class="text-sm text-gray-500">${customer.pet.breed}</p>
                  </div>
                </td>
                <td class="px-6 py-4">${statusBadges[customer.status]}</td>
                <td class="px-6 py-4">
                  <span class="font-semibold text-dark">${customer.totalOrders}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="font-semibold text-dark">${customer.totalSpent}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-600">${customer.lastOrder}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <button onclick="showCustomerModal(${customer.id})" class="w-8 h-8 rounded-lg hover:bg-blue-100 text-blue-600 flex items-center justify-center transition" title="Xem chi tiết">
                      <i class="fas fa-eye text-sm"></i>
                    </button>
                    <button onclick="editCustomer(${customer.id})" class="w-8 h-8 rounded-lg hover:bg-brand/10 text-brand flex items-center justify-center transition" title="Chỉnh sửa">
                      <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button onclick="deleteCustomer(${customer.id})" class="w-8 h-8 rounded-lg hover:bg-red-100 text-red-600 flex items-center justify-center transition" title="Xóa">
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <p class="text-sm text-gray-600" id="paginationInfo">Hiển thị <span class="font-semibold">1-10</span> trong tổng số <span class="font-semibold">30</span> khách hàng</p>
        <div class="flex gap-2" id="paginationButtons">
          <!-- Pagination buttons will be generated by JavaScript -->
        </div>
      </div>
    </div>
  `;

  document.getElementById('customersContent').innerHTML = html;

  // Update pagination
  updatePagination(filtered.length);
}

// Update Pagination
function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Update pagination info
  document.getElementById('paginationInfo').innerHTML = 
    `Hiển thị <span class="font-semibold">${startItem}-${endItem}</span> trong tổng số <span class="font-semibold">${totalItems}</span> khách hàng`;

  // Update pagination buttons
  const paginationDiv = document.getElementById('paginationButtons');
  let buttons = '';

  // Previous button
  buttons += `<button onclick="changePage(${currentPage - 1})" 
    class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
    ${currentPage === 1 ? 'disabled' : ''}>Trước</button>`;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      buttons += `<button onclick="changePage(${i})" 
        class="px-4 py-2 rounded-lg ${i === currentPage ? 'bg-brand text-white font-semibold' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      buttons += `<span class="px-2 text-gray-400">...</span>`;
    }
  }

  // Next button
  buttons += `<button onclick="changePage(${currentPage + 1})" 
    class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" 
    ${currentPage === totalPages ? 'disabled' : ''}>Sau</button>`;

  paginationDiv.innerHTML = buttons;
}

// Change Page
function changePage(page) {
  const filtered = getFilteredCustomers();
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderCustomers();
  }
}

// Filter handlers
// Apply filters
function applyFilters() {
  // Get values from inputs
  currentFilter.search = document.getElementById('searchInput').value;
  currentFilter.status = document.getElementById('statusFilter').value;
  currentFilter.sort = document.getElementById('sortFilter').value;
  
  currentPage = 1; // Reset to first page
  renderCustomers();
}

// Reset filters
function resetFilters() {
  currentFilter = { search: '', status: 'all', sort: 'newest' };
  document.getElementById('searchInput').value = '';
  document.getElementById('statusFilter').selectedIndex = 0;
  document.getElementById('sortFilter').selectedIndex = 0;
  
  // Reset status cards visual state
  document.querySelectorAll('[onclick^="filterByStatus"]').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-brand', 'shadow-xl');
  });
  
  // Apply reset
  applyFilters();
}

// Show customer modal
function showCustomerModal(customerId) {
  const customer = allCustomers.find(c => c.id === customerId);
  if (!customer) {
    alert('Không tìm thấy khách hàng!');
    return;
  }

  const statusBadges = {
    'vip': '<span class="badge bg-yellow-100 text-yellow-700">VIP</span>',
    'active': '<span class="badge bg-green-100 text-green-700">Hoạt động</span>',
    'frequent_canceller': '<span class="badge bg-red-100 text-red-700">Hay hủy</span>',
    'complained': '<span class="badge bg-orange-100 text-orange-700">Khiếu nại</span>'
  };

  const content = `
    <!-- Customer Header -->
    <div class="flex items-center gap-4 mb-6">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brandDark text-white flex items-center justify-center font-bold text-2xl">
        ${customer.name.charAt(0)}
      </div>
      <div>
        <h3 class="text-2xl font-bold text-dark">${customer.name}</h3>
        <div class="flex items-center gap-2 mt-1">
          ${statusBadges[customer.status]}
          <span class="text-sm text-gray-500">Tham gia ${customer.joinDate}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-cream">
        <h4 class="font-bold text-dark mb-4 flex items-center gap-2">
          <i class="fas fa-user text-brand"></i> Thông tin cá nhân
        </h4>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Email:</span>
            <span class="font-semibold">${customer.email}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Số điện thoại:</span>
            <span class="font-semibold">${customer.phone}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Ngày tham gia:</span>
            <span class="font-semibold">${customer.joinDate}</span>
          </div>
        </div>
      </div>

      <div class="card bg-cream">
        <h4 class="font-bold text-dark mb-4 flex items-center gap-2">
          <span class="text-2xl">${customer.pet.emoji}</span> Thú cưng
        </h4>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Tên:</span>
            <span class="font-semibold">${customer.pet.name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Giống:</span>
            <span class="font-semibold">${customer.pet.breed}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-cream">
      <h4 class="font-bold text-dark mb-4 flex items-center gap-2">
        <i class="fas fa-chart-bar text-brand"></i> Thống kê
      </h4>
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-2xl font-bold text-brand">${customer.totalOrders}</p>
          <p class="text-sm text-gray-600">Tổng đơn hàng</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-green-600">${customer.totalSpent}</p>
          <p class="text-sm text-gray-600">Tổng chi tiêu</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-purple-600">${customer.lastOrder}</p>
          <p class="text-sm text-gray-600">Đơn cuối cùng</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('customerContent').innerHTML = content;
  document.getElementById('customerModal').classList.remove('hidden');
  document.getElementById('customerModal').classList.add('flex');
}


function hideCustomerModal() {
  document.getElementById('customerModal').classList.add('hidden');
  document.getElementById('customerModal').classList.remove('flex');
}

// Edit Customer
function editCustomer(customerId) {
  const customer = allCustomers.find(c => c.id === customerId);
  if (!customer) {
    alert('Không tìm thấy khách hàng!');
    return;
  }

  const statusOptions = {
    vip: 'VIP',
    active: 'Hoạt động',
    frequent_canceller: 'Hay hủy',
    complained: 'Khiếu nại'
  };

  const content = `
    <form id="editCustomerForm" onsubmit="saveCustomerChanges(event, ${customerId})">
      <!-- Customer Name -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
        <input type="text" id="editCustomerName" name="name" value="${customer.name}"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
      </div>

      <!-- Email -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
        <input type="email" id="editCustomerEmail" name="email" value="${customer.email}"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
      </div>

      <!-- Phone -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
        <input type="text" id="editCustomerPhone" name="phone" value="${customer.phone}"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
      </div>

      <!-- Status -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
        <select id="editCustomerStatus" name="status" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
          ${Object.entries(statusOptions).map(([key, label]) => 
            `<option value="${key}" ${customer.status === key ? 'selected' : ''}>${label}</option>`
          ).join('')}
        </select>
      </div>

      <!-- Pet Name -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Tên thú cưng</label>
        <input type="text" id="editPetName" name="petName" value="${customer.pet.name}"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
      </div>

      <!-- Pet Breed -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Giống thú cưng</label>
        <input type="text" id="editPetBreed" name="petBreed" value="${customer.pet.breed}"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button type="button" onclick="hideEditCustomerModal()"
          class="btn-cancel flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold">
          <i class="fas fa-times mr-2"></i>Hủy
        </button>
        <button type="submit"
          class="flex-1 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brandDark transition">
          <i class="fas fa-save mr-2"></i>Lưu thay đổi
        </button>
      </div>
    </form>
  `;

  document.getElementById('editCustomerContent').innerHTML = content;
  document.getElementById('editCustomerModal').classList.remove('hidden');
  document.getElementById('editCustomerModal').classList.add('flex');
}

function hideEditCustomerModal() {
  document.getElementById('editCustomerModal').classList.add('hidden');
  document.getElementById('editCustomerModal').classList.remove('flex');
}

// Save Customer Changes
function saveCustomerChanges(event, customerId) {
  event.preventDefault();
  
  const customer = allCustomers.find(c => c.id === customerId);
  if (!customer) {
    alert('Không tìm thấy khách hàng!');
    return;
  }

  // Update customer data
  customer.name = document.getElementById('editCustomerName').value;
  customer.email = document.getElementById('editCustomerEmail').value;
  customer.phone = document.getElementById('editCustomerPhone').value;
  customer.status = document.getElementById('editCustomerStatus').value;
  customer.pet.name = document.getElementById('editPetName').value;
  customer.pet.breed = document.getElementById('editPetBreed').value;

  // Refresh display
  renderCustomers();
  updateStatsCards();
  
  // Close modal
  hideEditCustomerModal();
  alert('Đã cập nhật thông tin khách hàng thành công!');
}

// Delete Customer
function deleteCustomer(customerId) {
  const customer = allCustomers.find(c => c.id === customerId);
  if (!customer) {
    alert('Không tìm thấy khách hàng!');
    return;
  }

  const content = `
    <div class="text-center">
      <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <i class="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
      </div>
      <h4 class="text-xl font-bold text-dark mb-2">Xác nhận xóa khách hàng</h4>
      <p class="text-gray-600 mb-6">
        Bạn có chắc chắn muốn xóa khách hàng <strong>${customer.name}</strong>?<br>
        Hành động này không thể hoàn tác.
      </p>
      <div class="flex gap-3">
        <button onclick="hideDeleteCustomerConfirmModal()"
          class="btn-cancel flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold">
          <i class="fas fa-times mr-2"></i>Hủy
        </button>
        <button onclick="confirmDeleteCustomer(${customerId})"
          class="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
          <i class="fas fa-trash mr-2"></i>Xóa khách hàng
        </button>
      </div>
    </div>
  `;

  document.getElementById('deleteCustomerConfirmContent').innerHTML = content;
  document.getElementById('deleteCustomerConfirmModal').classList.remove('hidden');
  document.getElementById('deleteCustomerConfirmModal').classList.add('flex');
}

function hideDeleteCustomerConfirmModal() {
  document.getElementById('deleteCustomerConfirmModal').classList.add('hidden');
  document.getElementById('deleteCustomerConfirmModal').classList.remove('flex');
}

function confirmDeleteCustomer(customerId) {
  const index = allCustomers.findIndex(c => c.id === customerId);
  if (index > -1) {
    allCustomers.splice(index, 1);
    renderCustomers();
    updateStatsCards();
    hideDeleteCustomerConfirmModal();
    alert('Đã xóa khách hàng thành công!');
  }
}

// Review Modal
function showReviewModal(reviewIndex) {
  const reviews = [
    {
      customer: 'Nguyễn Văn An', service: 'Spa & Grooming', partner: 'Pet Spa Luxury',
      rating: 5, comment: 'Dịch vụ tuyệt vời, nhân viên rất chu đáo!', date: '15/01/2024', status: 'approved'
    }
  ];

  const review = reviews[reviewIndex];

  const statusBadges = {
    'approved': '<span class="badge bg-green-100 text-green-700">Đã duyệt</span>',
    'pending': '<span class="badge bg-yellow-100 text-yellow-700">Chờ duyệt</span>',
    'rejected': '<span class="badge bg-red-100 text-red-700">Từ chối</span>'
  };

  const content = `<!-- Review modal content -->`;

  document.getElementById('reviewContent').innerHTML = content;
  document.getElementById('reviewModal').classList.remove('hidden');
  document.getElementById('reviewModal').classList.add('flex');
}

function hideReviewModal() {
  document.getElementById('reviewModal').classList.add('hidden');
  document.getElementById('reviewModal').classList.remove('flex');
}

// Update Review Stats
function updateReviewStats() {
  const total = allReviews.length;
  const reviews5 = allReviews.filter(r => r.rating === 5).length;
  const reviews4 = allReviews.filter(r => r.rating === 4).length;
  const reviewsLow = allReviews.filter(r => r.rating <= 3).length;
  
  const totalEl = document.getElementById('totalReviews');
  const reviews5El = document.getElementById('reviews5');
  const reviews4El = document.getElementById('reviews4');
  const reviewsLowEl = document.getElementById('reviewsLow');
  
  if (totalEl) totalEl.textContent = total;
  if (reviews5El) reviews5El.textContent = reviews5;
  if (reviews4El) reviews4El.textContent = reviews4;
  if (reviewsLowEl) reviewsLowEl.textContent = reviewsLow;
}

// Filter by Review Rating from stats cards
function filterByReviewRating(rating) {
  // Remove visual feedback from all cards
  document.querySelectorAll('[onclick^="filterByReviewRating"]').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-brand', 'shadow-xl');
  });
  
  // Add visual feedback to clicked card
  const clickedButton = event.target.closest('button');
  if (clickedButton) {
    clickedButton.classList.add('ring-2', 'ring-brand', 'shadow-xl');
  }
  
  // Update filter
  if (rating === 'all') {
    currentReviewFilter.rating = 'all';
    document.getElementById('reviewRatingFilter').value = 'all';
  } else if (rating === 'low') {
    // For low ratings, we'll filter by rating <= 2 in getFilteredReviews
    currentReviewFilter.rating = 'low';
    document.getElementById('reviewRatingFilter').value = 'all'; // Keep dropdown at 'all' for low ratings
  } else {
    currentReviewFilter.rating = rating;
    document.getElementById('reviewRatingFilter').value = rating;
  }
  
  // Apply filters
  applyReviewFilters();
}

// Get Filtered Reviews
function getFilteredReviews() {
  let filtered = [...allReviews];
  
  // Search filter
  if (currentReviewFilter.search) {
    const search = currentReviewFilter.search.toLowerCase();
    filtered = filtered.filter(review =>
      review.customerName.toLowerCase().includes(search) ||
      review.partner.toLowerCase().includes(search) ||
      review.comment.toLowerCase().includes(search) ||
      review.service.toLowerCase().includes(search)
    );
  }
  
  // Rating filter
  if (currentReviewFilter.rating === 'low') {
    // Hiển thị đánh giá thấp: 1-3 sao
    filtered = filtered.filter(review => review.rating >= 1 && review.rating <= 3);
  } else if (currentReviewFilter.rating !== 'all') {
    filtered = filtered.filter(review => review.rating === parseInt(currentReviewFilter.rating));
  }
  
  // Partner filter
  if (currentReviewFilter.partner) {
    filtered = filtered.filter(review => review.partner === currentReviewFilter.partner);
  }
  
  // Sort
  switch (currentReviewFilter.sort) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.dateValue) - new Date(a.dateValue));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.dateValue) - new Date(b.dateValue));
      break;
    case 'rating_desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'rating_asc':
      filtered.sort((a, b) => a.rating - b.rating);
      break;
  }
  
  return filtered;
}

// Render Reviews
function renderReviews() {
  const filtered = getFilteredReviews();
  
  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentReviewPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageReviews = filtered.slice(startIndex, endIndex);
  
  const ratingColors = {
    5: 'text-yellow-500',
    4: 'text-blue-500',
    3: 'text-gray-500',
    2: 'text-orange-500',
    1: 'text-red-500'
  };
  
  const html = `
    <div class="space-y-4">
      ${pageReviews.map(review => {
        const stars = Array(5).fill(0).map((_, i) => {
          if (i < review.rating) {
            return `<i class="fas fa-star ${ratingColors[review.rating]}"></i>`;
          } else {
            return `<i class="far fa-star text-gray-300"></i>`;
          }
        }).join('');
        
        return `
          <div class="card hover:shadow-lg transition">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brandDark text-white flex items-center justify-center font-bold flex-shrink-0">
                ${review.customerName.charAt(0)}
              </div>
              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <p class="font-semibold text-dark">${review.customerName}</p>
                    <p class="text-sm text-gray-500">${review.partner} • ${review.service}</p>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center gap-1 mb-1">
                      ${stars}
                    </div>
                    <p class="text-xs text-gray-500">${review.date}</p>
                  </div>
                </div>
                <p class="text-gray-700 mb-3">${review.comment}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span><i class="fas fa-receipt mr-1"></i>${review.orderId}</span>
                  <span><i class="fas fa-calendar mr-1"></i>${review.date}</span>
                </div>
              </div>
              <div class="flex gap-2">
                <button onclick="deleteReview(${review.id})" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center" title="Xóa đánh giá">
                  <i class="fas fa-trash text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  document.getElementById('reviewsContent').innerHTML = html;
  updateReviewsPagination(filtered.length);
}

// Update Reviews Pagination
function updateReviewsPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentReviewPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentReviewPage * itemsPerPage, totalItems);
  
  const infoEl = document.getElementById('reviewsPaginationInfo');
  if (infoEl) {
    infoEl.innerHTML = 
      `Hiển thị <span class="font-semibold">${startItem}-${endItem}</span> trong tổng số <span class="font-semibold">${totalItems}</span> đánh giá`;
  }

  const paginationDiv = document.getElementById('reviewsPaginationButtons');
  if (!paginationDiv) return;
  
  let buttons = '';

  buttons += `<button onclick="changeReviewPage(${currentReviewPage - 1})" 
    class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 ${currentReviewPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
    ${currentReviewPage === 1 ? 'disabled' : ''}>Trước</button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentReviewPage - 1 && i <= currentReviewPage + 1)) {
      buttons += `<button onclick="changeReviewPage(${i})" 
        class="px-4 py-2 rounded-lg ${i === currentReviewPage ? 'bg-brand text-white font-semibold' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}">${i}</button>`;
    } else if (i === currentReviewPage - 2 || i === currentReviewPage + 2) {
      buttons += `<span class="px-2 text-gray-400">...</span>`;
    }
  }

  buttons += `<button onclick="changeReviewPage(${currentReviewPage + 1})" 
    class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 ${currentReviewPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" 
    ${currentReviewPage === totalPages ? 'disabled' : ''}>Sau</button>`;

  paginationDiv.innerHTML = buttons;
}

// Change Review Page
function changeReviewPage(page) {
  const filtered = getFilteredReviews();
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentReviewPage = page;
    renderReviews();
  }
}

// Apply Review Filters
function applyReviewFilters() {
  // Get values from inputs
  currentReviewFilter.search = document.getElementById('reviewSearchInput').value;
  
  // Get rating from dropdown
  const dropdownRating = document.getElementById('reviewRatingFilter').value;
  
  // If dropdown is set to 'all' and current filter is 'low', keep 'low'
  // Otherwise, use the dropdown value (user changed it manually)
  if (dropdownRating === 'all' && currentReviewFilter.rating === 'low') {
    // Keep 'low' filter from stats card click
    // Don't update currentReviewFilter.rating
  } else {
    // User changed dropdown, use dropdown value
    currentReviewFilter.rating = dropdownRating;
  }
  
  currentReviewFilter.partner = document.getElementById('reviewPartnerFilter').value;
  currentReviewFilter.sort = document.getElementById('reviewSortFilter').value;
  
  currentReviewPage = 1;
  renderReviews();
}

// Reset Review Filters
function resetReviewFilters() {
  currentReviewFilter = { search: '', rating: 'all', partner: '', sort: 'newest' };
  document.getElementById('reviewSearchInput').value = '';
  document.getElementById('reviewRatingFilter').selectedIndex = 0;
  document.getElementById('reviewPartnerFilter').selectedIndex = 0;
  document.getElementById('reviewSortFilter').selectedIndex = 0;
  
  // Remove visual feedback from all stats cards
  document.querySelectorAll('[onclick^="filterByReviewRating"]').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-brand', 'shadow-xl');
  });
  
  currentReviewPage = 1;
  renderReviews();
}

// Delete Review
function deleteReview(reviewId) {
  if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
    const index = allReviews.findIndex(r => r.id === reviewId);
    if (index > -1) {
      allReviews.splice(index, 1);
      updateReviewStats();
      renderReviews();
      alert('Đã xóa đánh giá thành công!');
    }
  }
}