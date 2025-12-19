let currentView = 'grid';
let filteredPartners = [];
let currentSort = 'rating';

// Dữ liệu 11 đối tác từ stores.html
const partnersData = [
  {
    id: 1,
    name: "Pet Wow",
    type: "Spa",
    address: "294 Lê Quang Định, Phường 11, Bình Thạnh, Hồ Chí Minh",
    phone: "0901234567",
    email: "petwow@gmail.com",
    rating: 4.8,
    orders: 245,
    revenue: "125.5M",
    completion: 98,
    status: "active",
    image: "../assets/images/stores/PetWow/logo_petwow.png",
    services: ["Spa"],
    priceRange: "40.000 VNĐ - 400.000 VNĐ",
    description: "Chuyên spa cho thú cưng với đội ngũ chuyên nghiệp",
    openTime: "8:00 - 20:00",
    website: "pet-wow-detail.html",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "170.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "220.000 VNĐ" },
        { name: "Tắm cạo", price: "350.000 VNĐ" },
        { name: "Tắm vệ sinh cắt tỉa", price: "380.000 VNĐ" },
        { name: "Cắt mài móng", price: "40.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai", price: "40.000 VNĐ" },
        { name: "Nhuộm", price: "400.000 VNĐ" }
      ]
    }
  },

  {
    id: 2,
    name: "2VET",
    type: "Spa & Thăm khám",
    address: "128 Chu Văn An, Bình Thạnh, Hồ Chí Minh",
    phone: "0903456789",
    email: "2vet@gmail.com",
    rating: 4.7,
    orders: 198,
    revenue: "142.8M",
    completion: 97,
    status: "active",
    image: "../assets/images/stores/2Vet/logo_2vet.png",
    services: ["Spa", "Thăm khám"],
    priceRange: "49.000 VNĐ - 899.000 VNĐ",
    description: "Dịch vụ spa và chăm sóc sức khỏe toàn diện cho thú cưng",
    openTime: "8:00 - 21:00",
    website: "https://2vet.vn/thu-y-binh-thanh-uy-tin/",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "120.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "200.000 VNĐ" },
        { name: "Tắm cạo", price: "329.000 VNĐ" },
        { name: "Tắm vệ sinh cắt tỉa", price: "299.000 VNĐ" },
        { name: "Cắt mài móng", price: "39.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai", price: "30.000 VNĐ" },
        { name: "Nhuộm", price: "429.000 VNĐ" }
      ],
      "Thăm khám": [
        { name: "Khám bệnh cơ bản", price: "159.000 VNĐ" },
        { name: "Gói khám sức khoẻ tổng quát", price: "899.000 VNĐ" },
        { name: "Triệt sản mèo đực", price: "299.000 VNĐ" },
        { name: "Triệt sản mèo cái", price: "499.000 VNĐ" },
        { name: "Triệt sản chó đực", price: "799.000 VNĐ" },
        { name: "Triệt sản chó cái", price: "719.000 VNĐ" },
        { name: "Xét nghiệm máu cơ bản", price: "299.000 VNĐ" },
        { name: "Siêu âm bụng", price: "230.000 VNĐ" },
        { name: "Cạo vôi răng", price: "499.000 VNĐ" },
        { name: "Test nhanh bệnh truyền nhiễm", price: "300.000 VNĐ" }
      ]
    }
  },
  {
    id: 3,
    name: "GẤU SPA THÚ CƯNG",
    type: "Spa",
    address: "290 Lý Thái Tổ, Phường 1, Quận 3, Thành phố Hồ Chí Minh",
    phone: "0904567890",
    email: "gauspa@gmail.com",
    rating: 4.6,
    orders: 167,
    revenue: "98.5M",
    completion: 96,
    status: "active",
    image: "../assets/images/stores/GauSpa/logo_GauSpa.png",
    services: ["Spa"],
    priceRange: "39.000 VNĐ - 399.000 VNĐ",
    description: "Spa thú cưng với không gian thoải mái và dịch vụ chất lượng",
    openTime: "9:00 - 19:00",
    website: "https://share.google/yspjafbHeT0ybzVjN",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "100.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "219.000 VNĐ" },
        { name: "Tắm cạo", price: "349.000 VNĐ" },
        { name: "Tắm vệ sinh cắt tỉa", price: "319.000 VNĐ" },
        { name: "Cắt mài móng", price: "39.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai", price: "39.000 VNĐ" },
        { name: "Nhuộm", price: "399.000 VNĐ" }
      ]
    }
  },
  {
    id: 4,
    name: "PAO PET",
    type: "Spa",
    address: "10 Bàu Cát 1, Phường 14, Quận Tân Bình, TPHCM",
    phone: "0905678901",
    email: "paopet@gmail.com",
    rating: 4.5,
    orders: 145,
    revenue: "87.3M",
    completion: 95,
    status: "active",
    image: "../assets/images/stores/PaoPet/logo_paopet.png",
    services: ["Spa"],
    priceRange: "40.000 VNĐ - 420.000 VNĐ",
    description: "Dịch vụ spa giá cả hợp lý, chất lượng tốt",
    openTime: "8:30 - 20:00",
    website: "https://www.facebook.com/PaoPet.Tanbinh/",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "99.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "239.000 VNĐ" },
        { name: "Tắm cạo", price: "350.000 VNĐ" },
        { name: "Tắm vệ sinh cắt tỉa", price: "339.000 VNĐ" },
        { name: "Cắt mài móng", price: "40.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai", price: "45.000 VNĐ" },
        { name: "Nhuộm", price: "420.000 VNĐ" }
      ]
    }
  },
  {
    id: 5,
    name: "Lumi Pet Shop",
    type: "Spa",
    address: "27 Võ Trường Toản, Phường 2, Bình Thạnh, Thành phố Hồ Chí Minh",
    phone: "0906789012",
    email: "lumipet@gmail.com",
    rating: 4.8,
    orders: 223,
    revenue: "115.7M",
    completion: 98,
    status: "active",
    image: "../assets/images/stores/LumiPet/logo_lumipet.png",
    services: ["Spa"],
    priceRange: "79.000 VNĐ - 450.000 VNĐ",
    description: "Pet shop kết hợp spa, đầy đủ tiện nghi",
    openTime: "8:00 - 20:00",
    website: "https://share.google/ZqneYMeeuSNZidjH9",
    detailedServices: {
      "Spa": [
        { name: "Gói tắm sấy cơ bản", price: "79.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "200.000 VNĐ" },
        { name: "Tắm cạo", price: "350.000 VNĐ" },
        { name: "Tắm vệ sinh cắt tỉa", price: "379.000 VNĐ" },
        { name: "Nhuộm", price: "450.000 VNĐ" }
      ]
    }
  },
  {
    id: 6,
    name: "Tiệm nhà Sâu",
    type: "Spa",
    address: "330/12 Đ. Phan Đình Phùng, Phường 1, Phú Nhuận, Thành phố Hồ Chí Minh",
    phone: "0907890123",
    email: "nhasau@gmail.com",
    rating: 4.9,
    orders: 289,
    revenue: "156.2M",
    completion: 99,
    status: "active",
    image: "../assets/images/stores/TiemNhaSau/logo_tiemnhasau.png",
    services: ["Spa"],
    priceRange: "50.000 VNĐ - 450.000 VNĐ",
    description: "Tiệm spa uy tín, được nhiều khách hàng tin tưởng",
    openTime: "8:00 - 19:00",
    website: "https://share.google/uWGzHGeuREaLaXjGx",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "100.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "250.000 VNĐ" },
        { name: "Tắm cạo", price: "300.000 VNĐ" },
        { name: "Tắm vệ sinh cắt tỉa", price: "359.000 VNĐ" },
        { name: "Cắt mài móng", price: "50.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai", price: "50.000 VNĐ" },
        { name: "Nhuộm", price: "450.000 VNĐ" }
      ]
    }
  },
  {
    id: 7,
    name: "PetGrocer",
    type: "Spa",
    address: "9 Số 3, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh",
    phone: "0908901234",
    email: "petgrocer@gmail.com",
    rating: 4.7,
    orders: 178,
    revenue: "102.4M",
    completion: 96,
    status: "active",
    image: "../assets/images/stores/PetGrocer/logo_petgrocer.png",
    services: ["Spa"],
    priceRange: "90.000 VNĐ - 239.000 VNĐ",
    description: "Dịch vụ chăm sóc thú cưng chuyên nghiệp tại Thủ Đức",
    openTime: "9:00 - 20:00",
    website: "https://share.google/B1Y5UXuU3WqN5iTrr",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "100.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "200.000 VNĐ" },
        { name: "Tắm cạo", price: "239.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai, cắt mài móng", price: "90.000 VNĐ" }
      ]
    }
  },
  {
    id: 8,
    name: "Bệnh Viện Thú Y C.well Pet",
    type: "Spa & Thăm khám",
    address: "78 Trịnh Đình Trọng, Phú Trung, Tân Phú, Thành phố Hồ Chí Minh",
    phone: "0909012345",
    email: "cwellpet@gmail.com",
    rating: 4.6,
    orders: 156,
    revenue: "95.8M",
    completion: 95,
    status: "active",
    image: "../assets/images/stores/CWellPet/logo_cwellpet.png",
    services: ["Spa", "Thăm khám"],
    priceRange: "70.000 VNĐ - 899.000 VNĐ",
    description: "Bệnh viện thú y với đội ngũ bác sĩ giàu kinh nghiệm",
    openTime: "7:00 - 22:00",
    website: "https://benhvienthuycwellpet.com.vn/",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "100.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "200.000 VNĐ" },
        { name: "Tắm cạo", price: "239.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai, cắt mài móng", price: "90.000 VNĐ" }
      ],
      "Thăm khám": [
        { name: "Khám bệnh cơ bản", price: "179.000 VNĐ" },
        { name: "Gói khám sức khoẻ tổng quát", price: "899.000 VNĐ" },
        { name: "Triệt sản mèo đực", price: "299.000 VNĐ" },
        { name: "Triệt sản mèo cái", price: "499.000 VNĐ" },
        { name: "Triệt sản chó đực", price: "799.000 VNĐ" },
        { name: "Triệt sản chó cái", price: "729.000 VNĐ" },
        { name: "Xét nghiệm máu cơ bản", price: "300.000 VNĐ" }
      ]
    }
  },
  {
    id: 9,
    name: "Phòng Khám Thú Y Pets & Min",
    type: "Spa & Thăm khám",
    address: "181/102 Âu Dương Lân, Phường Rạch Ông, Quận 8, Thành phố Hồ Chí Minh",
    phone: "0900123456",
    email: "petsmin@gmail.com",
    rating: 4.8,
    orders: 234,
    revenue: "128.6M",
    completion: 98,
    status: "active",
    image: "../assets/images/stores/Pets&Min/logo_pets&min.png",
    services: ["Spa", "Thăm khám"],
    priceRange: "50.000 VNĐ - 859.000 VNĐ",
    description: "Phòng khám chuyên nghiệp với giá cả phải chăng",
    openTime: "8:00 - 21:00",
    website: "https://www.facebook.com/phongkhamthuypetsmin",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "150.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "300.000 VNĐ" },
        { name: "Tắm cạo", price: "219.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai", price: "50.000 VNĐ" }
      ],
      "Thăm khám": [
        { name: "Khám bệnh cơ bản", price: "179.000 VNĐ" },
        { name: "Gói khám sức khoẻ tổng quát", price: "859.000 VNĐ" },
        { name: "Triệt sản mèo đực", price: "299.000 VNĐ" },
        { name: "Triệt sản mèo cái", price: "499.000 VNĐ" },
        { name: "Triệt sản chó đực", price: "780.000 VNĐ" },
        { name: "Triệt sản chó cái", price: "700.000 VNĐ" },
        { name: "Xét nghiệm máu cơ bản", price: "270.000 VNĐ" },
        { name: "Siêu âm bụng", price: "250.000 VNĐ" },
        { name: "Cạo vôi răng", price: "500.000 VNĐ" },
        { name: "Test nhanh bệnh truyền nhiễm", price: "300.000 VNĐ" }
      ]
    }
  },
  {
    id: 10,
    name: "PHÒNG KHÁM THÚ Y NASA PET",
    type: "Spa & Thăm khám",
    address: "3 Ông Ích Khiêm, Phường 10, Quận 11, Thành phố Hồ Chí Minh",
    phone: "0901234560",
    email: "nasapet@gmail.com",
    rating: 4.7,
    orders: 189,
    revenue: "108.9M",
    completion: 97,
    status: "active",
    image: "../assets/images/stores/NasaPet/logo_nasapet.png",
    services: ["Spa", "Thăm khám"],
    priceRange: "70.000 VNĐ - 880.000 VNĐ",
    description: "Phòng khám uy tín với nhiều năm kinh nghiệm",
    openTime: "8:00 - 20:00",
    website: "https://nasapet.vn/",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "190.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "320.000 VNĐ" },
        { name: "Tắm cạo", price: "230.000 VNĐ" },
        { name: "Vệ sinh, nhổ lông tai, cắt mài móng", price: "70.000 VNĐ" }
      ],
      "Thăm khám": [
        { name: "Khám bệnh cơ bản", price: "199.000 VNĐ" },
        { name: "Gói khám sức khoẻ tổng quát", price: "880.000 VNĐ" },
        { name: "Triệt sản mèo đực", price: "289.000 VNĐ" },
        { name: "Triệt sản mèo cái", price: "489.000 VNĐ" },
        { name: "Triệt sản chó đực", price: "790.000 VNĐ" },
        { name: "Triệt sản chó cái", price: "720.000 VNĐ" },
        { name: "Xét nghiệm máu cơ bản", price: "270.000 VNĐ" }
      ]
    }
  },
  {
    id: 11,
    name: "Bệnh Viện Thú Y Pet Pro Cộng Hòa",
    type: "Thăm khám",
    address: "389 Cộng Hòa, Phường Tân Bình, Tân Bình, Thành phố Hồ Chí Minh",
    phone: "0902345670",
    email: "petpro@gmail.com",
    rating: 4.6,
    orders: 167,
    revenue: "92.3M",
    completion: 96,
    status: "active",
    image: "../assets/images/stores/PetPro/logo_petpro.png",
    services: ["Thăm khám"],
    priceRange: "250.000 VNĐ - 900.000 VNĐ",
    description: "Bệnh viện thú y với trang thiết bị hiện đại nhất",
    openTime: "7:00 - 21:00",
    website: "https://petpro.com.vn/",
    detailedServices: {
      "Thăm khám": [
        { name: "Khám bệnh cơ bản", price: "169.000 VNĐ" },
        { name: "Gói khám sức khoẻ tổng quát", price: "900.000 VNĐ" },
        { name: "Triệt sản mèo đực", price: "300.000 VNĐ" },
        { name: "Triệt sản mèo cái", price: "480.000 VNĐ" },
        { name: "Triệt sản chó đực", price: "750.000 VNĐ" },
        { name: "Triệt sản chó cái", price: "700.000 VNĐ" },
        { name: "Xét nghiệm máu cơ bản", price: "339.000 VNĐ" },
        { name: "Siêu âm bụng", price: "250.000 VNĐ" },
        { name: "Cạo vôi răng", price: "499.000 VNĐ" },
        { name: "Test nhanh bệnh truyền nhiễm", price: "300.000 VNĐ" }
      ]
    }
  },
  {
    id: 12,
    name: "Happy Pet Spa",
    type: "Spa",
    address: "123 Nguyễn Văn Cừ, Quận 5, Thành phố Hồ Chí Minh",
    phone: "0901111111",
    email: "happypet@gmail.com",
    rating: 0,
    orders: 0,
    revenue: "0M",
    completion: 0,
    status: "pending",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    services: ["Spa"],
    priceRange: "50.000 VNĐ - 300.000 VNĐ",
    description: "Spa thú cưng mới mở, đang chờ duyệt",
    openTime: "9:00 - 18:00",
    website: "#",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "120.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "200.000 VNĐ" },
        { name: "Cắt mài móng", price: "50.000 VNĐ" }
      ]
    }
  },
  {
    id: 13,
    name: "Pet Care Center",
    type: "Spa & Thăm khám",
    address: "456 Lê Lợi, Quận 1, Thành phố Hồ Chí Minh",
    phone: "0902222222",
    email: "petcare@gmail.com",
    rating: 0,
    orders: 0,
    revenue: "0M",
    completion: 0,
    status: "pending",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
    services: ["Spa", "Thăm khám"],
    priceRange: "100.000 VNĐ - 500.000 VNĐ",
    description: "Trung tâm chăm sóc thú cưng đang chờ phê duyệt",
    openTime: "8:00 - 20:00",
    website: "#",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "150.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "250.000 VNĐ" }
      ],
      "Thăm khám": [
        { name: "Khám bệnh cơ bản", price: "200.000 VNĐ" }
      ]
    }
  },
  {
    id: 14,
    name: "Furry Friends Spa",
    type: "Spa",
    address: "789 Điện Biên Phủ, Bình Thạnh, Thành phố Hồ Chí Minh",
    phone: "0903333333",
    email: "furryfriends@gmail.com",
    rating: 3.2,
    orders: 45,
    revenue: "12.5M",
    completion: 85,
    status: "suspended",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
    services: ["Spa"],
    priceRange: "80.000 VNĐ - 350.000 VNĐ",
    description: "Spa đã bị tạm khóa do vi phạm quy định",
    openTime: "8:00 - 19:00",
    website: "#",
    detailedServices: {
      "Spa": [
        { name: "Tắm sấy", price: "130.000 VNĐ" },
        { name: "Tắm vệ sinh", price: "220.000 VNĐ" },
        { name: "Tắm cạo", price: "350.000 VNĐ" }
      ]
    }
  },
  {
    id: 15,
    name: "Vet Care Clinic",
    type: "Thăm khám",
    address: "321 Trường Chinh, Tân Bình, Thành phố Hồ Chí Minh",
    phone: "0904444444",
    email: "vetcare@gmail.com",
    rating: 2.8,
    orders: 23,
    revenue: "8.2M",
    completion: 72,
    status: "suspended",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
    services: ["Thăm khám"],
    priceRange: "150.000 VNĐ - 600.000 VNĐ",
    description: "Phòng khám thú y đã bị tạm khóa",
    openTime: "7:00 - 21:00",
    website: "#",
    detailedServices: {
      "Thăm khám": [
        { name: "Khám bệnh cơ bản", price: "180.000 VNĐ" },
        { name: "Triệt sản mèo đực", price: "350.000 VNĐ" },
        { name: "Triệt sản mèo cái", price: "550.000 VNĐ" }
      ]
    }
  }
];

