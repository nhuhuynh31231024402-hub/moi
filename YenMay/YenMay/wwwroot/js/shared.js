// =========================================================================
// YEN SAO YEN MAY - SHARED JAVASCRIPT (shared.js)
// =========================================================================
// Chứa các hằng số toàn cục, hàm tiện ích, và logic khởi tạo
// được sử dụng trên nhiều trang.
// =========================================================================

// --- 1. HẰNG SỐ VÀ CẤU HÌNH TOÀN CỤC ---

const LOCAL_STORAGE_REVIEWS_KEY = 'productReviews_yenmay';
const LOCAL_STORAGE_WISHLIST_KEY_PREFIX = 'userWishlist_yenmay_';
const LOCAL_STORAGE_USERS_KEY = 'users';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'currentUser';
const LOCAL_STORAGE_CART_KEY = 'staticCart_yenmay';
const LOCAL_STORAGE_PRODUCTS_KEY = 'adminProducts_yenmay'; // Thêm key cho sản phẩm
const SHIPPING_FEE = 30000;

// Biến toàn cục để lưu trữ dữ liệu sản phẩm sau khi fetch
let allProductsData = [];

// --- 2. TẢI DỮ LIỆU ---
/**
 * Tải dữ liệu sản phẩm từ file JSON.
 * @returns {Promise<Array<object>>}
 */
