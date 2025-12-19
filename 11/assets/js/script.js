// ======================================================
// 1. DỮ LIỆU BÀI VIẾT (FULL NỘI DUNG + ẢNH MỚI TOANH)
// ======================================================
const globalPosts = [
  {
    "id": 1,
    "title": "Lịch tiêm phòng đầy đủ cho chó mèo con năm 2025",
    "category": "Sức khỏe thú cưng",
    // ẢNH MỚI: Bác sĩ thú y khám chó (Thay thế ảnh cũ bị lỗi)
    "image": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1000&q=80",
    "author": "Dr. Hung",
    "date": "12/12/2025",
    "desc": "Cập nhật mới nhất về các mũi tiêm quan trọng và thời điểm vàng để bảo vệ sức khỏe toàn diện cho thú cưng.",
    "content": `
        <p class='mb-4'>Việc tiêm phòng là 'lá chắn thép' bảo vệ thú cưng khỏi các bệnh truyền nhiễm nguy hiểm. Dưới đây là lịch trình chuẩn y khoa năm 2025.</p>
        <h3 class='text-2xl font-bold text-dark mt-6 mb-3'>1. Lịch tiêm phòng cho Chó (Vaccine 5 bệnh & 7 bệnh)</h3>
        <ul class='list-disc pl-5 space-y-2 mb-6'>
            <li><strong>6-8 tuần tuổi:</strong> Tiêm mũi 1 (5 bệnh: Care, Parvo, Viêm gan, Ho cũi chó, Phó cúm).</li>
            <li><strong>9-11 tuần tuổi:</strong> Tiêm mũi 2 (7 bệnh: Thêm Lepto và Corona).</li>
            <li><strong>12-14 tuần tuổi:</strong> Tiêm mũi 3 (Nhắc lại 7 bệnh).</li>
            <li><strong>Sau 13 tuần tuổi:</strong> Tiêm phòng Dại (Bắt buộc).</li>
        </ul>
        <h3 class='text-2xl font-bold text-dark mt-6 mb-3'>2. Lịch tiêm phòng cho Mèo (Vaccine 4 bệnh)</h3>
        <ul class='list-disc pl-5 space-y-2 mb-6'>
            <li><strong>8 tuần tuổi:</strong> Tiêm mũi 1 (Giảm bạch cầu, Viêm mũi khí quản, Calici).</li>
            <li><strong>12 tuần tuổi:</strong> Tiêm mũi 2 (Nhắc lại mũi 1 + Tiêm Dại).</li>
        </ul>
        <p class='italic bg-orange-50 p-4 rounded-lg border-l-4 border-brand'>Lưu ý: Sau khi hoàn thành phác đồ chó/mèo con, cần tiêm nhắc lại định kỳ 1 năm/lần.</p>
    `,
    "comments": [
      { "user": "Minh Anh", "date": "12/12/2025", "content": "Bài viết rất chi tiết, cảm ơn bác sĩ!" },
      { "user": "Tuấn Trần", "date": "13/12/2025", "content": "Cho mình hỏi mèo 2 tháng tuổi chưa tiêm mũi nào thì có sao không ạ?" }
    ]
  },
  {
    "id": 2,
    "title": "Pate tươi vs Thức ăn hạt: Đâu là lựa chọn tối ưu?",
    "category": "Dinh dưỡng",
    // ẢNH MỚI: Mèo đang ăn trong bát (Thay thế ảnh cũ bị lỗi)
    "image": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80",
    "author": "Paw Team",
    "date": "10/12/2025",
    "desc": "So sánh ưu nhược điểm của hai loại thức ăn phổ biến nhất hiện nay để giúp bạn lên thực đơn phù hợp.",
    "content": `
        <p class='mb-4'>Câu chuyện muôn thuở của các Sen: Nên cho ăn hạt cho tiện hay nấu Pate cho bổ? Cùng PawJoy phân tích nhé.</p>
        <h3 class='text-2xl font-bold text-dark mt-6 mb-3'>1. Thức ăn hạt (Dry Food)</h3>
        <p class='mb-2'><strong>Ưu điểm:</strong> Tiện lợi, dễ bảo quản, giá thành hợp lý, hỗ trợ làm sạch mảng bám răng.</p>
        <p class='mb-4'><strong>Nhược điểm:</strong> Ít nước, nếu mèo lười uống nước dễ bị sỏi thận.</p>
        <h3 class='text-2xl font-bold text-dark mt-6 mb-3'>2. Pate tươi (Wet Food)</h3>
        <p class='mb-2'><strong>Ưu điểm:</strong> Hàm lượng nước cao (70-80%), hương vị thơm ngon kích thích vị giác, dễ tiêu hóa.</p>
        <p class='mb-4'><strong>Nhược điểm:</strong> Khó bảo quản (cần tủ lạnh), chi phí cao hơn, dễ gây mảng bám răng nếu không vệ sinh.</p>
        <h3 class='text-xl font-bold text-brand mt-6'>Lời khuyên từ chuyên gia</h3>
        <p>Chế độ ăn kết hợp (Mix feeding) là tốt nhất: Sáng ăn hạt, tối ăn Pate để cân bằng dinh dưỡng và kinh phí.</p>
    `,
    "comments": [
      { "user": "Lan Ngọc", "date": "11/12/2025", "content": "Mình hay trộn cả 2 loại, trộm vía bé ăn rất ngon miệng." }
    ]
  },
  {
    "id": 3,
    "title": "Review 5 quán Cafe Thú Cưng 'xịn xò' nhất Sài Gòn",
    "category": "Lifestyle",
    // Ảnh 3: Corgi Cafe
    "image": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80",
    "author": "Admin",
    "date": "08/12/2025",
    "desc": "Cuối tuần chưa biết đi đâu? Hãy cùng Boss check-in ngay những địa điểm siêu dễ thương này nhé.",
    "content": `
        <p class='mb-6'>Nếu bạn không nuôi thú cưng nhưng vẫn muốn nựng ké, hoặc muốn tìm chỗ giao lưu cho Boss, thì đây là list dành cho bạn.</p>
        <h3 class='text-2xl font-bold text-dark mt-8 mb-4'>1. Paw Cafe - Quận 1</h3>
        <p class='mb-4'>Không gian rộng rãi, nhiều bé Corgi siêu quậy. Đồ uống khá ngon, giá vé bao gồm nước khoảng 80k.</p>
        <img src='https://images.unsplash.com/photo-1529426301869-82f4d98d3d81?auto=format&fit=crop&w=800&q=80' class='w-full h-64 object-cover rounded-2xl mb-8 shadow-lg' />
        <h3 class='text-2xl font-bold text-dark mt-8 mb-4'>2. Meo Meo Garden - Bình Thạnh</h3>
        <p class='mb-4'>Thiên đường cho các con sen yêu mèo. Ở đây có hơn 20 bé mèo Anh lông ngắn, Sphynx... rất quấn người.</p>
        <img src='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80' class='w-full h-64 object-cover rounded-2xl mb-8 shadow-lg' />
        <h3 class='text-2xl font-bold text-dark mt-8 mb-4'>3. Hachiko Coffee - Tân Bình</h3>
        <p class='mb-4'>Nổi tiếng với dàn Alaska và Husky khổng lồ nhưng cực kỳ hiền lành. Lưu ý là quán hơi đông vào cuối tuần nhé!</p>
        <img src='https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80' class='w-full h-64 object-cover rounded-2xl mb-8 shadow-lg' />
    `,
    "comments": []
  },
  {
    "id": 4,
    "title": "Dạy chó đi vệ sinh đúng chỗ chỉ trong 7 ngày",
    "category": "Lifestyle",
    // Ảnh 4: Huấn luyện chó
    "image": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=80",
    "author": "Coach Tuan",
    "date": "05/12/2025",
    "desc": "Phương pháp tích cực giúp bạn và cún cưng không còn căng thẳng về vấn đề vệ sinh trong nhà.",
    "content": `
        <p class='mb-4'>Vấn đề vệ sinh bừa bãi luôn là nỗi ám ảnh. Hãy kiên nhẫn áp dụng lộ trình 7 ngày sau:</p>
        <h3 class='text-xl font-bold text-brand mt-6'>Ngày 1-2: Xác định vị trí & Quan sát</h3>
        <p class='mb-2'>Chọn một nơi cố định (nhà vệ sinh hoặc khay lót). Quan sát khi bé ăn xong hoặc ngủ dậy, bé thường đi vệ sinh sau 15-20 phút.</p>
        <h3 class='text-xl font-bold text-brand mt-6'>Ngày 3-5: Hành động & Thưởng</h3>
        <p class='mb-2'>Khi thấy bé có dấu hiệu ngửi sàn, xoay vòng, hãy bế ngay bé vào đúng vị trí. Hô lệnh 'Đi tè'. Khi bé đi xong, lập tức khen ngợi và thưởng bánh.</p>
        <h3 class='text-xl font-bold text-brand mt-6'>Ngày 6-7: Củng cố thói quen</h3>
        <p class='mb-2'>Lúc này bé đã bắt đầu hiểu. Nếu bé lỡ đi sai chỗ, hãy lau sạch bằng dung dịch khử mùi chuyên dụng (để mất dấu mùi cũ) và không đánh mắng bé.</p>
    `,
    "comments": [
      { "user": "Hùng Dũng", "date": "06/12/2025", "content": "Đã áp dụng và thành công, thanks ad!" }
    ]
  },
  {
    "id": 5,
    "title": "Top 5 dấu hiệu Boss cần đi Spa gấp",
    "category": "Spa & Grooming",
    // ẢNH MỚI: Corgi đang tắm (Thay thế ảnh cũ bị lỗi)
    "image": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=80",
    "author": "Dr. Hung",
    "date": "01/12/2025",
    "desc": "Phát hiện sớm các vấn đề về da và lông không chỉ giúp thú cưng thoải mái mà còn ngăn ngừa bệnh.",
    "content": `
        <p class='mb-6 text-lg leading-relaxed'>Bạn có bao giờ để ý thấy Boss nhà mình gãi nhiều hơn bình thường? Hay lông của bé không còn mượt mà như trước? Dưới đây là 5 dấu hiệu báo động đỏ.</p>
        <h3 class='font-bold text-2xl text-dark mt-8 mb-4'>1. Lông bị bết dính và có mùi hôi lạ</h3>
        <p class='mb-4 leading-relaxed'>Đây là dấu hiệu rõ ràng nhất cho thấy tuyến bã nhờn hoạt động quá mức hoặc bé đã lâu không tắm. Môi trường này rất dễ sinh nấm.</p>
        <h3 class='font-bold text-2xl text-dark mt-8 mb-4'>2. Móng chân quá dài</h3>
        <p class='mb-4'>Khi nghe tiếng 'lách cách' trên sàn nhà, đó là lúc móng đã quá dài. Nó có thể đâm ngược vào thịt đệm gây đau đớn và làm hỏng dáng đi của bé.</p>
        <h3 class='font-bold text-2xl text-dark mt-8 mb-4'>3. Tai có nhiều ráy bẩn</h3>
        <p class='mb-4'>Vạch tai bé ra xem, nếu thấy nhiều mảng đen hoặc nâu sẫm kèm mùi hôi, coi chừng bé đã bị rận tai hoặc viêm tai.</p>
        <img src='https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80' class='w-full rounded-2xl my-6 shadow-md' />
        <h3 class='font-bold text-2xl text-dark mt-8 mb-4'>4. Tuyến hôi bị tắc</h3>
        <p class='mb-4'>Nếu thấy bé hay chà mông xuống sàn (thuật ngữ gọi là scooting), có thể tuyến hậu môn của bé cần được vắt.</p>
        <h3 class='font-bold text-2xl text-dark mt-8 mb-4'>5. Lông bị rối cục</h3>
        <p class='mb-4'>Đặc biệt với Poodle, lông rối sát da sẽ là ổ vi khuẩn. Đừng cố tự cắt bằng kéo tại nhà vì rất dễ cắt vào da, hãy mang ra Spa để gỡ rối chuyên nghiệp.</p>
    `,
    "comments": []
  },
  {
    "id": 6,
    "title": "Lợi ích bất ngờ của việc dắt chó đi dạo mỗi ngày",
    "category": "Lifestyle",
    // Ảnh 6: Dắt chó
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1000&q=80",
    "author": "Admin",
    "date": "20/11/2025",
    "desc": "Không chỉ giúp cún cưng giải tỏa năng lượng, đi dạo còn gắn kết tình cảm giữa Sen và Boss.",
    "content": `
        <p class='mb-4'>Nhiều người nghĩ chỉ cần nuôi chó trong nhà là đủ, nhưng việc đi dạo mang lại lợi ích to lớn:</p>
        <ul class='list-disc pl-5 space-y-3'>
            <li><strong>Giải tỏa năng lượng dư thừa:</strong> Giúp bé bớt cắn phá đồ đạc trong nhà.</li>
            <li><strong>Xã hội hóa:</strong> Giúp bé dạn dĩ hơn khi gặp người lạ và các chú chó khác.</li>
            <li><strong>Giảm stress:</strong> Việc ngửi mùi hương bên ngoài giúp kích thích trí não của chó.</li>
            <li><strong>Gắn kết tình cảm:</strong> Khoảng thời gian đi dạo là lúc bạn và bé tương tác tốt nhất.</li>
        </ul>
    `,
    "comments": [
        { "user": "Bảo Bảo", "date": "21/11/2025", "content": "Bài viết rất hữu ích." }
    ]
  },
  {
    "id": 7,
    "title": "Mèo bị nôn: Khi nào là bình thường, khi nào cần gặp bác sĩ?",
    "category": "Sức khỏe thú cưng",
    // Ảnh 7: Mèo
    "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80",
    "author": "Dr. Vet",
    "date": "18/11/2025",
    "desc": "Phân biệt nôn búi lông sinh lý và nôn do bệnh lý để có hướng xử lý kịp thời cho mèo cưng.",
    "content": `
        <p class='mb-4'>Nuôi mèo chắc hẳn bạn đã từng thấy 'hoàng thượng' nôn. Đừng quá hoảng hốt, hãy phân biệt nhé:</p>
        <h3 class='text-xl font-bold text-brand mt-4'>1. Nôn bình thường (Nôn sinh lý)</h3>
        <p class='mb-2'>Thường là nôn ra búi lông (hairball) hoặc do ăn quá nhanh. Mèo vẫn chơi đùa, ăn uống bình thường sau đó.</p>
        <h3 class='text-xl font-bold text-brand mt-4'>2. Nôn bất thường (Cần đi viện ngay)</h3>
        <ul class='list-disc pl-5 space-y-2 mb-4'>
            <li>Nôn liên tục nhiều lần trong ngày.</li>
            <li>Nôn ra dịch vàng, xanh hoặc có máu.</li>
            <li>Kèm theo tiêu chảy, bỏ ăn, nằm li bì.</li>
            <li>Đây có thể là dấu hiệu của giảm bạch cầu, tắc ruột hoặc ngộ độc.</li>
        </ul>
    `,
    "comments": []
  },
  {
    "id": 8,
    "title": "Công thức tự làm bánh thưởng (Treats) cho cún yêu tại nhà",
    "category": "Dinh dưỡng",
    // ẢNH MỚI: Bánh thưởng (Thay thế ảnh cũ bị lỗi)
    "image": "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=1000&q=80",
    "author": "Chef Paw",
    "date": "15/11/2025",
    "desc": "Tổng hợp 3 công thức làm bánh thưởng đơn giản từ ức gà, bí đỏ và yến mạch, đảm bảo an toàn.",
    "content": `
        <p class='mb-4'>Tự làm bánh thưởng giúp bạn kiểm soát được nguyên liệu, không lo chất bảo quản.</p>
        <h3 class='text-2xl font-bold text-dark mb-2'>Bánh quy Bí đỏ & Yến mạch</h3>
        <p><strong>Nguyên liệu:</strong> 1 chén bí đỏ hấp chín nghiền nhuyễn, 2 chén bột yến mạch, 1 quả trứng.</p>
        <p><strong>Cách làm:</strong> Trộn đều tất cả nguyên liệu thành khối bột dẻo. Cán mỏng và dùng khuôn cắt hình xương. Nướng ở 180 độ C trong 20 phút cho khô cứng. Bảo quản trong lọ kín được 1 tuần.</p>
    `,
    "comments": [
        { "user": "Mai Chi", "date": "16/11/2025", "content": "Công thức dễ làm, bé nhà mình thích mê." }
    ]
  },
  {
    "id": 9,
    "title": "Review Top 3 loại cát vệ sinh cho mèo khử mùi tốt nhất 2025",
    "category": "Review",
    // Ảnh 9: Cát vệ sinh
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1000&q=80",
    "author": "Reviewer",
    "date": "10/11/2025",
    "desc": "So sánh ưu nhược điểm của cát đậu nành, cát đất sét và cát gỗ để tìm ra loại phù hợp nhất.",
    "content": `
        <p class='mb-4'>Chọn cát vệ sinh là 'cuộc chiến' không hồi kết. Dưới đây là top 3 loại mình đã trải nghiệm:</p>
        <h3 class='text-xl font-bold text-dark mt-4'>1. Cát Đậu Nành (Cature, Acropet)</h3>
        <ul class='list-disc pl-5 mb-4'>
            <li><strong>Ưu điểm:</strong> Xả được bồn cầu, mùi thơm tự nhiên, ít bụi, an toàn nếu mèo lỡ ăn.</li>
            <li><strong>Nhược điểm:</strong> Giá thành cao, độ vón cục trung bình.</li>
        </ul>
        <h3 class='text-xl font-bold text-dark mt-4'>2. Cát Đất Sét (Genki, Neko)</h3>
        <ul class='list-disc pl-5 mb-4'>
            <li><strong>Ưu điểm:</strong> Giá rẻ, vón cục cực tốt và cứng.</li>
            <li><strong>Nhược điểm:</strong> Rất bụi (không tốt cho mèo bị hen), không xả được bồn cầu, không thân thiện môi trường.</li>
        </ul>
        <h3 class='text-xl font-bold text-dark mt-4'>3. Cát Gỗ (Cat's Best)</h3>
        <ul class='list-disc pl-5 mb-4'>
            <li><strong>Ưu điểm:</strong> Khử mùi đỉnh nhất, dùng siêu tiết kiệm, xả bồn cầu được.</li>
            <li><strong>Nhược điểm:</strong> Hạt nhẹ nên dễ bị văng ra nhà, giá đầu vào khá 'chát'.</li>
        </ul>
    `,
    "comments": []
  }
];