// Apply Filters
function applyFilters() {
  const searchTerm = document.getElementById('filterSearch').value.toLowerCase();
  const typeFilter = document.getElementById('filterType').value;
  const statusFilter = document.getElementById('filterStatus').value;
  const sortValue = document.getElementById('filterSort').value;
  
  filteredPartners = partnersData.filter(partner => {
    // Search filter
    if (searchTerm && !partner.name.toLowerCase().includes(searchTerm) && 
        !partner.address.toLowerCase().includes(searchTerm) &&
        !partner.phone.includes(searchTerm) &&
        !partner.email.toLowerCase().includes(searchTerm)) {
      return false;
    }
    
    // Type filter
    if (typeFilter && partner.type !== typeFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter && partner.status !== statusFilter) {
      return false;
    }
    
    return true;
  });
  
  // Sort
  currentSort = sortValue;
  sortPartners();
  
  // Re-render
  if (currentView === 'grid') {
    renderGridView();
  } else {
    renderTableView();
  }
  
  // Update stats
  updateStats();
}

// Sort Partners
function sortPartners() {
  filteredPartners.sort((a, b) => {
    switch(currentSort) {
      case 'rating':
        return b.rating - a.rating;
      case 'orders':
        return b.orders - a.orders;
      case 'revenue':
        const revenueA = parseFloat(a.revenue.replace('M', ''));
        const revenueB = parseFloat(b.revenue.replace('M', ''));
        return revenueB - revenueA;
      default:
        return 0;
    }
  });
}

