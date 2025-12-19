// Finance Stats Data
const financeStats = {
  currentMonth: {
    gmv: 685500000,        // Tổng giá trị giao dịch
    commission: 54840000,  // Phí hoa hồng (8% của GMV)
    serviceFee: 13710000,  // Phí dịch vụ
    revenue: 68550000      // Doanh thu hệ thống (commission + serviceFee)
  },
  previousMonth: {
    gmv: 550000000,
    commission: 44000000,
    serviceFee: 11000000,
    revenue: 55000000
  }
};

// Format currency
function formatCurrency(amount) {
  if (amount >= 1000000000) {
    return `₫${(amount / 1000000000).toFixed(2)}B`;
  } else if (amount >= 1000000) {
    return `₫${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `₫${(amount / 1000).toFixed(0)}K`;
  }
  return `₫${amount.toLocaleString('vi-VN')}`;
}

// Calculate percentage change
function calculateChange(current, previous) {
  if (previous === 0) return { value: 0, isPositive: true };
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change).toFixed(1),
    isPositive: change >= 0
  };
}

// Update Finance Stats
function updateFinanceStats() {
  const stats = financeStats.currentMonth;
  const prevStats = financeStats.previousMonth;
  
  // GMV
  const gmvChange = calculateChange(stats.gmv, prevStats.gmv);
  document.getElementById('totalGMV').textContent = formatCurrency(stats.gmv);
  document.getElementById('gmvChange').innerHTML = 
    `<i class="fas fa-arrow-${gmvChange.isPositive ? 'up' : 'down'} mr-1"></i>${gmvChange.isPositive ? '+' : '-'}${gmvChange.value}%`;
  document.getElementById('gmvChange').className = `text-sm font-semibold ${gmvChange.isPositive ? 'text-accent' : 'text-red-600'}`;
  
  // Revenue
  const revenueChange = calculateChange(stats.revenue, prevStats.revenue);
  document.getElementById('totalRevenue').textContent = formatCurrency(stats.revenue);
  document.getElementById('revenueChange').innerHTML = 
    `<i class="fas fa-arrow-${revenueChange.isPositive ? 'up' : 'down'} mr-1"></i>${revenueChange.isPositive ? '+' : '-'}${revenueChange.value}%`;
  document.getElementById('revenueChange').className = `text-sm font-semibold ${revenueChange.isPositive ? 'text-accent' : 'text-red-600'}`;
  
  // Commission
  const commissionChange = calculateChange(stats.commission, prevStats.commission);
  document.getElementById('totalCommission').textContent = formatCurrency(stats.commission);
  document.getElementById('commissionChange').innerHTML = 
    `<i class="fas fa-arrow-${commissionChange.isPositive ? 'up' : 'down'} mr-1"></i>${commissionChange.isPositive ? '+' : '-'}${commissionChange.value}%`;
  document.getElementById('commissionChange').className = `text-sm font-semibold ${commissionChange.isPositive ? 'text-accent' : 'text-red-600'}`;
  
  // Service Fee
  const serviceFeeChange = calculateChange(stats.serviceFee, prevStats.serviceFee);
  document.getElementById('totalServiceFee').textContent = formatCurrency(stats.serviceFee);
  document.getElementById('serviceFeeChange').innerHTML = 
    `<i class="fas fa-arrow-${serviceFeeChange.isPositive ? 'up' : 'down'} mr-1"></i>${serviceFeeChange.isPositive ? '+' : '-'}${serviceFeeChange.value}%`;
  document.getElementById('serviceFeeChange').className = `text-sm font-semibold ${serviceFeeChange.isPositive ? 'text-accent' : 'text-red-600'}`;
}

// Payouts data
const payoutsData = [
  {
    id: 1,
    partner: 'Pet Wow',
    bankAccount: 'VCB - 1234567890',
    amount: '₫12.5M',
    amountValue: 12500000,
    orders: 245,
    date: '15/01/2025',
    dateValue: '2025-01-15',
    method: 'Chuyển khoản',
    status: 'completed'
  },
  {
    id: 2,
    partner: 'PAO PET',
    bankAccount: 'TCB - 0987654321',
    amount: '₫8.7M',
    amountValue: 8700000,
    orders: 145,
    date: '14/01/2025',
    dateValue: '2025-01-14',
    method: 'Chuyển khoản',
    status: 'completed'
  },
  {
    id: 3,
    partner: '2VET',
    bankAccount: 'ACB - 1122334455',
    amount: '₫6.8M',
    amountValue: 6800000,
    orders: 167,
    date: '16/01/2025',
    dateValue: '2025-01-16',
    method: 'Chuyển khoản',
    status: 'pending'
  },
  {
    id: 4,
    partner: 'Tiệm nhà Sâu',
    bankAccount: 'MB - 9988776655',
    amount: '₫5.2M',
    amountValue: 5200000,
    orders: 145,
    date: '17/01/2025',
    dateValue: '2025-01-17',
    method: 'Chuyển khoản',
    status: 'pending'
  },
  {
    id: 5,
    partner: 'Lumi Pet Shop',
    bankAccount: 'VP - 5544332211',
    amount: '₫4.5M',
    amountValue: 4500000,
    orders: 123,
    date: '18/01/2025',
    dateValue: '2025-01-18',
    method: 'Chuyển khoản',
    status: 'requested'
  }
];

// Transactions data
const transactionsData = [
  {
    id: 1,
    type: 'payout',
    title: 'Thanh toán cho đối tác',
    partner: 'Pet Wow',
    amount: '-₫12.5M',
    amountValue: -12500000,
    date: '15/01/2025 14:30',
    dateValue: '2025-01-15'
  },
  {
    id: 2,
    type: 'commission',
    title: 'Hoa hồng: Tắm vệ sinh cắt tỉa',
    partner: 'Pet Wow - Đơn #BK20250001',
    amount: '+₫15K',
    amountValue: 15000,
    date: '15/01/2025 10:20',
    dateValue: '2025-01-15'
  },
  {
    id: 3,
    type: 'refund',
    title: 'Hoàn tiền khách hàng',
    partner: 'Đơn #BK20250005',
    amount: '-₫1.2M',
    amountValue: -1200000,
    date: '13/01/2025 09:15',
    dateValue: '2025-01-13'
  },
  {
    id: 4,
    type: 'payout',
    title: 'Thanh toán cho đối tác',
    partner: 'PAO PET',
    amount: '-₫8.2M',
    amountValue: -8200000,
    date: '14/01/2025 16:45',
    dateValue: '2025-01-14'
  },
  {
    id: 5,
    type: 'commission',
    title: 'Hoa hồng: Tắm vệ sinh cắt tỉa',
    partner: 'GẤU SPA THÚ CƯNG - Đơn #BK20250002',
    amount: '+₫15K',
    amountValue: 15000,
    date: '14/01/2025 11:30',
    dateValue: '2025-01-14'
  }
];

let currentPayoutFilter = { search: '', status: '', sort: 'newest' };
let currentTransactionFilter = { type: '' };

// Đợi DOM load xong mới khởi tạo charts
document.addEventListener('DOMContentLoaded', function() {
  // Update finance stats
  updateFinanceStats();
  
  renderPayouts();
  renderTransactions();
  
  // Event listeners removed - filters now apply manually via "Áp dụng" button
  
  // Revenue Chart - Doanh thu theo tháng
  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
          label: 'Doanh thu hệ thống (triệu ₫)',
          data: [55.0, 58.5, 62.0, 68.5, 72.0, 68.5],
          borderColor: '#D97706',
          backgroundColor: 'rgba(217, 119, 6, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#D97706',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }, {
          label: 'Hoa hồng (triệu ₫)',
          data: [44.0, 46.8, 49.6, 54.8, 57.6, 54.8],
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#059669',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: { family: 'Plus Jakarta Sans', size: 12 },
              padding: 15
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // Service Chart - Dòng tiền theo dịch vụ
  const serviceCtx = document.getElementById('serviceChart');
  if (serviceCtx) {
    new Chart(serviceCtx, {
      type: 'bar',
      data: {
        labels: ['Spa', 'Thăm khám'],
        datasets: [{
          label: 'Hoa hồng (triệu ₫)',
          data: [32.9, 21.9],
          backgroundColor: ['#D97706', '#059669'],
          borderRadius: 8,
          borderWidth: 0
        }, {
          label: 'Phí dịch vụ (triệu ₫)',
          data: [8.2, 5.5],
          backgroundColor: ['#F59E0B', '#10B981'],
          borderRadius: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: { family: 'Plus Jakarta Sans', size: 12 },
              padding: 15
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
  
});

// Render Payouts Table
function renderPayouts() {
  let filtered = [...payoutsData];
  
  // Search filter
  if (currentPayoutFilter.search) {
    const search = currentPayoutFilter.search.toLowerCase();
    filtered = filtered.filter(payout =>
      payout.partner.toLowerCase().includes(search) ||
      payout.bankAccount.toLowerCase().includes(search)
    );
  }
  
  // Status filter
  if (currentPayoutFilter.status) {
    filtered = filtered.filter(payout => payout.status === currentPayoutFilter.status);
  }
  
  // Sort
  switch (currentPayoutFilter.sort) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.dateValue) - new Date(a.dateValue));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.dateValue) - new Date(b.dateValue));
      break;
    case 'amount_desc':
      filtered.sort((a, b) => b.amountValue - a.amountValue);
      break;
    case 'amount_asc':
      filtered.sort((a, b) => a.amountValue - b.amountValue);
      break;
  }
  
  const statusBadges = {
    completed: '<span class="badge bg-green-100 text-green-700">Đã thanh toán</span>',
    pending: '<span class="badge bg-yellow-100 text-yellow-700">Đang xử lý</span>',
    requested: '<span class="badge bg-blue-100 text-blue-700">Yêu cầu rút tiền</span>'
  };
  
  const html = filtered.map(payout => `
    <tr class="hover:bg-cream transition">
      <td class="px-6 py-4">
        <p class="font-semibold text-dark">${payout.partner}</p>
        <p class="text-sm text-gray-500">${payout.bankAccount}</p>
      </td>
      <td class="px-6 py-4">
        <p class="text-lg font-bold text-dark">${payout.amount}</p>
      </td>
      <td class="px-6 py-4">
        <p class="font-semibold text-gray-600">${payout.orders} đơn</p>
      </td>
      <td class="px-6 py-4">
        <p class="text-gray-600">${payout.date}</p>
      </td>
      <td class="px-6 py-4">
        <span class="badge bg-blue-100 text-blue-700">
          <i class="fas fa-university mr-1"></i>${payout.method}
        </span>
      </td>
      <td class="px-6 py-4">
        ${statusBadges[payout.status]}
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center justify-center gap-2">
          <button onclick="showPayoutModal(${payout.id})" class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition" title="Xem chi tiết">
            <i class="fas fa-eye text-sm"></i>
          </button>
          ${payout.status === 'pending' || payout.status === 'requested' ? `
          <button onclick="approvePayout(${payout.id})" class="w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition" title="Xác nhận thanh toán">
            <i class="fas fa-check text-sm"></i>
          </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('payoutsTableBody').innerHTML = html;
}

// Apply Payout Filters
function applyPayoutFilters() {
  currentPayoutFilter.search = document.getElementById('payoutSearch').value;
  currentPayoutFilter.status = document.getElementById('payoutStatusFilter').value;
  currentPayoutFilter.sort = document.getElementById('payoutSort').value;
  renderPayouts();
}

// Reset Payout Filters
function resetPayoutFilters() {
  currentPayoutFilter = { search: '', status: '', sort: 'newest' };
  document.getElementById('payoutSearch').value = '';
  document.getElementById('payoutStatusFilter').selectedIndex = 0;
  document.getElementById('payoutSort').selectedIndex = 0;
  renderPayouts();
}

// Render Transactions
function renderTransactions() {
  let filtered = [...transactionsData];
  
  // Type filter
  if (currentTransactionFilter.type) {
    filtered = filtered.filter(transaction => transaction.type === currentTransactionFilter.type);
  }
  
  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.dateValue) - new Date(a.dateValue));
  
  const typeIcons = {
    payout: { icon: 'fa-arrow-down', bg: 'bg-green-100', text: 'text-green-600' },
    commission: { icon: 'fa-arrow-down', bg: 'bg-green-100', text: 'text-green-600' },
    refund: { icon: 'fa-arrow-up', bg: 'bg-red-100', text: 'text-red-600' }
  };
  
  const html = filtered.map(transaction => {
    const iconStyle = typeIcons[transaction.type];
    return `
      <div class="flex items-center justify-between p-4 hover:bg-cream rounded-xl transition">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl ${iconStyle.bg} ${iconStyle.text} flex items-center justify-center">
            <i class="fas ${iconStyle.icon}"></i>
          </div>
          <div>
            <p class="font-semibold text-dark">${transaction.title}</p>
            <p class="text-sm text-gray-500">${transaction.partner}</p>
            <p class="text-xs text-gray-400">${transaction.date}</p>
          </div>
        </div>
        <p class="text-xl font-bold ${transaction.amountValue > 0 ? 'text-green-600' : 'text-red-600'}">${transaction.amount}</p>
      </div>
    `;
  }).join('');
  
  document.getElementById('transactionsList').innerHTML = html;
}

// Filter Transactions
function filterTransactions() {
  currentTransactionFilter.type = document.getElementById('transactionTypeFilter').value;
  renderTransactions();
}

// Approve Payout
function approvePayout(payoutId) {
  const payout = payoutsData.find(p => p.id === payoutId);
  if (!payout) {
    alert('Không tìm thấy thanh toán!');
    return;
  }
  
  if (confirm(`Xác nhận thanh toán ${payout.amount} cho ${payout.partner}?`)) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN');
    const dateTimeStr = `${dateStr} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    const dateValue = now.toISOString().split('T')[0];
    
    payout.status = 'completed';
    payout.date = dateStr;
    payout.dateValue = dateValue;
    
    // Thêm transaction mới
    transactionsData.unshift({
      id: transactionsData.length + 1,
      type: 'payout',
      title: 'Thanh toán cho đối tác',
      partner: payout.partner,
      amount: `-${payout.amount}`,
      amountValue: -payout.amountValue,
      date: dateTimeStr,
      dateValue: dateValue
    });
    
    renderPayouts();
    renderTransactions();
    hidePayoutModal();
    alert('Đã xác nhận thanh toán thành công!');
  }
}

// Reject Payout
function rejectPayout(payoutId) {
  const payout = payoutsData.find(p => p.id === payoutId);
  if (!payout) {
    alert('Không tìm thấy thanh toán!');
    return;
  }
  
  if (confirm(`Từ chối yêu cầu rút tiền ${payout.amount} của ${payout.partner}?`)) {
    payout.status = 'pending';
    renderPayouts();
    hidePayoutModal();
    alert('Đã từ chối yêu cầu rút tiền!');
  }
}

// Print Receipt
function printReceipt(payoutId) {
  const payout = payoutsData.find(p => p.id === payoutId);
  if (!payout) {
    alert('Không tìm thấy thanh toán!');
    return;
  }
  
  // Tạo nội dung biên nhận
  const receiptContent = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="text-align: center; margin-bottom: 20px;">BIÊN NHẬN THANH TOÁN</h2>
      <div style="margin-bottom: 15px;">
        <strong>Đối tác:</strong> ${payout.partner}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Số tiền:</strong> ${payout.amount}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Ngày thanh toán:</strong> ${payout.date}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Phương thức:</strong> ${payout.method}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Tài khoản:</strong> ${payout.bankAccount}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Số đơn hàng:</strong> ${payout.orders}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Phí xử lý:</strong> ₫25,000
      </div>
    </div>
  `;
  
  // Mở cửa sổ in
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Biên nhận thanh toán - ${payout.partner}</title>
      </head>
      <body>
        ${receiptContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// Process Batch Payment - Show Modal
function processBatchPayment() {
  const pendingPayouts = payoutsData.filter(p => p.status === 'pending' || p.status === 'requested');
  if (pendingPayouts.length === 0) {
    alert('Không có thanh toán nào đang chờ xử lý!');
    return;
  }
  
  // Tính tổng số tiền
  const totalAmount = pendingPayouts.reduce((sum, p) => sum + p.amountValue, 0);
  const totalAmountFormatted = totalAmount >= 1000000 
    ? `₫${(totalAmount / 1000000).toFixed(1)}M` 
    : `₫${(totalAmount / 1000).toFixed(0)}K`;
  
  // Tính tổng số đơn
  const totalOrders = pendingPayouts.reduce((sum, p) => sum + p.orders, 0);
  
  const content = `
    <div class="text-center">
      <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-brand/10 flex items-center justify-center">
        <i class="fas fa-money-bill-wave text-brand text-3xl"></i>
      </div>
      <h4 class="text-xl font-bold text-dark mb-4">Xác nhận thanh toán hàng loạt</h4>
      
      <!-- Thông tin tổng quan -->
      <div class="card bg-cream mb-6">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-sm text-gray-600 mb-1">Số đối tác</p>
            <p class="text-2xl font-bold text-dark">${pendingPayouts.length}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Tổng số tiền</p>
            <p class="text-2xl font-bold text-brand">${totalAmountFormatted}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Tổng số đơn</p>
            <p class="text-2xl font-bold text-dark">${totalOrders}</p>
          </div>
        </div>
      </div>
      
      <!-- Danh sách đối tác -->
      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-700 mb-3 text-left">Danh sách đối tác sẽ được thanh toán:</p>
        <div class="space-y-2 max-h-60 overflow-y-auto">
          ${pendingPayouts.map(payout => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div class="flex-1">
                <p class="font-semibold text-dark">${payout.partner}</p>
                <p class="text-sm text-gray-500">${payout.orders} đơn hàng</p>
              </div>
              <p class="font-bold text-brand">${payout.amount}</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <p class="text-gray-600 mb-6 text-sm">
        Bạn có chắc chắn muốn thanh toán cho <strong>${pendingPayouts.length} đối tác</strong> với tổng số tiền <strong>${totalAmountFormatted}</strong>?<br>
        Hành động này sẽ cập nhật trạng thái tất cả các thanh toán thành "Đã thanh toán".
      </p>
      
      <div class="flex gap-3">
        <button onclick="hideBatchPaymentConfirmModal()"
          class="btn-cancel flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold">
          <i class="fas fa-times mr-2"></i>Hủy
        </button>
        <button onclick="confirmBatchPayment()"
          class="flex-1 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brandDark transition">
          <i class="fas fa-check mr-2"></i>Xác nhận thanh toán
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('batchPaymentConfirmContent').innerHTML = content;
  document.getElementById('batchPaymentConfirmModal').classList.remove('hidden');
  document.getElementById('batchPaymentConfirmModal').classList.add('flex');
}

// Hide Batch Payment Confirm Modal
function hideBatchPaymentConfirmModal() {
  document.getElementById('batchPaymentConfirmModal').classList.add('hidden');
  document.getElementById('batchPaymentConfirmModal').classList.remove('flex');
}

// Confirm Batch Payment
function confirmBatchPayment() {
  const pendingPayouts = payoutsData.filter(p => p.status === 'pending' || p.status === 'requested');
  if (pendingPayouts.length === 0) {
    alert('Không có thanh toán nào đang chờ xử lý!');
    hideBatchPaymentConfirmModal();
    return;
  }
  
  // Tính tổng số tiền
  const totalAmount = pendingPayouts.reduce((sum, p) => sum + p.amountValue, 0);
  const totalAmountFormatted = totalAmount >= 1000000 
    ? `₫${(totalAmount / 1000000).toFixed(1)}M` 
    : `₫${(totalAmount / 1000).toFixed(0)}K`;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN');
  const dateTimeStr = `${dateStr} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
  const dateValue = now.toISOString().split('T')[0];
  
  // Cập nhật status và ngày cho tất cả pending payouts
  pendingPayouts.forEach(payout => {
    payout.status = 'completed';
    payout.date = dateStr;
    payout.dateValue = dateValue;
    
    // Thêm transaction mới vào danh sách
    transactionsData.unshift({
      id: transactionsData.length + 1,
      type: 'payout',
      title: 'Thanh toán cho đối tác',
      partner: payout.partner,
      amount: `-${payout.amount}`,
      amountValue: -payout.amountValue,
      date: dateTimeStr,
      dateValue: dateValue
    });
  });
  
  // Render lại cả payouts và transactions
  renderPayouts();
  renderTransactions();
  hideBatchPaymentConfirmModal();
  
  alert(`Đã thanh toán thành công cho ${pendingPayouts.length} đối tác!\nTổng số tiền: ${totalAmountFormatted}`);
}

// Payout Modal Functions
function showPayoutModal(payoutId) {
  const payout = payoutsData.find(p => p.id === payoutId);
  if (!payout) {
    alert('Không tìm thấy thanh toán!');
    return;
  }
  
  const statusBadges = {
    completed: '<span class="badge bg-green-100 text-green-700">Đã thanh toán</span>',
    pending: '<span class="badge bg-yellow-100 text-yellow-700">Đang xử lý</span>',
    requested: '<span class="badge bg-blue-100 text-blue-700">Yêu cầu rút tiền</span>',
    failed: '<span class="badge bg-red-100 text-red-700">Thất bại</span>'
  };

  const content = `
    <div class="card bg-cream">
      <div class="grid grid-cols-2 gap-6">
        <!-- Cột trái -->
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 mb-1">Đối tác</p>
            <p class="font-bold text-dark text-lg">${payout.partner}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Ngày yêu cầu</p>
            <p class="font-semibold text-dark">${payout.date}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Phương thức</p>
            <p class="font-semibold text-dark">${payout.method}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Số đơn hàng</p>
            <p class="font-semibold text-dark">${payout.orders}</p>
          </div>
        </div>
        
        <!-- Cột phải -->
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 mb-1">Số tiền</p>
            <p class="font-bold text-brand text-lg">${payout.amount}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Trạng thái</p>
            <div class="mt-1">${statusBadges[payout.status]}</div>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Tài khoản</p>
            <p class="font-semibold text-dark">${payout.bankAccount}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">Phí xử lý</p>
            <p class="font-semibold text-dark">₫25,000</p>
          </div>
        </div>
      </div>
    </div>

    ${payout.status === 'requested' ? `
    <div class="flex gap-3">
      <button onclick="rejectPayout(${payout.id})" class="flex-1 px-6 py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition">
        <i class="fas fa-times mr-2"></i>Từ chối
      </button>
      <button onclick="approvePayout(${payout.id})" class="flex-1 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brandDark transition">
        <i class="fas fa-check mr-2"></i>Phê duyệt
      </button>
    </div>
    ` : ''}

    ${payout.status === 'pending' ? `
    <div class="flex gap-3">
      <button onclick="hidePayoutModal()" class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
        <i class="fas fa-times mr-2"></i>Đóng
      </button>
      <button onclick="approvePayout(${payout.id})" class="flex-1 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brandDark transition">
        <i class="fas fa-check mr-2"></i>Xác nhận thanh toán
      </button>
    </div>
    ` : ''}

    ${payout.status === 'completed' ? `
    <button onclick="printReceipt(${payout.id})" class="w-full px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition">
      <i class="fas fa-print mr-2"></i>In biên nhận
    </button>
    ` : ''}
  `;

  document.getElementById('payoutContent').innerHTML = content;
  document.getElementById('payoutModal').classList.remove('hidden');
  document.getElementById('payoutModal').classList.add('flex');
}

function hidePayoutModal() {
  document.getElementById('payoutModal').classList.add('hidden');
  document.getElementById('payoutModal').classList.remove('flex');
}