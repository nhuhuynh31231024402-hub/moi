document.addEventListener('sharedScriptsReady', async () => {
    console.log("[Profile.js] Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");

    // --- Dữ liệu địa chỉ động ---
    const addressData = {
        vn: {
            name: "Việt Nam",
            provinces: {
                daklak: {
                    name: "Đắk Lắk",
                    districts: {
                        buonmathuot: { name: "Buôn Ma Thuột", wards: { ward1: "Quận 1", ward2: "Quận 2", nhonhoa: "Nhơn Hòa", nhonphu: "Nhơn Phú" } },
                        eadrong: { name: "Ea Drong", wards: { warda: "Ward A", wardb: "Ward B" } }
                    }
                },
                hanoi: {
                    name: "Hà Nội",
                    districts: {
                        badinh: { name: "Ba Đình", wards: { phucxa: "Phúc Xá", trucbach: "Trúc Bạch" } },
                        hoankiem: { name: "Hoàn Kiếm", wards: { hangbac: "Hàng Bạc", hangdao: "Hàng Đào" } }
                    }
                },
                hcm: {
                    name: "Hồ Chí Minh",
                    districts: {
                        quan1: { name: "Quận 1", wards: { bennghe: "Bến Nghé", phamngulao: "Phạm Ngũ Lão" } },
                        quan3: { name: "Quận 3", wards: { vovantan: "Võ Văn Tần" } }
                    }
                },
                binhdinh: {
                    name: "Bình Định",
                    districts: {
                        quynhon: { name: "Quy Nhơn", wards: { ghengrang: "Ghềnh Ráng", xuonghuan: "Xương Huân" } },
                        annhon: { name: "An Nhơn", wards: { wardx: "Ward X" } }
                    }
                }
            }
        },
        usa: {
            name: "Mỹ",
            provinces: {
                california: {
                    name: "California",
                    districts: {
                        losangeles: { name: "Los Angeles", wards: { hollywood: "Hollywood", downtownla: "Downtown LA" } },
                        sanfrancisco: { name: "San Francisco", wards: { chinatown: "Chinatown", mission: "Mission District" } }
                    }
                },
                newyork: { name: "New York", districts: {} },
                texas: { name: "Texas", districts: {} }
            }
        },
        jp: { name: "Nhật Bản", provinces: {} },
        kr: { name: "Hàn Quốc", provinces: {} }
    };

    // --- 1. Kiểm tra và Lấy thông tin người dùng hiện tại ---
    const currentEmail = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    if (!currentEmail) {
        console.error("[Profile.js] Lỗi: Không tìm thấy currentEmail trong localStorage.");
        alert("Vui lòng đăng nhập để truy cập trang này.");
        window.location.href = 'login.html';
        return;
    }

    let allUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
    let currentUserIndex = allUsers.findIndex(u => u.email === currentEmail);
    let currentUserData = (currentUserIndex > -1) ? allUsers[currentUserIndex] : null;

    if (!currentUserData) {
        console.error("[Profile.js] Lỗi: Không tìm thấy dữ liệu người dùng cho email:", currentEmail);
        alert("Có lỗi xảy ra với tài khoản của bạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
        window.location.href = 'login.html';
        return;
    }

    // --- 2. Tham chiếu đến các phần tử DOM ---
    const fullnameInput = document.getElementById('fullname');
    const emailDisplay = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const genderSelect = document.getElementById('gender');
    const dobInput = document.getElementById('dob');
    const addressInput = document.getElementById('address-input');
    const countrySelect = document.getElementById('country');
    const provinceSelect = document.getElementById('province');
    const districtSelect = document.getElementById('district');
    const wardSelect = document.getElementById('ward');
    const regionInput = document.getElementById('region-code');
    const addressError = document.getElementById('address-error');
    const avatarImg = document.getElementById('avatar');
    const avatarInput = document.getElementById('avatar-input');
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    const greetingEl = document.getElementById('greeting');
    const usernameEl = document.getElementById('username');

    const profileForm = document.getElementById('profile-form');
    const addressForm = document.getElementById('address-form');
    const changePasswordForm = document.getElementById('change-password-form');
    const logoutLink = document.querySelector('.sidebar-footer a[href="#logout"], .sidebar-footer a[data-target="logout"]');
    const deleteAccountLink = document.querySelector('.sidebar-footer a[href="#delete-account"], .sidebar-footer a[data-target="delete-account"]');

    const wishlistItemsContainer = document.getElementById('wishlist-items-container');
    const noWishlistItemsMessage = document.getElementById('no-wishlist-items');

    // Kiểm tra DOM elements
    const requiredElements = {
        fullnameInput, emailDisplay, phoneInput, genderSelect, dobInput,
        addressInput, countrySelect, provinceSelect, districtSelect, wardSelect, regionInput, addressError,
        avatarImg, avatarInput, changeAvatarBtn, greetingEl, usernameEl,
        profileForm, addressForm, changePasswordForm, wishlistItemsContainer, noWishlistItemsMessage
    };
    for (const [key, element] of Object.entries(requiredElements)) {
        if (!element) {
            console.error(`[Profile.js] Lỗi: Phần tử DOM "${key}" không tìm thấy.`);
        }
    }

    // --- 3. Hiển thị thông tin ban đầu ---
    if (greetingEl) {
        greetingEl.textContent = 'Xin chào,';
    } else {
        console.error("[Profile.js] Lỗi: Không tìm thấy phần tử greetingEl (#greeting).");
    }

    if (usernameEl) {
        usernameEl.textContent = currentUserData.name || currentEmail.split('@')[0] || 'User';
    } else {
        console.error("[Profile.js] Lỗi: Không tìm thấy phần tử usernameEl (#username).");
    }

    if (fullnameInput) fullnameInput.value = currentUserData.name || '';
    if (emailDisplay && emailDisplay.tagName === 'INPUT') {
        emailDisplay.value = currentUserData.email || '';
        emailDisplay.readOnly = true;
        emailDisplay.classList.add('form-control-plaintext');
    } else if (emailDisplay) {
        emailDisplay.textContent = currentUserData.email || '';
    }

    if (phoneInput) phoneInput.value = currentUserData.phone || '';
    if (genderSelect) genderSelect.value = currentUserData.gender || '';
    if (dobInput) dobInput.value = currentUserData.dob || '';
    if (addressInput) addressInput.value = currentUserData.address || '';
    if (regionInput) regionInput.value = currentUserData.regionCode || '';

    // --- Hàm kiểm tra số điện thoại hợp lệ ---
    function validatePhoneNumber(phoneValue) {
        // Remove any spaces or non-digit characters except + for validation
        const cleanedValue = phoneValue.replace(/[^0-9+]/g, '');
        // Regex: starts with 0 followed by 9 digits OR starts with +84 followed by 8 digits
        const phoneRegex = /^(0\d{9}|\+84\d{8})$/;
        if (!cleanedValue) {
            return { isValid: false, message: "Vui lòng nhập số điện thoại." };
        }
        if (!phoneRegex.test(cleanedValue)) {
            return { isValid: false, message: "Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có đúng 10 chữ số." };
        }
        return { isValid: true, message: "" };
    }

    // --- Thêm kiểm tra thời gian thực cho số điện thoại ---
    function validatePhoneField() {
        if (!phoneInput) return;
        const phoneValue = phoneInput.value.trim();
        const validationResult = validatePhoneNumber(phoneValue);

        let phoneError = document.getElementById('phone-error');
        if (!phoneError) {
            phoneError = document.createElement('div');
            phoneError.id = 'phone-error';
            phoneError.className = 'invalid-feedback';
            phoneInput.parentElement.appendChild(phoneError);
        }

        if (validationResult.isValid) {
            phoneInput.classList.remove('is-invalid');
            phoneInput.classList.add('is-valid');
            phoneError.style.display = 'none';
        } else {
            phoneInput.classList.remove('is-valid');
            phoneInput.classList.add('is-invalid');
            phoneError.textContent = validationResult.message;
            phoneError.style.display = 'block';
        }
    }

    // Gắn sự kiện kiểm tra thời gian thực cho số điện thoại
    if (phoneInput) {
        phoneInput.addEventListener('input', validatePhoneField);
    }

    // --- Hàm kiểm tra ngày sinh hợp lệ ---
    function validateDateOfBirth(dobValue) {
        if (!dobValue) {
            return { isValid: false, message: "Vui lòng nhập ngày sinh." };
        }

        const dob = new Date(dobValue);
        const today = new Date();
        const minAge = 13; // Tuổi tối thiểu
        const maxAge = 120; // Tuổi tối đa

        // Kiểm tra ngày sinh có hợp lệ không
        if (isNaN(dob.getTime())) {
            return { isValid: false, message: "Ngày sinh không hợp lệ." };
        }

        // Kiểm tra ngày sinh không được trong tương lai
        if (dob > today) {
            return { isValid: false, message: "Ngày sinh không được trong tương lai." };
        }

        // Tính tuổi
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        // Kiểm tra tuổi tối thiểu
        if (age < minAge) {
            return { isValid: false, message: `Bạn phải ít nhất ${minAge} tuổi.` };
        }

        // Kiểm tra tuổi tối đa
        if (age > maxAge) {
            return { isValid: false, message: `Tuổi tối đa là ${maxAge} tuổi. Vui lòng kiểm tra lại ngày sinh.` };
        }

        return { isValid: true, message: "" };
    }

    // --- Thêm kiểm tra thời gian thực cho ngày sinh ---
    function validateDobField() {
        if (!dobInput) return;

        const dobValue = dobInput.value;
        const validationResult = validateDateOfBirth(dobValue);

        // Tạo hoặc lấy phần tử hiển thị lỗi
        let dobError = document.getElementById('dob-error');
        if (!dobError) {
            dobError = document.createElement('div');
            dobError.id = 'dob-error';
            dobError.className = 'invalid-feedback';
            dobInput.parentElement.appendChild(dobError);
        }

        // Cập nhật trạng thái và thông báo lỗi
        if (validationResult.isValid || !dobValue) {
            dobInput.classList.remove('is-invalid');
            dobInput.classList.add('is-valid');
            dobError.style.display = 'none';
        } else {
            dobInput.classList.remove('is-valid');
            dobInput.classList.add('is-invalid');
            dobError.textContent = validationResult.message;
            dobError.style.display = 'block';
        }
    }

    // Gắn sự kiện để kiểm tra ngày sinh thời gian thực
    if (dobInput) {
        dobInput.addEventListener('input', validateDobField);
    }

    // --- Cập nhật dropdown địa chỉ động ---
    function updateProvinces() {
        if (!provinceSelect || !countrySelect) return;
        provinceSelect.innerHTML = '<option value="">Chọn tỉnh/thành</option>';
        const country = countrySelect.value;
        if (country && addressData[country]?.provinces) {
            Object.entries(addressData[country].provinces).forEach(([id, province]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = province.name;
                provinceSelect.appendChild(option);
            });
            const provinceValue = currentUserData.province || '';
            provinceSelect.value = provinceValue;
            if (!provinceSelect.value) {
                provinceSelect.value = '';
            }
        } else {
            provinceSelect.value = '';
        }
        updateDistricts();
    }

    function updateDistricts() {
        if (!districtSelect || !provinceSelect || !countrySelect) return;
        districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
        const country = countrySelect.value;
        const province = provinceSelect.value;
        if (country && province && addressData[country]?.provinces[province]?.districts) {
            Object.entries(addressData[country].provinces[province].districts).forEach(([id, district]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = district.name;
                districtSelect.appendChild(option);
            });
            const districtValue = currentUserData.district || '';
            districtSelect.value = districtValue;
            if (!districtSelect.value) {
                districtSelect.value = '';
            }
        } else {
            districtSelect.value = '';
        }
        updateWards();
    }

    function updateWards() {
        if (!wardSelect || !districtSelect || !provinceSelect || !countrySelect) return;
        wardSelect.innerHTML = '<option value="">Chọn phường/xã</option>';
        const country = countrySelect.value;
        const province = provinceSelect.value;
        const district = districtSelect.value;
        if (country && province && district && addressData[country]?.provinces[province]?.districts[district]?.wards) {
            Object.entries(addressData[country].provinces[province].districts[district].wards).forEach(([id, ward]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = ward;
                wardSelect.appendChild(option);
            });
            const wardValue = currentUserData.ward || '';
            wardSelect.value = wardValue;
            if (!wardSelect.value) {
                wardSelect.value = '';
            }
        } else {
            wardSelect.value = '';
        }
    }

    // Gắn sự kiện cho các dropdown và gọi validateAddressFields
    if (countrySelect) {
        countrySelect.addEventListener('change', () => {
            updateProvinces();
            validateAddressFields();
        });
    }
    if (provinceSelect) {
        provinceSelect.addEventListener('change', () => {
            updateDistricts();
            validateAddressFields();
        });
    }
    if (districtSelect) {
        districtSelect.addEventListener('change', () => {
            updateWards();
            validateAddressFields();
        });
    }
    if (wardSelect) {
        wardSelect.addEventListener('change', () => {
            validateAddressFields();
        });
    }

    // Khởi tạo dropdown
    if (countrySelect) {
        countrySelect.value = currentUserData.country || '';
        updateProvinces();
    }

    // --- Xử lý chỉ cho phép nhập số vào mã vùng và số điện thoại ---
    if (regionInput) {
        regionInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            validatePhoneField(); // Trigger validation on input
        });
    }

    // --- Thêm kiểm tra thời gian thực cho form địa chỉ ---
    function validateAddressFields() {
        if (!addressInput || !addressError || !countrySelect || !provinceSelect || !districtSelect || !wardSelect) return;

        const address = addressInput.value.trim();
        const country = countrySelect.value;
        const province = provinceSelect.value;
        const district = districtSelect.value;
        const ward = wardSelect.value;

        console.log("[Profile.js] Giá trị các trường:", { address, country, province, district, ward });

        const isAddressValid = address !== '';
        addressInput.classList.toggle('is-invalid', !isAddressValid);
        addressInput.classList.toggle('is-valid', isAddressValid);
        addressError.style.display = isAddressValid ? 'none' : 'block';

        const isCountryValid = country !== '';
        countrySelect.classList.toggle('is-invalid', !isCountryValid);
        countrySelect.classList.toggle('is-valid', isCountryValid);

        const isProvinceValid = province !== '';
        provinceSelect.classList.toggle('is-invalid', !isProvinceValid);
        provinceSelect.classList.toggle('is-valid', isProvinceValid);

        const isDistrictValid = district !== '';
        districtSelect.classList.toggle('is-invalid', !isDistrictValid);
        districtSelect.classList.toggle('is-valid', isDistrictValid);

        const isWardValid = ward !== '';
        wardSelect.classList.toggle('is-invalid', !isWardValid);
        wardSelect.classList.toggle('is-valid', isWardValid);
    }

    if (addressInput) {
        addressInput.addEventListener('input', validateAddressFields);
    }
    if (countrySelect) {
        countrySelect.addEventListener('change', validateAddressFields);
    }
    if (provinceSelect) {
        provinceSelect.addEventListener('change', validateAddressFields);
    }
    if (districtSelect) {
        districtSelect.addEventListener('change', validateAddressFields);
    }
    if (wardSelect) {
        wardSelect.addEventListener('change', validateAddressFields);
    }

    // --- 4. Xử lý Avatar ---
    const avatarKey = `avatar_${currentEmail}`;
    const savedAvatar = currentUserData.avatar || localStorage.getItem(avatarKey);
    const avatarModal = document.getElementById('avatar-modal');
    const modalImg = document.getElementById('modal-img');

    if (avatarImg && savedAvatar) {
        avatarImg.src = savedAvatar;
    }

    if (avatarImg) {
        avatarImg.addEventListener('click', () => {
            modalImg.src = avatarImg.src;
            avatarModal.classList.remove('hidden');
        });
    }

    if (avatarModal) {
        avatarModal.addEventListener('click', () => {
            avatarModal.classList.add('hidden');
        });
    }

    if (avatarImg && avatarInput && changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            avatarInput.click();
        });

        avatarInput.addEventListener('change', () => {
            const file = avatarInput.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = e => {
                    const newAvatarDataUrl = e.target.result;
                    avatarImg.src = newAvatarDataUrl;
                    if (currentUserIndex > -1) {
                        allUsers[currentUserIndex].avatar = newAvatarDataUrl;
                        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(allUsers));
                        console.log("[Profile.js] Avatar đã được cập nhật trong đối tượng người dùng và lưu vào localStorage.");
                    }
                };
                reader.onerror = (err) => console.error("[Profile.js] Lỗi đọc file ảnh:", err);
                reader.readAsDataURL(file);
            } else if (file) {
                alert("Vui lòng chọn một file hình ảnh hợp lệ (JPEG, PNG, GIF).");
            }
        });
    }

    // --- 5. Xử lý lưu thông tin Profile ---
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentUserIndex < 0) {
                alert("Lỗi: Không tìm thấy thông tin người dùng.");
                return;
            }

            // Kiểm tra số điện thoại
            const phoneValue = phoneInput?.value.trim();
            const phoneValidation = validatePhoneNumber(phoneValue);
            if (!phoneValidation.isValid) {
                alert(phoneValidation.message);
                phoneInput.focus();
                return;
            }

            // Kiểm tra ngày sinh
            const dobValue = dobInput?.value;
            const dobValidation = validateDateOfBirth(dobValue);
            if (!dobValidation.isValid && dobValue) {
                alert(dobValidation.message);
                dobInput.focus();
                return;
            }

            allUsers[currentUserIndex].name = fullnameInput?.value.trim() ?? allUsers[currentUserIndex].name;
            allUsers[currentUserIndex].phone = phoneValue;
            allUsers[currentUserIndex].gender = genderSelect?.value ?? allUsers[currentUserIndex].gender;
            allUsers[currentUserIndex].dob = dobValue || allUsers[currentUserIndex].dob;

            try {
                localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(allUsers));
                alert("Cập nhật thông tin cá nhân thành công!");
                if (usernameEl) usernameEl.textContent = allUsers[currentUserIndex].name || currentEmail.split('@')[0];
                if (typeof updateHeaderLoginState === 'function') updateHeaderLoginState();
            } catch (error) {
                console.error("[Profile.js] Lỗi khi lưu thông tin cá nhân:", error);
                alert('Đã có lỗi xảy ra khi lưu thông tin.');
            }
        });
    }

    // --- 6. Xử lý lưu thông tin Địa chỉ ---
    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentUserIndex < 0) {
                console.error("[Profile.js] Lỗi: Không tìm thấy thông tin người dùng cho email:", currentEmail);
                alert("Lỗi: Không tìm thấy thông tin người dùng.");
                return;
            }

            if (!addressInput || !countrySelect || !provinceSelect || !districtSelect || !wardSelect || !regionInput) {
                console.error("[Profile.js] Lỗi: Một hoặc nhiều phần tử form địa chỉ không tìm thấy.");
                alert("Lỗi: Form địa chỉ không hợp lệ. Vui lòng kiểm tra giao diện.");
                return;
            }

            const address = addressInput.value.trim();
            const country = countrySelect.value;
            const province = provinceSelect.value;
            const district = districtSelect.value;
            const ward = wardSelect.value;
            const regionCode = regionInput.value.trim();

            console.log("[Profile.js] Giá trị khi submit:", { address, country, province, district, ward, regionCode });

            const missingFields = [];
            if (!address) missingFields.push("Địa chỉ");
            if (!country) missingFields.push("Quốc gia");
            if (!province) missingFields.push("Tỉnh/Thành phố");
            if (!district) missingFields.push("Quận/Huyện");
            if (!ward) missingFields.push("Phường/Xã");

            if (missingFields.length > 0) {
                console.warn("[Profile.js] Lỗi: Thiếu các trường địa chỉ bắt buộc.", { address, country, province, district, ward });
                alert(`Vui lòng điền đầy đủ các trường bắt buộc: ${missingFields.join(", ")}.`);
                return;
            }

            allUsers[currentUserIndex].address = address;
            allUsers[currentUserIndex].country = country;
            allUsers[currentUserIndex].province = province;
            allUsers[currentUserIndex].district = district;
            allUsers[currentUserIndex].ward = ward;
            allUsers[currentUserIndex].regionCode = regionCode;

            try {
                localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(allUsers));
                console.log("[Profile.js] Đã cập nhật thông tin địa chỉ:", allUsers[currentUserIndex]);
                alert("Cập nhật thông tin địa chỉ thành công!");
            } catch (error) {
                console.error("[Profile.js] Lỗi khi lưu thông tin địa chỉ:", error);
                alert("Đã có lỗi xảy ra khi lưu địa chỉ. Vui lòng thử lại.");
            }
        });

        addressForm.addEventListener('reset', () => {
            if (currentUserIndex > -1) {
                if (addressInput) addressInput.value = currentUserData.address || '';
                if (countrySelect) countrySelect.value = currentUserData.country || '';
                updateProvinces();
                console.log("[Profile.js] Form địa chỉ đã được reset về giá trị ban đầu.");
                validateAddressFields();
            }
        });
    }

    // --- 7. Xử lý đổi mật khẩu ---
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', e => {
            e.preventDefault();
            const newPassInput = document.getElementById('new-password');
            const confirmPassInput = document.getElementById('confirm-password');

            if (!newPassInput || !confirmPassInput) {
                alert("Lỗi: Thiếu trường nhập mật khẩu trong HTML.");
                return;
            }

            const newPass = newPassInput.value.trim();
            const confirmPass = confirmPassInput.value.trim();

            if (!currentUserData.password || currentUserData.password === '') {
                alert('Không thể đổi mật khẩu đối với đăng nhập/đăng ký bằng mạng xã hội');
                return;
            }

            if (!newPass || !confirmPass) {
                alert('Vui lòng nhập đầy đủ mật khẩu mới và xác nhận.');
                return;
            }
            if (newPass !== confirmPass) {
                alert('Mật khẩu xác nhận không khớp.');
                return;
            }
            if (newPass.length < 6) {
                alert('Mật khẩu mới phải có ít nhất 6 ký tự.');
                return;
            }

            if (currentUserIndex > -1) {
                allUsers[currentUserIndex].password = newPass;
                try {
                    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(allUsers));
                    alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.');
                    changePasswordForm.reset();
                    if (typeof handleLogout === 'function') {
                        handleLogout(new Event('click', { bubbles: true, cancelable: true }));
                    } else {
                        localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
                        window.location.href = 'login.html';
                    }
                } catch (error) {
                    console.error("[Profile.js] Lỗi khi lưu mật khẩu mới:", error);
                    alert('Đã có lỗi xảy ra khi đổi mật khẩu.');
                }
            } else {
                alert('Lỗi: Không tìm thấy thông tin người dùng.');
            }
        });
    }

    // Hàm đánh giá độ mạnh của mật khẩu
    function calcStrength(value) {
        let score = 0;
        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;
        return score;
    }

    // Hiển thị độ mạnh của mật khẩu
    const newPassInput = document.getElementById('new-password');
    const passwordStrengthEl = document.getElementById('password-strength-text');
    const passwordStrengthBar = document.getElementById('password-strength-bar');

    if (newPassInput && passwordStrengthEl && passwordStrengthBar) {
        newPassInput.addEventListener('input', () => {
            const score = calcStrength(newPassInput.value);
            const percent = (score / 4) * 100;
            passwordStrengthBar.style.width = percent + '%';

            let color = '#e0e0e0', text = '';
            switch (score) {
                case 1:
                    text = 'Yếu'; color = '#d32f2f'; break;
                case 2:
                    text = 'Trung bình'; color = '#f57c00'; break;
                case 3:
                    text = 'Mạnh'; color = '#1976d2'; break;
                case 4:
                    text = 'Rất mạnh'; color = '#388e3c'; break;
            }
            passwordStrengthBar.style.background = color;
            passwordStrengthEl.textContent = text;
            passwordStrengthEl.style.color = color;
        });
    }

    // --- 8. Xử lý hiển thị danh sách Yêu thích ---
    async function displayWishlistItems() {
        if (!wishlistItemsContainer || !noWishlistItemsMessage) {
            console.error("[Profile.js] Lỗi: Container hoặc thông báo cho wishlist không tìm thấy.");
            return;
        }
        const wishlistProductIds = getWishlist();

        wishlistItemsContainer.innerHTML = '';
        if (wishlistProductIds.length === 0) {
            noWishlistItemsMessage.style.display = 'block';
            wishlistItemsContainer.style.display = 'none';
        } else {
            noWishlistItemsMessage.style.display = 'none';
            wishlistItemsContainer.style.display = 'flex';

            if (!allProductsData || allProductsData.length === 0) {
                console.warn("[Profile.js] Dữ liệu sản phẩm (allProductsData) chưa sẵn sàng.");
                wishlistItemsContainer.innerHTML = '<div class="col-12"><p class="text-danger">Lỗi tải dữ liệu sản phẩm để hiển thị danh sách yêu thích.</p></div>';
                return;
            }

            let itemsDisplayedCount = 0;
            wishlistProductIds.forEach(productId => {
                const product = allProductsData.find(p => p.id.toString() === productId.toString());
                if (product) {
                    itemsDisplayedCount++;
                    const columnDiv = document.createElement('div');
                    columnDiv.innerHTML = `
                        <div class="product-card card h-100">
                            <a href="product_detail.html?id=${product.id}" class="product-card-image-link">
                                <img src="${product.images?.[0] || './images/placeholder-image.png'}" class="card-img-top" alt="${product.name || ''}">
                            </a>
                            <div class="card-body d-flex flex-column">
                                <h5 class="product-title">
                                    <a href="product_detail.html?id=${product.id}">${product.name || 'N/A'}</a>
                                </h5>
                                <p class="price">${formatCurrency(product.price || 0)}</p>
                                <div class="card-actions mt-auto">
                                    <a href="product_detail.html?id=${product.id}" class="btn btn-sm btn-outline-secondary btn-view-product">Xem SP</a>
                                    <button class="btn btn-sm btn-danger btn-remove-wishlist" data-product-id="${product.id}" title="Xóa khỏi yêu thích">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    wishlistItemsContainer.appendChild(columnDiv);
                }
            });

            if (itemsDisplayedCount === 0 && wishlistProductIds.length > 0) {
                noWishlistItemsMessage.textContent = "Một số sản phẩm yêu thích không còn tồn tại hoặc đã có lỗi xảy ra.";
                noWishlistItemsMessage.style.display = 'block';
                wishlistItemsContainer.style.display = 'none';
            }

            wishlistItemsContainer.querySelectorAll('.btn-remove-wishlist').forEach(button => {
                button.addEventListener('click', function () {
                    const productIdToRemove = this.dataset.productId;
                    const productToRemoveInfo = allProductsData.find(p => p.id.toString() === productIdToRemove.toString());
                    if (confirm(`Bạn có chắc muốn xóa sản phẩm "${productToRemoveInfo?.name || 'này'}" khỏi danh sách yêu thích?`)) {
                        toggleWishlistItem(productIdToRemove);
                        displayWishlistItems();
                    }
                });
            });
        }
    }
    function toggleSidebar() {
        const sidebarMenu = document.querySelector('.sidebar-menu');
        const toggleButton = document.querySelector('.sidebar-toggle');

        if (sidebarMenu.classList.contains('open')) {
            sidebarMenu.classList.remove('open');
            toggleButton.textContent = '☰'; // Icon khi đóng
        } else {
            sidebarMenu.classList.add('open');
            toggleButton.textContent = '✕'; // Icon khi mở
        }
    }

    // Gắn sự kiện nhấp chuột cho nút toggle
    document.querySelector('.sidebar-toggle').addEventListener('click', toggleSidebar);
    // --- 9. Xử lý chuyển Section trong Sidebar ---
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a[data-target], .sidebar-footer a[data-target], .sidebar-nav a[href^="#"], .sidebar-footer a[href^="#"]');
    const contentSections = document.querySelectorAll('main.main-content .form-section');

    function setActiveSection(targetId) {
        let sectionFoundAndDisplayed = false;
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.style.display = 'block';
                sectionFoundAndDisplayed = true;
            } else {
                section.style.display = 'none';
            }
        });

        if (!sectionFoundAndDisplayed && targetId !== 'logout' && targetId !== 'delete-account') {
            console.warn(`[Profile.js] Section với ID "${targetId}" không tìm thấy.`);
        }

        sidebarLinks.forEach(l => {
            const linkTarget = l.dataset.target || (l.getAttribute('href') || '').slice(1);
            l.classList.toggle('active', linkTarget === targetId);
        });

        if (targetId === 'favorites') {
            displayWishlistItems();
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            let targetId = link.dataset.target;
            if (!targetId && href && href.startsWith('#')) targetId = href.slice(1);

            if (targetId === 'logout' || targetId === 'delete-account') return;

            if (targetId) {
                e.preventDefault();
                setActiveSection(targetId);
                try { window.history.pushState(null, "", `#${targetId}`); } catch (err) { console.warn("Không thể cập nhật hash URL", err); }
            }
        });
    });

    // --- 10. Xử lý link Đăng xuất & Xóa tài khoản ---
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("[Profile.js] Link đăng xuất được click.");
            handleLogout(new Event('click', { bubbles: true, cancelable: true }));
        });
    }

    if (deleteAccountLink) {
        deleteAccountLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("BẠN CÓ CHẮC CHẮN MUỐN XÓA TÀI KHOẢN NÀY KHÔNG? Hành động này không thể hoàn tác!")) {
                if (confirm("XÁC NHẬN LẦN CUỐI: Bạn thực sự muốn xóa vĩnh viễn tài khoản này?")) {
                    if (currentUserIndex > -1) {
                        allUsers.splice(currentUserIndex, 1);
                        try {
                            localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(allUsers));
                            localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
                            localStorage.removeItem(`avatar_${currentEmail}`);
                            localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY_PREFIX + currentEmail);
                            alert("Tài khoản của bạn đã được xóa thành công.");
                            window.location.href = 'index.html';
                        } catch (error) {
                            console.error("[Profile.js] Lỗi khi xóa tài khoản:", error);
                            alert('Đã có lỗi xảy ra khi xóa tài khoản.');
                        }
                    }
                }
            }
        });
    }

    // Khởi tạo section mặc định và cập nhật header
    if (typeof updateHeaderLoginState === 'function') updateHeaderLoginState();
    if (typeof updateCartCount === 'function') updateCartCount();

    let initialSectionIdToLoad = 'account';
    if (window.location.hash) {
        const hashIdFromUrl = window.location.hash.substring(1);
        if (document.getElementById(hashIdFromUrl) && document.querySelector(`.sidebar a[data-target="${hashIdFromUrl}"], .sidebar a[href="#${hashIdFromUrl}"]`)) {
            initialSectionIdToLoad = hashIdFromUrl;
        }
    }
    setActiveSection(initialSectionIdToLoad);

    // Khởi tạo kiểm tra form địa chỉ, ngày sinh, và số điện thoại
    validateAddressFields();
    validateDobField();
    validatePhoneField();

    console.log("[Profile.js] Khởi tạo hoàn tất.");
});