// Filter by Status (from stats cards)
function filterByStatus(status) {
  // Update status filter dropdown
  document.getElementById('filterStatus').value = status === 'all' ? '' : status;
  
  // Remove active state from all stats cards
  document.querySelectorAll('[onclick^="filterByStatus"]').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-brand', 'shadow-xl');
  });
  
  // Add active state to clicked card
  event.target.closest('button').classList.add('ring-2', 'ring-brand', 'shadow-xl');
  
  // Apply filters
  applyFilters();
}

// Reset Filters
function resetFilters() {
  document.getElementById('filterSearch').value = '';
  document.getElementById('filterType').value = '';
  document.getElementById('filterStatus').value = '';
  document.getElementById('filterSort').value = 'rating';
  
  // Remove active state from stats cards
  document.querySelectorAll('[onclick^="filterByStatus"]').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-brand', 'shadow-xl');
  });
  
  applyFilters();
}

// Update Stats
function updateStats() {
  const total = partnersData.length;
  const active = partnersData.filter(p => p.status === 'active').length;
  const pending = partnersData.filter(p => p.status === 'pending').length;
  const suspended = partnersData.filter(p => p.status === 'suspended').length;
  
  // Update stats cards
  const statAll = document.getElementById('stat-all');
  const statActive = document.getElementById('stat-active');
  const statPending = document.getElementById('stat-pending');
  const statSuspended = document.getElementById('stat-suspended');
  
  if (statAll) statAll.textContent = total;
  if (statActive) statActive.textContent = active;
  if (statPending) statPending.textContent = pending;
  if (statSuspended) statSuspended.textContent = suspended;
}

