// js/googlelog.js
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBfTJdBNOrafXP2M-iB5xUaG_9boosiB_o",
    authDomain: "my-first-projc.firebaseapp.com",
    projectId: "my-first-projc",
    storageBucket: "my-first-projc.appspot.com",
    messagingSenderId: "716336185957",
    appId: "1:716336185957:web:48b12ff68107133f45bc8c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.social-button.google');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                console.log('Đăng nhập thành công:', user);

                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (!users.find(u => u.email === user.email)) {
                    users.push({
                        name: user.displayName,
                        email: user.email,
                        password: null,
                        createdAt: new Date().toISOString()
                    });
                    localStorage.setItem('users', JSON.stringify(users));
                }
                localStorage.setItem('currentUser', user.email);

                alert(`Xin chào, ${user.displayName}!`);
                window.location.href = 'index.html';
            })
            .catch(err => {
                console.error(err);
                alert('Đăng nhập Google thất bại: ' + err.message);
            });
    });
});