// ==========================================
// 2. KHỞI TẠO BIẾN TOÀN CỤC
// ==========================================
let filteredPosts = [...globalPosts];
let currentPage = 1;
const postsPerPage = 4;
let isMobile = window.innerWidth < 768;

// Hàm chuẩn hóa text (bỏ dấu, viết thường) để tìm kiếm tiếng Việt thân thiện hơn
function normalizeText(str = '') {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // loại bỏ dấu tiếng Việt
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Luôn render các Widget ở Sidebar
    renderCategories(globalPosts);
    renderRecentPosts(globalPosts.slice(0, 3));
    renderRecentCommentsWidget(globalPosts); 

    // 2. Kiểm tra trang để chạy logic tương ứng
    if (document.getElementById('blog-grid')) {
        initBlogList(); 
    } else if (document.getElementById('detail-title')) {
        loadBlogDetail(); 
    }

    // 3. Lắng nghe Resize để chuyển đổi giao diện Mobile/PC
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            if (document.getElementById('blog-grid')) renderPosts(filteredPosts);
        }
    });
});

// ==========================================
// 3. LOGIC TRANG DANH SÁCH (BLOG.HTML)
// ==========================================

function initBlogList() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const searchFilter = urlParams.get('search');

    // Khởi tạo danh sách tác giả / thời gian cho bộ lọc nâng cao dựa trên dữ liệu thực tế
    buildAdvancedFiltersOptions(globalPosts);

    if (categoryFilter) {
        const decoded = decodeURIComponent(categoryFilter);
        document.getElementById('current-category-title').innerText = `Chủ đề: ${decoded}`;
        filterPosts(decoded, null);
    } else if (searchFilter) {
        document.getElementById('searchInput').value = searchFilter;
        filterPosts(null, searchFilter);
    } else {
        // Mặc định: Ẩn bài nổi bật (ID 5)
        filteredPosts = globalPosts.filter(p => p.id !== 5);
        renderPosts(filteredPosts);
    }
}

