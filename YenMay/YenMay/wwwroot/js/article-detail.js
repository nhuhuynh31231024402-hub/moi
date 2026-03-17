// js/article-detail.js

document.addEventListener('sharedScriptsReady', function () {
    console.log("article-detail.js: Sự kiện sharedScriptsReady đã nhận. Khởi tạo logic...");

    // --- DOM Elements ---
    const articleContainer = document.getElementById('article-container');
    const breadcrumbTitleEl = document.getElementById('breadcrumb-article-title');
    const articleTitleEl = document.getElementById('article-title');
    const articleMetaEl = document.getElementById('article-meta');
    const articleFeaturedImageContainer = document.getElementById('article-featured-image');
    const articleContentBody = document.getElementById('article-content-body');
    const recentArticlesList = document.getElementById('recent-articles-list');
    const categoriesList = document.getElementById('categories-list');
    const prevArticleLinkContainer = document.getElementById('prev-article-link-container');
    const nextArticleLinkContainer = document.getElementById('next-article-link-container');


    // --- Biến lưu trữ ---
    let allArticles = []; // Sẽ được fetch bởi hàm bên dưới
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    /**
     * Tải dữ liệu bài viết từ file JSON.
     */
    async function fetchArticles() {
        try {
            const response = await fetch('data/articles.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text(); throw new TypeError(`Expected JSON, got ${contentType}. Content: ${text.substring(0, 100)}...`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error("Article data is not an array.");
            data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)); // Sắp xếp để dùng cho sidebar và prev/next
            return data;
        } catch (error) {
            console.error("Could not fetch articles for detail page:", error);
            if (articleContainer) articleContainer.innerHTML = `<div class="alert alert-danger">Lỗi tải dữ liệu bài viết.</div>`;
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
        } catch (e) { return dateString; }
    }

    /**
     * Hiển thị chi tiết bài viết.
     */
    function displayArticleDetail(id) {
        if (!id) {
            if (articleContainer) articleContainer.innerHTML = `<div class="alert alert-danger">Lỗi: Không tìm thấy ID bài viết trên URL.</div>`;
            return;
        }
        const article = allArticles.find(a => a.id === id);

        if (!article) {
            if (articleContainer) articleContainer.innerHTML = `<div class="alert alert-warning">Bài viết không tồn tại hoặc đã bị xóa.</div>`;
            document.title = "Không tìm thấy bài viết - Yến Sào Yến Mây";
            return;
        }

        document.title = `${article.title || 'Chi tiết bài viết'} - Yến Sào Yến Mây`;
        if (breadcrumbTitleEl) breadcrumbTitleEl.textContent = article.title;
        if (articleTitleEl) articleTitleEl.textContent = article.title;

        if (articleMetaEl) {
            const publishDateFormatted = formatDate(article.publishDate);
            articleMetaEl.innerHTML = `
                <span class="publish-date"><i class="far fa-calendar-alt me-1"></i> ${publishDateFormatted}</span>
                ${article.author ? `<span class="author ms-3"><i class="far fa-user me-1"></i> ${article.author}</span>` : ''}
                ${article.category ? `<span class="category ms-3"><i class="far fa-folder-open me-1"></i> <a href="blog.html?category=${article.category.toLowerCase().replace(/\s+/g, '-')}">${article.category}</a></span>` : ''}
            `;
        }

        if (articleFeaturedImageContainer) {
            if (article.image) {
                articleFeaturedImageContainer.innerHTML = `<img src="${article.image}" class="img-fluid" alt="${article.title || ''}">`;
            } else {
                articleFeaturedImageContainer.innerHTML = '';
            }
        }

        if (articleContentBody) {
            articleContentBody.innerHTML = article.contentHTML || '<p>Nội dung bài viết đang được cập nhật...</p>';
        }

        // Logic cho nút Previous/Next Article
        if (prevArticleLinkContainer && nextArticleLinkContainer && allArticles.length > 1) {
            const currentIndex = allArticles.findIndex(a => a.id === id);
            prevArticleLinkContainer.innerHTML = '';
            nextArticleLinkContainer.innerHTML = '';

            if (currentIndex >= 0 && currentIndex < allArticles.length - 1) { // Bài trước là bài cũ hơn
                const prevArticle = allArticles[currentIndex + 1];
                if (prevArticle && prevArticle.detailLink) {
                    prevArticleLinkContainer.innerHTML = `
                        <a href="${prevArticle.detailLink}" class="text-decoration-none article-nav-link">
                            <small class="text-muted d-block">Bài trước</small>
                            <span class="fw-medium text-body-secondary">&laquo; ${prevArticle.title || 'Bài viết cũ hơn'}</span>
                        </a>`;
                }
            }

            if (currentIndex > 0) { // Bài tiếp theo là bài mới hơn
                const nextArticle = allArticles[currentIndex - 1];
                if (nextArticle && nextArticle.detailLink) {
                    nextArticleLinkContainer.innerHTML = `
                        <a href="${nextArticle.detailLink}" class="text-decoration-none article-nav-link">
                            <small class="text-muted d-block">Bài tiếp theo</small>
                            <span class="fw-medium text-body-secondary">${nextArticle.title || 'Bài viết mới hơn'} &raquo;</span>
                        </a>`;
                }
            }
        }
    }

    /**
     * Hiển thị danh sách bài viết mới nhất trong sidebar.
     */
    function displayRecentArticles() {
        if (!recentArticlesList) return;
        recentArticlesList.innerHTML = '';
        const recent = allArticles.slice(0, 5); // Lấy 5 bài mới nhất (allArticles đã được sắp xếp)
        if (recent.length > 0) {
            recent.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${article.detailLink || '#'}">${article.title || 'Bài viết không tên'}</a>`;
                recentArticlesList.appendChild(li);
            });
        } else {
            recentArticlesList.innerHTML = '<li>Chưa có bài viết nào.</li>';
        }
    }

    /**
    * Hiển thị danh sách danh mục trong sidebar.
    */
    function displayCategories() {
        if (!categoriesList) return;
        categoriesList.innerHTML = '';
        const categories = [...new Set(allArticles.map(a => a.category).filter(c => c))];
        if (categories.length > 0) {
            categories.forEach(category => {
                const li = document.createElement('li');
                const categorySlug = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
                li.innerHTML = `<a href="blog.html?category=${categorySlug}">${category}</a>`;
                categoriesList.appendChild(li);
            });
        } else {
            categoriesList.innerHTML = '<li>Chưa có danh mục.</li>';
        }
    }

    // --- Khởi tạo trang ---
    async function initializePage() {
        allArticles = await fetchArticles();
        if (allArticles.length > 0) {
            displayArticleDetail(articleId);
            displayRecentArticles();
            displayCategories();
        }
        // Gọi các hàm toàn cục từ shared.js nếu cần
        if (typeof updateHeaderLoginState === 'function') updateHeaderLoginState();
        if (typeof updateCartCount === 'function') updateCartCount();
    }

    initializePage();

    console.log("article-detail.js: Khởi tạo hoàn tất.");
});