async function fetchProducts() {
    // Kiểm tra localStorage trước
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (storedProducts) {
        try {
            const parsedProducts = JSON.parse(storedProducts);
            if (Array.isArray(parsedProducts)) {
                allProductsData = parsedProducts;
                console.log("Dữ liệu sản phẩm từ localStorage:", allProductsData.length, "sản phẩm");
                return allProductsData;
            } else {
                console.warn("Dữ liệu sản phẩm trong localStorage không phải mảng:", parsedProducts);
            }
        } catch (e) {
            console.error("Lỗi phân tích sản phẩm từ localStorage:", e);
        }
    }

    // Nếu không có localStorage hoặc lỗi, tải từ JSON
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, ${response.statusText}. Lỗi tải 'data/products.json'`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Dữ liệu sản phẩm không phải là một mảng.");
        }
        allProductsData = data; // Gán vào biến toàn cục
        console.log("Dữ liệu sản phẩm đã được tải từ JSON:", allProductsData.length, "sản phẩm");
        return allProductsData;
    } catch (error) {
        console.error("Không thể tải hoặc phân tích dữ liệu sản phẩm:", error);
        document.body.innerHTML = `<div class="alert alert-danger m-5 text-center">Lỗi nghiêm trọng: Không thể tải dữ liệu sản phẩm. Trang web không thể hoạt động. Vui lòng kiểm tra console để biết chi tiết.</div>`;
        return [];
    }
}

// --- 3. CÁC HÀM TIỆN ÍCH ---

/**
 * Lấy dữ liệu giỏ hàng từ localStorage.
 * @returns {Array}
 */
function getCart() {
    const rawCartData = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    try {
        const parsedCart = rawCartData ? JSON.parse(rawCartData) : [];
        if (!Array.isArray(parsedCart)) {
            console.error("Dữ liệu giỏ hàng không phải là mảng sau khi phân tích!", parsedCart);
            localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
            return [];
        }
        return parsedCart.map(item => ({
            ...item,
            quantity: parseInt(item.quantity, 10) || 1
        }));
    } catch (e) {
        console.error("Lỗi phân tích giỏ hàng từ localStorage:", e, "Dữ liệu gốc:", rawCartData);
        localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
        return [];
    }
}

/**
 * Lưu trạng thái giỏ hàng vào localStorage.
 * @param {Array} cart
 */
function saveCart(cart) {
    try {
        if (!Array.isArray(cart)) {
            console.error("Lưu giỏ hàng: Dữ liệu không phải là mảng.", cart);
            return;
        }
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
        updateCartCount(); // Cập nhật số lượng hiển thị ngay
    } catch (e) {
        console.error("Lỗi lưu giỏ hàng vào localStorage", e);
    }
}

/**
 * Cập nhật số lượng sản phẩm trên icon giỏ hàng.
 */
function updateCartCount() {
    const currentCartIcons = document.querySelectorAll('.cart-icon-link .cart-count-icon');
    if (!currentCartIcons || currentCartIcons.length === 0) return;
    try {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        currentCartIcons.forEach(icon => {
            icon.textContent = totalItems;
            icon.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    } catch (e) {
        console.error("Lỗi cập nhật số lượng giỏ hàng", e);
        currentCartIcons.forEach(icon => {
            icon.textContent = '0';
            icon.style.display = 'none';
        });
    }
}

/**
 * Định dạng số thành chuỗi tiền tệ VND.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) { amount = 0; }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

/**
 * Lấy tất cả đánh giá từ localStorage.
 * @returns {object}
 */
function getAllReviewsFromStorage() {
    try {
        const storedReviews = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
        return storedReviews ? JSON.parse(storedReviews) : {};
    } catch (e) {
        console.error("Lỗi khi đọc reviews từ localStorage:", e);
        return {};
    }
}

/**
 * Lấy đánh giá cho một sản phẩm cụ thể.
 * @param {string} productId
 * @returns {Array<object>}
 */
function getReviewsForProductFromStorage(productId) {
    if (!productId) return [];
    const allReviews = getAllReviewsFromStorage();
    return allReviews[productId] || [];
}

/**
 * Thêm đánh giá mới vào localStorage.
 * @param {string} productId
 * @param {object} newReview - { author, rating, comment, date }
 */
function addReviewToStorage(productId, newReview) {
    if (!productId || !newReview) return;
    const allReviews = getAllReviewsFromStorage();
    if (!allReviews[productId]) {
        allReviews[productId] = [];
    }
    allReviews[productId].push(newReview);
    try {
        localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(allReviews));
    } catch (e) {
        console.error("Lỗi khi lưu review vào localStorage:", e);
    }
}

/**
 * Tạo HTML cho các ngôi sao đánh giá.
 * @param {number} averageRating
 * @param {number} reviewCount
 * @param {boolean} [showReviewCount=true]
 * @returns {string}
 */
function generateStarRatingHTML(averageRating, reviewCount, showReviewCount = true) {
    let starsHTML = '';
    const rating = Math.max(0, Math.min(5, parseFloat(averageRating) || 0));
    const count = parseInt(reviewCount, 10) || 0;
    const roundedRating = Math.round(rating * 2) / 2;
    let tempFullStars = Math.floor(roundedRating);
    let tempHalfStar = (roundedRating % 1 !== 0) ? 1 : 0;

    if (tempHalfStar && (roundedRating - tempFullStars < 0.5) && (roundedRating - tempFullStars > 0)) {
        tempHalfStar = 1;
    } else if (roundedRating - tempFullStars >= 0.75) {
        tempFullStars += 1;
        tempHalfStar = 0;
    }
    let emptyStars = 5 - tempFullStars - tempHalfStar;

    for (let i = 0; i < tempFullStars; i++) starsHTML += '<i class="fas fa-star text-warning"></i>';
    if (tempHalfStar) starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
    for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="far fa-star text-warning"></i>';

    if (showReviewCount) {
        starsHTML += ` <span class="rating-count small text-muted ms-1">(${count > 0 ? count + ' đánh giá' : 'Chưa có đánh giá'})</span>`;
    }
    return starsHTML;
}

/**
 * Lấy danh sách yêu thích của người dùng hiện tại.
 * @returns {Array<string>}
 */
function getWishlist() {
    const currentUserEmail = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    if (!currentUserEmail) return [];
    const wishlistKey = LOCAL_STORAGE_WISHLIST_KEY_PREFIX + currentUserEmail;
    const storedWishlist = localStorage.getItem(wishlistKey);
    try {
        const parsed = storedWishlist ? JSON.parse(storedWishlist) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error(`Lỗi PARSING storedWishlist cho key "${wishlistKey}". Data: "${storedWishlist}". Lỗi:`, e);
        return [];
    }
}

/**
 * Lưu danh sách yêu thích.
 * @param {Array<string>} wishlist
 * @returns {boolean}
 */
function saveWishlist(wishlist) {
    const currentUserEmail = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    if (!currentUserEmail) {
        console.warn("[saveWishlist] Chưa đăng nhập. Không thể lưu wishlist.");
        return false;
    }
    const wishlistKey = LOCAL_STORAGE_WISHLIST_KEY_PREFIX + currentUserEmail;
    try {
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
        return true;
    } catch (e) {
        console.error(`[saveWishlist] Lỗi lưu wishlist vào key "${wishlistKey}":`, e);
        return false;
    }
}

/**
 * Thêm/Xóa sản phẩm khỏi danh sách yêu thích.
 * @param {string} productId
 * @returns {boolean | null}
 */
function toggleWishlistItem(productId) {
    if (!localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY)) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.");
        return null;
    }
    let wishlist = getWishlist();
    const itemIndex = wishlist.indexOf(productId);
    let added = false;
    if (itemIndex > -1) {
        wishlist.splice(itemIndex, 1); // Xóa
    } else {
        wishlist.push(productId); // Thêm
        added = true;
    }
    if (saveWishlist(wishlist)) return added;
    return null; // Lỗi khi lưu
}

/**
 * Cập nhật UI nút yêu thích.
 * @param {HTMLElement} buttonElement
 * @param {boolean} isWishlisted
 */
function updateWishlistButtonUI(buttonElement, isWishlisted) {
    if (!buttonElement) return;
    const icon = buttonElement.querySelector('i');
    if (!icon) return;
    if (isWishlisted) {
        icon.classList.remove('far'); icon.classList.add('fas');
        icon.style.color = 'red';
        buttonElement.title = "Xóa khỏi yêu thích";
    } else {
        icon.classList.remove('fas'); icon.classList.add('far');
        icon.style.color = '';
        buttonElement.title = "Thêm vào yêu thích";
    }
}

/**
 * Xử lý đăng xuất.
 * @param {Event} event
 */
function handleLogout(event) {
    if (event) event.preventDefault();
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
        updateHeaderLoginState();
        // Không tự động chuyển trang nếu đang ở profile.html hoặc trang admin
        const path = window.location.pathname;
        if (!path.includes('profile.html') && !path.includes('admin.html')) {
            window.location.href = 'index.html';
        } else if (path.includes('profile.html')) {
            window.location.href = 'login.html'; // Từ profile thì về login
        }
    }
}

/**
 * Cập nhật trạng thái đăng nhập trên header.
 */
function updateHeaderLoginState() {
    const currentUserEmail = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    const accountMenuItemDesktop = document.getElementById('account-menu-item');
    const mobileAccountMenuItem = document.getElementById('mobile-account-menu-item');

    if (accountMenuItemDesktop) {
        accountMenuItemDesktop.innerHTML = '';
        if (currentUserEmail) {
            const allUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
            const currentUserData = allUsers.find(u => u.email === currentUserEmail);
            const userDisplayName = currentUserData?.name || currentUserEmail.split('@')[0];
            accountMenuItemDesktop.innerHTML = `
                <div class="dropdown">
                    <a href="#" class="nav-top-link dropdown-toggle d-flex align-items-center" id="userDropdownDesktop" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none; color: #613613;">
                        <i class="fas fa-user-circle me-2" style="font-size: 1.4em;"></i> ${userDisplayName}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end animate slideIn" aria-labelledby="userDropdownDesktop">
                        <li><a class="dropdown-item" href="profile.html"><i class="fas fa-id-card me-2"></i>Thông tin cá nhân</a></li>
                        <li><a class="dropdown-item" href="order-history.html"><i class="fas fa-history me-2"></i>Lịch sử đơn hàng</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" id="logout-button-desktop"><i class="fas fa-sign-out-alt me-2"></i>Đăng xuất</a></li>
                    </ul>
                </div>`;
            const logoutBtnDesktop = document.getElementById('logout-button-desktop');
            if (logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', handleLogout);
        } else {
            accountMenuItemDesktop.innerHTML = `<a href="login.html" aria-label="Tài khoản" class="ms-3 nav-top-link nav-top-not-logged-in is-small"><i class="fas fa-user"></i></a>`;
        }
    }

    if (mobileAccountMenuItem) {
        mobileAccountMenuItem.innerHTML = '';
        if (currentUserEmail) {
            const allUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
            const currentUserData = allUsers.find(u => u.email === currentUserEmail);
            const userDisplayName = currentUserData?.name || currentUserEmail.split('@')[0];
            mobileAccountMenuItem.innerHTML = `
                <a href="profile.html" class="px-3 py-2 d-block"><i class="fas fa-user-circle me-2"></i>${userDisplayName}</a>
                <a href="order-history.html" class="px-3 py-2 d-block"><i class="fas fa-history me-2"></i>Lịch sử đơn hàng</a>
                <a href="#" id="logout-button-mobile" class="px-3 py-2 d-block text-danger"><i class="fas fa-sign-out-alt me-2"></i>Đăng xuất</a>`;
            const logoutBtnMobile = document.getElementById('logout-button-mobile');
            if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', handleLogout);
        } else {
            mobileAccountMenuItem.innerHTML = `<a href="login.html" class="px-3 py-2 d-block">Tài khoản</a>`;
        }
    }
}


// --- 4. GLOBAL EVENT LISTENERS & INITIALIZATION ---

document.addEventListener('DOMContentLoaded', async function () {
    console.log("Shared.js: DOM fully loaded. Fetching initial product data...");
    await fetchProducts(); // Tải dữ liệu sản phẩm toàn cục một lần

    // DOM Elements cho header (đã khai báo ở các file riêng nếu chỉ dùng ở đó)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavMenu = document.querySelector('.main-nav-mobile .nav-menu');
    const searchIconDesktop = document.getElementById('search-icon-desktop');
    const searchContainerDesktop = document.getElementById('desktop-search-container');
    const searchInputDesktop = document.getElementById('desktop-search-input');
    const closeSearchDesktop = document.getElementById('close-search-desktop');
    const searchIconMobile = document.getElementById('search-icon-mobile');
    const searchContainerMobile = document.getElementById('mobile-search-container');
    const searchInputMobile = document.getElementById('mobile-search-input');

    // Mobile Menu Toggle
    if (menuToggle && mobileNavMenu) {
        menuToggle.addEventListener('click', function () {
            mobileNavMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Add to Cart Button Click Handler (Event Delegation)
    document.body.addEventListener('click', function (event) {
        const addToCartBtn = event.target.closest('.add-to-cart-button');
        if (addToCartBtn) {
            const productContainer = event.target.closest('.product-card') || event.target.closest('.product-detail-info');
            if (!productContainer || !productContainer.dataset.id || !productContainer.dataset.name || !productContainer.dataset.price || !productContainer.dataset.img) {
                console.error("Lỗi Thêm vào giỏ: Thiếu thuộc tính dữ liệu sản phẩm.", productContainer);
                alert("Lỗi: Không thể thêm sản phẩm vào giỏ hàng do thiếu thông tin.");
                return;
            }
            const productId = productContainer.dataset.id;
            const productName = productContainer.dataset.name;
            const productPrice = parseFloat(productContainer.dataset.price);
            const productImg = productContainer.dataset.img;
            let quantity = 1;
            const qtyInputOnDetailPage = document.getElementById('product-quantity');
            if (qtyInputOnDetailPage && productContainer.classList.contains('product-detail-info')) {
                quantity = parseInt(qtyInputOnDetailPage.value, 10) || 1;
                if (quantity < 1) quantity = 1;
            }
            if (isNaN(productPrice) || productPrice < 0) {
                console.error("Lỗi Thêm vào giỏ: Giá sản phẩm không hợp lệ.", productId, productPrice);
                alert("Lỗi: Giá sản phẩm không hợp lệ.");
                return;
            }
            const cart = getCart();
            const existingItemIndex = cart.findIndex(item => item.id === productId);
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, img: productImg, quantity: quantity });
            }
            saveCart(cart); // saveCart sẽ gọi updateCartCount
            if (!productContainer.classList.contains('product-detail-info')) {
                const btn = addToCartBtn;
                if (btn && !btn.disabled) {
                    const originalHTML = btn.innerHTML;
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-check me-1"></i> Đã thêm';
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = originalHTML;
                    }, 2000);
                }
            } else {
                alert(`Đã thêm ${quantity} "${productName}" vào giỏ hàng!`);
            }
        }
    });

    // Search Toggle Handlers
    function setupSearchListener(inputElement, isSanphamPage, filterFunc) {
        inputElement.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                if (isSanphamPage && typeof filterFunc === 'function') {
                    filterFunc(searchTerm); // Gọi hàm filterProductsOnPage từ sanpham-page.js
                } else if (searchTerm) {
                    window.location.href = `sanpham.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
        // Xử lý khi người dùng xóa bằng nút 'x' trên input type="search"
        inputElement.addEventListener('search', function (event) {
            if (!event.target.value) { // Nếu ô tìm kiếm trống
                if (isSanphamPage && typeof filterFunc === 'function') {
                    filterFunc(''); // Gọi hàm filter với chuỗi rỗng
                }
            }
        });
    }

    const isSanphamPageCurrently = window.location.pathname.includes('sanpham.html');
    // `filterProductsOnPage` sẽ được định nghĩa trong sanpham-page.js và gán vào window nếu cần truy cập từ đây
    // Hoặc shared.js chỉ chuyển hướng, và sanpham-page.js tự xử lý URL param `search` khi tải.
    // Cách đơn giản hơn là sanpham-page.js sẽ tự đọc URL param.

    if (searchIconDesktop && searchContainerDesktop && closeSearchDesktop && searchInputDesktop) {
        searchIconDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            searchContainerDesktop.classList.toggle('active');
            if (searchContainerDesktop.classList.contains('active')) searchInputDesktop.focus();
        });
        closeSearchDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            searchContainerDesktop.classList.remove('active');
            searchInputDesktop.value = '';
            // Nếu đang ở trang sanpham.html, xóa bộ lọc
            if (isSanphamPageCurrently && typeof window.filterProductsOnPage === 'function') {
                window.filterProductsOnPage('');
            }
        });
        setupSearchListener(searchInputDesktop, isSanphamPageCurrently, window.filterProductsOnPage);
    }

    if (searchIconMobile && searchContainerMobile && searchInputMobile) {
        searchIconMobile.addEventListener('click', (e) => {
            e.preventDefault();
            searchContainerMobile.classList.toggle('active');
            if (searchContainerMobile.classList.contains('active')) searchInputMobile.focus();
            else {
                searchInputMobile.value = '';
                if (isSanphamPageCurrently && typeof window.filterProductsOnPage === 'function') {
                    window.filterProductsOnPage('');
                }
            }
        });
        setupSearchListener(searchInputMobile, isSanphamPageCurrently, window.filterProductsOnPage);
    }

    // Initial calls on every page load
    updateCartCount();
    updateHeaderLoginState();

    console.log("Shared.js: Global listeners and initial UI updates complete.");

    // Phát một sự kiện tùy chỉnh sau khi shared.js đã tải xong và allProductsData đã có
    const sharedReadyEvent = new Event('sharedScriptsReady');
    document.dispatchEvent(sharedReadyEvent);
    console.log("Shared.js: Đã phát sự kiện sharedScriptsReady.");
});