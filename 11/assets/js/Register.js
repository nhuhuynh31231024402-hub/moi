/**
 * Register Page - Xử lý đăng ký
 */

/**
 * Toggle password visibility
 */
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(inputId + 'Icon');
  if (input && icon) {
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

/**
 * Validate password match in real-time
 */
function validatePasswordMatch() {
  const password = document.getElementById('registerPassword')?.value || '';
  const confirmPassword = document.getElementById('registerConfirmPassword')?.value || '';
  const errorElement = document.getElementById('passwordMatchError');

  if (confirmPassword && password !== confirmPassword) {
    if (errorElement) {
      errorElement.classList.remove('hidden');
    }
    return false;
  } else {
    if (errorElement) {
      errorElement.classList.add('hidden');
    }
    return true;
  }
}

/**
 * Handle register form submission
 */
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const phone = document.getElementById('registerPhone').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;

  // Validate all fields
  if (!name || !email || !phone || !password || !confirmPassword) {
    showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Email không hợp lệ!', 'error');
    document.getElementById('registerEmail').focus();
    return;
  }

  // Validate phone format
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone)) {
    showNotification('Số điện thoại không hợp lệ!', 'error');
    document.getElementById('registerPhone').focus();
    return;
  }

  // Validate password length
  if (password.length < 6) {
    showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
    document.getElementById('registerPassword').focus();
    return;
  }

  // Validate password match
  if (password !== confirmPassword) {
    showNotification('Mật khẩu xác nhận không khớp!', 'error');
    document.getElementById('registerConfirmPassword').focus();
    return;
  }

  // Validate terms agreement
  if (!agreeTerms) {
    showNotification('Vui lòng đồng ý với điều khoản sử dụng!', 'error');
    return;
  }

  // Get submit button
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang xử lý...';

  // Simulate API call
  setTimeout(() => {
    // Check if email already exists
    const existingUser = JSON.parse(localStorage.getItem('userData') || '{}');
    if (existingUser.email === email) {
      showNotification('Email này đã được sử dụng!', 'error');
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
      return;
    }

    // Save user data (in real app, this would be sent to server)
    const userData = {
      name: name,
      email: email,
      phone: phone,
      password: password, // In real app, this should be hashed
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));

    // Auto login after registration
    const loginData = {
      email: email,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    sessionStorage.setItem('loginData', JSON.stringify(loginData));

    showNotification('Đăng ký thành công! Đang chuyển hướng...', 'success');
    
    // Redirect to my account page after 1.5 seconds
    setTimeout(() => {
      window.location.href = 'my-account.html';
    }, 1500);
  }, 1500);
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.getElementById('registerNotification');
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'registerNotification';
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

// Add event listeners for real-time password validation
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('registerPassword');
  const confirmPasswordInput = document.getElementById('registerConfirmPassword');
  
  if (passwordInput) {
    passwordInput.addEventListener('input', validatePasswordMatch);
  }
  
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    confirmPasswordInput.addEventListener('blur', validatePasswordMatch);
  }
});

// Make functions global
window.togglePassword = togglePassword;
window.handleRegister = handleRegister;
window.validatePasswordMatch = validatePasswordMatch;

