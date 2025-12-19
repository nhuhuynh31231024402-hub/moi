// ===== CHRISTMAS SNOW EFFECTS =====
// Optimized snow effect with immediate start (no delay)
// Snow has pointer-events: none in CSS to not block interactions

let snowflakeCount = 0;
const MAX_SNOWFLAKES = 50; // Nhiều tuyết!
let snowInterval;

/**
 * Tạo hiệu ứng tuyết rơi
 * - Starts IMMEDIATELY on page load
 * - Creates more snow faster
 * - Does not block interactions (pointer-events: none in CSS)
 */
function initChristmasSnow() {
  console.log('🎄 Initializing Christmas Snow...');
  
  const container = document.getElementById('snow-container');
  if (!container) {
    console.warn('❌ Snow container not found - skipping snow effects');
    return;
  }
  
  // Chỉ tạo tuyết trên desktop và thiết bị mạnh
  if (window.innerWidth > 768 && !isMobileDevice()) {
    console.log('✅ Starting snow effect immediately...');
    
    // TẠO NGAY BATCH TUYẾT ĐẦU TIÊN - KHÔNG DELAY!
    createInitialSnowBatch();
    
    // Tiếp tục tạo tuyết với tần suất cao
    window.snowInterval = setInterval(createOptimizedSnow, 300); // Tạo tuyết mỗi 300ms
    
    // Dừng tạo tuyết mới sau 60s để tránh lag (tuyết cũ vẫn rơi tiếp)
    setTimeout(() => {
      if (window.snowInterval) {
        clearInterval(window.snowInterval);
        console.log('❄️ Snow creation paused (existing snow continues falling)');
      }
    }, 60000);
  } else {
    console.log('❌ Snow disabled on mobile/small screen');
  }
}

/**
 * Tạo batch tuyết ban đầu để trang có ngay nhiều tuyết
 */
function createInitialSnowBatch() {
  console.log('🌨️ Creating initial snow batch...');
  for (let i = 0; i < 15; i++) {
    // Tạo tuyết với delay nhỏ để phân tán
    setTimeout(() => createOptimizedSnow(), i * 50);
  }
}

/**
 * Tạo một bông tuyết
 */
function createOptimizedSnow() {
  if (snowflakeCount >= MAX_SNOWFLAKES) {
    return; // Đã đủ số lượng tuyết tối đa
  }
  
  const container = document.getElementById('snow-container');
  if (!container) return;
  
  const snowflake = document.createElement('div');
  const isLarge = Math.random() > 0.7; // 30% tuyết lớn
  
  snowflake.className = isLarge ? 'snowflake large' : 'snowflake';
  snowflake.innerHTML = ['❄️', '❅', '❆', '🌨️', '⭐'][Math.floor(Math.random() * 5)];
  
  // Random vị trí và kích thước
  snowflake.style.left = Math.random() * 100 + '%';
  
  if (isLarge) {
    snowflake.style.fontSize = (Math.random() * 20 + 25) + 'px'; // 25-45px
    snowflake.style.opacity = (Math.random() * 0.4 + 0.8).toString(); // 0.8-1.2
  } else {
    snowflake.style.fontSize = (Math.random() * 15 + 12) + 'px'; // 12-27px
    snowflake.style.opacity = (Math.random() * 0.5 + 0.6).toString(); // 0.6-1.1
  }
  
  // Animation duration ngẫu nhiên (tuyết lớn rơi chậm hơn)
  const duration = isLarge ? Math.random() * 4 + 6 : Math.random() * 3 + 4;
  snowflake.style.animationDuration = duration + 's';
  
  container.appendChild(snowflake);
  snowflakeCount++;
  
  // Tự động xóa sau khi animation kết thúc
  setTimeout(() => {
    if (snowflake.parentNode) {
      snowflake.parentNode.removeChild(snowflake);
      snowflakeCount--;
    }
  }, duration * 1000);
}

/**
 * Kiểm tra thiết bị di động
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Pause/resume snow khi chuyển tab
 */
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    if (window.snowInterval) {
      clearInterval(window.snowInterval);
    }
  } else {
    if (window.innerWidth > 768 && !isMobileDevice()) {
      window.snowInterval = setInterval(createOptimizedSnow, 300);
    }
  }
});

// Export functions
if (typeof window !== 'undefined') {
  window.initChristmasSnow = initChristmasSnow;
  window.createOptimizedSnow = createOptimizedSnow;
}

// Auto-start khi DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChristmasSnow);
} else {
  // DOM đã ready, chạy ngay lập tức
  initChristmasSnow();
}
