// js/index-page.js
document.addEventListener('sharedScriptsReady', function () {
    console.log("Index Page Script: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic cho trang chủ...");
    // allProductsData đã có sẵn từ shared.js
    // Các hàm dùng chung như getReviewsForProductFromStorage, generateStarRatingHTML, formatCurrency đã có từ shared.js

    // =========================================================================
    // --- LOGIC CHO MODAL VIDEO GIỚI THIỆU (index.html) ---
    // =========================================================================
    const introVideoModalElement = document.getElementById('introVideoModal');
    if (introVideoModalElement) {
        const introModal = new bootstrap.Modal(introVideoModalElement); // Không cần option vì đã set trong HTML
        let videoPlayer = null; // Để theo dõi player nào đang hoạt động (YouTube hoặc local)

        // Tự động mở modal sau một khoảng trễ ngắn
        setTimeout(() => {
            console.log("Index Page: Đang thử hiển thị modal video giới thiệu...");
            introModal.show();
        }, 1000); // Trễ 1 giây

        // Khi modal được hiển thị
        introVideoModalElement.addEventListener('shown.bs.modal', function () {
            console.log("Index Page: Modal video đã hiển thị.");
            const currentYoutubeIframe = document.getElementById('youtubeVideoPlayer');
            const currentLocalVideo = document.getElementById('localVideoPlayer');

            if (currentYoutubeIframe && currentYoutubeIframe.contentWindow && typeof currentYoutubeIframe.contentWindow.postMessage === 'function') {
                videoPlayer = currentYoutubeIframe;
                // YouTube API sẽ tự động phát nếu URL có autoplay=1&mute=1
                console.log("Index Page: YouTube player được xác định. Autoplay được xử lý bởi URL params.");
            } else if (currentLocalVideo && typeof currentLocalVideo.play === 'function') {
                videoPlayer = currentLocalVideo;
                currentLocalVideo.play().catch(error => console.warn("Index Page: Trình duyệt ngăn tự động phát video local:", error));
                console.log("Index Page: Local video player được xác định, đang thử phát.");
            } else {
                console.warn("Index Page: Không tìm thấy YouTube iframe hoặc local video player hợp lệ trong modal khi hiển thị.");
            }
        });

        // Khi modal sắp bị đóng -> Dừng video
        introVideoModalElement.addEventListener('hide.bs.modal', function () {
            console.log("Index Page: Modal video đang ẩn.");
            if (videoPlayer) {
                const currentYoutubeIframe = document.getElementById('youtubeVideoPlayer');
                const currentLocalVideo = document.getElementById('localVideoPlayer');

                if (videoPlayer === currentYoutubeIframe && currentYoutubeIframe.contentWindow && typeof currentYoutubeIframe.contentWindow.postMessage === 'function') {
                    currentYoutubeIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    console.log("Index Page: Lệnh dừng video YouTube đã gửi.");
                } else if (videoPlayer === currentLocalVideo && typeof currentLocalVideo.pause === 'function') {
                    currentLocalVideo.pause();
                    console.log("Index Page: Video local đã dừng.");
                }
                videoPlayer = null; // Reset player
            }
        });
    } else {
        console.warn("Index Page: Không tìm thấy phần tử modal video #introVideoModal.");
    }

    // =========================================================================
    // --- LOGIC CHO SECTION DANH MỤC SẢN PHẨM TABS (index.html) ---
    // =========================================================================
    const categoryTabContainer = document.getElementById('categoryTab');
    const categoryProductGridRow = document.getElementById('category-product-grid-row');

    if (categoryTabContainer && categoryProductGridRow && allProductsData && allProductsData.length > 0) {
        console.log("Index Page: Khởi tạo Tabs Danh Mục Sản Phẩm...");
        const categories = [...new Set(allProductsData.map(p => p.category).filter(c => c))];
        categoryTabContainer.innerHTML = '';
        let isFirstCategory = true;

        categories.forEach(category => {
            const slug = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const isActive = isFirstCategory;
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            navItem.setAttribute('role', 'presentation');

            const button = document.createElement('button');
            button.className = `nav-link ${isActive ? 'active' : ''}`;
            button.id = `cat-tab-${slug}`;
            button.setAttribute('data-bs-toggle', 'tab'); // Bootstrap sẽ xử lý active tab
            button.type = 'button';
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.textContent = category;
            button.dataset.categoryFilter = category;

            button.addEventListener('click', function () {
                displayCategoryProducts(this.dataset.categoryFilter);
            });

            navItem.appendChild(button);
            categoryTabContainer.appendChild(navItem);
            isFirstCategory = false;
        });

        function displayCategoryProducts(categoryName) {
            if (!categoryProductGridRow) return;
            categoryProductGridRow.innerHTML = '<p class="col-12 text-center p-5 text-muted">Đang tải...</p>';
            const productsToShow = allProductsData.filter(p => p.category === categoryName);
            const limitedProducts = productsToShow.slice(0, 8); // Giới hạn 8 sản phẩm
            categoryProductGridRow.innerHTML = '';

            if (limitedProducts.length === 0) {
                categoryProductGridRow.innerHTML = '<p class="col-12 text-center p-5 text-muted">Không có sản phẩm trong danh mục này.</p>';
                return;
            }

            limitedProducts.forEach(product => {
                const col = document.createElement('div');
                // Sử dụng class của Bootstrap cho responsive grid
                col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4 product-list-item';

                const reviewsForCard = getReviewsForProductFromStorage(product.id); // Từ shared.js
                let cardAverageRating = 0;
                let cardReviewCount = 0;
                if (reviewsForCard.length > 0) {
                    cardReviewCount = reviewsForCard.length;
                    const cardTotalRating = reviewsForCard.reduce((sum, review) => sum + (parseInt(review.rating, 10) || 0), 0);
                    cardAverageRating = cardTotalRating / cardReviewCount;
                }
                const cardStarHTML = generateStarRatingHTML(cardAverageRating, cardReviewCount, false); // Từ shared.js

                col.innerHTML = `
                    <div class="product-card card h-100" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.images?.[0] || 'placeholder.jpg'}">
                        <a href="product_detail.html?id=${product.id}" class="d-block position-relative overflow-hidden">
                            <img src="${product.images?.[0] || 'https://placehold.co/300x300/eee/ccc?text=No+Image'}" class="card-img-top" alt="${product.name || ''}">
                        </a>
                        <div class="card-body d-flex flex-column p-3">
                            <h3 class="product-title card-title mb-1"><a href="product_detail.html?id=${product.id}" class="text-decoration-none">${product.name || 'N/A'}</a></h3>
                            <div class="star-rating mb-2 product-card-rating-summary">${cardStarHTML}</div>
                            ${product.shortDescriptionHTML ? `<div class="product-excerpt small mb-2">${product.shortDescriptionHTML}</div>` : ''}
                            <p class="price card-text mt-auto mb-2">${formatCurrency(product.price || 0)}</p> 
                            <button class="btn btn-sm btn-theme-primary add-to-cart-button mt-auto">Thêm vào giỏ</button>
                        </div>
                    </div>`;
                categoryProductGridRow.appendChild(col);
            });
        }

        // Hiển thị sản phẩm cho tab active đầu tiên khi tải trang
        const firstActiveTab = categoryTabContainer.querySelector('.nav-link.active');
        if (firstActiveTab && firstActiveTab.dataset.categoryFilter) {
            displayCategoryProducts(firstActiveTab.dataset.categoryFilter);
        } else if (categories.length > 0) {
            // Nếu không có tab nào active mặc định (ít khả năng xảy ra nếu code trên đúng), chọn category đầu tiên
            displayCategoryProducts(categories[0]);
            const firstTabButton = categoryTabContainer.querySelector('.nav-link');
            if (firstTabButton && !firstTabButton.classList.contains('active')) {
                firstTabButton.classList.add('active');
                firstTabButton.setAttribute('aria-selected', 'true');
            }
        } else {
            // Không có category nào cả
            if (categoryProductGridRow) categoryProductGridRow.innerHTML = '<p class="col-12 text-center p-5 text-muted">Không có danh mục sản phẩm nào.</p>';
        }

    } else {
        if (!allProductsData || allProductsData.length === 0) {
            console.warn("Index Page: Dữ liệu sản phẩm (allProductsData) trống hoặc chưa tải.");
        }
        if (!categoryTabContainer) console.warn("Index Page: Container cho tab danh mục (#categoryTab) không tìm thấy.");
        if (!categoryProductGridRow) console.warn("Index Page: Container cho lưới sản phẩm danh mục (#category-product-grid-row) không tìm thấy.");
    }
    // =========================================================================
    // --- LOGIC CHO CAROUSEL SẢN PHẨM NỔI BẬT (index.html) ---
    // =========================================================================
    const featuredProductCarouselInner = document.getElementById('featured-product-carousel-inner');

    function displayFeaturedProducts() {
        if (!featuredProductCarouselInner) {
            console.warn("Index Page: Container cho carousel sản phẩm nổi bật (#featured-product-carousel-inner) không tìm thấy.");
            return;
        }
        if (!allProductsData || allProductsData.length === 0) {
            console.warn("Index Page: Dữ liệu sản phẩm (allProductsData) trống hoặc chưa tải cho sản phẩm nổi bật.");
            featuredProductCarouselInner.innerHTML = '<p class="text-center p-5 text-muted">Không có sản phẩm nổi bật nào để hiển thị.</p>';
            return;
        }

        // Logic chọn sản phẩm nổi bật:
        // Ví dụ: Lấy 8 sản phẩm đầu tiên, hoặc bạn có thể thêm một trường "isFeatured: true" trong products.json
        // rồi lọc theo trường đó. Ở đây, tôi sẽ lấy 8 sản phẩm đầu tiên làm ví dụ.
        const featuredProducts = allProductsData.slice(0, 8); // Lấy 8 sản phẩm
        const productsPerSlide = 4; // Số sản phẩm mỗi slide carousel

        featuredProductCarouselInner.innerHTML = ''; // Xóa nội dung cũ

        if (featuredProducts.length === 0) {
            featuredProductCarouselInner.innerHTML = '<div class="carousel-item active"><p class="text-center p-5 text-muted">Không có sản phẩm nổi bật nào.</p></div>';
            // Ẩn nút control nếu không có sản phẩm
            const prevButton = document.querySelector('#featuredProductCarousel .carousel-control-prev');
            const nextButton = document.querySelector('#featuredProductCarousel .carousel-control-next');
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            return;
        }

        for (let i = 0; i < featuredProducts.length; i += productsPerSlide) {
            const slideProducts = featuredProducts.slice(i, i + productsPerSlide);
            const carouselItemDiv = document.createElement('div');
            carouselItemDiv.className = `carousel-item ${i === 0 ? 'active' : ''}`;

            const rowDiv = document.createElement('div');
            rowDiv.className = 'row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4'; // Sử dụng class của Bootstrap

            slideProducts.forEach(product => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col'; // Bootstrap sẽ tự chia cột dựa trên row-cols-*

                const reviewsForCard = getReviewsForProductFromStorage(product.id); // Từ shared.js
                let cardAverageRating = 0;
                let cardReviewCount = 0;
                if (reviewsForCard.length > 0) {
                    cardReviewCount = reviewsForCard.length;
                    const cardTotalRating = reviewsForCard.reduce((sum, review) => sum + (parseInt(review.rating, 10) || 0), 0);
                    cardAverageRating = cardTotalRating / cardReviewCount;
                }
                const cardStarHTML = generateStarRatingHTML(cardAverageRating, cardReviewCount, false); // Từ shared.js

                colDiv.innerHTML = `
                    <div class="product-card card h-100" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.images?.[0] || 'placeholder.jpg'}">
                        <a href="product_detail.html?id=${product.id}" class="d-block position-relative overflow-hidden">
                            <img src="${product.images?.[0] || 'https://placehold.co/300x300/eee/ccc?text=No+Image'}" class="card-img-top" alt="${product.name || ''}">
                        </a>
                        <div class="card-body d-flex flex-column p-3">
                            <h3 class="product-title card-title mb-1"><a href="product_detail.html?id=${product.id}" class="text-decoration-none">${product.name || 'N/A'}</a></h3>
                            <div class="star-rating mb-2 product-card-rating-summary">${cardStarHTML}</div>
                            ${product.shortDescriptionHTML ? `<div class="product-excerpt small mb-2">${product.shortDescriptionHTML}</div>` : ''}
                            <p class="price card-text mt-auto mb-2">${formatCurrency(product.price || 0)}</p>
                            <button class="btn btn-sm btn-theme-primary add-to-cart-button mt-auto">Thêm vào giỏ</button>
                        </div>
                    </div>
                `;
                rowDiv.appendChild(colDiv);
            });
            carouselItemDiv.appendChild(rowDiv);
            featuredProductCarouselInner.appendChild(carouselItemDiv);
        }
        // Hiển thị nút control nếu có nhiều hơn 1 slide
        const numSlides = Math.ceil(featuredProducts.length / productsPerSlide);
        const prevButton = document.querySelector('#featuredProductCarousel .carousel-control-prev');
        const nextButton = document.querySelector('#featuredProductCarousel .carousel-control-next');
        if (prevButton) prevButton.style.display = numSlides > 1 ? 'block' : 'none';
        if (nextButton) nextButton.style.display = numSlides > 1 ? 'block' : 'none';


        console.log("Index Page: Đã hiển thị sản phẩm nổi bật vào carousel.");
    }

    // Gọi hàm hiển thị sản phẩm nổi bật
    displayFeaturedProducts();

    console.log("Index Page Script: Khởi tạo hoàn tất.");
});