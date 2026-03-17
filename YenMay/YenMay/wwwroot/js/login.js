// js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signin-form');
    const emailInput = document.getElementById('signin-email');
    const pwdInput = document.getElementById('signin-password');
    const rememberChk = document.querySelector('input[name="remember"]');

    // Forgot-password elements
    const forgotForm = document.getElementById('forgot-password-form');
    const forgotEmail = document.getElementById('forgot-email');
    const forgotBtn = document.getElementById('forgot-submit');
    const resetSection = document.getElementById('reset-section');
    const newPwdInput = document.getElementById('new-password');
    const confirmInput = document.getElementById('confirm-password');
    const resetBtn = document.getElementById('reset-button');

    // --- HÀM TÍNH ĐỘ MẠNH MẬT KHẨU ---
    function calcStrength(value) {
        let score = 0;
        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;
        return score;
    }

    // --- 1. REMEMBER ME on login ---
    const remembered = localStorage.getItem('rememberMe') === 'true';
    if (remembered) {
        const remEmail = localStorage.getItem('rememberEmail');
        const remPwd = localStorage.getItem('rememberPassword');
        if (remEmail && remPwd) {
            emailInput.value = remEmail;
            pwdInput.value = remPwd;
            rememberChk.checked = true;
        }
    }

    // --- 2. LOGIN SUBMIT ---
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = pwdInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate
        if (!emailRegex.test(email)) {
            alert('Định dạng email không hợp lệ');
            return;
        }
        if (!password) {
            alert('Mật khẩu không được để trống');
            return;
        }

        // Check credentials
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            alert('Email hoặc mật khẩu không đúng!');
            return;
        }

        // Handle Remember Me
        if (rememberChk.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('rememberEmail', email);
            localStorage.setItem('rememberPassword', password);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('rememberEmail');
            localStorage.removeItem('rememberPassword');
        }

        // Success
        alert('Đăng nhập thành công!');
        localStorage.setItem('currentUser', email);
        window.location.href = 'index.html';
    });

    // --- 3. FORGOT PASSWORD: STEP 1 ---
    forgotForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = forgotEmail.value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const idx = users.findIndex(u => u.email === email);

        if (!users[idx].password) {
            alert('Tài khoản này đăng nhập qua social, không thể đặt lại mật khẩu.');
            return;
        }
        if (idx !== -1) {
            // Show reset section
            forgotEmail.disabled = true;
            forgotBtn.style.display = 'none';
            resetSection.style.display = 'block'; // Đặt display thành block
            resetSection.style.removeProperty('display'); // Xóa bất kỳ kiểu inline nào gây xung đột


            // Đảm bảo reset-section hiển thị trên mobile
            resetSection.classList.add('show-reset-section'); // Thêm class để ghi đè CSS nếu cần
            // Initialize strength UI for new password
            createResetStrengthUI();
        } else {
            alert(`Không tồn tại tài khoản: ${email}`);
        }
    });

    // --- 4. TẠO UI ĐỘ MẠNH MẬT for RESET ---
    function createResetStrengthUI() {
        // Avoid creating twice
        if (document.getElementById('reset-strength-container')) return;

        const container = document.createElement('div');
        container.id = 'reset-strength-container';
        container.style.margin = '0.5em 0';

        const bar = document.createElement('div');
        bar.id = 'reset-strength-bar';
        bar.style.height = '3px';
        bar.style.width = '0%';
        bar.style.borderRadius = '1px';
        bar.style.background = '#e0e0e0';

        const text = document.createElement('div');
        text.id = 'reset-strength-text';
        text.style.marginTop = '0.3em';
        text.style.fontWeight = 'bold';
        text.textContent = '';

        container.appendChild(bar);
        container.appendChild(text);
        newPwdInput.parentNode.insertBefore(container, newPwdInput.nextSibling);

        // Event listener
        newPwdInput.addEventListener('input', () => {
            const score = calcStrength(newPwdInput.value);
            const percent = (score / 4) * 100;
            bar.style.width = percent + '%';

            let color = '#e0e0e0', desc = '';
            switch (score) {
                case 1: desc = 'Yếu'; color = '#d32f2f'; break;
                case 2: desc = 'Trung bình'; color = '#f57c00'; break;
                case 3: desc = 'Mạnh'; color = '#1976d2'; break;
                case 4: desc = 'Rất mạnh'; color = '#388e3c'; break;
            }
            bar.style.background = color;
            text.textContent = desc;
            text.style.color = color;
        });
    }

    // --- 5. FORGOT PASSWORD: STEP 2 (RESET) ---
    resetBtn.addEventListener('click', function () {
        const pw1 = newPwdInput.value;
        const pw2 = confirmInput.value;
        const email = forgotEmail.value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const idx = users.findIndex(u => u.email === email);
        if (!users[idx].password) {
            alert('Tài khoản này đăng nhập qua social, không thể đặt lại mật khẩu.');
            return;
        }
        if (!pw1 || !pw2) {
            alert('Vui lòng nhập mật khẩu mới và xác nhận.');
            return;
        }
        if (pw1 !== pw2) {
            alert('Mật khẩu xác nhận không khớp.');
            return;
        }
        if (pw1 === users[idx].password) {
            alert('Mật khẩu trước đó không khả dụng. Vui lòng chọn mật khẩu mới.');
            return;
        }
        if (calcStrength(pw1) < 2) {
            alert('Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn.');
            return;
        }

        users[idx].password = pw1;
        localStorage.setItem('users', JSON.stringify(users));

        alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
        window.location.hash = '#signin-target';
        location.reload();
    });
});
// Xử lý social-login trên login.html
document.querySelectorAll(
    '.social-button.tiktok, ' +
    '.social-button.facebook, ' +
    '.social-button.twitter'
).forEach(btn => {
    btn.addEventListener('click', () => {
        let provider = '';
        if (btn.classList.contains('tiktok')) provider = 'TikTok';
        else if (btn.classList.contains('facebook')) provider = 'Facebook';
        else if (btn.classList.contains('twitter')) provider = 'Twitter';

        const socialEmail = `${provider.toLowerCase()}@social.local`;
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // 1) Thêm user nếu chưa có
        if (!users.some(u => u.email === socialEmail)) {
            users.push({
                name: provider,
                email: socialEmail,
                password: '',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('users', JSON.stringify(users));
        }

        localStorage.setItem('currentUser', socialEmail);

        const profileKey = `userProfile_${socialEmail}`;
        if (!localStorage.getItem(profileKey)) {
            localStorage.setItem(profileKey, JSON.stringify({
                fullname: provider,
                email: socialEmail,
                phone: '',
                gender: '',
                dob: '',
                address: '',
                country: 'vn',
                province: '',
                district: '',
                ward: '',
                regionCode: ''
            }));
        }

        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');

        alert(`Bạn đang đăng nhập bằng tài khoản ${provider}.`);
        window.location.href = 'index.html';
    });
});
document.getElementById('back-to-home').addEventListener('click', function () {
    window.location.href = 'index.html';
});
