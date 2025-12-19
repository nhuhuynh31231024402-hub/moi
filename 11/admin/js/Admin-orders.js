// Orders data - 30 orders
const ordersData = [
  { id: '#BK20250001', customer: { name: 'Nguyễn Minh Anh', phone: '0901234567', avatar: 'NA' }, partner: 'Pet Wow', service: 'Tắm vệ sinh cắt tỉa', price: '380.000đ', commission: '15.000đ', status: 'completed', paymentStatus: 'paid', date: '15/01/2025 14:30', dateValue: '2025-01-15' },
  { id: '#BK20250002', customer: { name: 'Trần Thị Bảo Ngọc', phone: '0912345678', avatar: 'BN' }, partner: 'GẤU SPA THÚ CƯNG', service: 'Tắm vệ sinh cắt tỉa', price: '319.000đ', commission: '15.000đ', status: 'pending', paymentStatus: 'pending', date: '16/01/2025 10:00', dateValue: '2025-01-16' },
  { id: '#BK20250003', customer: { name: 'Lê Hoàng Cường', phone: '0923456789', avatar: 'HC' }, partner: '2VET', service: 'Tắm sấy + Triệt sản chó cái', price: '839.000đ', commission: '30.000đ', status: 'confirmed', paymentStatus: 'paid', date: '16/01/2025 16:00', dateValue: '2025-01-16' },
  { id: '#BK20250004', customer: { name: 'Phạm Thị Diệu Linh', phone: '0934567890', avatar: 'DL' }, partner: 'Tiệm nhà Sâu', service: 'Tắm cạo + Nhuộm', price: '750.000đ', commission: '30.000đ', status: 'processing', paymentStatus: 'paid', date: '17/01/2025 09:30', dateValue: '2025-01-17' },
  { id: '#BK20250005', customer: { name: 'Hoàng Văn Đức', phone: '0945678901', avatar: 'VD' }, partner: 'Lumi Pet Shop', service: 'Nhuộm + Tắm vệ sinh', price: '650.000đ', commission: '30.000đ', status: 'cancelled', paymentStatus: 'refunded', date: '17/01/2025 14:00', dateValue: '2025-01-17' },
  { id: '#BK20250006', customer: { name: 'Võ Thị Phương', phone: '0956789012', avatar: 'TP' }, partner: 'Pet Wow', service: 'Tắm sấy', price: '150.000đ', commission: '15.000đ', status: 'completed', paymentStatus: 'paid', date: '18/01/2025 08:00', dateValue: '2025-01-18' },
  { id: '#BK20250007', customer: { name: 'Đỗ Văn Giang', phone: '0967890123', avatar: 'VG' }, partner: 'PAO PET', service: 'Cắt mài móng', price: '120.000đ', commission: '15.000đ', status: 'pending', paymentStatus: 'pending', date: '18/01/2025 11:30', dateValue: '2025-01-18' },
  { id: '#BK20250008', customer: { name: 'Bùi Thị Hương', phone: '0978901234', avatar: 'TH' }, partner: 'PetGrocer', service: 'Vệ sinh, nhổ lông tai', price: '180.000đ', commission: '15.000đ', status: 'confirmed', paymentStatus: 'paid', date: '19/01/2025 10:00', dateValue: '2025-01-19' },
  { id: '#BK20250009', customer: { name: 'Ngô Văn Hùng', phone: '0989012345', avatar: 'VH' }, partner: 'Bệnh Viện Thú Y C.well Pet', service: 'Khám bệnh cơ bản', price: '250.000đ', commission: '30.000đ', status: 'processing', paymentStatus: 'paid', date: '19/01/2025 14:00', dateValue: '2025-01-19' },
  { id: '#BK20250010', customer: { name: 'Lý Thị Kiều', phone: '0990123456', avatar: 'TK' }, partner: 'PHÒNG KHÁM THÚ Y NASA PET', service: 'Gói khám sức khoẻ tổng quát', price: '450.000đ', commission: '30.000đ', status: 'completed', paymentStatus: 'paid', date: '20/01/2025 09:00', dateValue: '2025-01-20' },
  { id: '#BK20250011', customer: { name: 'Trương Văn Long', phone: '0901234568', avatar: 'VL' }, partner: '2VET', service: 'Triệt sản', price: '650.000đ', commission: '30.000đ', status: 'pending', paymentStatus: 'pending', date: '20/01/2025 15:30', dateValue: '2025-01-20' },
  { id: '#BK20250012', customer: { name: 'Phan Thị Mai', phone: '0912345679', avatar: 'TM' }, partner: 'Tiệm nhà Sâu', service: 'Tắm vệ sinh cắt tỉa', price: '420.000đ', commission: '15.000đ', status: 'confirmed', paymentStatus: 'paid', date: '21/01/2025 08:30', dateValue: '2025-01-21' },
  { id: '#BK20250013', customer: { name: 'Hồ Văn Nam', phone: '0923456780', avatar: 'VN' }, partner: 'GẤU SPA THÚ CƯNG', service: 'Nhuộm', price: '550.000đ', commission: '30.000đ', status: 'processing', paymentStatus: 'paid', date: '21/01/2025 11:00', dateValue: '2025-01-21' },
  { id: '#BK20250014', customer: { name: 'Dương Thị Oanh', phone: '0934567891', avatar: 'TO' }, partner: 'Lumi Pet Shop', service: 'Tắm cạo', price: '280.000đ', commission: '15.000đ', status: 'completed', paymentStatus: 'paid', date: '22/01/2025 10:00', dateValue: '2025-01-22' },
  { id: '#BK20250015', customer: { name: 'Vũ Văn Phong', phone: '0945678902', avatar: 'VP' }, partner: 'Pet Wow', service: 'Tắm vệ sinh', price: '200.000đ', commission: '15.000đ', status: 'cancelled', paymentStatus: 'refunded', date: '22/01/2025 13:00', dateValue: '2025-01-22' },
  { id: '#BK20250016', customer: { name: 'Đặng Thị Quỳnh', phone: '0956789013', avatar: 'TQ' }, partner: 'Phòng Khám Thú Y Pets & Min', service: 'Xét nghiệm máu cơ bản', price: '350.000đ', commission: '30.000đ', status: 'pending', paymentStatus: 'pending', date: '23/01/2025 09:00', dateValue: '2025-01-23' },
  { id: '#BK20250017', customer: { name: 'Tôn Văn Quang', phone: '0967890124', avatar: 'VQ' }, partner: 'Bệnh Viện Thú Y Pet Pro Cộng Hòa', service: 'Siêu âm bụng', price: '400.000đ', commission: '30.000đ', status: 'confirmed', paymentStatus: 'paid', date: '23/01/2025 14:30', dateValue: '2025-01-23' },
  { id: '#BK20250018', customer: { name: 'Lưu Thị Sương', phone: '0978901235', avatar: 'TS' }, partner: 'PAO PET', service: 'Tắm vệ sinh cắt tỉa', price: '380.000đ', commission: '15.000đ', status: 'processing', paymentStatus: 'paid', date: '24/01/2025 08:00', dateValue: '2025-01-24' },
  { id: '#BK20250019', customer: { name: 'Chu Văn Thành', phone: '0989012346', avatar: 'VT' }, partner: '2VET', service: 'Cạo vôi răng', price: '300.000đ', commission: '30.000đ', status: 'completed', paymentStatus: 'paid', date: '24/01/2025 11:00', dateValue: '2025-01-24' },
  { id: '#BK20250020', customer: { name: 'Mai Thị Uyên', phone: '0990123457', avatar: 'TU' }, partner: 'Tiệm nhà Sâu', service: 'Tắm sấy', price: '180.000đ', commission: '15.000đ', status: 'pending', paymentStatus: 'pending', date: '25/01/2025 10:00', dateValue: '2025-01-25' },
  { id: '#BK20250021', customer: { name: 'Lâm Văn Việt', phone: '0901234569', avatar: 'VV' }, partner: 'Pet Wow', service: 'Tắm cạo + Nhuộm', price: '720.000đ', commission: '30.000đ', status: 'confirmed', paymentStatus: 'paid', date: '25/01/2025 15:00', dateValue: '2025-01-25' },
  { id: '#BK20250022', customer: { name: 'Thái Thị Xuân', phone: '0912345680', avatar: 'TX' }, partner: 'GẤU SPA THÚ CƯNG', service: 'Tắm vệ sinh', price: '220.000đ', commission: '15.000đ', status: 'processing', paymentStatus: 'paid', date: '26/01/2025 09:30', dateValue: '2025-01-26' },
  { id: '#BK20250023', customer: { name: 'Tạ Văn Yên', phone: '0923456781', avatar: 'VY' }, partner: 'Lumi Pet Shop', service: 'Tắm vệ sinh cắt tỉa', price: '450.000đ', commission: '15.000đ', status: 'completed', paymentStatus: 'paid', date: '26/01/2025 13:00', dateValue: '2025-01-26' },
  { id: '#BK20250024', customer: { name: 'Lê Thị Yến', phone: '0934567892', avatar: 'TY' }, partner: 'PetGrocer', service: 'Cắt mài móng', price: '130.000đ', commission: '15.000đ', status: 'cancelled', paymentStatus: 'refunded', date: '27/01/2025 08:00', dateValue: '2025-01-27' },
  { id: '#BK20250025', customer: { name: 'Nguyễn Văn An', phone: '0945678903', avatar: 'VA' }, partner: 'Bệnh Viện Thú Y C.well Pet', service: 'Dịch vụ chuyên khoa', price: '550.000đ', commission: '30.000đ', status: 'pending', paymentStatus: 'pending', date: '27/01/2025 12:00', dateValue: '2025-01-27' },
  { id: '#BK20250026', customer: { name: 'Trần Thị Bích', phone: '0956789014', avatar: 'TB' }, partner: 'PHÒNG KHÁM THÚ Y NASA PET', service: 'Triệt sản', price: '680.000đ', commission: '30.000đ', status: 'confirmed', paymentStatus: 'paid', date: '28/01/2025 10:00', dateValue: '2025-01-28' },
  { id: '#BK20250027', customer: { name: 'Lê Văn Cảnh', phone: '0967890125', avatar: 'VC' }, partner: 'PAO PET', service: 'Tắm sấy', price: '160.000đ', commission: '15.000đ', status: 'processing', paymentStatus: 'paid', date: '28/01/2025 14:00', dateValue: '2025-01-28' },
  { id: '#BK20250028', customer: { name: 'Phạm Thị Dung', phone: '0978901236', avatar: 'TD' }, partner: '2VET', service: 'Khám bệnh cơ bản', price: '280.000đ', commission: '30.000đ', status: 'completed', paymentStatus: 'paid', date: '29/01/2025 09:00', dateValue: '2025-01-29' },
  { id: '#BK20250029', customer: { name: 'Hoàng Văn Em', phone: '0989012347', avatar: 'VE' }, partner: 'Tiệm nhà Sâu', service: 'Nhuộm', price: '600.000đ', commission: '30.000đ', status: 'pending', paymentStatus: 'pending', date: '29/01/2025 16:00', dateValue: '2025-01-29' },
  { id: '#BK20250030', customer: { name: 'Võ Thị Phượng', phone: '0990123458', avatar: 'TP' }, partner: 'Pet Wow', service: 'Tắm vệ sinh cắt tỉa', price: '390.000đ', commission: '15.000đ', status: 'confirmed', paymentStatus: 'paid', date: '30/01/2025 11:00', dateValue: '2025-01-30' }
];