// --- TÍNH NĂNG MỚI: Xử lý bộ lọc nâng cao ---
function applyFilters() {
    const sortValue = document.getElementById('sortOrder')?.value || 'newest';
    const authorValue = document.getElementById('authorFilter')?.value || '';
    const dateValue = document.getElementById('dateFilter')?.value || ''; 
    const engagementValue = document.getElementById('engagementFilter')?.value || '';
    
    // Khi dùng bộ lọc nâng cao thì HIỂN THỊ CẢ bài nổi bật (id = 5)
    let temp = [...globalPosts];

    // Lọc theo Tác giả
    if (authorValue) temp = temp.filter(p => p.author === authorValue);

    // Lọc theo Thời gian (theo tháng-năm, ví dụ 2025-12)
    if (dateValue) {
        temp = temp.filter(p => {
            const [day, month, year] = p.date.split('/');
            const key = `${year}-${month}`;
            return key === dateValue;
        });
    }

    // Lọc theo mức độ tương tác (bình luận)
    if (engagementValue) {
        temp = temp.filter(p => {
            const c = (p.comments?.length) || 0;
            if (engagementValue === 'withComments') return c > 0;
            if (engagementValue === 'noComments') return c === 0;
            if (engagementValue === 'hot') return c >= 2;
            return true;
        });
    }

    // Sắp xếp
    if (sortValue === 'newest') temp.sort((a, b) => b.id - a.id);
    else if (sortValue === 'oldest') temp.sort((a, b) => a.id - b.id);
    else if (sortValue === 'popular') temp.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));

    filteredPosts = temp;
    currentPage = 1;
    renderPosts(filteredPosts);
}