// Render Grid View
function renderGridView() {
  const gridContainer = document.getElementById('partnersGrid');
  gridContainer.innerHTML = '';
  
  const partnersToRender = filteredPartners.length > 0 ? filteredPartners : partnersData;
  
  partnersToRender.forEach((partner) => {
    const index = partnersData.findIndex(p => p.id === partner.id);
    const statusBadge = partner.status === 'active' 
      ? 'bg-green-100 text-green-700">Đang hoạt động' 
      : 'bg-yellow-100 text-yellow-700">Chờ duyệt';
    
    const card = `
      <div class="card cursor-pointer" onclick="showPartnerModal(${index})">
        <div class="h-32 rounded-xl mb-4 overflow-hidden bg-cream flex items-center justify-center p-4">
          <img src="${partner.image}" alt="${partner.name}" class="w-full h-full object-contain">
        </div>
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="font-bold text-lg text-dark mb-1">${partner.name}</h3>
              <p class="text-sm text-gray-600">${partner.type}</p>
            </div>
            <span class="badge ${statusBadge}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 text-yellow-500">
              <i class="fas fa-star"></i>
              <span class="font-bold text-dark">${partner.rating}</span>
            </div>
            <span class="text-gray-400">•</span>
            <span class="text-sm text-gray-600">${partner.orders} đơn</span>
          </div>
          <div class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
            <div>
              <p class="text-xs text-gray-500">Doanh thu</p>
              <p class="font-bold text-dark">₫${partner.revenue}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Hoàn thành</p>
              <p class="font-bold text-dark">${partner.completion}%</p>
            </div>
          </div>
          <div class="flex items-start gap-2 text-sm text-gray-600">
            <i class="fas fa-map-marker-alt text-brand mt-0.5"></i>
            <span class="line-clamp-2">${partner.address}</span>
          </div>
          <div class="flex gap-2 pt-3">
            <button onclick="event.stopPropagation(); showPartnerModal(${index})"
              class="flex-1 px-4 py-2 bg-brand/10 text-brand rounded-lg hover:bg-brand/20 transition text-sm font-semibold">
              Xem chi tiết
            </button>
            <div class="relative">
              <button onclick="event.stopPropagation(); toggleMenu(${index})"
                class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">
                <i class="fas fa-ellipsis-h"></i>
              </button>
              <div id="menu-${index}" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button onclick="event.stopPropagation(); editPartnerById(${partner.id})" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <i class="fas fa-edit"></i>Chỉnh sửa
                </button>
                <button onclick="event.stopPropagation(); showDeletePartnerConfirmById(${partner.id})" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <i class="fas fa-trash"></i>Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    gridContainer.innerHTML += card;
  });
}

// Switch View
function switchView(view) {
  currentView = view;
  const gridView = document.getElementById('partnersGrid');
  const listView = document.getElementById('partnersList');
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');

  if (view === 'grid') {
    gridView.classList.remove('hidden');
    listView.classList.add('hidden');
    gridBtn.classList.add('bg-brand', 'text-white');
    gridBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
    listBtn.classList.remove('bg-brand', 'text-white');
    listBtn.classList.add('text-gray-600', 'hover:bg-gray-100');
    renderGridView();
  } else {
    gridView.classList.add('hidden');
    listView.classList.remove('hidden');
    renderTableView();
    listBtn.classList.add('bg-brand', 'text-white');
    listBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
    gridBtn.classList.remove('bg-brand', 'text-white');
    gridBtn.classList.add('text-gray-600', 'hover:bg-gray-100');
  }
}

// Render Table View
function renderTableView() {
  const tableBody = document.getElementById('partnersTableBody');
  
  const partnersToRender = filteredPartners.length > 0 ? filteredPartners : partnersData;
  
  tableBody.innerHTML = partnersToRender.map((partner) => {
    const index = partnersData.findIndex(p => p.id === partner.id);
    const statusClass = partner.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    const statusText = partner.status === 'active' ? 'Đang hoạt động' : 'Chờ duyệt';
    
    return `
    <tr class="hover:bg-gray-50 transition cursor-pointer" onclick="showPartnerModal(${index})">
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl overflow-hidden bg-cream flex items-center justify-center p-1">
            <img src="${partner.image}" alt="${partner.name}" class="w-full h-full object-contain">
          </div>
          <div>
            <p class="font-bold text-dark">${partner.name}</p>
            <p class="text-xs text-gray-500">${partner.type}</p>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">${partner.type}</td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-600">
          <p>${partner.phone}</p>
          <p class="text-xs">${partner.email}</p>
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-1 text-yellow-500">
          <i class="fas fa-star"></i>
          <span class="font-bold text-dark">${partner.rating}</span>
        </div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">${partner.orders}</td>
      <td class="px-6 py-4 font-bold text-dark">₫${partner.revenue}</td>
      <td class="px-6 py-4">
        <span class="badge ${statusClass}">${statusText}</span>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center justify-center gap-2">
          <button onclick="event.stopPropagation(); showPartnerModal(${index})" class="w-8 h-8 rounded-lg bg-brand/10 text-brand hover:bg-brand/20 transition flex items-center justify-center" title="Xem chi tiết">
            <i class="fas fa-eye text-sm"></i>
          </button>
          <button onclick="event.stopPropagation(); editPartnerById(${partner.id})" class="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition flex items-center justify-center" title="Chỉnh sửa">
            <i class="fas fa-edit text-sm"></i>
          </button>
          <button onclick="event.stopPropagation(); showDeletePartnerConfirmById(${partner.id})" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center" title="Xóa">
            <i class="fas fa-trash text-sm"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
  }).join('');
}

