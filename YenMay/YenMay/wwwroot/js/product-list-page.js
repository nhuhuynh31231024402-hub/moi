// js/product-list-page.js
document.addEventListener('sharedScriptsReady', function () {
    console.log("Product List Page Script: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");
    // allProductsData, formatCurrency, getReviewsForProductFromStorage, generateStarRatingHTML
    // đã có sẵn từ shared.js

    const productGridContainer = document.querySelector('.products-grid > .row');
    const categoryTitleElement = document.getElementById('category-title');
    const noResultsMessage = document.getElementById('no-search-results');
    const paginationContainer = document.getElementById('pagination-container');
    const sortSelect = document.getElementById('sort-select');
    const filterPriceButtons = document.querySelectorAll('.filter-price-btn');
    // Ô tìm kiếm đã được xử lý ở shared.js, nhưng chúng ta cần hàm filterProductsOnPage
    // để shared.js có thể gọi khi Enter trên trang này.

    const itemsPerPage = 8;
    let currentPage = 1;
    let sortedAndFilteredProducts = []; // Sẽ chứa sản phẩm sau khi lọc và sắp xếp
    let currentSortOption = 'default';
    let currentPriceFilter = { min: 0, max: Infinity };
    const urlParamsList = new URLSearchParams(window.location.search);
    let currentSearchTerm = urlParamsList.get('search') || '';

    function renderPaginationControls(totalPages, page) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        const createPageItem = (pageNumber, text, isDisabled = false, isActive = false) => {
            const li = document.createElement('li');
            li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#'; // Để tránh reload, xử lý click bằng JS
            a.textContent = text;
            if (!isDisabled && !isActive) {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    displayPage(sortedAndFilteredProducts, pageNumber); // Hiển thị trang mới
                    const productGridElement = document.querySelector('.products-grid');
                    if (productGridElement) { // Cuộn lên đầu lưới sản phẩm
                        window.scrollTo({ top: productGridElement.offsetTop - 80, behavior: 'smooth' });
                    }
                });
            } else if (isDisabled || isActive) {
                a.addEventListener('click', e => e.preventDefault());
            }
            li.appendChild(a);
            return li;
        };

        paginationContainer.appendChild(createPageItem(page - 1, 'Trước', page === 1));
        let startPage, endPage;
        if (totalPages <= 5) { startPage = 1; endPage = totalPages; }
        else {
            if (page <= 3) { startPage = 1; endPage = 5; }
            else if (page + 2 >= totalPages) { startPage = totalPages - 4; endPage = totalPages; }
            else { startPage = page - 2; endPage = page + 2; }
        }
        if (startPage > 1) {
            paginationContainer.appendChild(createPageItem(1, '1'));
            if (startPage > 2) paginationContainer.appendChild(createPageItem(0, '...', true));
        }
        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.appendChild(createPageItem(i, i.toString(), false, i === page));
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) paginationContainer.appendChild(createPageItem(0, '...', true));
            paginationContainer.appendChild(createPageItem(totalPages, totalPages.toString()));
        }
        paginationContainer.appendChild(createPageItem(page + 1, 'Tiếp', page === totalPages));
    }

    function displayPage(productsToDisplay, page) {
        currentPage = page;
        if (!productGridContainer) return;
        productGridContainer.innerHTML = '';
        if (noResultsMessage) noResultsMessage.style.display = 'none';

        if (!productsToDisplay || productsToDisplay.length === 0) {
            if (noResultsMessage) {
                noResultsMessage.textContent = "Không có sản phẩm nào phù hợp với tiêu chí lọc.";
                noResultsMessage.style.display = 'block';
            }
            renderPaginationControls(0, 1);
            return;
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = productsToDisplay.slice(startIndex, endIndex);

        paginatedItems.forEach(product => {
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
            productGridContainer.appendChild(col);
        });
        const totalPages = Math.ceil(productsToDisplay.length / itemsPerPage);
        renderPaginationControls(totalPages, currentPage);
    }

    // Gán hàm này vào window để shared.js có thể gọi
    window.filterProductsOnPage = function (searchTerm) {
        currentSearchTerm = searchTerm;
        filterSortAndDisplayProducts();
    }

    function filterSortAndDisplayProducts() {
        const categoryParam = urlParamsList.get('category');
        const normalizedSearchTerm = currentSearchTerm.toLowerCase().trim();
        let productsToProcess = [...allProductsData];
        let currentCategoryName = "Tất Cả Sản Phẩm";

        if (categoryParam) {
            const productWithCategoryName = allProductsData.find(p => p.categoryLink && p.categoryLink.endsWith(`?category=${categoryParam}`));
            if (productWithCategoryName) {
                currentCategoryName = productWithCategoryName.category;
                productsToProcess = productsToProcess.filter(p => p.category === currentCategoryName);
            } else {
                const directMatchCategory = allProductsData.find(p => p.category && p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') === categoryParam.toLowerCase());
                if (directMatchCategory) {
                    currentCategoryName = directMatchCategory.category;
                    productsToProcess = productsToProcess.filter(p => p.category === currentCategoryName);
                } else {
                    currentCategoryName = `Danh mục "${categoryParam}"`; // Giữ lại tên category từ URL
                    // Nếu muốn hiển thị "không tồn tại" thì productsToProcess = [];
                    // Tạm thời để hiển thị "Danh mục X" và không có sản phẩm nào
                    const isKnownCategory = allProductsData.some(p => p.category && p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') === categoryParam.toLowerCase());
                    if (!isKnownCategory) {
                        productsToProcess = []; // Không có sản phẩm nếu category không tồn tại
                        currentCategoryName = `Danh mục "${categoryParam}" không tồn tại`;
                    }
                }
            }
        }

        if (normalizedSearchTerm !== '') {
            productsToProcess = productsToProcess.filter(product =>
                (product.name || '').toLowerCase().includes(normalizedSearchTerm) ||
                (product.sku || '').toLowerCase().includes(normalizedSearchTerm) ||
                (product.shortDescriptionHTML || '').toLowerCase().includes(normalizedSearchTerm)
            );
        }

        productsToProcess = productsToProcess.filter(product => {
            const price = product.price || 0;
            const maxPrice = currentPriceFilter.max === Infinity ? Number.MAX_SAFE_INTEGER : currentPriceFilter.max;
            return price >= currentPriceFilter.min && price <= maxPrice;
        });

        sortedAndFilteredProducts = [...productsToProcess]; // Cập nhật biến này

        switch (currentSortOption) {
            case 'price-asc': sortedAndFilteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
            case 'price-desc': sortedAndFilteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
            case 'name-asc': sortedAndFilteredProducts.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'vi', { sensitivity: 'base' })); break;
            case 'name-desc': sortedAndFilteredProducts.sort((a, b) => (b.name || '').localeCompare(a.name || '', 'vi', { sensitivity: 'base' })); break;
            default: break;
        }

        if (categoryTitleElement) {
            if (normalizedSearchTerm !== '' && !categoryParam) { // Chỉ tìm kiếm, không có category
                categoryTitleElement.textContent = `Kết quả tìm kiếm cho "${currentSearchTerm}"`;
            } else if (normalizedSearchTerm !== '' && categoryParam) { // Cả tìm kiếm và category
                categoryTitleElement.textContent = `Kết quả tìm kiếm cho "${currentSearchTerm}" trong "${currentCategoryName}"`;
            }
            else { // Chỉ category hoặc tất cả sản phẩm
                categoryTitleElement.textContent = currentCategoryName;
            }
        }
        displayPage(sortedAndFilteredProducts, 1); // Luôn về trang 1 sau khi lọc/sắp xếp
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSortOption = e.target.value;
            filterSortAndDisplayProducts();
        });
    }

    if (filterPriceButtons && filterPriceButtons.length > 0) {
        filterPriceButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterPriceButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentPriceFilter.min = parseFloat(this.dataset.min) || 0;
                currentPriceFilter.max = this.dataset.max === 'Infinity' ? Infinity : (parseFloat(this.dataset.max) || Infinity);
                filterSortAndDisplayProducts();
            });
        });
    }

    // Điền giá trị tìm kiếm ban đầu từ URL vào ô search (nếu có)
    const searchInputDesktopGlobal = document.getElementById('desktop-search-input');
    const searchInputMobileGlobal = document.getElementById('mobile-search-input');
    if (currentSearchTerm) {
        if (searchInputDesktopGlobal) searchInputDesktopGlobal.value = currentSearchTerm;
        if (searchInputMobileGlobal) searchInputMobileGlobal.value = currentSearchTerm;
    }

    // Khởi tạo trang sản phẩm
    if (allProductsData && allProductsData.length > 0) {
        filterSortAndDisplayProducts();
    } else {
        console.warn("Product List Page: allProductsData is not available or empty.");
    }
    console.log("Product List Page Script: Khởi tạo hoàn tất.");
});