// Sinh options Tác giả và Thời gian cho bộ lọc nâng cao dựa trên dữ liệu
function buildAdvancedFiltersOptions(posts) {
    const authorSelect = document.getElementById('authorFilter');
    const dateSelect = document.getElementById('dateFilter');
    if (!authorSelect || !dateSelect) return;

    const authors = Array.from(new Set(posts.map(p => p.author))).sort();
    authors.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        authorSelect.appendChild(opt);
    });

    // Tạo key theo tháng-năm (yyyy-mm)
    const monthMap = new Map(); // key: 2025-12, value: "Tháng 12/2025"
    posts.forEach(p => {
        const [day, month, year] = p.date.split('/');
        const key = `${year}-${month}`;
        const label = `Tháng ${month}/${year}`;
        if (!monthMap.has(key)) monthMap.set(key, label);
    });

    Array.from(monthMap.entries())
        .sort((a, b) => b[0].localeCompare(a[0])) // mới nhất lên trước
        .forEach(([value, label]) => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = label;
            dateSelect.appendChild(opt);
        });
}

// Reset bộ lọc nâng cao về trạng thái mặc định
function resetAdvancedFilters() {
    const sortSelect = document.getElementById('sortOrder');
    const authorSelect = document.getElementById('authorFilter');
    const dateSelect = document.getElementById('dateFilter');
    const engagementSelect = document.getElementById('engagementFilter');

    if (sortSelect) sortSelect.value = 'newest';
    if (authorSelect) authorSelect.value = '';
    if (dateSelect) dateSelect.value = '';
    if (engagementSelect) engagementSelect.value = '';

    // Quay lại danh sách mặc định giống initBlogList (ẩn bài nổi bật khỏi grid)
    filteredPosts = globalPosts.filter(p => p.id !== 5);
    currentPage = 1;

    const titleEl = document.getElementById('current-category-title');
    if (titleEl) titleEl.innerText = 'Tất cả bài viết';

    renderPosts(filteredPosts);
}

