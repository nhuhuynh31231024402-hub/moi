/**
 * Newsletter Popup - Xử lý hiển thị và đóng popup đăng ký email
 */

const NEWSLETTER_POPUP_DELAY = 3000; // Hiện sau 3 giây
const NEWSLETTER_POPUP_COOLDOWN = 24 * 60 * 60 * 1000; // 24 giờ (milliseconds)

/**
 * Kiểm tra xem có nên hiển thị popup không
 */
function shouldShowPopup() {
  // Kiểm tra xem đã đóng popup trong 24h gần đây chưa
  const lastClosed = localStorage.getItem('newsletter_popup_closed');
  if (lastClosed) {
    const timeSinceClosed = Date.now() - parseInt(lastClosed);
    if (timeSinceClosed < NEWSLETTER_POPUP_COOLDOWN) {
      return false; // Chưa đủ 24h, không hiện
    }
  }

  // Kiểm tra xem đã đăng ký newsletter chưa
  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  // Nếu đã có email đăng ký, không hiện popup nữa
  if (subscribers.length > 0) {
    return false;
  }

  return true; // Có thể hiện popup
}

/**
 * Hiển thị popup đăng ký email
 */
export function showNewsletterPopup() {
  const popup = document.getElementById('newsletterPopup');
  if (!popup) return;

  // Kiểm tra xem có nên hiển thị không
  if (!shouldShowPopup()) {
    return;
  }

  // Hiển thị popup với animation
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.remove('opacity-0');
    popup.classList.add('opacity-100');
    const modalContent = popup.querySelector('.max-w-4xl');
    if (modalContent) {
      modalContent.classList.remove('scale-95');
      modalContent.classList.add('scale-100');
    }
  }, 10);
}

/**
 * Đóng popup đăng ký email
 */
export function closeNewsletterPopup(event) {
  // Nếu click vào overlay (không phải vào modal), mới đóng
  if (event && event.target.id !== 'newsletterPopup') {
    return;
  }

  const popup = document.getElementById('newsletterPopup');
  if (!popup) return;

  // Animation đóng
  popup.classList.add('opacity-0');
  const modalContent = popup.querySelector('.max-w-4xl');
  if (modalContent) {
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
  }

  setTimeout(() => {
    popup.classList.add('hidden');
    // Lưu thời gian đóng vào localStorage (sẽ không hiện lại trong 24h)
    localStorage.setItem('newsletter_popup_closed', Date.now().toString());
  }, 300);
}

/**
 * Xử lý submit form đăng ký
 */
export function handleNewsletterSubmit() {
  const emailInput = document.getElementById('newsletterEmail');
  const submitButton = document.querySelector('#newsletterPopup button[type="submit"]');
  
  if (!emailInput || !submitButton) return;

  const email = emailInput.value.trim();
  
  if (!email) {
    alert('Vui lòng nhập email!');
    return;
  }

  // Disable button và hiển thị loading
  submitButton.disabled = true;
  const originalContent = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang xử lý...';

  // Giả lập gửi email (trong thực tế sẽ gọi API)
  setTimeout(() => {
    // Thành công
    submitButton.innerHTML = '<i class="fas fa-check"></i> Đã đăng ký thành công!';
    submitButton.classList.remove('from-brand', 'to-brandDark');
    submitButton.classList.add('bg-accent');
    
    // Lưu email vào localStorage (hoặc gửi lên server)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    // Kiểm tra xem email đã tồn tại chưa
    const emailExists = subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (!emailExists) {
      subscribers.push({
        email: email,
        date: new Date().toISOString()
      });
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }

    // Lưu thời gian đóng (để không hiện lại popup)
    localStorage.setItem('newsletter_popup_closed', Date.now().toString());

    // Đóng popup sau 1.5 giây
    setTimeout(() => {
      closeNewsletterPopup();
    }, 1500);
  }, 1000);
}

/**
 * Khởi tạo popup - Tự động hiện sau một khoảng thời gian
 */
export function initNewsletterPopup() {
  // Chỉ chạy trên client side
  if (typeof window === 'undefined') return;

  // Kiểm tra xem có nên hiển thị popup không
  if (!shouldShowPopup()) {
    return; // Không hiện popup
  }

  // Đợi một chút để trang load xong, rồi hiện popup
  setTimeout(() => {
    showNewsletterPopup();
  }, NEWSLETTER_POPUP_DELAY);
}

// Export functions để dùng global
window.showNewsletterPopup = showNewsletterPopup;
window.closeNewsletterPopup = closeNewsletterPopup;
window.handleNewsletterSubmit = handleNewsletterSubmit;

// Tự động khởi tạo khi DOM ready
// Đợi một chút để đảm bảo popup HTML đã được load
function waitForPopup() {
  const popup = document.getElementById('newsletterPopup');
  if (popup) {
    initNewsletterPopup();
  } else {
    // Nếu chưa có, đợi thêm một chút
    setTimeout(waitForPopup, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(waitForPopup, 500);
  });
} else {
  setTimeout(waitForPopup, 500);
}

