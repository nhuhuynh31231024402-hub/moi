// Alert Functions
function showAlert(message) {
  const alert = document.getElementById('successAlert');
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.textContent = message;
  alert.classList.remove('hidden');
  setTimeout(() => hideAlert(), 3000);
}

function hideAlert() {
  document.getElementById('successAlert').classList.add('hidden');
}

// Profile Functions
function saveProfile() {
  const name = document.getElementById('profileName').value;
  const email = document.getElementById('profileEmail').value;
  const phone = document.getElementById('profilePhone').value;
  showAlert('Thông tin đã được cập nhật thành công!');
}

function resetProfile() {
  document.getElementById('profileName').value = 'Admin User';
  document.getElementById('profileEmail').value = 'admin@pawjoy.vn';
  document.getElementById('profilePhone').value = '0901234567';
}

// Password Functions
function changePassword() {
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (!current || !newPass || !confirm) {
    showAlert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  if (newPass !== confirm) {
    showAlert('Mật khẩu xác nhận không khớp!');
    return;
  }

  showAlert('Mật khẩu của bạn đã được thay đổi!');
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
}

// Settings Toggle
function toggleSetting(settingName) {
  const checkbox = document.getElementById(settingName);
  console.log(`${settingName}: ${checkbox.checked}`);
}

// Danger Zone Functions
function clearCache() {
  if (confirm('Bạn có chắc muốn xóa tất cả cache?')) {
    showAlert('Cache đã được xóa thành công!');
  }
}

function exportData() {
  showAlert('Đang xuất dữ liệu... Vui lòng đợi trong giây lát.');
}

function resetSystem() {
  if (confirm('⚠️ CẢNH BÁO!\n\nĐặt lại hệ thống sẽ xóa toàn bộ dữ liệu. Bạn có chắc chắn?')) {
    showAlert('Yêu cầu đặt lại hệ thống đã được ghi nhận.');
  }
}