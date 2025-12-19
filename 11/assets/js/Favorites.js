/**
 * Favorites Page - Quản lý danh sách yêu thích
 */

let currentFilter = 'store'; // Chỉ hiển thị cửa hàng
let currentSort = 'newest';
let storesData = {}; // Dữ liệu cửa hàng từ stores.json

// Load stores data
async function loadStoresData() {
  try {
    const response = await fetch('../../data/stores.json');
    storesData = await response.json();
  } catch (error) {
    console.error('Error loading stores data:', error);
  }
}

// Get service tags for a store (for image overlay)
function getServiceTags(storeId) {
  const store = storesData[storeId];
  if (!store || !store.services) {
    return '<span class="bg-brand/90 backdrop-blur-sm px-3 py-1.5 rounded-full"><span class="text-xs font-bold text-white">Cửa hàng</span></span>';
  }

  const tags = [];
  
  if (store.services.includes('spa')) {
    tags.push(`
      <span class="bg-brandLight/95 backdrop-blur-sm text-brandDark text-[10px] font-semibold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-brand/30">
        <i class="fas fa-spa text-[9px] text-brand"></i>
        <span>Spa</span>
      </span>
    `);
  }
  
  if (store.services.includes('vet')) {
    tags.push(`
      <span class="bg-emerald-100/90 backdrop-blur-sm text-emerald-700 text-[10px] font-semibold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-emerald-200/50">
        <i class="fas fa-stethoscope text-[9px]"></i>
        <span>Thăm khám</span>
      </span>
    `);
  }

  if (tags.length === 0) {
    return '<span class="bg-brand/90 backdrop-blur-sm px-3 py-1.5 rounded-full"><span class="text-xs font-bold text-white">Cửa hàng</span></span>';
  }

  return tags.join('');
}

// Get service labels for category text
function getServiceLabels(storeId) {
  const store = storesData[storeId];
  if (!store || !store.services) {
    return 'Cửa hàng';
  }
  
  const labels = [];
  if (store.services.includes('spa')) labels.push('Spa');
  if (store.services.includes('vet')) labels.push('Thăm khám');
  
  return labels.length > 0 ? labels.join(' • ') : 'Cửa hàng';
}

// Load favorites when page loads
async function initFavorites() {
  // Load stores data first
  await loadStoresData();
  
  loadFavorites();
  if (typeof updateFavoriteBadge === 'function') {
    updateFavoriteBadge();
  }
  
  // Update badge periodically
  setInterval(() => {
    if (typeof updateFavoriteBadge === 'function') {
      updateFavoriteBadge();
    }
  }, 2000);
  
  // Listen for storage changes
  window.addEventListener('storage', () => {
    loadFavorites();
    if (typeof updateFavoriteBadge === 'function') {
      updateFavoriteBadge();
    }
  });
}

// Chạy ngay khi script load hoặc khi DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFavorites);
} else {
  // DOM đã sẵn sàng
  initFavorites();
}

/**
 * Load và hiển thị danh sách yêu thích
 */
