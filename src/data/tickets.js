export const tickets = [
  // Bus Tickets
  {
    id: 1,
    name: 'Vé xe khách Hà Nội - Hải Phòng',
    type: 'bus',
    price: 120000,
    description: 'Vé xe khách tuyến Hà Nội - Hải Phòng, ghế ngồi mềm.',
    image: '/assets/bus-1.png',
    about: 'Xe khách Hà Nội - Hải Phòng là lựa chọn lý tưởng...',
    organizer: 'Nhà xe Hải Âu',
    policy: 'Vé có thể đổi ngày đi trước 24h, không hoàn tiền.'
  },
  {
    id: 2,
    name: 'Vé xe khách Hà Nội - Đà Nẵng',
    type: 'bus',
    price: 350000,
    description: 'Vé xe khách tuyến Hà Nội - Đà Nẵng, giường nằm.',
    image: '/assets/bus-2.png',
    about: 'Xe giường nằm cao cấp, tiện nghi...',
    organizer: 'Nhà xe Hoàng Long',
    policy: 'Đổi vé trước 48h, không hoàn tiền.'
  },
  {
    id: 3,
    name: 'Vé xe khách Sài Gòn - Vũng Tàu',
    type: 'bus',
    price: 150000,
    description: 'Vé xe khách tuyến Sài Gòn - Vũng Tàu, ghế ngồi.',
    image: '/assets/bus-3.png',
    about: 'Hành trình nhanh chóng, thoải mái...',
    organizer: 'Nhà xe Hoa Mai',
    policy: 'Đổi vé trước 24h, không hoàn tiền.'
  },
  {
    id: 4,
    name: 'Vé xe khách Đà Lạt - Nha Trang',
    type: 'bus',
    price: 200000,
    description: 'Vé xe khách tuyến Đà Lạt - Nha Trang, giường nằm.',
    image: '/assets/bus-4.png',
    about: 'Xe chất lượng cao, dịch vụ tốt...',
    organizer: 'Nhà xe Thành Bưởi',
    policy: 'Không đổi, không hoàn.'
  },
  {
    id: 5,
    name: 'Vé xe khách Hà Nội - Huế',
    type: 'bus',
    price: 300000,
    description: 'Vé xe khách tuyến Hà Nội - Huế, giường nằm.',
    image: '/assets/bus-5.png',
    about: 'Hành trình dài với tiện nghi đầy đủ...',
    organizer: 'Nhà xe Cúc Tùng',
    policy: 'Đổi vé trước 48h, không hoàn tiền.'
  },
  {
    id: 6,
    name: 'Vé xe khách Sài Gòn - Cần Thơ',
    type: 'bus',
    price: 180000,
    description: 'Vé xe khách tuyến Sài Gòn - Cần Thơ, ghế ngồi.',
    image: '/assets/bus-6.png',
    about: 'Hành trình nhanh, dịch vụ thân thiện...',
    organizer: 'Nhà xe Phương Trang',
    policy: 'Đổi vé trước 24h, không hoàn tiền.'
  },
  {
    id: 7,
    name: 'Vé xe khách Hà Nội - Sapa',
    type: 'bus',
    price: 250000,
    description: 'Vé xe khách tuyến Hà Nội - Sapa, giường nằm.',
    image: '/assets/bus-7.png',
    about: 'Khám phá Sapa với xe chất lượng cao...',
    organizer: 'Nhà xe Hà Sơn',
    policy: 'Đổi vé trước 48h, không hoàn tiền.'
  },
  // Concert Tickets
  {
    id: 11,
    name: 'Vé concert BlackPink Hà Nội',
    type: 'concert',
    price: 2500000,
    description: 'Vé concert BlackPink tại SVĐ Mỹ Đình.',
    image: '/assets/concert-1.png',
    about: 'Sự kiện âm nhạc quốc tế được mong chờ...',
    organizer: 'YG Entertainment',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 12,
    name: 'Vé concert Sơn Tùng M-TP',
    type: 'concert',
    price: 1500000,
    description: 'Concert Sơn Tùng M-TP tại Hà Nội.',
    image: '/assets/concert-2.png',
    about: 'Sự kiện âm nhạc đỉnh cao...',
    organizer: 'M-TP Entertainment',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 13,
    name: 'Vé concert Đen Vâu',
    type: 'concert',
    price: 800000,
    description: 'Concert Đen Vâu tại TP.HCM.',
    image: '/assets/concert-3.png',
    about: 'Âm nhạc đường phố đầy cảm hứng...',
    organizer: 'Đen Vâu Production',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 14,
    name: 'Vé concert Mỹ Tâm',
    type: 'concert',
    price: 2000000,
    description: 'Concert Mỹ Tâm tại SVĐ Hàng Đẫy.',
    image: '/assets/concert-4.png',
    about: 'Giọng ca vàng của Việt Nam...',
    organizer: 'Mỹ Tâm Entertainment',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 15,
    name: 'Vé concert BTS World Tour',
    type: 'concert',
    price: 3500000,
    description: 'Concert BTS tại SVĐ Quốc gia.',
    image: '/assets/concert-5.png',
    about: 'Sự kiện toàn cầu của nhóm nhạc BTS...',
    organizer: 'Big Hit Entertainment',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 16,
    name: 'Vé concert Hà Anh Tuấn',
    type: 'concert',
    price: 1200000,
    description: 'Concert Hà Anh Tuấn tại Đà Nẵng.',
    image: '/assets/concert-6.png',
    about: 'Những bản tình ca lãng mạn...',
    organizer: 'Hà Anh Tuấn Production',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 17,
    name: 'Vé concert Bích Phương',
    type: 'concert',
    price: 900000,
    description: 'Concert Bích Phương tại Hà Nội.',
    image: '/assets/concert-7.png',
    about: 'Âm nhạc trẻ trung, sôi động...',
    organizer: 'Bích Phương Entertainment',
    policy: 'Không hoàn, không đổi.'
  },
  // Event Tickets
  {
    id: 21,
    name: 'Vé sự kiện Tech Summit 2025',
    type: 'event',
    price: 500000,
    description: 'Hội thảo công nghệ lớn nhất năm 2025.',
    image: '/assets/event-1.png',
    about: 'Quy tụ các chuyên gia và doanh nghiệp công nghệ...',
    organizer: 'Tech Event Group',
    policy: 'Không hoàn tiền. Được phép chuyển nhượng trước 3 ngày.'
  },
  {
    id: 22,
    name: 'Vé hội thảo Blockchain 2025',
    type: 'event',
    price: 800000,
    description: 'Hội thảo về công nghệ Blockchain.',
    image: '/assets/event-2.png',
    about: 'Khám phá tương lai của Blockchain...',
    organizer: 'Crypto Events',
    policy: 'Chuyển nhượng được, không hoàn tiền.'
  },
  {
    id: 23,
    name: 'Vé triển lãm Ô tô Việt Nam',
    type: 'event',
    price: 200000,
    description: 'Triển lãm ô tô lớn nhất tại TP.HCM.',
    image: '/assets/event-3.png',
    about: 'Trưng bày các mẫu xe mới nhất...',
    organizer: 'Vietnam Auto Show',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 24,
    name: 'Vé hội chợ Du lịch Quốc tế',
    type: 'event',
    price: 150000,
    description: 'Hội chợ du lịch tại Hà Nội.',
    image: '/assets/event-4.png',
    about: 'Khám phá các điểm đến du lịch hấp dẫn...',
    organizer: 'Vietnam Tourism Board',
    policy: 'Không hoàn, không đổi.'
  },
  {
    id: 25,
    name: 'Vé sự kiện Startup Festival',
    type: 'event',
    price: 300000,
    description: 'Sự kiện kết nối startup tại Đà Nẵng.',
    image: '/assets/event-5.png',
    about: 'Nơi gặp gỡ các nhà sáng lập và nhà đầu tư...',
    organizer: 'Startup Vietnam',
    policy: 'Chuyển nhượng được, không hoàn tiền.'
  },
  {
    id: 26,
    name: 'Vé hội thảo AI Summit 2025',
    type: 'event',
    price: 600000,
    description: 'Hội thảo về trí tuệ nhân tạo.',
    image: '/assets/event-6.png',
    about: 'Khám phá các ứng dụng AI mới nhất...',
    organizer: 'AI Vietnam',
    policy: 'Không hoàn tiền, chuyển nhượng trước 5 ngày.'
  },
  {
    id: 27,
    name: 'Vé triển lãm Nghệ thuật Đương đại',
    type: 'event',
    price: 250000,
    description: 'Triển lãm nghệ thuật tại Hà Nội.',
    image: '/assets/event-7.png',
    about: 'Trưng bày các tác phẩm nghệ thuật độc đáo...',
    organizer: 'Art Gallery VN',
    policy: 'Không hoàn, không đổi.'
  }
];

// Phân loại theo type
export const busTickets = tickets.filter((t) => t.type === 'bus');
export const concertTickets = tickets.filter((t) => t.type === 'concert');
export const eventTickets = tickets.filter((t) => t.type === 'event');