// Status mapping
          const statusMap = {
            'pending': 'Chờ xác nhận',
            'confirmed': 'Đã xác nhận',
            'processing': 'Đang xử lý',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy'
          };

const statusBadgeMap = {
  'pending': 'bg-yellow-100 text-yellow-700',
  'confirmed': 'bg-blue-100 text-blue-700',
  'processing': 'bg-purple-100 text-purple-700',
  'completed': 'bg-green-100 text-green-700',
  'cancelled': 'bg-red-100 text-red-700'
};

const paymentBadgeMap = {
  'paid': 'bg-green-100 text-green-700',
  'pending': 'bg-yellow-100 text-yellow-700',
  'refunded': 'bg-red-100 text-red-700'
};

const paymentTextMap = {
  'paid': 'Đã thanh toán',
  'pending': 'Chờ thanh toán',
  'refunded': 'Đã hoàn tiền'
};

// Global variables
let currentPage = 1;
const itemsPerPage = 10;
let filteredOrders = [...ordersData];
let selectedStatus = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  renderOrders();
  updatePagination();
  updateStats();
});

// Render orders table
function renderOrders() {
  const tbody = document.getElementById('ordersTableBody');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageOrders = filteredOrders.slice(startIndex, endIndex);

  tbody.innerHTML = pageOrders.map((order, index) => {
    // Find order index in ordersData by ID to ensure correct reference
    const orderIndex = ordersData.findIndex(o => o.id === order.id);
    // Use order ID as fallback identifier
    const orderId = order.id;
    return `
      <tr class="hover:bg-cream transition" data-order-id="${orderId}">
        <td class="px-6 py-4">
          <span class="font-semibold text-brand">${order.id}</span>
        </td>
        <td class="px-6 py-4">
          <div>
            <p class="font-semibold text-dark">${order.customer.name}</p>
            <p class="text-sm text-gray-500">${order.customer.phone}</p>
          </div>
        </td>
        <td class="px-6 py-4">
          <p class="font-medium text-dark">${order.partner}</p>
        </td>
        <td class="px-6 py-4">
          <p class="text-dark">${order.service}</p>
        </td>
        <td class="px-6 py-4">
          <p class="font-semibold text-dark">${order.price}</p>
        </td>
        <td class="px-6 py-4">
          <p class="font-semibold text-accent">${order.commission}</p>
        </td>
        <td class="px-6 py-4">
          <span class="badge ${statusBadgeMap[order.status]}">${statusMap[order.status]}</span>
        </td>
        <td class="px-6 py-4">
          <span class="badge ${paymentBadgeMap[order.paymentStatus]}">${paymentTextMap[order.paymentStatus]}</span>
        </td>
        <td class="px-6 py-4">
          <p class="text-sm text-gray-600">${order.date}</p>
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center justify-center gap-2">
            <button onclick="showOrderModalByOrderId('${orderId}')"
              class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition" title="Xem chi tiết">
              <i class="fas fa-eye text-sm"></i>
            </button>
            <button onclick="editOrderByOrderId('${orderId}')"
              class="w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition" title="Chỉnh sửa">
              <i class="fas fa-edit text-sm"></i>
            </button>
            <button onclick="deleteOrderByOrderId('${orderId}')"
              class="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition" title="Xóa">
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredOrders.length);
  
  // Update pagination info
  document.getElementById('paginationInfo').innerHTML = 
    `Hiển thị <span class="font-semibold">${startItem}-${endItem}</span> trong tổng số <span class="font-semibold">${filteredOrders.length}</span> đơn`;

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

// Change page
function changePage(page) {
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderOrders();
    updatePagination();
  }
}

// Filter by status
function filterByStatus(status) {
  selectedStatus = status;
  
  // Update active state for stats cards
  document.querySelectorAll('[onclick^="filterByStatus"]').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-brand', 'shadow-xl');
  });
  event.target.closest('button').classList.add('ring-2', 'ring-brand', 'shadow-xl');

  // Apply status filter
  applyFilters();
}

// Reset filters
function resetFilters() {
  document.getElementById('filterSearch').value = '';
  document.getElementById('filterPartner').value = '';
  document.getElementById('filterService').value = '';
  document.getElementById('filterDate').value = '';
  
  // Reset status
  selectedStatus = 'all';
  document.querySelectorAll('[onclick^="filterByStatus"]').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-brand', 'shadow-xl');
  });
  
  // Apply reset
  applyFilters();
}

// Apply filters
function applyFilters() {
  const searchTerm = document.getElementById('filterSearch').value.toLowerCase();
  const partnerFilter = document.getElementById('filterPartner').value;
  const serviceFilter = document.getElementById('filterService').value;
  const dateFilter = document.getElementById('filterDate').value;

  filteredOrders = ordersData.filter(order => {
    // Status filter
    if (selectedStatus !== 'all' && order.status !== selectedStatus) {
      return false;
    }

    // Search filter
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm) && 
        !order.customer.name.toLowerCase().includes(searchTerm) &&
        !order.customer.phone.includes(searchTerm)) {
      return false;
    }

    // Partner filter
    if (partnerFilter && order.partner !== partnerFilter) {
      return false;
    }

    // Service filter
    if (serviceFilter && order.service !== serviceFilter) {
      return false;
    }

    // Date filter
    if (dateFilter && order.dateValue !== dateFilter) {
      return false;
    }

    return true;
  });

  currentPage = 1;
  renderOrders();
  updatePagination();
  updateStats();
}

// Update stats
function updateStats() {
  const stats = {
    all: filteredOrders.length,
    pending: filteredOrders.filter(o => o.status === 'pending').length,
    confirmed: filteredOrders.filter(o => o.status === 'confirmed').length,
    processing: filteredOrders.filter(o => o.status === 'processing').length,
    completed: filteredOrders.filter(o => o.status === 'completed').length,
    cancelled: filteredOrders.filter(o => o.status === 'cancelled').length
  };

  document.getElementById('stat-all').textContent = stats.all;
  document.getElementById('stat-pending').textContent = stats.pending;
  document.getElementById('stat-confirmed').textContent = stats.confirmed;
  document.getElementById('stat-processing').textContent = stats.processing;
  document.getElementById('stat-completed').textContent = stats.completed;
  document.getElementById('stat-cancelled').textContent = stats.cancelled;
}

// Helper function to find order by ID
function findOrderById(orderId) {
  return ordersData.find(o => o.id === orderId);
}

function findOrderIndexById(orderId) {
  return ordersData.findIndex(o => o.id === orderId);
    }

    // Order Modal Functions
function showOrderModalByOrderId(orderId) {
  const order = findOrderById(orderId);
  if (!order) {
    alert('Không tìm thấy đơn hàng!');
    applyFilters();
    return;
  }
  showOrderModal(order);
}

function showOrderModal(order) {
  // Accept either order object or orderId
  const orderObj = typeof order === 'string' ? findOrderById(order) : order;
  if (!orderObj) {
    alert('Không tìm thấy đơn hàng!');
    return;
  }

      const statusBadges = {
        pending: '<span class="badge bg-yellow-100 text-yellow-700">Chờ xác nhận</span>',
        confirmed: '<span class="badge bg-blue-100 text-blue-700">Đã xác nhận</span>',
        processing: '<span class="badge bg-purple-100 text-purple-700">Đang xử lý</span>',
        completed: '<span class="badge bg-green-100 text-green-700">Hoàn thành</span>',
        cancelled: '<span class="badge bg-red-100 text-red-700">Đã hủy</span>'
      };

      const paymentBadges = {
        paid: '<span class="badge bg-green-100 text-green-700">Đã thanh toán</span>',
        pending: '<span class="badge bg-yellow-100 text-yellow-700">Chờ thanh toán</span>',
        refunded: '<span class="badge bg-red-100 text-red-700">Đã hoàn tiền</span>'
      };

      const content = `
        <!-- Order Info -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Mã đơn hàng</p>
            <p class="text-xl font-bold text-brand">${orderObj.id}</p>
          </div>
          <div class="text-right">
            ${statusBadges[orderObj.status]}
            <div class="mt-2">${paymentBadges[orderObj.paymentStatus]}</div>
          </div>
        </div>

        <!-- Customer Info -->
        <div class="card bg-cream">
          <h4 class="font-bold text-dark mb-4 flex items-center gap-2">
            <i class="fas fa-user text-brand"></i>
            Thông tin khách hàng
          </h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Họ tên</p>
              <p class="font-semibold">${orderObj.customer.name}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Số điện thoại</p>
              <p class="font-semibold">${orderObj.customer.phone}</p>
            </div>
          </div>
        </div>

        <!-- Service Info -->
        <div class="card bg-cream">
          <h4 class="font-bold text-dark mb-4 flex items-center gap-2">
            <i class="fas fa-calendar text-brand"></i>
            Thông tin dịch vụ
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Đối tác</span>
              <span class="font-semibold">${orderObj.partner}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Dịch vụ</span>
              <span class="font-semibold">${orderObj.service}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Thời gian</span>
              <span class="font-semibold">${orderObj.date}</span>
            </div>
            <div class="border-t border-gray-200 pt-3 mt-3">
              <div class="flex justify-between text-lg">
                <span class="font-semibold">Tổng tiền</span>
                <span class="font-bold text-brand">${orderObj.price}</span>
              </div>
              <div class="flex justify-between text-sm mt-2">
                <span class="text-gray-600">Hoa hồng PawJoy</span>
                <span class="font-semibold text-accent">${orderObj.commission}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="card bg-cream">
          <h4 class="font-bold text-dark mb-4 flex items-center gap-2">
            <i class="fas fa-history text-brand"></i>
            Lịch sử cập nhật
          </h4>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-plus-circle text-xs"></i>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-dark">Đơn được tạo</p>
                <p class="text-sm text-gray-500">${orderObj.date}</p>
              </div>
            </div>
        ${orderObj.status !== 'pending' ? `
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-check-circle text-xs"></i>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-dark">Đối tác xác nhận</p>
                <p class="text-sm text-gray-500">${orderObj.date}</p>
              </div>
            </div>
        ` : ''}
            ${orderObj.paymentStatus === 'paid' || orderObj.paymentStatus === 'refunded' ? `
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-credit-card text-xs"></i>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-dark">${orderObj.paymentStatus === 'refunded' ? 'Đã hoàn tiền' : 'Thanh toán thành công'}</p>
                <p class="text-sm text-gray-500">${orderObj.date}</p>
              </div>
            </div>
            ` : ''}
            ${orderObj.status === 'completed' ? `
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-flag-checkered text-xs"></i>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-dark">Hoàn thành dịch vụ</p>
                <p class="text-sm text-gray-500">${orderObj.date}</p>
              </div>
            </div>
            ` : ''}
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button class="flex-1 px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition">
            <i class="fas fa-print mr-2"></i>In phiếu
          </button>
          <button class="flex-1 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brandDark transition">
            <i class="fas fa-edit mr-2"></i>Cập nhật trạng thái
          </button>
        </div>
      `;

  document.getElementById('orderContent').innerHTML = content;
  document.getElementById('orderModal').classList.remove('hidden');
  document.getElementById('orderModal').classList.add('flex');
}

function hideOrderModal() {
  document.getElementById('orderModal').classList.add('hidden');
  document.getElementById('orderModal').classList.remove('flex');
}

// Edit Order Function
function editOrderByOrderId(orderId) {
  const order = findOrderById(orderId);
  if (!order) {
    alert('Không tìm thấy đơn hàng!');
    applyFilters();
    return;
  }
  editOrder(order);
}

function editOrder(order) {
  // Accept either order object or orderId
  const orderObj = typeof order === 'string' ? findOrderById(order) : order;
  if (!orderObj) {
    alert('Không tìm thấy đơn hàng!');
    return;
  }
  
  const statusOptions = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    processing: 'Đang xử lý',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  };

  const paymentOptions = {
    paid: 'Đã thanh toán',
    pending: 'Chờ thanh toán',
    refunded: 'Đã hoàn tiền'
  };

  const orderId = orderObj.id;
  const orderIndex = findOrderIndexById(orderId);
  
  const content = `
    <form id="editOrderForm" onsubmit="saveOrderChanges(event, '${orderId}')">
      <!-- Order ID (readonly) -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Mã đơn hàng</label>
        <input type="text" value="${orderObj.id}" readonly
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600">
      </div>

      <!-- Status -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Trạng thái đơn hàng</label>
        <select id="editStatus" name="status" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
          ${Object.entries(statusOptions).map(([key, label]) => 
            `<option value="${key}" ${orderObj.status === key ? 'selected' : ''}>${label}</option>`
          ).join('')}
        </select>
      </div>

      <!-- Payment Status -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Trạng thái thanh toán</label>
        <select id="editPaymentStatus" name="paymentStatus" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
          ${Object.entries(paymentOptions).map(([key, label]) => 
            `<option value="${key}" ${orderObj.paymentStatus === key ? 'selected' : ''}>${label}</option>`
          ).join('')}
        </select>
      </div>

      <!-- Price -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Giá trị đơn hàng</label>
        <input type="text" id="editPrice" name="price" value="${orderObj.price}"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
      </div>

      <!-- Commission -->
      <div class="card bg-cream">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Hoa hồng</label>
        <input type="text" id="editCommission" name="commission" value="${orderObj.commission}"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand outline-none">
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button type="button" onclick="hideEditOrderModal()"
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

  document.getElementById('editOrderContent').innerHTML = content;
  document.getElementById('editOrderModal').classList.remove('hidden');
  document.getElementById('editOrderModal').classList.add('flex');
}

function hideEditOrderModal() {
  document.getElementById('editOrderModal').classList.add('hidden');
  document.getElementById('editOrderModal').classList.remove('flex');
}

function saveOrderChanges(event, orderId) {
  event.preventDefault();
  
  const order = findOrderById(orderId);
  if (!order) {
    alert('Không tìm thấy đơn hàng!');
    applyFilters();
    hideEditOrderModal();
    return;
  }
  
  const newStatus = document.getElementById('editStatus').value;
  const newPaymentStatus = document.getElementById('editPaymentStatus').value;
  const newPrice = document.getElementById('editPrice').value;
  const newCommission = document.getElementById('editCommission').value;

  // Update order data
  order.status = newStatus;
  order.paymentStatus = newPaymentStatus;
  order.price = newPrice;
  order.commission = newCommission;

  // Show success message
  alert('Đã cập nhật đơn hàng thành công!');

  // Refresh display
  applyFilters();
  hideEditOrderModal();
}

// Delete Order Function
function deleteOrderByOrderId(orderId) {
  const order = findOrderById(orderId);
  if (!order) {
    alert('Không tìm thấy đơn hàng!');
    applyFilters();
    return;
  }
  deleteOrder(order);
}

function deleteOrder(order) {
  // Accept either order object or orderId
  const orderObj = typeof order === 'string' ? findOrderById(order) : order;
  if (!orderObj) {
    alert('Không tìm thấy đơn hàng!');
    return;
  }
  showDeleteConfirmModal(orderObj);
}

function showDeleteConfirmModal(order) {
  const content = `
    <div class="space-y-4">
      <!-- Warning Icon -->
      <div class="flex justify-center">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
        </div>
      </div>

      <!-- Message -->
      <div class="text-center">
        <p class="text-lg font-semibold text-dark mb-2">
          Bạn có chắc chắn muốn xóa đơn hàng <span class="text-brand">${order.id}</span>?
        </p>
        <p class="text-sm text-gray-600 mb-4">Hành động này không thể hoàn tác!</p>
      </div>

      <!-- Order Details -->
      <div class="card bg-cream">
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Khách hàng:</span>
            <span class="font-semibold text-dark">${order.customer.name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Đối tác:</span>
            <span class="font-semibold text-dark">${order.partner}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Dịch vụ:</span>
            <span class="font-semibold text-dark">${order.service}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Giá trị:</span>
            <span class="font-semibold text-dark">${order.price}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button type="button" onclick="hideDeleteConfirmModal()"
          class="btn-cancel flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold">
          <i class="fas fa-times mr-2"></i>Hủy
        </button>
        <button type="button" onclick="confirmDeleteOrder('${order.id}')"
          class="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
          <i class="fas fa-trash mr-2"></i>Xóa
        </button>
      </div>
    </div>
  `;

  document.getElementById('deleteConfirmContent').innerHTML = content;
  document.getElementById('deleteConfirmModal').classList.remove('hidden');
  document.getElementById('deleteConfirmModal').classList.add('flex');
}

function hideDeleteConfirmModal() {
  document.getElementById('deleteConfirmModal').classList.add('hidden');
  document.getElementById('deleteConfirmModal').classList.remove('flex');
}

function confirmDeleteOrder(orderId) {
  const order = findOrderById(orderId);
  if (!order) {
    alert('Không tìm thấy đơn hàng!');
    hideDeleteConfirmModal();
    applyFilters();
    return;
  }

  // Remove from ordersData by ID
  const index = findOrderIndexById(orderId);
  if (index > -1) {
    ordersData.splice(index, 1);
  }

  // Hide modal
  hideDeleteConfirmModal();

  // Show success message
  alert('Đã xóa đơn hàng thành công!');

  // Refresh display - this will update filteredOrders automatically
  applyFilters();
}
