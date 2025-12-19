/**
 * Login Page - Xử lý đăng nhập
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
 * Handle login form submission
 */
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Validate
  if (!email || !password) {
    showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    return;
  }

  // Get submit button
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang xử lý...';

  // Simulate API call
  setTimeout(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Check if user exists (in real app, this would be verified with server)
    // For demo, we'll check if email matches and password matches
    const storedEmail = userData.email || '';
    const storedPassword = userData.password || '';

    // In real app, password should be hashed and verified with server
    if (email === storedEmail && password === storedPassword && storedEmail && storedPassword) {
      // Login successful
      // Save login state
      const loginData = {
        email: email,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };
      
      if (rememberMe) {
        localStorage.setItem('loginData', JSON.stringify(loginData));
      } else {
        sessionStorage.setItem('loginData', JSON.stringify(loginData));
      }

      showNotification('Đăng nhập thành công!', 'success');
      
      // Redirect to my account page after 1 second
      setTimeout(() => {
        window.location.href = 'my-account.html';
      }, 1000);
    } else {
      // Login failed
      showNotification('Email hoặc mật khẩu không chính xác!', 'error');
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  }, 1500);
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.getElementById('loginNotification');
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'loginNotification';
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
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;