function loadFavorites() {
  // Đảm bảo các element đã tồn tại
  const container = document.getElementById('favoritesList');
  const emptyState = document.getElementById('emptyState');
  const countElement = document.getElementById('favoritesCount');
  
  if (!container) {
    // Nếu chưa có element, thử lại sau 100ms
    setTimeout(loadFavorites, 100);
    return;
  }
  
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // Chỉ lọc cửa hàng (type === 'store')
  favorites = favorites.filter(item => item.type === 'store');
  
  // Apply sort
  favorites = sortFavoritesList(favorites);
  
  // Update count - chỉ đếm cửa hàng
  const allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const storeCount = allFavorites.filter(item => item.type === 'store').length;
  if (countElement) {
    countElement.textContent = `${storeCount} ${storeCount === 1 ? 'cửa hàng' : 'cửa hàng'} yêu thích`;
  }
  
  if (favorites.length === 0) {
    container.innerHTML = '';
    if (emptyState) {
      emptyState.classList.remove('hidden');
    }
    return;
  }
  
  if (emptyState) {
    emptyState.classList.add('hidden');
  }
  
  container.innerHTML = favorites.map(item => {
    const detailLink = `stores-detail.html?id=${item.id}`;
    
    return `
      <div class="favorite-store-card bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
        <div class="relative favorite-store-image-container overflow-hidden">
          <img src="${item.image || '../../assets/images/logo/LOGO PAWJOY.png'}" 
               alt="${item.name}" 
               class="favorite-store-image w-full h-48 object-cover"
               onerror="this.src='../../assets/images/logo/LOGO PAWJOY.png'">
          <button onclick="removeFavorite('${item.id}')" 
                  class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition shadow-lg group"
                  title="Xóa khỏi yêu thích">
            <i class="fas fa-heart text-lg group-hover:text-red-600"></i>
          </button>
          ${item.rating ? `
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <i class="fas fa-star text-yellow-400 text-sm"></i>
            <span class="text-sm font-bold text-dark">${item.rating}</span>
          </div>
          ` : ''}
          <div class="absolute bottom-3 left-3 flex items-center gap-2">
            ${getServiceTags(item.id)}
          </div>
        </div>
        <div class="p-5">
          <h4 class="font-bold text-dark text-lg mb-2">${item.name}</h4>
          <p class="text-sm text-gray-500 mb-2">${getServiceLabels(item.id)}</p>
          ${item.address ? `
          <div class="flex items-start gap-2 mb-3">
            <i class="fas fa-map-marker-alt text-gray-400 text-xs mt-1"></i>
            <p class="text-xs text-gray-400 flex-1">${item.address}</p>
          </div>
          ` : ''}
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-xs text-gray-500">Giá từ</p>
              <p class="font-bold text-brand text-lg">${item.price || 'Liên hệ'} ${item.price && !item.price.includes('VNĐ') && !item.price.includes('K') ? 'VNĐ' : ''}</p>
            </div>
            ${item.rating ? `
            <div class="text-right">
              <div class="flex items-center gap-1 mb-1">
                <i class="fas fa-star text-yellow-400 text-xs"></i>
                <span class="text-sm font-bold text-dark">${item.rating}</span>
              </div>
              <p class="text-xs text-gray-500">Đánh giá</p>
            </div>
            ` : ''}
          </div>
          <div class="flex gap-2">
            <a href="${detailLink}" 
               class="flex-1 py-3 bg-brand hover:bg-brandDark text-white rounded-lg font-semibold transition text-center">
              <i class="fas fa-eye mr-2"></i>Xem chi tiết
            </a>
            <button onclick="removeFavorite('${item.id}')" 
                    class="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition flex items-center justify-center"
                    title="Xóa khỏi yêu thích">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Filter favorites by type (không còn sử dụng, chỉ giữ lại để tránh lỗi)
 */
function filterFavorites(type) {
  // Không còn filter, chỉ hiển thị cửa hàng
  loadFavorites();
}

/**
 * Sort favorites
 */
function sortFavorites() {
  currentSort = document.getElementById('sortFavorites').value;
  loadFavorites();
}

/**
 * Sort favorites list based on current sort option
 */
function sortFavoritesList(favorites) {
  const sorted = [...favorites];
  
  switch (currentSort) {
    case 'newest':
      sorted.sort((a, b) => {
        const dateA = new Date(a.addedAt || 0);
        const dateB = new Date(b.addedAt || 0);
        return dateB - dateA;
      });
      break;
    case 'oldest':
      sorted.sort((a, b) => {
        const dateA = new Date(a.addedAt || 0);
        const dateB = new Date(b.addedAt || 0);
        return dateA - dateB;
      });
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }
  
  return sorted;
}

/**
 * Remove favorite item
 */
function removeFavorite(itemId) {
  // Find item name for better UX
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const item = favorites.find(f => f.id === itemId);
  const itemName = item ? item.name : 'mục này';
  
  if (!confirm(`Bạn có chắc muốn xóa "${itemName}" khỏi danh sách yêu thích?`)) {
    return;
  }
  
  // Remove from favorites
  const updatedFavorites = favorites.filter(f => f.id !== itemId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
  // Reload favorites list
  loadFavorites();
  
  // Update badge in header
  if (typeof updateFavoriteBadge === 'function') {
    updateFavoriteBadge();
  }
  
  // Show success message
  showNotification(`Đã xóa "${itemName}" khỏi danh sách yêu thích`, 'success');
}

/**
 * Update favorite badge in header
 */
function updateFavoriteBadge() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const badge = document.getElementById('favoritesBadge');
  if (badge) {
    if (favorites.length > 0) {
      badge.textContent = favorites.length > 99 ? '99+' : favorites.length;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.getElementById('favoriteNotification');
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'favoriteNotification';
  notification.className = `fixed top-24 right-6 bg-white border-l-4 ${
    type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-blue-500'
  } rounded-lg shadow-lg p-4 z-50 transform transition-all duration-300 translate-x-full max-w-md`;
  
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fas ${
        type === 'success' ? 'fa-check-circle text-green-500' : 
        type === 'error' ? 'fa-exclamation-circle text-red-500' : 
        'fa-info-circle text-blue-500'
      } text-xl"></i>
      <p class="text-sm font-semibold text-dark flex-1">${message}</p>
      <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600 transition">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 10);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Make functions global
window.filterFavorites = filterFavorites;
window.sortFavorites = sortFavorites;
window.removeFavorite = removeFavorite;