// --- TÍNH NĂNG MỚI: Lọc theo Tag ---
function filterByTag(tagName) {
    const keyword = normalizeText(tagName);
    
    // Tìm trong Title, Category hoặc Desc (không loại bài nổi bật)
    filteredPosts = globalPosts.filter(p => 
        normalizeText(p.title).includes(keyword) || 
        normalizeText(p.category).includes(keyword) ||
        normalizeText(p.desc).includes(keyword)
    );

    document.getElementById('current-category-title').innerText = `Tag: #${tagName}`;
    currentPage = 1;
    renderPosts(filteredPosts);
    document.getElementById('blog-grid').scrollIntoView({ behavior: 'smooth' });
}

// Hàm lọc chung cho Category & Search box
function filterPosts(category, keyword) {
    // Chỉ dùng khi CÓ category hoặc keyword → không cần ẩn bài nổi bật
    let temp = [...globalPosts];
    
    if (category) {
        temp = temp.filter(p => p.category === category);
        highlightActiveCategory(category);
    }
    if (keyword) {
        const k = normalizeText(keyword);
        temp = temp.filter(p => {
            const title = normalizeText(p.title);
            const desc = normalizeText(p.desc);
            const categoryNorm = normalizeText(p.category);
            return (
                title.includes(k) ||
                desc.includes(k) ||
                categoryNorm.includes(k)
            );
        });
        document.getElementById('current-category-title').innerText = k ? `Kết quả: "${keyword}"` : 'Tất cả bài viết';
    }
    
    filteredPosts = temp;
    currentPage = 1;
    renderPosts(filteredPosts);
}

