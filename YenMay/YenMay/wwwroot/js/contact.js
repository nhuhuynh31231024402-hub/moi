// js/contact.js
document.addEventListener('sharedScriptsReady', () => {
    console.log("contact.js: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");



    function validateForm(event) {
        event.preventDefault();
        console.log("Validating contact form...");

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const phone = phoneInput?.value.trim();
        const message = messageInput?.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])(\d{7})$/;
        let isValid = true;
        const inputsToValidate = [nameInput, emailInput, phoneInput, messageInput];

        inputsToValidate.forEach(input => {
            if (input) {
                input.classList.remove('is-invalid');
                const feedback = input.nextElementSibling;
                // if (feedback && feedback.classList.contains('invalid-feedback')) {
                //     feedback.textContent = ''; // Reset feedback text
                // }
            }
        });

        if (!name) {
            isValid = false;
            if (nameInput) { nameInput.classList.add('is-invalid'); const f = nameInput.nextElementSibling; if (f) f.textContent = 'Vui lòng nhập họ và tên.'; }
        }
        if (!email) {
            isValid = false;
            if (emailInput) { emailInput.classList.add('is-invalid'); const f = emailInput.nextElementSibling; if (f) f.textContent = 'Vui lòng nhập email.'; }
        } else if (!emailRegex.test(email)) {
            isValid = false;
            if (emailInput) { emailInput.classList.add('is-invalid'); const f = emailInput.nextElementSibling; if (f) f.textContent = 'Email không hợp lệ.'; }
        }
        if (!phone) {
            isValid = false;
            if (phoneInput) { phoneInput.classList.add('is-invalid'); const f = phoneInput.nextElementSibling; if (f) f.textContent = 'Vui lòng nhập SĐT.'; }
        } else if (!phoneRegex.test(phone)) {
            isValid = false;
            if (phoneInput) { phoneInput.classList.add('is-invalid'); const f = phoneInput.nextElementSibling; if (f) f.textContent = 'SĐT không hợp lệ.'; }
        }
        if (!message) {
            isValid = false;
            if (messageInput) { messageInput.classList.add('is-invalid'); const f = messageInput.nextElementSibling; if (f) f.textContent = 'Vui lòng nhập lời nhắn.'; }
        }

        if (isValid) {
            alert('Thông tin hợp lệ! Lời nhắn của bạn đã được gửi (demo).');
            const contactForm = document.getElementById('contactForm');
            if (contactForm) contactForm.reset();
            inputsToValidate.forEach(input => { if (input) input.classList.remove('is-invalid'); });
            return true;
        } else {
            const firstInvalidField = document.getElementById('contactForm')?.querySelector('.is-invalid');
            if (firstInvalidField) firstInvalidField.focus();
            return false;
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    } else {
        console.warn("Contact.js: Contact form with ID 'contactForm' not found.");
    }

    // Intersection Observer cho animation (nếu có)
    const animatedElements = document.querySelectorAll('.contact-info .info-item, .map-container, .contact-form .form-floating, .contact-form .btn-primary');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('animate'));
    }


    // Gọi các hàm toàn cục từ shared.js nếu cần
    if (typeof updateHeaderLoginState === 'function') updateHeaderLoginState();
    if (typeof updateCartCount === 'function') updateCartCount();

    console.log("contact.js: Khởi tạo hoàn tất.");
});