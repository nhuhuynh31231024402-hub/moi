// Modal Functions
function showCreateModal() {
  document.getElementById('createModal').classList.remove('hidden');
  document.getElementById('createModal').classList.add('flex');
}

function hideCreateModal() {
  document.getElementById('createModal').classList.add('hidden');
  document.getElementById('createModal').classList.remove('flex');
}

function showDetailModal(voucherId) {
  const vouchers = [
    {
      id: 1,
      code: 'WELCOME2024',
      name: 'Chào mừng khách hàng mới',
      type: 'percentage',
      value: '20%',
      maxDiscount: '100K',
      minOrder: '200K',
      usage: 245,
      maxUsage: 1000,
      startDate: '01/01/2024',
      endDate: '31/12/2024',
      status: 'active',
      services: ['Tất cả dịch vụ'],
      conditions: 'Áp dụng cho khách hàng mới đăng ký'
    },
    {
      id: 2,
      code: 'SPA50K',
      name: 'Giảm 50K dịch vụ Spa',
      type: 'fixed',
      value: '50K',
      maxDiscount: '50K',
      minOrder: '300K',
      usage: 189,
      maxUsage: 500,
      startDate: '15/01/2024',
      endDate: '15/02/2024',
      status: 'active',
      services: ['Spa'],
      conditions: 'Áp dụng cho đơn từ 300K'
    },
    {
      id: 3,
      code: 'VET30',
      name: 'Giảm 30% dịch vụ thăm khám',
      type: 'percentage',
      value: '30%',
      maxDiscount: '150K',
      minOrder: '250K',
      usage: 156,
      maxUsage: 300,
      startDate: '01/02/2024',
      endDate: '28/02/2024',
      status: 'active',
      services: ['Thăm khám'],
      conditions: 'Áp dụng cho dịch vụ thăm khám'
    },
    {
      id: 4,
      code: 'TET2024',
      name: 'Khuyến mãi Tết Nguyên Đán',
      type: 'percentage',
      value: '15%',
      maxDiscount: '200K',
      minOrder: '500K',
      usage: 0,
      maxUsage: 2000,
      startDate: '08/02/2024',
      endDate: '18/02/2024',
      status: 'expired',
      services: ['Tất cả dịch vụ'],
      conditions: 'Chương trình Tết Nguyên Đán'
    },
    {
      id: 5,
      code: 'SPRING25',
      name: 'Chào xuân 2025',
      type: 'fixed',
      value: '75K',
      maxDiscount: '75K',
      minOrder: '400K',
      usage: 0,
      maxUsage: 800,
      startDate: '01/03/2024',
      endDate: '31/03/2024',
      status: 'scheduled',
      services: ['Spa', 'Thăm khám'],
      conditions: 'Chương trình chào xuân'
    }
  ];

  const voucher = vouchers[voucherId];
  const usagePercent = (voucher.usage / voucher.maxUsage * 100).toFixed(1);

  const statusBadges = {
    active: '<span class="badge bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>Đang hoạt động</span>',
    expired: '<span class="badge bg-red-100 text-red-700"><i class="fas fa-times-circle mr-1"></i>Đã hết hạn</span>',
    scheduled: '<span class="badge bg-blue-100 text-blue-700"><i class="fas fa-clock mr-1"></i>Sắp diễn ra</span>'
  };

  const content = `
    <div class="flex items-center justify-between mb-6">
      <div>
        <h4 class="text-2xl font-bold text-dark">${voucher.name}</h4>
        <p class="text-gray-600 mt-1">Mã: <span class="font-mono font-bold">${voucher.code}</span></p>
      </div>
      <div>${statusBadges[voucher.status]}</div>
    </div>

    <!-- Info Grid -->
    <div class="grid grid-cols-2 gap-6 mb-6">
      <div class="card bg-cream">
        <h5 class="font-bold text-dark mb-3">Giá trị giảm giá</h5>
        <p class="text-3xl font-bold text-brand">${voucher.value}</p>
        ${voucher.maxDiscount ? `<p class="text-sm text-gray-600 mt-1">Tối đa: ${voucher.maxDiscount}</p>` : ''}
      </div>

      <div class="card bg-cream">
        <h5 class="font-bold text-dark mb-3">Điều kiện</h5>
        <p class="text-lg font-semibold text-dark">Đơn tối thiểu: ${voucher.minOrder}</p>
        <p class="text-sm text-gray-600 mt-1">${voucher.conditions}</p>
      </div>
    </div>

    <!-- Usage Progress -->
    <div class="card bg-cream mb-6">
      <h5 class="font-bold text-dark mb-3">Tình trạng sử dụng</h5>
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-600">Đã sử dụng</span>
        <span class="text-sm font-semibold">${voucher.usage}/${voucher.maxUsage} (${usagePercent}%)</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div class="bg-brand h-3 rounded-full transition-all" style="width: ${usagePercent}%"></div>
      </div>
    </div>

    <!-- Details -->
    <div class="card bg-cream mb-6">
      <h5 class="font-bold text-dark mb-4">Chi tiết</h5>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-600">Ngày bắt đầu</p>
          <p class="font-semibold text-dark">${voucher.startDate}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Ngày kết thúc</p>
          <p class="font-semibold text-dark">${voucher.endDate}</p>
        </div>
        <div class="col-span-2">
          <p class="text-sm text-gray-600">Áp dụng cho dịch vụ</p>
          <div class="flex flex-wrap gap-2 mt-2">
            ${voucher.services.map(service => `
              <span class="badge bg-blue-100 text-blue-700">${service}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Usage History -->
    <div class="card bg-cream mb-6">
      <h5 class="font-bold text-dark mb-4">Lịch sử sử dụng gần đây</h5>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-gray-200">
          <div>
            <p class="font-semibold text-dark">Nguyễn Văn A</p>
            <p class="text-sm text-gray-600">Đơn #12345 - Giảm ${voucher.type === 'fixed' ? voucher.value : `${voucher.value} (${voucher.maxDiscount})`}</p>
          </div>
          <span class="text-sm text-gray-500">2 giờ trước</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      ${voucher.status === 'active' ? `
        <button class="flex-1 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-xl font-semibold hover:bg-yellow-200 transition">
          <i class="fas fa-pause mr-2"></i>Tạm dừng
        </button>
      ` : ''}
      <button class="flex-1 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brandDark transition">
        <i class="fas fa-edit mr-2"></i>Chỉnh sửa
      </button>
      <button class="flex-1 px-6 py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition">
        <i class="fas fa-trash mr-2"></i>Xóa
      </button>
    </div>
  `;

  document.getElementById('detailContent').innerHTML = content;
  document.getElementById('detailModal').classList.remove('hidden');
  document.getElementById('detailModal').classList.add('flex');
}

function hideDetailModal() {
  document.getElementById('detailModal').classList.add('hidden');
  document.getElementById('detailModal').classList.remove('flex');
}

// Update create button
document.addEventListener('DOMContentLoaded', function () {
  const createBtn = document.querySelector('button.btn-primary');
  if (createBtn) {
    createBtn.setAttribute('onclick', 'showCreateModal()');
  }
});