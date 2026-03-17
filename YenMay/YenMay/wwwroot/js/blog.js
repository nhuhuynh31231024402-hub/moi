// js/blog.js (Ví dụ)

document.addEventListener('sharedScriptsReady', function () {
    console.log("blog.js: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");

    // --- DOM Elements của trang blog.html ---
    const blogGridRow = document.querySelector('#blog-grid-container .row');
    const noArticlesMessage = document.getElementById('no-articles-message');
    const blogPaginationContainer = document.getElementById('blog-pagination-container');
    // const filterButtons = document.querySelectorAll('.blog-filters .btn');

    // --- Pagination & Data State ---
    const articlesPerPage = 6;
    let currentPage = 1;
    let allArticles = []; // Sẽ được gán sau khi fetch
    let filteredArticles = [];

    /**
     * Tải dữ liệu bài viết từ file JSON.
     */
    async function fetchArticles() {
        try {
            const response = await fetch('data/articles.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}. Failed to fetch 'data/articles.json'`);
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text(); throw new TypeError(`Expected JSON, got ${contentType}. Content: ${text.substring(0, 100)}...`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error("Article data is not an array.");
            data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            return data;
        } catch (error) {
            console.error("Could not fetch articles:", error);
            if (noArticlesMessage) { noArticlesMessage.textContent = "Lỗi tải danh sách bài viết."; noArticlesMessage.style.display = 'block'; }
            return [];
        }
    }

    /**
     * Định dạng ngày tháng
     */
    function formatDate(dateString) {
        if (!dateString) return 'Không rõ';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch (e) {
            console.error("Error formatting date:", dateString, e);
            return dateString;
        }
    }

    /**
     * Hiển thị một trang bài viết cụ thể.
     */
    function displayBlogPage(articlesToDisplay, page) {
        currentPage = page;
        if (!blogGridRow) {
            console.error("#blog-grid-container .row not found.");
            return;
        }
        blogGridRow.innerHTML = '';
        if (noArticlesMessage) noArticlesMessage.style.display = 'none';

        if (!articlesToDisplay || articlesToDisplay.length === 0) {
            if (noArticlesMessage) {
                noArticlesMessage.textContent = "Hiện chưa có bài viết nào trong mục này.";
                noArticlesMessage.style.display = 'block';
            }
            renderBlogPagination(0, 1);
            return;
        }

        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const paginatedArticles = articlesToDisplay.slice(startIndex, endIndex);

        paginatedArticles.forEach(article => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 mb-4';
            const publishDateFormatted = formatDate(article.publishDate);

            col.innerHTML = `
                <div class="blog-post-card h-100">
                    <a href="${article.detailLink || '#'}" class="card-img-link">
                        <img src="${article.image || 'https://placehold.co/400x250/eee/ccc?text=No+Image'}" class="card-img-top" alt="${article.title || ''}">
                    </a>
                    <div class="card-body">
                         <p class="post-meta small text-muted mb-2">
                             <i class="far fa-calendar-alt me-1"></i> ${publishDateFormatted}
                             ${article.category ? `<span class="ms-2"><i class="far fa-folder-open me-1"></i> ${article.category}</span>` : ''}
                             ${article.author ? `<span class="ms-2"><i class="far fa-user me-1"></i> ${article.author}</span>` : ''}
                         </p>
                        <h3 class="card-title h5">
                            <a href="${article.detailLink || '#'}">${article.title || 'Tiêu đề bài viết'}</a>
                        </h3>
                        <p class="card-text">${article.excerpt || ''}</p>
                        <a href="${article.detailLink || '#'}" class="btn btn-sm btn-outline-secondary btn-read-more">Đọc thêm <i class="fas fa-arrow-right ms-1"></i></a>
                    </div>
                </div>
            `;
            blogGridRow.appendChild(col);
        });

        const totalPages = Math.ceil(articlesToDisplay.length / articlesPerPage);
        renderBlogPagination(totalPages, currentPage);
    }

    /**
     * Tạo và hiển thị phân trang cho bài viết.
     */
    function renderBlogPagination(totalPages, currentPage) {
        if (!blogPaginationContainer) return;
        blogPaginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        const createPageItem = (pageNumber, text, isDisabled = false, isActive = false) => {
            const li = document.createElement('li');
            li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = text;
            if (!isDisabled && !isActive) {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    displayBlogPage(filteredArticles, pageNumber);
                    const targetScroll = document.getElementById('blog-grid-container');
                    if (targetScroll) {
                        window.scrollTo({ top: targetScroll.offsetTop - 80, behavior: 'smooth' });
                    }
                });
            } else if (isDisabled || isActive) {
                a.addEventListener('click', e => e.preventDefault());
            }
            li.appendChild(a);
            return li;
        };

        blogPaginationContainer.appendChild(createPageItem(currentPage - 1, 'Trước', currentPage === 1));
        for (let i = 1; i <= totalPages; i++) {
            blogPaginationContainer.appendChild(createPageItem(i, i, false, i === currentPage));
        }
        blogPaginationContainer.appendChild(createPageItem(currentPage + 1, 'Tiếp', currentPage === totalPages));
    }

    // --- Khởi tạo trang blog ---
    async function initializeBlogPage() {
        allArticles = await fetchArticles();
        filteredArticles = allArticles;
        displayBlogPage(filteredArticles, 1);

        // Gọi các hàm toàn cục từ shared.js nếu cần (ví dụ: cập nhật header)
        if (typeof updateHeaderLoginState === 'function') {
            updateHeaderLoginState();
        }
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    }

    initializeBlogPage();

    console.log("blog.js: Khởi tạo hoàn tất.");
});