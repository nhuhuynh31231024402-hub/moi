// js/register.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const pwd = document.getElementById('password');
    const cpw = document.getElementById('confirm-password');
    const agreeCheckbox = document.getElementById('agree');
    const pwdErr = document.getElementById('password-error');
    const captchaContainer = document.getElementById('captcha-container');

    pwdErr.style.display = 'none';
    captchaContainer.style.display = 'none';

    // --- TẠO UI ĐỘ MẠNH MẬT KHẨU ---
    const strengthContainer = document.createElement('div');
    strengthContainer.id = 'strength-container';
    strengthContainer.style.margin = '0.5em 0';

    const bar = document.createElement('div');
    bar.id = 'strength-bar';
    bar.style.height = '3px';
    bar.style.width = '0%';
    bar.style.borderRadius = '1px';
    bar.style.background = '#e0e0e0';

    const strengthText = document.createElement('div');
    strengthText.id = 'strength-text';
    strengthText.style.marginTop = '0.3em';
    strengthText.style.fontWeight = 'bold';
    strengthText.textContent = '';

    strengthContainer.appendChild(bar);
    strengthContainer.appendChild(strengthText);
    pwd.parentNode.insertBefore(strengthContainer, pwd.nextSibling);

    function calcStrength(value) {
        let score = 0;
        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;
        return score;
    }

    function updateStrengthUI() {
        const score = calcStrength(pwd.value);
        const percent = (score / 4) * 100;
        bar.style.width = percent + '%';

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
        bar.style.background = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

    pwd.addEventListener('input', updateStrengthUI);

    // Hiển thị lỗi
    function showError(msg) {
        pwdErr.textContent = msg;
        pwdErr.style.display = 'block';
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        pwdErr.style.display = 'none';

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const agree = agreeCheckbox.checked;
        if (!name) {
            showError('Vui lòng nhập họ và tên');
            return;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !emailRegex.test(email)) {
            showError('Email không hợp lệ');
            return;
        }
        if (!agree) {
            showError('Bạn phải đồng ý với điều khoản');
            return;
        }
        if (captchaContainer.style.display === 'none') {
            captchaContainer.style.display = 'block';
            return;
        }
        const token = grecaptcha.getResponse();
        if (!token) {
            showError('Vui lòng xác minh reCAPTCHA!');
            grecaptcha.reset();
            return;
        }
        const pwVal = pwd.value;
        const cpwVal = cpw.value;
        if (pwVal !== cpwVal) {
            showError('Mật khẩu không khớp');
            return;
        }

        if (calcStrength(pwVal) < 2) {
            showError('Mật khẩu quá yếu');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            showError('Email đã tồn tại');
            grecaptcha.reset();
            return;
        }

        users.push({ name, email, password: pwVal, createdAt: new Date().toISOString() });
        localStorage.setItem('users', JSON.stringify(users));

        grecaptcha.reset();
        form.reset();
        bar.style.width = '0%';
        strengthText.textContent = '';

        captchaContainer.style.display = 'none';
        pwdErr.style.display = 'none';

        alert('Đăng ký thành công!');
        window.location.href = 'login.html';
    });
});
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

        // Thêm user nếu chưa có
        if (!users.some(u => u.email === socialEmail)) {
            users.push({
                name: provider,
                email: socialEmail,
                password: '',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Set currentUser
        localStorage.setItem('currentUser', socialEmail);

        // Khởi tạo profile riêng nếu chưa có
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

        // Không remember mật khẩu
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');

        alert(`Bạn đang đăng ký tài khoản ${provider}.`);
        window.location.href = 'index.html';
    });
});
document.getElementById('back-to-home').addEventListener('click', function () {
    window.location.href = 'index.html';
});