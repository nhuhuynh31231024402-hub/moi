# Paw Joy - All 4 Pets

Hệ sinh thái chăm sóc thú cưng toàn diện. Nơi tình yêu thương được kết nối bằng công nghệ.

## Mục tiêu đồ án

Paw Joy là một nền tảng kết nối chủ nuôi thú cưng với các dịch vụ chăm sóc thú cưng chất lượng cao, bao gồm spa & grooming, thăm khám thú y, và các dịch vụ khác. Dự án tập trung vào việc tạo ra trải nghiệm người dùng mượt mà và giao diện hiện đại.

## Cách chạy

### Trang web tĩnh

Đơn giản mở file `index.html` trong trình duyệt web. Tất cả các assets (CSS, JavaScript, images) đã được tổ chức trong thư mục `assets/`.

**Lưu ý:** Một số tính năng có thể yêu cầu chạy trên local server do sử dụng `fetch()` để load các partial templates. Bạn có thể sử dụng:

```bash
# Python 3
python -m http.server 8000

# Node.js (nếu có http-server)
npx http-server

# PHP
php -S localhost:8000
```

Sau đó truy cập `http://localhost:8000`

## Cấu trúc thư mục

```
.
├── index.html                 # Trang chủ (đã đổi tên từ home.html)
├── .gitignore                # Git ignore file
├── README.md                  # File này
│
├── assets/                    # Tất cả assets được tổ chức ở đây
│   ├── css/                   # Stylesheets (từ css/ và style/)
│   ├── js/                    # JavaScript files
│   └── images/                # Hình ảnh
│
├── templates/                 # Templates và pages
│   ├── partials/              # Header và footer components
│   │   ├── header.html
│   │   └── footer.html
│   └── pages/                 # Các trang HTML
│       ├── about-us.html
│       ├── blog.html
│       ├── blog-detail.html
│       ├── stores.html
│       ├── stores-detail.html
│       ├── stores-booking.html
│       ├── stores-booking-time.html
│       ├── stores-booking-confirm.html
│       └── my-account.html
│
├── admin/                     # Trang quản trị (giữ nguyên)
│   ├── Admin-*.html
│   ├── js/
│   └── styles/
│
└── data/                      # Dữ liệu JSON
    ├── blogs.json
    └── stores.json
```



