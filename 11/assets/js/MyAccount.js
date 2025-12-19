// Tab switching
    function switchTab(tabName) {
      // Hide all content
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));

      // Remove active from all tabs
      document.querySelectorAll('[id^="tab-"]').forEach(el => {
        el.classList.remove('bg-gradient-to-r', 'from-brand/10', 'to-brand/5', 'text-brand', 'font-semibold');
        el.classList.add('text-gray-600', 'hover:bg-gray-50');
      });

      // Show selected content
      const contentElement = document.getElementById('content-' + tabName);
      if (contentElement) {
        contentElement.classList.remove('hidden');
      }

      // Activate selected tab
      const activeTab = document.getElementById('tab-' + tabName);
      if (activeTab) {
      activeTab.classList.add('bg-gradient-to-r', 'from-brand/10', 'to-brand/5', 'text-brand', 'font-semibold');
      activeTab.classList.remove('text-gray-600', 'hover:bg-gray-50');
      }

      // Update title and description
      const titles = {
        profile: 'Hồ sơ của tôi',
        appointments: 'Lịch đặt',
        pets: 'Thú cưng của tôi',
        statistics: 'Thống kê',
        settings: 'Cài đặt'
      };
      const descriptions = {
        profile: 'Quản lý thông tin cá nhân của bạn',
        appointments: 'Xem và quản lý các lịch hẹn',
        pets: 'Quản lý thông tin thú cưng',
        statistics: 'Xem thống kê dịch vụ đã xem, đã đặt và đang xử lý',
        settings: 'Tùy chỉnh cài đặt tài khoản'
      };

      document.getElementById('page-title').textContent = titles[tabName] || 'Tài khoản';
      document.getElementById('page-desc').textContent = descriptions[tabName] || '';

      // Load data for specific tabs
      if (tabName === 'statistics') {
        loadStatistics();
      } else if (tabName === 'appointments') {
        loadAppointments();
      } else if (tabName === 'pets') {
        loadPets();
      }
    }

    // Modal functions
    function openEditModal() {
      document.getElementById('editModal').classList.remove('hidden');
    }

    function closeEditModal() {
      document.getElementById('editModal').classList.add('hidden');
    }

    function saveProfile(event) {
      event.preventDefault();
      alert('Đã lưu thông tin!');
      closeEditModal();
    }

    // Address modal functions
    function openAddressModal() {
      document.getElementById('addressModal').classList.remove('hidden');
    }

    function closeAddressModal() {
      document.getElementById('addressModal').classList.add('hidden');
      // Clear form
      document.getElementById('addressName').value = '';
      document.getElementById('addressDetail').value = '';
      document.getElementById('addressPhone').value = '';
      document.getElementById('setDefault').checked = false;
    }

    function saveAddress(event) {
      event.preventDefault();

      const name = document.getElementById('addressName').value;
      const detail = document.getElementById('addressDetail').value;
      const phone = document.getElementById('addressPhone').value;
      const isDefault = document.getElementById('setDefault').checked;

      // Create new address card
      const addressList = document.getElementById('addressList');
      const newAddress = document.createElement('div');
      newAddress.className = 'bg-gray-50 p-4 rounded-xl relative';

      let defaultBadge = '';
      if (isDefault) {
        // Remove default badge from other addresses
        const existingDefaults = addressList.querySelectorAll('.bg-brand.text-white');
        existingDefaults.forEach(badge => badge.remove());

        defaultBadge = '<span class="text-xs bg-brand text-white px-2 py-1 rounded-full">Mặc định</span>';
        newAddress.className = 'bg-cream/50 p-4 rounded-xl relative';
      }

      newAddress.innerHTML = `
        <button onclick="deleteAddress(this)" class="absolute top-3 right-3 text-red-500 hover:text-red-700 transition">
          <i class="fas fa-trash-alt text-sm"></i>
        </button>
        <div class="flex justify-between items-start mb-2 pr-8">
          <h4 class="font-semibold text-dark">${name}</h4>
          ${defaultBadge}
        </div>
        <p class="text-sm text-gray-600">${detail}</p>
        <p class="text-sm text-gray-500 mt-1">SĐT: ${phone}</p>
      `;

      addressList.appendChild(newAddress);

      alert('Đã thêm địa chỉ mới!');
      closeAddressModal();
    }

    function deleteAddress(button) {
      if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
        button.closest('.rounded-xl').remove();
      }
    }

    // Password functions
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

    // Real-time password validation
    function validatePassword() {
      const newPassword = document.getElementById('newPassword')?.value || '';
      const confirmPassword = document.getElementById('confirmPassword')?.value || '';
      const confirmError = document.getElementById('confirmPasswordError');
      const lengthCheck = document.getElementById('lengthCheck');
      const matchCheck = document.getElementById('matchCheck');

      // Validate length
      if (lengthCheck) {
        if (newPassword.length >= 6) {
          lengthCheck.innerHTML = '<i class="fas fa-check-circle text-green-500 text-xs"></i><span class="text-green-500">Ít nhất 6 ký tự</span>';
        } else {
          lengthCheck.innerHTML = '<i class="fas fa-circle text-xs"></i><span>Ít nhất 6 ký tự</span>';
        }
      }

      // Validate match
      if (confirmPassword && newPassword) {
        if (matchCheck) {
          matchCheck.classList.remove('hidden');
          if (newPassword === confirmPassword) {
            matchCheck.innerHTML = '<i class="fas fa-check-circle text-green-500 text-xs"></i><span class="text-green-500">Mật khẩu xác nhận khớp</span>';
            if (confirmError) confirmError.classList.add('hidden');
          } else {
            matchCheck.innerHTML = '<i class="fas fa-times-circle text-red-500 text-xs"></i><span class="text-red-500">Mật khẩu xác nhận không khớp</span>';
            if (confirmError) confirmError.classList.remove('hidden');
          }
        }
      } else {
        if (matchCheck) matchCheck.classList.add('hidden');
        if (confirmError) confirmError.classList.add('hidden');
      }
    }

    function changePassword(event) {
      event.preventDefault();

      const currentPassword = document.getElementById('currentPassword')?.value || '';
      const newPassword = document.getElementById('newPassword')?.value || '';
      const confirmPassword = document.getElementById('confirmPassword')?.value || '';

      // Validate all fields are filled
      if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
      }

      // Validate new password length
      if (newPassword.length < 6) {
        showNotification('Mật khẩu mới phải có ít nhất 6 ký tự!', 'error');
        document.getElementById('newPassword').focus();
        return;
      }

      // Check if new passwords match
      if (newPassword !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp!', 'error');
        document.getElementById('confirmPassword').focus();
        return;
      }

      // Check if new password is different from current
      if (currentPassword === newPassword) {
        showNotification('Mật khẩu mới phải khác mật khẩu hiện tại!', 'error');
        return;
      }

      // Simulate API call
      const submitButton = event.target.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';

      // Simulate API delay
      setTimeout(() => {
      // In real application, send to server
        // Save to localStorage for demo
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.password = newPassword; // In real app, this should be hashed
        localStorage.setItem('userData', JSON.stringify(userData));

        showNotification('Đã cập nhật mật khẩu thành công!', 'success');
        resetPasswordForm();
        
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }, 1500);
    }

    function resetPasswordForm() {
      const form = document.getElementById('changePasswordForm');
      if (form) {
        form.reset();
        // Reset validation indicators
        const lengthCheck = document.getElementById('lengthCheck');
        const matchCheck = document.getElementById('matchCheck');
        const confirmError = document.getElementById('confirmPasswordError');
        
        if (lengthCheck) {
          lengthCheck.innerHTML = '<i class="fas fa-circle text-xs"></i><span>Ít nhất 6 ký tự</span>';
        }
        if (matchCheck) {
          matchCheck.classList.add('hidden');
        }
        if (confirmError) {
          confirmError.classList.add('hidden');
        }
      }
    }

    // Add event listeners for real-time validation
    document.addEventListener('DOMContentLoaded', () => {
      const newPasswordInput = document.getElementById('newPassword');
      const confirmPasswordInput = document.getElementById('confirmPassword');
      
      if (newPasswordInput) {
        newPasswordInput.addEventListener('input', validatePassword);
        newPasswordInput.addEventListener('blur', validatePassword);
      }
      
      if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePassword);
        confirmPasswordInput.addEventListener('blur', validatePassword);
      }
    });

    // Show notification function
    function showNotification(message, type = 'info') {
      // Remove existing notification
      const existing = document.getElementById('passwordNotification');
      if (existing) existing.remove();

      // Create notification element
      const notification = document.createElement('div');
      notification.id = 'passwordNotification';
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
          <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
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

    // ============================================
    // STATISTICS FUNCTIONS
    // ============================================
    function loadStatistics() {
      // Load from localStorage
      const viewedStores = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
      const purchasedStores = JSON.parse(localStorage.getItem('purchasedProducts') || '[]');
      
      // Get processing appointments (pending or confirmed)
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const processingAppointments = appointments.filter(apt => 
        apt.status === 'pending' || apt.status === 'confirmed'
      );

      // Update counts
      document.getElementById('viewedCount').textContent = viewedStores.length;
      document.getElementById('purchasedCount').textContent = purchasedStores.length;
      document.getElementById('processingCount').textContent = processingAppointments.length;

      // Render viewed stores
      renderStoreList('viewedProducts', viewedStores, 'Chưa có cửa hàng nào được xem');

      // Render purchased stores
      renderStoreList('purchasedProducts', purchasedStores, 'Chưa có cửa hàng nào được đặt');

      // Render processing appointments
      renderProcessingAppointments('processingProducts', processingAppointments);
    }

    function renderStoreList(containerId, stores, emptyMessage) {
      const container = document.getElementById(containerId);
      if (!container) return;

      if (stores.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center py-8">${emptyMessage}</p>`;
        return;
      }

      container.innerHTML = stores.map(store => `
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
          <img src="${store.image || store.storeImage || '../../assets/images/logo/LOGO PAWJOY.png'}" 
               alt="${store.name || store.storeName}" 
               class="w-16 h-16 rounded-lg object-cover"
               onerror="this.src='../../assets/images/logo/LOGO PAWJOY.png'">
          <div class="flex-1">
            <h4 class="font-semibold text-dark">${store.name || store.storeName}</h4>
            <p class="text-sm text-gray-500">${store.address || store.storeAddress || 'Cửa hàng'}</p>
            ${store.rating ? `
            <div class="flex items-center gap-1 mt-1">
              <i class="fas fa-star text-yellow-400 text-xs"></i>
              <span class="text-sm text-gray-600">${store.rating}</span>
            </div>
            ` : ''}
          </div>
          <a href="stores-detail.html?id=${store.id || store.storeId}" 
             class="px-4 py-2 bg-brand hover:bg-brandDark text-white rounded-lg font-semibold transition text-sm">
            Xem chi tiết
          </a>
          <button onclick="removeFromList('${containerId}', '${store.id || store.storeId}')" 
                  class="text-red-500 hover:text-red-700 transition">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join('');
    }

    function renderProcessingAppointments(containerId, appointments) {
      const container = document.getElementById(containerId);
      if (!container) return;

      if (appointments.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center py-8">Không có lịch đặt nào đang xử lý</p>`;
        return;
      }

      container.innerHTML = appointments.map(apt => {
        const appointmentDate = new Date(apt.date);
        const formattedDate = appointmentDate.toLocaleDateString('vi-VN', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        });
        
        const statusColors = {
          'pending': 'bg-yellow-100 text-yellow-700',
          'confirmed': 'bg-green-100 text-green-700'
        };
        
        const statusTexts = {
          'pending': 'Chờ xác nhận',
          'confirmed': 'Đã xác nhận'
        };

        const statusColor = statusColors[apt.status] || statusColors.pending;
        const statusText = statusTexts[apt.status] || statusTexts.pending;

        return `
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
            <img src="${apt.storeImage || '../../assets/images/logo/LOGO PAWJOY.png'}" 
                 alt="${apt.storeName}" 
                 class="w-16 h-16 rounded-lg object-cover"
                 onerror="this.src='../../assets/images/logo/LOGO PAWJOY.png'">
            <div class="flex-1">
              <h4 class="font-semibold text-dark">${apt.storeName}</h4>
              <p class="text-sm text-gray-500">${apt.storeAddress || ''}</p>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs text-gray-600">
                  <i class="fas fa-calendar-alt mr-1"></i>${formattedDate}
                </span>
                <span class="text-xs text-gray-600">
                  <i class="fas fa-clock mr-1"></i>${apt.time || ''}
                </span>
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${statusColor}">
                  ${statusText}
                </span>
              </div>
            </div>
            <a href="stores-detail.html?id=${apt.storeId}" 
               class="px-4 py-2 bg-brand hover:bg-brandDark text-white rounded-lg font-semibold transition text-sm">
              Xem chi tiết
            </a>
          </div>
        `;
      }).join('');
    }

    function removeFromList(listType, itemId) {
      const key = listType === 'viewedProducts' ? 'viewedProducts' :
                   listType === 'purchasedProducts' ? 'purchasedProducts' :
                   'processingProducts';
      
      let items = JSON.parse(localStorage.getItem(key) || '[]');
      items = items.filter(item => (item.id || item.storeId) !== itemId);
      localStorage.setItem(key, JSON.stringify(items));
      loadStatistics();
    }

    // Initialize default statistics data if none exists
    function initializeDefaultStatistics() {
      // Initialize viewed stores
      const viewedStores = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
      if (viewedStores.length === 0) {
        const defaultViewedStores = [
          {
            id: 'petwow',
            storeId: 'petwow',
            name: 'Pet Wow',
            storeName: 'Pet Wow',
            address: '294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh',
            storeAddress: '294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh',
            image: '../../assets/images/stores/PetWow/logo_petwow.png',
            storeImage: '../../assets/images/stores/PetWow/logo_petwow.png',
            rating: 4.8
          },
          {
            id: '2vet',
            storeId: '2vet',
            name: '2Vet',
            storeName: '2Vet',
            address: '123 Nguyễn Văn Cừ, Quận 5, Hồ Chí Minh',
            storeAddress: '123 Nguyễn Văn Cừ, Quận 5, Hồ Chí Minh',
            image: '../../assets/images/stores/2Vet/logo_2vet.png',
            storeImage: '../../assets/images/stores/2Vet/logo_2vet.png',
            rating: 4.6
          }
        ];
        localStorage.setItem('viewedProducts', JSON.stringify(defaultViewedStores));
      }

      // Initialize purchased stores (from appointments)
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const purchasedStores = JSON.parse(localStorage.getItem('purchasedProducts') || '[]');
      if (purchasedStores.length === 0 && appointments.length > 0) {
        // Get unique stores from appointments
        const uniqueStores = [];
        appointments.forEach(apt => {
          if (!uniqueStores.find(s => (s.id || s.storeId) === apt.storeId)) {
            uniqueStores.push({
              id: apt.storeId,
              storeId: apt.storeId,
              name: apt.storeName,
              storeName: apt.storeName,
              address: apt.storeAddress,
              storeAddress: apt.storeAddress,
              image: apt.storeImage,
              storeImage: apt.storeImage
            });
          }
        });
        if (uniqueStores.length > 0) {
          localStorage.setItem('purchasedProducts', JSON.stringify(uniqueStores));
        }
      } else if (purchasedStores.length === 0) {
        // If no appointments, create default purchased store
        const defaultPurchasedStore = {
          id: 'petwow',
          storeId: 'petwow',
          name: 'Pet Wow',
          storeName: 'Pet Wow',
          address: '294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh',
          storeAddress: '294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh',
          image: '../../assets/images/stores/PetWow/logo_petwow.png',
          storeImage: '../../assets/images/stores/PetWow/logo_petwow.png'
        };
        localStorage.setItem('purchasedProducts', JSON.stringify([defaultPurchasedStore]));
      }
    }


    // ============================================
    // COLLECTIONS FUNCTIONS
    // ============================================
    function loadCollections() {
      const collections = JSON.parse(localStorage.getItem('collections') || '[]');
      const container = document.getElementById('collectionsList');
      if (!container) return;

      let html = '';
      
      collections.forEach(collection => {
        html += `
          <div class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
            <div class="relative h-48 bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center">
              ${collection.items && collection.items.length > 0 ? 
                `<img src="${collection.items[0].image || '../../assets/images/logo/LOGO PAWJOY.png'}" 
                      alt="${collection.name}" 
                      class="w-full h-full object-cover">` :
                `<i class="fas fa-bookmark text-4xl text-gray-300"></i>`
              }
              <button onclick="deleteCollection('${collection.id}')" 
                      class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition">
                <i class="fas fa-trash text-sm"></i>
              </button>
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-dark mb-1">${collection.name}</h4>
              <p class="text-sm text-gray-500 mb-3">${collection.items ? collection.items.length : 0} dịch vụ</p>
              <button onclick="viewCollection('${collection.id}')" 
                      class="w-full py-2 border border-brand text-brand hover:bg-brand hover:text-white rounded-lg font-semibold transition">
                Xem bộ sưu tập
              </button>
            </div>
          </div>
        `;
      });

      // Add create button
      html += `
        <div class="bg-cream/50 rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-brand transition cursor-pointer text-center" onclick="createNewCollection()">
          <i class="fas fa-plus-circle text-4xl text-gray-300 mb-3"></i>
          <h4 class="font-semibold text-dark mb-1">Tạo bộ sưu tập mới</h4>
          <p class="text-sm text-gray-500">Lưu các sản phẩm yêu thích của bạn</p>
        </div>
      `;

      container.innerHTML = html;
    }

    function createNewCollection() {
      const name = prompt('Nhập tên bộ sưu tập:');
      if (!name) return;

      const collections = JSON.parse(localStorage.getItem('collections') || '[]');
      const newCollection = {
        id: 'col_' + Date.now(),
        name: name,
        items: [],
        createdAt: new Date().toISOString()
      };

      collections.push(newCollection);
      localStorage.setItem('collections', JSON.stringify(collections));
      loadCollections();
    }

    function deleteCollection(collectionId) {
      if (!confirm('Bạn có chắc muốn xóa bộ sưu tập này?')) return;

      let collections = JSON.parse(localStorage.getItem('collections') || '[]');
      collections = collections.filter(c => c.id !== collectionId);
      localStorage.setItem('collections', JSON.stringify(collections));
      loadCollections();
    }

    function viewCollection(collectionId) {
      // Show collection detail modal or navigate to collection page
      alert('Xem chi tiết bộ sưu tập: ' + collectionId);
    }

    // ============================================
    // PETS FUNCTIONS
    // ============================================
    function loadPets() {
      const pets = JSON.parse(localStorage.getItem('pets') || '[]');
      const container = document.getElementById('petsList');
      if (!container) return;

      let html = '';

      // Render existing pets
      pets.forEach(pet => {
        const genderText = pet.gender === 'male' ? 'Đực' : 'Cái';
        const ageText = pet.age ? `${pet.age} tuổi` : 'Chưa xác định';
        
        // Sử dụng hình ảnh thực tế thay vì emoji
        const petImage = pet.image || (pet.type === 'dog' 
          ? '../../assets/images/stores/PetWow/pic2.jpg' 
          : pet.type === 'cat' 
          ? '../../assets/images/stores/PetWow/pic3.jpg' 
          : '../../assets/images/logo/LOGO PAWJOY.png');
        
        html += `
          <div class="bg-white rounded-2xl p-6 shadow-soft">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src="${petImage}" 
                     alt="${pet.name}" 
                     class="w-full h-full object-cover"
                     onerror="this.src='../../assets/images/logo/LOGO PAWJOY.png'">
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-dark text-lg">${pet.name}</h3>
                <p class="text-sm text-gray-500">${pet.breed || 'Chưa xác định'} - ${ageText}</p>
              </div>
              <button onclick="deletePet('${pet.id}')" class="text-red-500 hover:text-red-700 transition">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="space-y-2 text-sm mb-4">
              <div class="flex justify-between">
                <span class="text-gray-500">Giới tính:</span>
                <span class="font-semibold">${genderText}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Cân nặng:</span>
                <span class="font-semibold">${pet.weight || 'Chưa xác định'} kg</span>
              </div>
              ${pet.lastCheckup ? `
              <div class="flex justify-between">
                <span class="text-gray-500">Lần khám cuối:</span>
                <span class="font-semibold">${new Date(pet.lastCheckup).toLocaleDateString('vi-VN')}</span>
              </div>
              ` : ''}
            </div>
            <button onclick="viewPetDetail('${pet.id}')"
              class="w-full py-2 border border-brand text-brand rounded-xl hover:bg-brand hover:text-white transition font-semibold">
              Xem chi tiết
            </button>
          </div>
        `;
      });

      // Add "Add new pet" card
      html += `
        <div onclick="openAddPetModal()"
          class="bg-white rounded-2xl p-6 shadow-soft border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:border-brand transition cursor-pointer min-h-[200px]">
          <i class="fas fa-plus-circle text-5xl text-gray-300 mb-3"></i>
          <h3 class="font-bold text-dark mb-1">Thêm thú cưng mới</h3>
          <p class="text-sm text-gray-500">Nhấn để thêm thông tin thú cưng</p>
        </div>
      `;

      container.innerHTML = html;
    }

    function openAddPetModal() {
      document.getElementById('addPetModal').classList.remove('hidden');
      // Clear form
      document.getElementById('petName').value = '';
      document.getElementById('petType').value = '';
      document.getElementById('petBreed').value = '';
      document.getElementById('petAge').value = '';
      document.getElementById('petGender').value = '';
      document.getElementById('petWeight').value = '';
      document.getElementById('petColor').value = '';
      document.getElementById('petBirthday').value = '';
      document.getElementById('petNotes').value = '';
    }

    function closeAddPetModal() {
      document.getElementById('addPetModal').classList.add('hidden');
    }

    function savePet(event) {
      event.preventDefault();

      const pet = {
        id: 'pet_' + Date.now(),
        name: document.getElementById('petName').value,
        type: document.getElementById('petType').value,
        breed: document.getElementById('petBreed').value,
        age: parseInt(document.getElementById('petAge').value) || 0,
        gender: document.getElementById('petGender').value,
        weight: parseFloat(document.getElementById('petWeight').value) || 0,
        color: document.getElementById('petColor').value,
        birthday: document.getElementById('petBirthday').value,
        notes: document.getElementById('petNotes').value,
        createdAt: new Date().toISOString()
      };

      const pets = JSON.parse(localStorage.getItem('pets') || '[]');
      pets.push(pet);
      localStorage.setItem('pets', JSON.stringify(pets));

      alert('Đã thêm thú cưng thành công!');
      closeAddPetModal();
      loadPets();
    }

    function viewPetDetail(petId) {
      const pets = JSON.parse(localStorage.getItem('pets') || '[]');
      const pet = pets.find(p => p.id === petId);
      
      if (!pet) {
        alert('Không tìm thấy thông tin thú cưng!');
        return;
      }

      const genderText = pet.gender === 'male' ? 'Đực' : 'Cái';
      const typeText = pet.type === 'dog' ? 'Chó' : pet.type === 'cat' ? 'Mèo' : 'Khác';

      // Sử dụng hình ảnh thực tế thay vì emoji
      const petImage = pet.image || (pet.type === 'dog' 
        ? '../../assets/images/stores/PetWow/pic2.jpg' 
        : pet.type === 'cat' 
        ? '../../assets/images/stores/PetWow/pic3.jpg' 
        : '../../assets/images/logo/LOGO PAWJOY.png');

      const content = `
        <div class="space-y-6">
          <div class="flex items-center gap-4 pb-6 border-b border-gray-200">
            <div class="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src="${petImage}" 
                   alt="${pet.name}" 
                   class="w-full h-full object-cover"
                   onerror="this.src='../../assets/images/logo/LOGO PAWJOY.png'">
            </div>
            <div>
              <h3 class="text-2xl font-bold text-dark mb-1">${pet.name}</h3>
              <p class="text-gray-500">${pet.breed || 'Chưa xác định'}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-xl">
              <p class="text-sm text-gray-500 mb-1">Loại</p>
              <p class="font-semibold text-dark">${typeText}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl">
              <p class="text-sm text-gray-500 mb-1">Giống</p>
              <p class="font-semibold text-dark">${pet.breed || 'Chưa xác định'}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl">
              <p class="text-sm text-gray-500 mb-1">Tuổi</p>
              <p class="font-semibold text-dark">${pet.age || 0} tuổi</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl">
              <p class="text-sm text-gray-500 mb-1">Giới tính</p>
              <p class="font-semibold text-dark">${genderText}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl">
              <p class="text-sm text-gray-500 mb-1">Cân nặng</p>
              <p class="font-semibold text-dark">${pet.weight || 0} kg</p>
            </div>
            ${pet.color ? `
            <div class="bg-gray-50 p-4 rounded-xl">
              <p class="text-sm text-gray-500 mb-1">Màu lông</p>
              <p class="font-semibold text-dark">${pet.color}</p>
            </div>
            ` : ''}
            ${pet.birthday ? `
            <div class="bg-gray-50 p-4 rounded-xl">
              <p class="text-sm text-gray-500 mb-1">Ngày sinh</p>
              <p class="font-semibold text-dark">${new Date(pet.birthday).toLocaleDateString('vi-VN')}</p>
            </div>
            ` : ''}
          </div>

          ${pet.notes ? `
          <div>
            <p class="text-sm font-semibold text-gray-700 mb-2">Ghi chú</p>
            <p class="text-gray-600 bg-gray-50 p-4 rounded-xl">${pet.notes}</p>
          </div>
          ` : ''}

          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <button onclick="editPet('${pet.id}')"
              class="flex-1 py-3 rounded-xl border border-brand text-brand font-semibold hover:bg-brand hover:text-white transition">
              Chỉnh sửa
            </button>
            <button onclick="deletePet('${pet.id}'); closePetDetailModal();"
              class="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition">
              Xóa thú cưng
            </button>
          </div>
        </div>
      `;

      document.getElementById('petDetailContent').innerHTML = content;
      document.getElementById('petDetailModal').classList.remove('hidden');
    }

    function closePetDetailModal() {
      document.getElementById('petDetailModal').classList.add('hidden');
    }

    function deletePet(petId) {
      if (!confirm('Bạn có chắc muốn xóa thú cưng này?')) return;

      let pets = JSON.parse(localStorage.getItem('pets') || '[]');
      pets = pets.filter(p => p.id !== petId);
      localStorage.setItem('pets', JSON.stringify(pets));
      loadPets();
      
      // Close modal if open
      closePetDetailModal();
    }

    function editPet(petId) {
      const pets = JSON.parse(localStorage.getItem('pets') || '[]');
      const pet = pets.find(p => p.id === petId);
      
      if (!pet) return;

      // Close detail modal and open add modal with data
      closePetDetailModal();
      
      // Fill form with pet data
      document.getElementById('petName').value = pet.name;
      document.getElementById('petType').value = pet.type;
      document.getElementById('petBreed').value = pet.breed || '';
      document.getElementById('petAge').value = pet.age || '';
      document.getElementById('petGender').value = pet.gender;
      document.getElementById('petWeight').value = pet.weight || '';
      document.getElementById('petColor').value = pet.color || '';
      document.getElementById('petBirthday').value = pet.birthday || '';
      document.getElementById('petNotes').value = pet.notes || '';

      // Change form to edit mode
      const form = document.querySelector('#addPetModal form');
      form.onsubmit = (e) => {
        e.preventDefault();
        updatePet(petId);
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Cập nhật thông tin';

      document.getElementById('addPetModal').classList.remove('hidden');
    }

    function updatePet(petId) {
      const pet = {
        id: petId,
        name: document.getElementById('petName').value,
        type: document.getElementById('petType').value,
        breed: document.getElementById('petBreed').value,
        age: parseInt(document.getElementById('petAge').value) || 0,
        gender: document.getElementById('petGender').value,
        weight: parseFloat(document.getElementById('petWeight').value) || 0,
        color: document.getElementById('petColor').value,
        birthday: document.getElementById('petBirthday').value,
        notes: document.getElementById('petNotes').value
      };

      let pets = JSON.parse(localStorage.getItem('pets') || '[]');
      const index = pets.findIndex(p => p.id === petId);
      if (index !== -1) {
        pets[index] = { ...pets[index], ...pet };
        localStorage.setItem('pets', JSON.stringify(pets));
        alert('Đã cập nhật thông tin thú cưng!');
        closeAddPetModal();
        loadPets();
      }

      // Reset form
      const form = document.querySelector('#addPetModal form');
      form.onsubmit = savePet;
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Lưu thông tin';
    }

    // Initialize default pet data if none exists
    function initializeDefaultPets() {
      const pets = JSON.parse(localStorage.getItem('pets') || '[]');
      if (pets.length === 0) {
        // Add default pet
        const defaultPet = {
          id: 'pet_default_1',
          name: 'Lucky',
          type: 'dog',
          breed: 'Golden Retriever',
          age: 2,
          gender: 'male',
          weight: 28,
          color: 'Vàng',
          birthday: '2022-01-15',
          notes: 'Thú cưng rất ngoan và thân thiện',
          lastCheckup: '2024-11-15',
          image: '../../assets/images/stores/PetWow/pic2.jpg', // Hình ảnh thực tế thay vì emoji
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('pets', JSON.stringify([defaultPet]));
      }
    }

    // ============================================
    // APPOINTMENTS FUNCTIONS
    // ============================================
    function loadAppointments() {
      let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const container = document.getElementById('appointmentsList');
      const emptyState = document.getElementById('appointmentsEmptyState');
      
      if (!container) return;

      if (appointments.length === 0) {
        container.innerHTML = '';
        if (emptyState) {
          emptyState.classList.remove('hidden');
        }
        return;
      }

      if (emptyState) {
        emptyState.classList.add('hidden');
      }

      container.innerHTML = appointments.map(apt => {
        const statusColors = {
          'pending': 'bg-yellow-100 text-yellow-700',
          'confirmed': 'bg-green-100 text-green-700',
          'completed': 'bg-blue-100 text-blue-700',
          'cancelled': 'bg-red-100 text-red-700'
        };
        
        const statusTexts = {
          'pending': 'Chờ xác nhận',
          'confirmed': 'Đã xác nhận',
          'completed': 'Hoàn thành',
          'cancelled': 'Đã hủy'
        };

        const statusColor = statusColors[apt.status] || statusColors.pending;
        const statusText = statusTexts[apt.status] || statusTexts.pending;
        
        const appointmentDate = new Date(apt.date);
        const formattedDate = appointmentDate.toLocaleDateString('vi-VN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const formattedTime = apt.time || '';

        return `
          <div class="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition">
            <div class="flex flex-col md:flex-row md:items-start gap-4">
              <!-- Store Image -->
              <div class="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img src="${apt.storeImage || '../../assets/images/logo/LOGO PAWJOY.png'}" 
                     alt="${apt.storeName}" 
                     class="w-full h-full object-cover"
                     onerror="this.src='../../assets/images/logo/LOGO PAWJOY.png'">
              </div>
              
              <!-- Appointment Details -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="font-bold text-dark text-lg mb-1">${apt.storeName}</h3>
                    <p class="text-sm text-gray-500">${apt.storeAddress || ''}</p>
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusColor}">
                    ${statusText}
                  </span>
                </div>

                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar-alt text-brand w-4"></i>
                    <span class="text-gray-600">${formattedDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-brand w-4"></i>
                    <span class="text-gray-600">${formattedTime}</span>
                  </div>
                  ${apt.petName ? `
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-paw text-brand w-4"></i>
                    <span class="text-gray-600">Thú cưng: ${apt.petName}</span>
                  </div>
                  ` : ''}
                </div>

                <!-- Services List -->
                ${apt.services && apt.services.length > 0 ? `
                <div class="mb-4">
                  <p class="text-sm font-semibold text-dark mb-2">Dịch vụ đã đặt:</p>
                  <div class="space-y-2">
                    ${apt.services.map(service => `
                      <div class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div>
                          <p class="font-semibold text-dark text-sm">${service.name}</p>
                          <p class="text-xs text-gray-500">${service.duration || ''} • Số lượng: ${service.quantity || 1}</p>
                        </div>
                        <p class="font-bold text-brand">${service.price || '0'} VNĐ</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
                ` : ''}

                <!-- Total Price -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 mb-4">
                  <span class="font-bold text-dark">Tổng tiền</span>
                  <span class="font-serif font-bold text-brand text-xl">${apt.totalPrice || '0'} VNĐ</span>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3">
                  <a href="stores-detail.html?id=${apt.storeId}" 
                     class="flex-1 py-2 border border-brand text-brand rounded-xl hover:bg-brand hover:text-white transition font-semibold text-center">
                    <i class="fas fa-eye mr-2"></i>Xem cửa hàng
                  </a>
                  ${apt.status === 'pending' || apt.status === 'confirmed' ? `
                  <button onclick="cancelAppointment('${apt.id}')" 
                          class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition">
                    <i class="fas fa-times mr-2"></i>Hủy lịch
                  </button>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function cancelAppointment(appointmentId) {
      if (!confirm('Bạn có chắc muốn hủy lịch hẹn này?')) {
        return;
      }

      let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments = appointments.map(apt => {
        if (apt.id === appointmentId) {
          return { ...apt, status: 'cancelled' };
        }
        return apt;
      });
      
      localStorage.setItem('appointments', JSON.stringify(appointments));
      loadAppointments();
      
      showNotification('Đã hủy lịch hẹn thành công!', 'success');
    }

    // Initialize default appointment data if none exists
    function initializeDefaultAppointments() {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      if (appointments.length === 0) {
        // Add default appointment
        const defaultAppointment = {
          id: 'apt_default_1',
          storeId: 'petwow',
          storeName: 'Pet Wow',
          storeAddress: '294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh',
          storeImage: '../../assets/images/stores/PetWow/logo_petwow.png',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
          time: '14:00',
          petName: 'Lucky',
          services: [
            {
              name: 'Tắm sấy',
              duration: '30 phút',
              quantity: 1,
              price: '170.000'
            },
            {
              name: 'Cắt mài móng',
              duration: '20 phút',
              quantity: 1,
              price: '40.000'
            }
          ],
          totalPrice: '210.000',
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('appointments', JSON.stringify([defaultAppointment]));
      }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      initializeDefaultPets();
      initializeDefaultAppointments();
      initializeDefaultStatistics();
    });

    // ============================================
    // DELETE ACCOUNT FUNCTIONS
    // ============================================
    function openDeleteAccountModal() {
      const modal = document.getElementById('deleteAccountModal');
      if (modal) {
        modal.classList.remove('hidden');
        // Reset form
        const form = document.getElementById('deleteAccountForm');
        if (form) form.reset();
      }
    }

    function closeDeleteAccountModal() {
      const modal = document.getElementById('deleteAccountModal');
      if (modal) {
        modal.classList.add('hidden');
        // Reset form
        const form = document.getElementById('deleteAccountForm');
        if (form) form.reset();
      }
    }

    function confirmDeleteAccount(event) {
      event.preventDefault();

      const password = document.getElementById('deletePassword')?.value || '';
      const confirm = document.getElementById('deleteConfirm')?.value || '';

      // Validate password
      if (!password) {
        showNotification('Vui lòng nhập mật khẩu để xác nhận!', 'error');
        return;
      }

      // Validate confirmation text
      if (confirm !== 'XÓA') {
        showNotification('Vui lòng nhập chính xác "XÓA" để xác nhận!', 'error');
        document.getElementById('deleteConfirm').focus();
        return;
      }

      // Get stored password (in real app, this would be verified with server)
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const storedPassword = userData.password || '';

      // In real app, password should be hashed and verified with server
      // For demo, we'll check if password matches
      if (password !== storedPassword && storedPassword) {
        showNotification('Mật khẩu không chính xác!', 'error');
        document.getElementById('deletePassword').focus();
        return;
      }

      // Show final confirmation
      if (!confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
        return;
      }

      // Delete account data
      const submitButton = event.target.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xóa...';

      // Simulate API call
      setTimeout(() => {
        // Clear all user data
        localStorage.removeItem('userData');
        localStorage.removeItem('favorites');
        localStorage.removeItem('pets');
        localStorage.removeItem('collections');
        localStorage.removeItem('viewedProducts');
        localStorage.removeItem('bookedServices');
        
        // Show success message
        showNotification('Tài khoản đã được xóa thành công!', 'success');
        
        // Close modal
        closeDeleteAccountModal();
        
        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          window.location.href = '../../index.html';
        }, 2000);
      }, 1500);
    }

    // Make functions global
    window.removeFromList = removeFromList;
    window.removeFavorite = removeFavorite;
    window.viewProduct = viewProduct;
    window.createNewCollection = createNewCollection;
    window.deleteCollection = deleteCollection;
    window.viewCollection = viewCollection;
    window.loadAppointments = loadAppointments;
    window.cancelAppointment = cancelAppointment;
    window.openAddPetModal = openAddPetModal;
    window.closeAddPetModal = closeAddPetModal;
    window.savePet = savePet;
    window.viewPetDetail = viewPetDetail;
    window.closePetDetailModal = closePetDetailModal;
    window.deletePet = deletePet;
    window.editPet = editPet;
    window.togglePassword = togglePassword;
    window.changePassword = changePassword;
    window.resetPasswordForm = resetPasswordForm;
    window.openDeleteAccountModal = openDeleteAccountModal;
    window.closeDeleteAccountModal = closeDeleteAccountModal;
    window.confirmDeleteAccount = confirmDeleteAccount;

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('main-header');
      if (!header) return;
      const headerContainer = header.querySelector('.container > div');

      if (window.scrollY > 50) {
        // Scrolled down - shrink header
        header.classList.add('bg-white', 'shadow-lg');
        header.classList.remove('bg-cream/80');
        if (headerContainer) {
        headerContainer.classList.remove('h-20');
        headerContainer.classList.add('h-16');
        }
      } else {
        // At top - expand header
        header.classList.remove('bg-white', 'shadow-lg');
        header.classList.add('bg-cream/80');
        if (headerContainer) {
        headerContainer.classList.remove('h-16');
        headerContainer.classList.add('h-20');
        }
      }
    });