// Show Partner Modal
function showPartnerModal(index) {
  const partner = partnersData[index];
  const modal = document.getElementById('partnerModal');
  const content = document.getElementById('partnerContent');
  
  const isActive = partner.status === 'active';

  // Generate stars for rating
  const fullStars = Math.floor(partner.rating);
  const hasHalfStar = partner.rating % 1 >= 0.5;
  const starsHTML = Array(5).fill(0).map((_, i) => {
    if (i < fullStars) return '<i class="fas fa-star text-brand"></i>';
    if (i === fullStars && hasHalfStar) return '<i class="fas fa-star-half-alt text-brand"></i>';
    return '<i class="far fa-star text-gray-300"></i>';
  }).join('');
  
  content.innerHTML = `
    <!-- Header with Image -->
    <div class="flex gap-6 mb-6">
      <div class="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 shadow-md bg-cream flex items-center justify-center p-4">
        <img src="${partner.image}" alt="${partner.name}" class="w-full h-full object-contain">
      </div>
      <div class="flex-1">
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-2xl font-bold text-dark mb-1">${partner.name}</h3>
            <p class="text-gray-500">${partner.type}</p>
          </div>
          <span class="px-3 py-1.5 rounded-full text-sm font-medium ${isActive ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
            ${isActive ? 'Đang hoạt động' : 'Chờ duyệt'}
          </span>
        </div>
        
        <div class="flex items-center gap-1 mb-3">
          ${starsHTML}
          <span class="ml-2 font-bold text-dark">${partner.rating}</span>
          <span class="text-gray-400 text-sm">(${partner.orders} đánh giá)</span>
        </div>
        
        <p class="text-gray-600 text-sm leading-relaxed">${partner.description}</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-cream rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-dark">${partner.orders}</p>
        <p class="text-xs text-gray-500 mt-1">Đơn hàng</p>
      </div>
      <div class="bg-cream rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-dark">₫${partner.revenue}</p>
        <p class="text-xs text-gray-500 mt-1">Doanh thu</p>
      </div>
      <div class="bg-cream rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-dark">${partner.completion}%</p>
        <p class="text-xs text-gray-500 mt-1">Hoàn thành</p>
      </div>
      <div class="bg-cream rounded-xl p-4 text-center">
        <p class="text-2xl font-bold text-brand">${partner.priceRange.split(' - ')[0]}</p>
        <p class="text-xs text-gray-500 mt-1">Giá từ</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Contact Info -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <h4 class="font-semibold text-dark mb-4 text-sm uppercase tracking-wide">Thông tin liên hệ</h4>
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <i class="fas fa-map-marker-alt text-brand mt-0.5 w-4"></i>
            <p class="text-gray-600 text-sm flex-1">${partner.address}</p>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-phone text-brand w-4"></i>
            <p class="text-gray-700 font-medium">${partner.phone}</p>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-envelope text-brand w-4"></i>
            <p class="text-gray-600 text-sm">${partner.email}</p>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-clock text-brand w-4"></i>
            <p class="text-gray-600 text-sm">${partner.openTime}</p>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-globe text-brand w-4"></i>
            <a href="${partner.website}" target="_blank" class="text-brand text-sm hover:underline truncate">${partner.website.length > 40 ? partner.website.substring(0, 40) + '...' : partner.website}</a>
          </div>
        </div>
      </div>

      <!-- Services -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <h4 class="font-semibold text-dark mb-4 text-sm uppercase tracking-wide">Dịch vụ cung cấp</h4>
        <div class="flex flex-wrap gap-2 mb-4">
          ${partner.services.map(service => `
            <span class="px-3 py-1.5 bg-brand/10 text-brand rounded-lg text-sm font-medium">
              ${service}
            </span>
          `).join('')}
        </div>
        <div class="pt-3 border-t border-gray-100">
          <p class="text-xs text-gray-500 mb-1">Khoảng giá</p>
          <p class="font-semibold text-dark">${partner.priceRange}</p>
        </div>
      </div>
    </div>
    
    <!-- Pricing Table -->
    <div class="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h4 class="font-semibold text-dark mb-4 text-sm uppercase tracking-wide">Bảng giá chi tiết</h4>
      ${partner.detailedServices ? Object.keys(partner.detailedServices).map(serviceType => `
        <div class="mb-5 last:mb-0">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2 h-2 rounded-full bg-brand"></span>
            <h5 class="font-medium text-dark">${serviceType}</h5>
            <span class="text-xs text-gray-400">(${partner.detailedServices[serviceType].length} dịch vụ)</span>
          </div>
          <div class="space-y-2">
            ${partner.detailedServices[serviceType].map(service => `
              <div class="flex items-center justify-between py-2.5 px-4 bg-cream rounded-lg hover:bg-brand/5 transition">
                <span class="text-gray-700 text-sm">${service.name}</span>
                <span class="font-semibold text-dark text-sm">${service.price}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('') : `
        <p class="text-gray-500 text-sm">Chưa có thông tin bảng giá chi tiết</p>
      `}
    </div>
    
    <!-- Actions -->
    <div class="flex gap-3 pt-4 border-t border-gray-100">
      <button onclick="editPartner(${index})" class="flex-1 px-5 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brandDark transition">
        <i class="fas fa-edit mr-2"></i>Chỉnh sửa
      </button>
      <button onclick="togglePartnerStatus(${index})" class="flex-1 px-5 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition">
        <i class="fas fa-pause mr-2"></i>${partner.status === 'active' ? 'Tạm khóa' : 'Kích hoạt'}
      </button>
      <button onclick="showDeletePartnerConfirm(${index})" class="px-5 py-3 border border-red-200 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// Hide Partner Modal
function hidePartnerModal() {
  const modal = document.getElementById('partnerModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Edit Partner by Index
function editPartner(index) {
  const partner = partnersData[index];
  // Close any open menus
  document.querySelectorAll('[id^="menu-"]').forEach(menu => {
    menu.classList.add('hidden');
  });
  hidePartnerModal();
  showEditPartnerModal(partner);
}

// Edit Partner by ID
function editPartnerById(partnerId) {
  const index = partnersData.findIndex(p => p.id === partnerId);
  if (index > -1) {
    editPartner(index);
  }
}

// Show Edit Partner Modal
function showEditPartnerModal(partner) {
  const modal = document.getElementById('editPartnerModal');
  const form = document.getElementById('editPartnerForm');
  
  // Populate form with partner data
  form.querySelector('[name="name"]').value = partner.name;
  form.querySelector('[name="type"]').value = partner.type;
  form.querySelector('[name="address"]').value = partner.address;
  form.querySelector('[name="phone"]').value = partner.phone;
  form.querySelector('[name="email"]').value = partner.email;
  form.querySelector('[name="status"]').value = partner.status;
  form.querySelector('[name="openTime"]').value = partner.openTime || '';
  form.querySelector('[name="website"]').value = partner.website || '';
  form.querySelector('[name="description"]').value = partner.description || '';
  
  // Store partner ID for update
  form.dataset.partnerId = partner.id;
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// Hide Edit Partner Modal
function hideEditPartnerModal() {
  const modal = document.getElementById('editPartnerModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.getElementById('editPartnerForm').reset();
}

// Update Partner
function updatePartner(event) {
  event.preventDefault();
  
  const form = event.target;
  const partnerId = parseInt(form.dataset.partnerId);
  const partner = partnersData.find(p => p.id === partnerId);
  
  if (!partner) {
    alert('Không tìm thấy đối tác!');
    return;
  }
  
  const formData = new FormData(form);
  
  // Update partner data
  partner.name = formData.get('name');
  partner.type = formData.get('type');
  partner.address = formData.get('address');
  partner.phone = formData.get('phone');
  partner.email = formData.get('email');
  partner.status = formData.get('status');
  partner.openTime = formData.get('openTime') || partner.openTime;
  partner.website = formData.get('website') || partner.website;
  partner.description = formData.get('description') || partner.description;
  
  // Update services based on type
  if (partner.type.includes('Spa') && partner.type.includes('Thăm khám')) {
    partner.services = ['Spa', 'Thăm khám'];
  } else if (partner.type.includes('Spa')) {
    partner.services = ['Spa'];
  } else if (partner.type.includes('Thăm khám')) {
    partner.services = ['Thăm khám'];
  }
  
  // Refresh display
  applyFilters();
  updateStats();
  hideEditPartnerModal();
  
  alert('Đã cập nhật đối tác thành công!');
}

// Toggle Partner Status
function togglePartnerStatus(index) {
  const partner = partnersData[index];
  
  if (partner.status === 'active') {
    if (confirm(`Bạn có chắc chắn muốn tạm khóa đối tác "${partner.name}"?`)) {
      partner.status = 'suspended';
      alert('Đã tạm khóa đối tác thành công!');
    }
  } else {
    if (confirm(`Bạn có chắc chắn muốn kích hoạt lại đối tác "${partner.name}"?`)) {
      partner.status = 'active';
      alert('Đã kích hoạt đối tác thành công!');
    }
  }
  
  // Refresh display
  applyFilters();
  updateStats();
  hidePartnerModal();
  // Reopen modal with updated data
  const newIndex = partnersData.findIndex(p => p.id === partner.id);
  if (newIndex > -1) {
    showPartnerModal(newIndex);
  }
}

// Show Delete Partner Confirm by Index
function showDeletePartnerConfirm(index) {
  const partner = partnersData[index];
  // Close any open menus
  document.querySelectorAll('[id^="menu-"]').forEach(menu => {
    menu.classList.add('hidden');
  });
  hidePartnerModal();
  
  const content = `
    <div class="space-y-4">
      <!-- Warning Icon -->
      <div class="flex justify-center">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
        </div>
      </div>

      <!-- Message -->
      <div class="text-center">
        <p class="text-lg font-semibold text-dark mb-2">
          Bạn có chắc chắn muốn xóa đối tác <span class="text-brand">${partner.name}</span>?
        </p>
        <p class="text-sm text-gray-600 mb-4">Hành động này không thể hoàn tác!</p>
      </div>

      <!-- Partner Details -->
      <div class="card bg-cream">
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Loại hình:</span>
            <span class="font-semibold text-dark">${partner.type}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Địa chỉ:</span>
            <span class="font-semibold text-dark">${partner.address}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Số điện thoại:</span>
            <span class="font-semibold text-dark">${partner.phone}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Đơn hàng:</span>
            <span class="font-semibold text-dark">${partner.orders}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button type="button" onclick="hideDeletePartnerConfirm()"
          class="btn-cancel flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold">
          <i class="fas fa-times mr-2"></i>Hủy
        </button>
        <button type="button" onclick="confirmDeletePartner(${index})"
          class="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
          <i class="fas fa-trash mr-2"></i>Xóa
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('deletePartnerContent').innerHTML = content;
  document.getElementById('deletePartnerModal').classList.remove('hidden');
  document.getElementById('deletePartnerModal').classList.add('flex');
}

// Hide Delete Partner Confirm
function hideDeletePartnerConfirm() {
  document.getElementById('deletePartnerModal').classList.add('hidden');
  document.getElementById('deletePartnerModal').classList.remove('flex');
}

// Show Delete Partner Confirm by ID
function showDeletePartnerConfirmById(partnerId) {
  const index = partnersData.findIndex(p => p.id === partnerId);
  if (index > -1) {
    showDeletePartnerConfirm(index);
  }
}

// Confirm Delete Partner
function confirmDeletePartner(index) {
  const partner = partnersData[index];
  
  // Remove from partnersData
  partnersData.splice(index, 1);
  
  // Hide modal
  hideDeletePartnerConfirm();
  
  // Show success message
  alert('Đã xóa đối tác thành công!');
  
  // Refresh display
  applyFilters();
  updateStats();
}

// Toggle Menu (for grid view)
function toggleMenu(index) {
  const menu = document.getElementById(`menu-${index}`);
  if (menu) {
    // Close all other menus
    document.querySelectorAll('[id^="menu-"]').forEach(m => {
      if (m.id !== `menu-${index}`) {
        m.classList.add('hidden');
      }
    });
    menu.classList.toggle('hidden');
  }
}

// Close menus when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('[id^="menu-"]') && !event.target.closest('[onclick*="toggleMenu"]')) {
    document.querySelectorAll('[id^="menu-"]').forEach(menu => {
      menu.classList.add('hidden');
    });
  }
});