// --- HÀM RENDER POSTS (NÂNG CẤP) ---
function renderPosts(posts) {
    const container = document.getElementById('blog-grid');
    if (!container) return;
    
    let postsToRender = [];
    
    // Logic: Mobile dùng Load More, Desktop dùng Pagination
    if (isMobile) {
        const endIndex = currentPage * postsPerPage;
        postsToRender = posts.slice(0, endIndex);
        
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.classList.toggle('hidden', endIndex >= posts.length);
            loadMoreBtn.onclick = () => { currentPage++; renderPosts(posts); };
        }
        const pagination = document.getElementById('pagination');
        if(pagination) pagination.classList.add('hidden');
    } else {
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        postsToRender = posts.slice(start, end);
        
        renderPagination(Math.ceil(posts.length / postsPerPage), currentPage);
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if(loadMoreBtn) loadMoreBtn.classList.add('hidden');
    }

    container.innerHTML = '';
    if (postsToRender.length === 0) {
        container.innerHTML = '<div class="col-span-2 text-center py-10 text-gray-500 italic">Không tìm thấy bài viết nào phù hợp.</div>';
        return;
    }

    postsToRender.forEach((post, index) => {
        // Tạo Badge
        let badges = '';
        if (post.date.includes('/12/2025')) badges += `<span class="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm mr-1">MỚI</span>`;
        if (post.comments && post.comments.length > 0) badges += `<span class="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">HOT 🔥</span>`;

        // Tính thời gian đọc
        const readTime = Math.max(1, Math.ceil(post.desc.length / 100)) + ' phút đọc';
        const commentCount = post.comments ? post.comments.length : 0;

        container.innerHTML += `
            <article class="bg-white rounded-[2rem] overflow-hidden shadow-card hover:shadow-2xl transition duration-500 group border border-gray-100 flex flex-col h-full animate-fade-up relative">
                <div class="relative h-56 overflow-hidden bg-gray-200">
                    <a href="blog-detail.html?id=${post.id}" class="block w-full h-full">
                        <img src="${post.image}" 
                             onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/64748b?text=PawJoy';" 
                             class="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    </a>
                    <div class="absolute top-4 left-4 flex gap-1 z-10">${badges}</div>
                    <span class="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand shadow-sm">${post.category}</span>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                        <span><i class="far fa-user text-brand"></i> ${post.author}</span> • <span>${post.date}</span>
                    </div>
                    <h3 class="font-serif text-lg font-bold text-dark mb-3 group-hover:text-brand transition leading-snug line-clamp-2">
                        <a href="blog-detail.html?id=${post.id}">${post.title}</a>
                    </h3>
                    <p class="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">${post.desc}</p>
                    
                    <div class="mt-auto border-t border-gray-50 pt-4 flex justify-between text-xs text-gray-400 font-medium">
                        <span class="bg-gray-100 px-2 py-1 rounded"><i class="far fa-eye"></i> ${readTime}</span>
                        <span><i class="far fa-comment-dots"></i> ${commentCount} Thảo luận</span>
                    </div>
                </div>
            </article>`;
    });
}

