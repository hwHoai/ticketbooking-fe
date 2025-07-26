export const locations = [
  'TP Hà Nội',
  'TP Huế',
  'Quảng Ninh',
  'Cao Bằng',
  'Lạng Sơn',
  'Lai Châu',
  'Điện Biên',
  'Sơn La',
  'Thanh Hóa',
  'Nghệ An',
  'Hà Tĩnh',
  'Tuyên Quang',
  'Lào Cai',
  'Thái Nguyên',
  'Phú Thọ',
  'Bắc Ninh',
  'Hưng Yên',
  'TP Hải Phòng',
  'Ninh Bình',
  'Quảng Trị',
  'TP Đà Nẵng',
  'Quảng Ngãi',
  'Gia Lai',
  'Khánh Hòa',
  'Lâm Đồng',
  'Đắk Lắk',
  'TPHCM',
  'Đồng Nai',
  'Tây Ninh',
  'TP Cần Thơ',
  'Vĩnh Long',
  'Đồng Tháp',
  'Cà Mau',
  'An Giang'
];

export const timeOptions = ['Morning', 'Afternoon', 'Evening'];

export const locationOptions = locations.map((loc) => ({ value: loc, label: loc }));

export const typeOptions = [
  { value: 'One-way', label: 'One-way' },
  { value: 'Round-trip', label: 'Round-trip' }
];

export const ticketTypeOptions = [
  { value: 'Regular', label: 'Regular' },
  { value: 'VIP', label: 'VIP' }
];
