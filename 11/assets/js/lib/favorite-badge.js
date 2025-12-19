/**
 * Favorite Badge - Cập nhật số lượng yêu thích trên badge
 * Sử dụng chung cho tất cả các trang
 */

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

// Update badge when page loads
function initFavoriteBadge() {
  // Try to update immediately
  updateFavoriteBadge();
  
  // Also try after a short delay (in case header is still loading)
  setTimeout(() => {
    updateFavoriteBadge();
  }, 100);
  
  // Update badge periodically
  setInterval(updateFavoriteBadge, 2000);
  
  // Listen for storage changes (when favorites are updated in other tabs)
  window.addEventListener('storage', () => {
    updateFavoriteBadge();
  });
}

// Run when DOM is ready or immediately if already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFavoriteBadge);
} else {
  // DOM already ready
  initFavoriteBadge();
}

// Also update when localStorage changes (same tab)
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);
  if (key === 'favorites') {
    updateFavoriteBadge();
  }
};

// Make function global
window.updateFavoriteBadge = updateFavoriteBadge;