// ==========================================
// 4. LOGIC TRANG CHI TIẾT (BLOG-DETAIL.HTML)
// ==========================================
function loadBlogDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (!postId) { window.location.href = 'blog.html'; return; }

    const post = globalPosts.find(p => p.id == postId);
    if (post) {
        document.title = post.title + " - PawJoy";
        const breadcrumb = document.getElementById('breadcrumb-title');
        if(breadcrumb) breadcrumb.innerText = post.title;
        
        const imgElement = document.getElementById('detail-image');
        if(imgElement) {
            imgElement.src = post.image;
            imgElement.onerror = function() { 
                this.onerror = null; 
                this.src = 'https://placehold.co/800x400/e2e8f0/64748b?text=PawJoy+Image+Not+Found'; 
            };
        }

        setText('detail-category', post.category);
        setText('detail-title', post.title);
        setText('detail-author', post.author);
        setText('detail-date', post.date);
        setText('detail-desc', post.desc);
        
        const contentEl = document.getElementById('detail-content');
        if(contentEl) contentEl.innerHTML = post.content;

        renderPostComments(post); // Render bình luận chi tiết
    }
}

function setText(id, text) {
    const el = document.getElementById(id);
    if(el) el.innerText = text;
}

// ==========================================
// 5. CÁC HÀM WIDGET & HỖ TRỢ
// ==========================================

function renderRecentCommentsWidget(posts) {
    const container = document.getElementById('recent-comments-container');
    if (!container) return;
    
    let allComments = [];
    posts.forEach(p => {
        if(p.comments) p.comments.forEach(c => allComments.push({...c, postTitle: p.title, postId: p.id}));
    });

    const recent = allComments.slice(0, 3);
    let html = '';

    if (recent.length === 0) {
        html = '<div class="text-gray-400 text-xs italic text-center">Chưa có bình luận nào.</div>';
    } else {
        recent.forEach(c => {
            html += `
            <a href="blog-detail.html?id=${c.postId}#comments-section" class="block group border-b border-gray-50 last:border-0 pb-3 mb-3">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0 mt-1"><i class="fas fa-comment-dots text-xs"></i></div>
                    <div>
                        <div class="text-xs font-bold text-dark group-hover:text-brand transition">${c.user} <span class="font-normal text-gray-400">trên</span></div>
                        <h4 class="text-xs font-medium text-gray-600 line-clamp-2 group-hover:text-brand transition mt-0.5">"${c.postTitle}"</h4>
                    </div>
                </div>
            </a>`;
        });
    }
    container.innerHTML = html;
}

