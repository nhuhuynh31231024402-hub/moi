// js/product-detail-page.js
document.addEventListener('sharedScriptsReady', function () {
    console.log("Product Detail Page Script: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");
    // allProductsData, getReviewsForProductFromStorage, addReviewToStorage, generateStarRatingHTML, formatCurrency,
    // getWishlist, saveWishlist, toggleWishlistItem, updateWishlistButtonUI
    // đã có sẵn từ shared.js

    const urlParams = new URLSearchParams(window.location.search);
    const currentProductId = urlParams.get('id');

    // DOM Elements cho chi tiết sản phẩm
    const productDetailInfoDiv = document.querySelector('.product-detail-info');
    const modalProductImage = document.getElementById('modal-product-image'); // Cho modal xem ảnh lớn
    const relatedProductsContainer = document.getElementById('related-products-grid')?.querySelector('.row');

    // DOM Elements cho phần đánh giá
    const reviewsTabPane = document.getElementById('reviews-tab-pane'); // Container của tab review
    const existingReviewsList = document.getElementById('existing-reviews-list');
    const newReviewForm = document.getElementById('new-review-form');
    const starRatingInputContainer = document.getElementById('star-rating-input');
    const hiddenRatingInput = document.getElementById('review-rating-value');

    // DOM Element cho nút Yêu thích
    const wishlistButton = document.getElementById('add-to-wishlist-button');


    function displayRelatedProducts(currentProductCategory, currentProdId) {
        if (!relatedProductsContainer) {
            const relatedSection = document.querySelector('.related-products-section');
            if (relatedSection) relatedSection.style.display = 'none'; // Ẩn cả section nếu không có container
            return;
        }
        relatedProductsContainer.innerHTML = ''; // Xóa cũ

        const related = allProductsData.filter(p => p.category === currentProductCategory && p.id !== currentProdId);
        const productsToShow = related.slice(0, 4); // Hiển thị tối đa 4 SP liên quan

        if (productsToShow.length === 0) {
            const relatedSection = document.querySelector('.related-products-section');
            if (relatedSection) relatedSection.style.display = 'none';
            return;
        } else {
            const relatedSection = document.querySelector('.related-products-section');
            if (relatedSection) relatedSection.style.display = 'block';
        }

        productsToShow.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4 product-list-item';
            const reviewsForCard = getReviewsForProductFromStorage(product.id);
            let cardAverageRating = 0, cardReviewCount = 0;
            if (reviewsForCard.length > 0) {
                cardReviewCount = reviewsForCard.length;
                const cardTotalRating = reviewsForCard.reduce((sum, review) => sum + (parseInt(review.rating, 10) || 0), 0);
                cardAverageRating = cardTotalRating / cardReviewCount;
            }
            const cardStarHTML = generateStarRatingHTML(cardAverageRating, cardReviewCount, false);
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
            relatedProductsContainer.appendChild(col);
        });
    }

    function displayExistingReviews(productIdToDisplay) {
        if (!existingReviewsList) return;
        existingReviewsList.innerHTML = '';
        const productReviews = getReviewsForProductFromStorage(productIdToDisplay);
        if (productReviews.length > 0) {
            let reviewsHTML = '';
            productReviews.sort((a, b) => new Date(b.date) - new Date(a.date)); // Mới nhất lên đầu
            productReviews.forEach(review => {
                let ratingStars = '';
                const rating = parseInt(review.rating) || 0;
                for (let i = 1; i <= 5; i++) {
                    ratingStars += `<i class="fa${i <= rating ? 's' : 'r'} fa-star" style="color: #fdd835; font-size: 0.9em;"></i>`;
                }
                const reviewDate = review.date ? ` - <small class="text-muted">${new Date(review.date).toLocaleDateString('vi-VN')}</small>` : '';
                reviewsHTML += `
                    <div class="review-item mb-4 pb-3 border-bottom">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <strong class="review-author small">${review.author || 'Ẩn danh'}${reviewDate}</strong>
                            <span class="review-rating">${ratingStars}</span>
                        </div>
                        <p class="review-comment text-muted mb-0 small">${review.comment || ''}</p>
                    </div>`;
            });
            existingReviewsList.innerHTML = reviewsHTML;
        } else {
            existingReviewsList.innerHTML = '<p>Hiện chưa có đánh giá nào cho sản phẩm này.</p>';
        }
    }

    function handleCarouselSlide(event) {
        const activeIndex = event.to;
        const thumbnailsContainer = document.getElementById('product-thumbnails-container');
        if (thumbnailsContainer) {
            thumbnailsContainer.querySelectorAll('.product-thumb').forEach((thumb, index) => {
                thumb.classList.toggle('active', index === activeIndex);
            });
        }
    }

    function initializeWishlistButtonState(prodId) { // Nhận productId làm tham số
        if (wishlistButton && prodId) {
            const wishlist = getWishlist();
            const isWishlisted = wishlist.includes(prodId);
            updateWishlistButtonUI(wishlistButton, isWishlisted);
        }
    }

    function displayProductDetails(productIdToDisplay) {
        const detailContainer = document.querySelector('.product-detail-container');
        const breadcrumbCategoryLinkEl = document.getElementById('breadcrumb-category-link');
        const breadcrumbProductNameEl = document.getElementById('breadcrumb-product-name');
        const carouselInner = document.getElementById('product-carousel-inner');
        const thumbnailsContainer = document.getElementById('product-thumbnails-container');
        const titleEl = document.getElementById('product-detail-name');
        const priceEl = document.getElementById('product-detail-price');
        const shortDescEl = document.getElementById('product-detail-short-description');
        const descriptionTabPaneContent = document.getElementById('product-detail-full-description');
        const additionalInfoTabPane = document.getElementById('additional-info-tab-pane');
        const skuEl = document.getElementById('product-detail-sku');
        const categoryMetaLinkEl = document.getElementById('product-detail-category-link');
        const relatedSection = document.querySelector('.related-products-section');
        const ratingSummaryContainer = document.getElementById('product-rating-summary');

        if (!productIdToDisplay) {
            if (detailContainer) detailContainer.innerHTML = '<p class="text-center text-danger display-5 my-5">Lỗi: Không tìm thấy ID sản phẩm.</p>';
            if (relatedSection) relatedSection.style.display = 'none';
            if (ratingSummaryContainer) ratingSummaryContainer.innerHTML = generateStarRatingHTML(0, 0);
            return;
        }

        const product = allProductsData.find(p => p.id === productIdToDisplay);
        if (!product) {
            if (detailContainer) detailContainer.innerHTML = `<p class="text-center text-danger display-5 my-5">Sản phẩm với ID "${productIdToDisplay}" không tồn tại.</p>`;
            if (relatedSection) relatedSection.style.display = 'none';
            if (ratingSummaryContainer) ratingSummaryContainer.innerHTML = generateStarRatingHTML(0, 0);
            document.title = "Không tìm thấy sản phẩm - Yến Sào Yến Mây";
            return;
        }

        document.title = `${product.name || 'Chi tiết sản phẩm'} - Yến Sào Yến Mây`;
        if (breadcrumbCategoryLinkEl) { breadcrumbCategoryLinkEl.textContent = product.category || 'Danh mục'; breadcrumbCategoryLinkEl.href = product.categoryLink || 'sanpham.html'; }
        if (breadcrumbProductNameEl) breadcrumbProductNameEl.textContent = product.name || 'Sản phẩm';

        let imageCarouselInstance = null;
        const carouselElement = document.getElementById('productImageCarousel');
        if (carouselElement) {
            imageCarouselInstance = bootstrap.Carousel.getOrCreateInstance(carouselElement);
            // Xóa listener cũ trước khi thêm mới để tránh duplicate
            carouselElement.removeEventListener('slid.bs.carousel', handleCarouselSlide);
        }

        const prevButton = carouselElement?.querySelector('.carousel-control-prev');
        const nextButton = carouselElement?.querySelector('.carousel-control-next');

        if (carouselInner && product.images && product.images.length > 0) {
            carouselInner.innerHTML = '';
            if (thumbnailsContainer) thumbnailsContainer.innerHTML = '';

            product.images.forEach((imgUrl, index) => {
                const activeClass = index === 0 ? 'active' : '';
                const carouselItemDiv = document.createElement('div');
                carouselItemDiv.className = `carousel-item ${activeClass}`;
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.className = 'd-block w-100';
                imgElement.alt = `${product.name || 'Ảnh sản phẩm'} - ${index + 1}`;
                imgElement.style.cursor = 'pointer';
                imgElement.addEventListener('click', () => {
                    if (modalProductImage) modalProductImage.src = imgUrl;
                    // Không cần gọi new bootstrap.Modal(...).show() ở đây nếu modal đã được khai báo trong HTML với data-bs-toggle
                });
                carouselItemDiv.appendChild(imgElement);
                carouselInner.appendChild(carouselItemDiv);

                if (thumbnailsContainer && product.images.length > 1) {
                    const thumbImg = document.createElement('img');
                    thumbImg.src = imgUrl;
                    thumbImg.alt = `Thumbnail ${index + 1}`;
                    thumbImg.className = `img-thumbnail product-thumb ${activeClass}`;
                    thumbImg.dataset.bsTarget = "#productImageCarousel"; // Cho Bootstrap biết target
                    thumbImg.dataset.bsSlideTo = index.toString();     // Chỉ số slide
                    // Bootstrap sẽ tự xử lý active khi click thumbnail nếu có data-bs-slide-to
                    // Không cần addEventListener click thủ công để đổi slide ở đây nếu dùng data-bs-slide-to
                    thumbnailsContainer.appendChild(thumbImg);
                }
            });
            if (thumbnailsContainer) thumbnailsContainer.style.display = product.images.length > 1 ? 'flex' : 'none';
            if (prevButton) prevButton.style.display = product.images.length > 1 ? 'block' : 'none';
            if (nextButton) nextButton.style.display = product.images.length > 1 ? 'block' : 'none';

            // Chỉ thêm listener 'slid.bs.carousel' nếu có nhiều ảnh và thumbnail
            if (carouselElement && product.images.length > 1 && thumbnailsContainer) {
                carouselElement.addEventListener('slid.bs.carousel', handleCarouselSlide);
            }

        } else if (carouselInner) {
            carouselInner.innerHTML = '<div class="carousel-item active"><img src="https://placehold.co/600x500/eee/ccc?text=No+Image" class="d-block w-100" alt="Không có ảnh"></div>';
            if (thumbnailsContainer) thumbnailsContainer.innerHTML = '';
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
        }

        if (titleEl) titleEl.textContent = product.name;
        if (priceEl) priceEl.innerHTML = `<span class="woocommerce-Price-amount amount"><bdi>${formatCurrency(product.price || 0).replace('₫', '')}<span class="woocommerce-Price-currencySymbol">₫</span></bdi></span>`;
        if (shortDescEl) shortDescEl.innerHTML = product.shortDescriptionHTML || '';
        if (descriptionTabPaneContent) descriptionTabPaneContent.innerHTML = product.fullDescriptionHTML || '<p>Chưa có mô tả chi tiết cho sản phẩm này.</p>';
        if (additionalInfoTabPane) additionalInfoTabPane.innerHTML = product.additionalInfoHTML || '<p>Hiện chưa có thông tin bổ sung cho sản phẩm này.</p>';

        if (ratingSummaryContainer) {
            const reviewsFromStorage = getReviewsForProductFromStorage(productIdToDisplay);
            let averageRating = 0; let reviewCount = 0;
            if (reviewsFromStorage.length > 0) {
                reviewCount = reviewsFromStorage.length;
                const totalRating = reviewsFromStorage.reduce((sum, review) => sum + (parseInt(review.rating, 10) || 0), 0);
                averageRating = totalRating / reviewCount;
            }
            ratingSummaryContainer.innerHTML = generateStarRatingHTML(averageRating, reviewCount, true);
        }
        if (reviewsTabPane) displayExistingReviews(productIdToDisplay); // reviewsTabPane là id của tab-pane

        if (skuEl) skuEl.textContent = product.sku || 'Đang cập nhật';
        if (categoryMetaLinkEl) { categoryMetaLinkEl.textContent = product.category || 'Chưa phân loại'; categoryMetaLinkEl.href = product.categoryLink || 'sanpham.html'; }

        if (productDetailInfoDiv) { // productDetailInfoDiv là class của div chính bao quanh thông tin
            productDetailInfoDiv.dataset.id = product.id;
            productDetailInfoDiv.dataset.name = product.name;
            productDetailInfoDiv.dataset.price = product.price?.toString() ?? '0';
            productDetailInfoDiv.dataset.img = (product.images && product.images.length > 0) ? product.images[0] : 'placeholder.jpg';
        }

        displayRelatedProducts(product.category, productIdToDisplay);
        initializeWishlistButtonState(productIdToDisplay); // Gọi với ID sản phẩm hiện tại
    }


    if (wishlistButton) {
        wishlistButton.addEventListener('click', function () {
            // currentProductId đã được lấy từ URL ở đầu file này
            if (!currentProductId) {
                console.error("Product Detail Page: Không thể xác định ID sản phẩm để thêm/xóa yêu thích.");
                return;
            }
            if (!localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY)) { // Từ shared.js
                alert("Vui lòng đăng nhập để sử dụng chức năng này.");
                // Tùy chọn: window.location.href = 'login.html';
                return;
            }
            const toggleResult = toggleWishlistItem(currentProductId); // Từ shared.js
            if (toggleResult !== null) {
                updateWishlistButtonUI(this, toggleResult); // Từ shared.js
            }
        });
    }

    // Lắng nghe thay đổi storage để cập nhật nút yêu thích
    window.addEventListener('storage', function (event) {
        if (event.key === LOCAL_STORAGE_CURRENT_USER_KEY || (event.key && event.key.startsWith(LOCAL_STORAGE_WISHLIST_KEY_PREFIX))) {
            if (currentProductId) initializeWishlistButtonState(currentProductId);
        }
    });

    if (starRatingInputContainer && hiddenRatingInput) {
        const stars = starRatingInputContainer.querySelectorAll('.fa-star');
        function resetStarsVisual() { stars.forEach(s => { s.classList.remove('selected', 'hovered', 'fas'); s.classList.add('far'); }); }
        function highlightStarsUpTo(value, isSelectedState = false) {
            resetStarsVisual();
            for (let i = 0; i < value; i++) {
                stars[i].classList.add(isSelectedState ? 'selected' : 'hovered', 'fas');
                stars[i].classList.remove('far');
            }
        }
        stars.forEach(star => {
            star.addEventListener('mouseover', function () { highlightStarsUpTo(parseInt(this.dataset.value)); });
            star.addEventListener('mouseout', function () { highlightStarsUpTo(parseInt(hiddenRatingInput.value) || 0, true); });
            star.addEventListener('click', function () {
                const ratingValue = parseInt(this.dataset.value);
                hiddenRatingInput.value = ratingValue;
                highlightStarsUpTo(ratingValue, true);
                starRatingInputContainer.classList.remove('is-invalid');
                const feedbackEl = starRatingInputContainer.nextElementSibling;
                if (feedbackEl && feedbackEl.classList.contains('invalid-feedback')) feedbackEl.style.display = 'none';
            });
        });
        highlightStarsUpTo(parseInt(hiddenRatingInput.value) || 0, true);
    }

    if (newReviewForm) {
        newReviewForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const reviewerNameEl = document.getElementById('reviewer-name');
            const ratingValueEl = document.getElementById('review-rating-value');
            const commentEl = document.getElementById('reviewer-comment');

            const reviewerName = reviewerNameEl?.value.trim() || '';
            const rating = ratingValueEl?.value || '';
            const comment = commentEl?.value.trim() || '';
            // currentProductId đã được lấy từ URL ở đầu file

            let isValid = true;
            if (!reviewerName) { reviewerNameEl?.classList.add('is-invalid'); isValid = false; }
            else { reviewerNameEl?.classList.remove('is-invalid'); }

            const starRatingFeedbackElement = starRatingInputContainer?.nextElementSibling;
            if (!rating || parseInt(rating) === 0) {
                starRatingInputContainer?.classList.add('is-invalid');
                if (starRatingFeedbackElement && starRatingFeedbackElement.classList.contains('invalid-feedback')) starRatingFeedbackElement.style.display = 'block';
                isValid = false;
            } else {
                starRatingInputContainer?.classList.remove('is-invalid');
                if (starRatingFeedbackElement && starRatingFeedbackElement.classList.contains('invalid-feedback')) starRatingFeedbackElement.style.display = 'none';
            }

            if (!comment) { commentEl?.classList.add('is-invalid'); isValid = false; }
            else { commentEl?.classList.remove('is-invalid'); }

            if (!isValid) { alert("Vui lòng điền đầy đủ tên, chọn số sao và viết nhận xét."); return; }
            if (!currentProductId) { alert("Lỗi: Không xác định được sản phẩm để đánh giá."); return; }

            const newReviewData = { author: reviewerName, rating: parseInt(rating), comment: comment, date: new Date().toISOString() };
            addReviewToStorage(currentProductId, newReviewData); // Từ shared.js
            alert("Cảm ơn bạn đã gửi đánh giá!");
            newReviewForm.reset();
            if (hiddenRatingInput) hiddenRatingInput.value = '';
            if (starRatingInputContainer) {
                starRatingInputContainer.querySelectorAll('.fa-star').forEach(s => { s.classList.remove('selected', 'hovered', 'fas'); s.classList.add('far'); });
                starRatingInputContainer.classList.remove('is-invalid');
                if (starRatingFeedbackElement && starRatingFeedbackElement.classList.contains('invalid-feedback')) starRatingFeedbackElement.style.display = 'none';
            }

            displayExistingReviews(currentProductId); // Tải lại danh sách review
            // Cập nhật lại summary rating trên đầu trang
            const reviewsFromStorage = getReviewsForProductFromStorage(currentProductId);
            let averageRating = 0; let reviewCount = 0;
            if (reviewsFromStorage.length > 0) {
                reviewCount = reviewsFromStorage.length;
                const totalRating = reviewsFromStorage.reduce((sum, review) => sum + (parseInt(review.rating, 10) || 0), 0);
                averageRating = totalRating / reviewCount;
            }
            const ratingSummaryContainer = document.getElementById('product-rating-summary');
            if (ratingSummaryContainer) ratingSummaryContainer.innerHTML = generateStarRatingHTML(averageRating, reviewCount, true);
        });
    }

    // Gọi hàm hiển thị ban đầu
    if (allProductsData && allProductsData.length > 0) {
        displayProductDetails(currentProductId);
    } else {
        console.warn("Product Detail Page: allProductsData is not available or empty. Product details might not display correctly until data is loaded by shared.js.");
        // Nếu shared.js chưa tải xong allProductsData, displayProductDetails sẽ không có dữ liệu để chạy.
        // Sự kiện 'sharedScriptsReady' đảm bảo rằng allProductsData đã sẵn sàng.
    }
    console.log("Product Detail Page Script: Khởi tạo hoàn tất.");
});