// Show Add Partner Modal
function showAddPartnerModal() {
  const modal = document.getElementById('addPartnerModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  // Reset form
  document.getElementById('addPartnerForm').reset();
}

// Hide Add Partner Modal
function hideAddPartnerModal() {
  const modal = document.getElementById('addPartnerModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Handle Add Partner
function handleAddPartner(event) {
  event.preventDefault();
  
  // Get form values
  const newPartner = {
    id: partnersData.length + 1,
    name: document.getElementById('addPartnerName').value,
    type: document.getElementById('addPartnerType').value,
    address: document.getElementById('addPartnerAddress').value,
    phone: document.getElementById('addPartnerPhone').value,
    email: document.getElementById('addPartnerEmail').value,
    website: document.getElementById('addPartnerWebsite').value || '#',
    openTime: document.getElementById('addPartnerOpenTime').value || '8:00 - 20:00',
    rating: parseFloat(document.getElementById('addPartnerRating').value) || 0,
    status: document.getElementById('addPartnerStatus').value,
    description: document.getElementById('addPartnerDescription').value || 'Chưa có mô tả',
    image: document.getElementById('addPartnerLogo').value || '../assets/images/logo/LOGO PAWJOY.png',
    orders: 0,
    revenue: '0M',
    completion: 0,
    services: document.getElementById('addPartnerType').value === 'Spa' ? ['Spa'] : 
              document.getElementById('addPartnerType').value === 'Thăm khám' ? ['Thăm khám'] : 
              ['Spa', 'Thăm khám'],
    priceRange: '0 VNĐ - 0 VNĐ',
    detailedServices: {}
  };
  
  // Add to partnersData
  partnersData.push(newPartner);
  
  // Refresh display
  applyFilters();
  updateStats();
  
  // Hide modal
  hideAddPartnerModal();
  
  // Show success message
  alert('Đã thêm đối tác mới thành công!');
}

// Show Add Partner Modal
function showAddPartnerModal() {
  const modal = document.getElementById('addPartnerModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// Hide Add Partner Modal
function hideAddPartnerModal() {
  const modal = document.getElementById('addPartnerModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  // Reset form
  document.getElementById('addPartnerForm').reset();
}

// Add New Partner
function addNewPartner(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const name = formData.get('name');
  const type = formData.get('type');
  const address = formData.get('address');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const status = formData.get('status');
  const openTime = formData.get('openTime');
  const website = formData.get('website');
  const description = formData.get('description');
  
  // Generate new ID
  const newId = partnersData.length > 0 ? Math.max(...partnersData.map(p => p.id)) + 1 : 1;
  
  // Determine logo path based on name (simplified - you can enhance this)
  let logoPath = '../assets/images/logo/LOGO PAWJOY.png'; // Default logo
  const nameLower = name.toLowerCase();
  if (nameLower.includes('pet wow')) logoPath = '../assets/images/stores/PetWow/logo_petwow.png';
  else if (nameLower.includes('2vet')) logoPath = '../assets/images/stores/2Vet/logo_2vet.png';
  else if (nameLower.includes('gấu') || nameLower.includes('gau')) logoPath = '../assets/images/stores/GauSpa/logo_GauSpa.png';
  else if (nameLower.includes('pao')) logoPath = '../assets/images/stores/PaoPet/logo_paopet.png';
  else if (nameLower.includes('lumi')) logoPath = '../assets/images/stores/LumiPet/logo_lumipet.png';
  else if (nameLower.includes('sâu') || nameLower.includes('sau')) logoPath = '../assets/images/stores/TiemNhaSau/logo_tiemnhasau.png';
  else if (nameLower.includes('petgrocer')) logoPath = '../assets/images/stores/PetGrocer/logo_petgrocer.png';
  else if (nameLower.includes('c.well') || nameLower.includes('cwell')) logoPath = '../assets/images/stores/CWellPet/logo_cwellpet.png';
  else if (nameLower.includes('pets & min') || nameLower.includes('petsmin')) logoPath = '../assets/images/stores/Pets&Min/logo_pets&min.png';
  else if (nameLower.includes('nasa')) logoPath = '../assets/images/stores/NasaPet/logo_nasapet.png';
  else if (nameLower.includes('pet pro')) logoPath = '../assets/images/stores/PetPro/logo_petpro.png';
  
  // Create new partner object
  const newPartner = {
    id: newId,
    name: name,
    type: type,
    address: address,
    phone: phone,
    email: email,
    rating: 0,
    orders: 0,
    revenue: '0M',
    completion: 0,
    status: status,
    image: logoPath,
    services: type.includes('Spa') && type.includes('Thăm khám') ? ['Spa', 'Thăm khám'] : 
              type.includes('Spa') ? ['Spa'] : 
              type.includes('Thăm khám') ? ['Thăm khám'] : [],
    priceRange: '0 VNĐ - 0 VNĐ',
    description: description || 'Chưa có mô tả',
    openTime: openTime || '8:00 - 20:00',
    website: website || '#',
    detailedServices: {}
  };
  
  // Add to partnersData
  partnersData.push(newPartner);
  
  // Refresh display
  applyFilters();
  updateStats();
  
  // Hide modal
  hideAddPartnerModal();
  
  // Show success message
  alert('Đã thêm đối tác mới thành công!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize filteredPartners with all partners
  filteredPartners = [...partnersData];
  sortPartners();
  renderGridView();
  updateStats();
});