function renderPostComments(post) {
    const container = document.getElementById('detail-comments-list');
    const label = document.getElementById('detail-comments-count');
    if (!container) return;

    const cmts = post.comments || [];
    if(label) label.innerText = `${cmts.length} Bình luận`;

    if (cmts.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-400 py-6 italic bg-gray-50 rounded-xl">Chưa có bình luận nào. Hãy là người đầu tiên!</div>';
    } else {
        let html = '';
        cmts.forEach(c => {
            const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.user)}&background=random&color=fff&size=64`;
            html += `
            <div class="flex gap-4 mb-6 animate-fade-up">
                <img src="${avatar}" class="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-sm border-2 border-white flex-shrink-0">
                <div class="bg-gray-50 p-4 rounded-2xl rounded-tl-none flex-grow border border-gray-100">
                    <div class="flex justify-between items-center mb-2">
                        <h5 class="font-bold text-dark text-sm">${c.user}</h5>
                        <span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i> ${c.date}</span>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed">${c.content}</p>
                    <button class="text-xs text-brand font-bold mt-2 hover:underline">Trả lời</button>
                </div>
            </div>`;
        });
        container.innerHTML = html;
    }
}

// === QUAN TRỌNG: CẬP NHẬT RENDER CATEGORIES ===
// Sử dụng thẻ <a> chuẩn để hoạt động được trên cả trang Detail (chuyển hướng) và List (lọc)
function renderCategories(posts) {
    const container = document.getElementById('category-list');
    if (!container) return;
    const counts = {};
    posts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });

    let html = `<li><a href="blog.html" class="flex justify-between items-center text-gray-600 hover:text-brand transition group" onclick="if(document.getElementById('blog-grid')){ filterPosts(null, null); return false; }"><span>Tất cả</span><span class="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full group-hover:bg-brand group-hover:text-white transition">${posts.length}</span></a></li>`;
    
    for (const [name, count] of Object.entries(counts)) {
        // Link này sẽ hoạt động tốt ở cả 2 trang
        html += `<li><a href="blog.html?category=${encodeURIComponent(name)}" class="flex justify-between items-center text-gray-600 hover:text-brand transition group category-link" onclick="if(document.getElementById('blog-grid')){ filterPosts('${name}', null); return false; }" data-cat="${name}"><span>${name}</span><span class="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full group-hover:bg-brand group-hover:text-white transition">${count}</span></a></li>`;
    }
    container.innerHTML = html;
}

function renderRecentPosts(posts) {
    const container = document.getElementById('recent-posts-container');
    if(!container) return;
    let html = '';
    posts.forEach(p => {
        html += `<a href="blog-detail.html?id=${p.id}" class="flex gap-4 group items-center"><img src="${p.image}" onerror="this.src='https://placehold.co/100x100?text=PJ'" class="w-16 h-16 rounded-xl object-cover shadow-sm group-hover:scale-105 transition duration-500"><div><h4 class="font-bold text-sm text-dark leading-snug group-hover:text-brand transition line-clamp-2 mb-1">${p.title}</h4><span class="text-xs text-gray-400 block"><i class="far fa-clock mr-1"></i> ${p.date}</span></div></a>`;
    });
    container.innerHTML = html;
}

function renderPagination(totalPages, currentPage) {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    container.className = 'hidden md:flex justify-center mt-12 gap-3'; // Reset class
    if (totalPages <= 1) { container.classList.add('opacity-0', 'pointer-events-none'); return; }
    
    container.classList.remove('opacity-0', 'pointer-events-none');
    let html = '';
    
    const createBtn = (page, text, active = false) => {
        const style = active ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand';
        return `<button onclick="goToPage(${page})" class="w-10 h-10 flex items-center justify-center rounded-xl border font-bold text-sm transition ${style}">${text}</button>`;
    };

    if (currentPage > 1) html += createBtn(currentPage - 1, '<i class="fas fa-chevron-left"></i>');
    for (let i = 1; i <= totalPages; i++) html += createBtn(i, i, i === currentPage);
    if (currentPage < totalPages) html += createBtn(currentPage + 1, '<i class="fas fa-chevron-right"></i>');
    
    container.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    renderPosts(filteredPosts);
    document.getElementById('blog-grid').scrollIntoView({ behavior: 'smooth' });
}

function searchBlogs() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const value = input.value.trim();

    // Nếu ô tìm kiếm trống → quay về trạng thái mặc định (tất cả bài, ẩn bài nổi bật)
    if (!value) {
        filteredPosts = globalPosts.filter(p => p.id !== 5);
        currentPage = 1;

        const titleEl = document.getElementById('current-category-title');
        if (titleEl) titleEl.innerText = 'Tất cả bài viết';

        // Bỏ trạng thái active của các category (nếu có)
        const links = document.querySelectorAll('.category-link');
        links.forEach(link => {
            link.classList.remove('text-brand', 'font-bold');
            link.classList.add('text-gray-600');
        });

        renderPosts(filteredPosts);
        return;
    }

    // Có nội dung tìm kiếm → dùng filterPosts với keyword
    filterPosts(null, value);
}

function highlightActiveCategory(categoryName) {
    const links = document.querySelectorAll('.category-link');
    links.forEach(link => {
        if (link.getAttribute('data-cat') === categoryName) {
            link.classList.add('text-brand', 'font-bold');
            link.classList.remove('text-gray-600');
        } else {
            link.classList.remove('text-brand', 'font-bold');
            link.classList.add('text-gray-600');
        }
    });
}