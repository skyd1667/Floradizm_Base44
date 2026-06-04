//not necessary file


export const MOCK_PRODUCTS = [
  {
    id: 'p001', name_ko: '스마트 수경재배 시스템 Pro', name_en: 'Smart Hydroponic System Pro',
    description_ko: '최첨단 LED 스펙트럼과 자동 수위 조절 기능을 갖춘 프리미엄 수경재배 시스템. 허브, 채소, 꽃을 실내에서 손쉽게 재배하세요.',
    description_en: 'Premium hydroponic system with cutting-edge LED spectrum and automatic water level regulation.',
    price: 189000, original_price: 229000, category: 'hydroponics',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80'],
    stock_quantity: 47, is_active: true, is_featured: true, is_sale: true, discount_percent: 17,
    rating: 4.8, review_count: 124,
    specs: { 'LED 스펙트럼': '380-780nm 풀스펙트럼', '용량': '15L', '재배 식물 수': '최대 12주', '전력': '45W', '크기': '60×30×50cm' }
  },
  {
    id: 'p002', name_ko: '미니 수경재배 키트 Lite', name_en: 'Mini Hydroponic Kit Lite',
    description_ko: '컴팩트한 디자인의 입문자용 수경재배 키트. 주방이나 책상 위에서 허브를 재배하기에 최적화되었습니다.',
    description_en: 'Compact beginner-friendly hydroponic kit. Perfect for growing herbs on kitchen counters or desks.',
    price: 59000, original_price: null, category: 'hydroponics',
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80'],
    stock_quantity: 156, is_active: true, is_featured: true, is_sale: false, discount_percent: 0,
    rating: 4.6, review_count: 89,
    specs: { 'LED': '풀스펙트럼 18W', '용량': '4L', '재배 식물 수': '최대 6주', '전력': '18W', '크기': '35×18×45cm' }
  },
  {
    id: 'p003', name_ko: '식물 성장 LED 패널 T8', name_en: 'Plant Growth LED Panel T8',
    description_ko: '식물 성장에 최적화된 풀스펙트럼 LED 성장 조명. 에너지 효율 최대 95%의 차세대 식물 조명.',
    description_en: 'Full-spectrum LED grow light optimized for plant growth. Up to 95% energy efficiency.',
    price: 78000, original_price: 95000, category: 'smart_lighting',
    images: ['https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?w=800&q=80'],
    stock_quantity: 83, is_active: true, is_featured: false, is_sale: true, discount_percent: 18,
    rating: 4.5, review_count: 67,
    specs: { 'LED 타입': 'SMD2835 풀스펙트럼', '출력': '40W', '광도': '4000lm', '사용 수명': '50,000시간', '크기': '90cm' }
  },
  {
    id: 'p004', name_ko: '클립형 미니 성장등', name_en: 'Clip-On Mini Grow Light',
    description_ko: '화분 가장자리에 클립으로 고정하는 휴대용 성장 조명. 3단계 밝기 조절 및 타이머 기능.',
    description_en: 'Portable clip-on grow light with 3-level brightness and built-in timer.',
    price: 32000, original_price: null, category: 'smart_lighting',
    images: ['https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80'],
    stock_quantity: 210, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.3, review_count: 45,
    specs: { 'LED': 'UV+IR 포함 풀스펙트럼', '전력': '10W', '타이머': '3/9/12시간', '클립 직경': '최대 4cm' }
  },
  {
    id: 'p005', name_ko: '자동 급수 에코 화분 (대)', name_en: 'Auto-Watering Eco Pot (L)',
    description_ko: '생분해성 소재로 제작된 자동 급수 시스템 내장 대형 화분. 최대 2주 동안 자동으로 수분을 공급합니다.',
    description_en: 'Large biodegradable pot with built-in self-watering system. Auto-feeds moisture for up to 2 weeks.',
    price: 42000, original_price: null, category: 'eco_pots',
    images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80'],
    stock_quantity: 94, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.7, review_count: 203,
    specs: { '소재': '100% 생분해성 코이어', '크기': '직경 25cm × 높이 22cm', '저수량': '2.5L', '자동급수 기간': '최대 14일' }
  },
  {
    id: 'p006', name_ko: '스마트 토양 센서 V2', name_en: 'Smart Soil Sensor V2',
    description_ko: '수분, 온도, pH, 영양분 수치를 실시간 측정하는 스마트 식물 관리 센서. 블루투스 앱 연동.',
    description_en: 'Real-time soil sensor measuring moisture, temperature, pH, and nutrients. Bluetooth app connected.',
    price: 55000, original_price: 68000, category: 'sensors',
    images: ['https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80'],
    stock_quantity: 62, is_active: true, is_featured: true, is_sale: true, discount_percent: 19,
    rating: 4.4, review_count: 38,
    specs: { '측정 항목': '수분/온도/pH/EC/광량', '배터리': 'AAA 배터리 2개 (약 6개월)', '연결': 'Bluetooth 5.0', '호환 앱': 'iOS / Android' }
  },
  {
    id: 'p007', name_ko: '수경재배 영양제 세트 (3종)', name_en: 'Hydroponic Nutrient Set (3-pack)',
    description_ko: '수경재배에 최적화된 3단계 영양제 세트. A액, B액, 칼슘제로 구성되어 있습니다.',
    description_en: '3-stage nutrient solution set optimized for hydroponics. Includes A/B solution and calcium supplement.',
    price: 28000, original_price: null, category: 'nutrients',
    images: ['https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80'],
    stock_quantity: 380, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.9, review_count: 312,
    specs: { '구성': 'A액 500ml + B액 500ml + 칼슘제 250ml', '희석 배율': '500-1000배', '사용 식물': '모든 수경 식물', '유통기한': '24개월' }
  },
  {
    id: 'p008', name_ko: '에어 프루닝 포트 세트 (5개)', name_en: 'Air Pruning Pot Set (5pcs)',
    description_ko: '에어 프루닝 기술로 뿌리 발달을 극대화하는 친환경 섬유 화분 5개 세트.',
    description_en: 'Eco-friendly fabric pots using air pruning technology for maximum root development. Set of 5.',
    price: 18000, original_price: null, category: 'eco_pots',
    images: ['https://images.unsplash.com/photo-1493974116816-6fed8a2cb2a6?w=800&q=80'],
    stock_quantity: 445, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.6, review_count: 156,
    specs: { '크기': '직경 20cm × 높이 20cm', '소재': '재활용 BPA-Free 섬유', '세트 구성': '5개', '색상': '차콜 그레이' }
  },
  {
    id: 'p009', name_ko: '실내 식물 수직 정원 월 패널', name_en: 'Indoor Vertical Garden Wall Panel',
    description_ko: '벽면에 설치하는 수직 정원 패널. 내장 드립 시스템으로 20개 식물을 동시에 관리.',
    description_en: 'Wall-mounted vertical garden panel with built-in drip system for up to 20 plants.',
    price: 145000, original_price: 178000, category: 'hydroponics',
    images: ['https://images.unsplash.com/photo-1512428559087-560552660a1d?w=800&q=80'],
    stock_quantity: 28, is_active: true, is_featured: true, is_sale: true, discount_percent: 19,
    rating: 4.7, review_count: 41,
    specs: { '크기': '60×80cm', '화분 수': '20개 포켓', '급수': '자동 드립 시스템', '소재': 'UV 코팅 폴리프로필렌' }
  },
  {
    id: 'p010', name_ko: 'pH/EC 측정기 콤보 세트', name_en: 'pH/EC Meter Combo Set',
    description_ko: '수경재배에 필수적인 pH와 EC(전기전도도) 측정기 세트. 자동 보정 기능 내장.',
    description_en: 'Essential pH and EC meter set for hydroponics with automatic calibration.',
    price: 48000, original_price: null, category: 'sensors',
    images: ['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80'],
    stock_quantity: 74, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.5, review_count: 92,
    specs: { 'pH 범위': '0.00-14.00', 'EC 범위': '0-9999μS/cm', '정밀도': 'pH ±0.01', '방수': 'IP67' }
  },
  {
    id: 'p011', name_ko: '타이머 콘센트 (4구 스마트)', name_en: '4-Outlet Smart Timer Strip',
    description_ko: '4구 타이머 멀티탭. 각 포트별 독립 타이머 설정으로 조명, 펌프, 환풍기를 자동 제어.',
    description_en: '4-outlet timer strip with independent scheduling for lights, pumps, and fans.',
    price: 36000, original_price: null, category: 'accessories',
    images: ['https://images.unsplash.com/photo-1558618047-f4e60c8a2406?w=800&q=80'],
    stock_quantity: 198, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.4, review_count: 73,
    specs: { '포트 수': '4구 독립 제어', '타이머 정밀도': '1분 단위', '최대 전류': '15A', '방식': '기계식 + 디지털' }
  },
  {
    id: 'p012', name_ko: '수경재배 씨앗 스타터 킷 (허브 10종)', name_en: 'Hydroponic Seed Starter Kit (10 Herbs)',
    description_ko: '수경재배에 최적화된 유기농 허브 씨앗 10종 + 록울 큐브 20개 + 영양제 샘플 포함.',
    description_en: '10 organic herb seeds optimized for hydroponics + 20 rockwool cubes + nutrient samples.',
    price: 22000, original_price: 28000, category: 'accessories',
    images: ['https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=800&q=80'],
    stock_quantity: 267, is_active: true, is_featured: false, is_sale: true, discount_percent: 21,
    rating: 4.8, review_count: 445,
    specs: { '씨앗 종류': '바질, 민트, 로즈마리 외 7종', '록울 큐브': '20개 포함', '발아율': '95% 이상', '유기농 인증': 'USDA Organic' }
  },
  {
    id: 'p013', name_ko: '스마트 수경재배 올인원 번들', name_en: 'Smart Hydroponic All-in-One Bundle',
    description_ko: '수경재배 시스템 + LED 성장등 + 영양제 세트 + 씨앗 킷을 한 번에! 완벽한 입문 패키지.',
    description_en: 'Hydroponic system + LED grow light + nutrients + seed kit in one complete starter bundle.',
    price: 259000, original_price: 335000, category: 'bundles',
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80'],
    stock_quantity: 34, is_active: true, is_featured: true, is_sale: true, discount_percent: 23,
    rating: 4.9, review_count: 28,
    specs: { '구성': '수경재배기 + LED 조명 + 3종 영양제 + 씨앗 10종', '절약 금액': '76,000원', '추천 대상': '입문자 / 선물용' }
  },
  {
    id: 'p014', name_ko: '식물 성장 타임랩스 카메라', name_en: 'Plant Growth Timelapse Camera',
    description_ko: 'AI 기반 식물 성장 추적 카메라. 매일 자동으로 타임랩스 영상을 생성하고 스마트폰으로 전송.',
    description_en: 'AI-powered plant growth tracking camera. Auto-generates daily timelapse videos sent to your phone.',
    price: 112000, original_price: null, category: 'sensors',
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80'],
    stock_quantity: 41, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.3, review_count: 19,
    specs: { '해상도': '5MP', '연결': 'WiFi 2.4GHz', '저장': '클라우드 / MicroSD', '배터리': '충전식 5000mAh (약 30일)' }
  },
  {
    id: 'p015', name_ko: '대나무 원형 화분 트레이 세트', name_en: 'Bamboo Round Pot Tray Set',
    description_ko: '100% 천연 대나무로 제작된 원형 화분 받침 3종 세트. 환경친화적이고 세련된 인테리어 아이템.',
    description_en: '100% natural bamboo round pot tray set of 3. Eco-friendly and stylish interior accessory.',
    price: 24000, original_price: null, category: 'eco_pots',
    images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80'],
    stock_quantity: 312, is_active: true, is_featured: false, is_sale: false, discount_percent: 0,
    rating: 4.8, review_count: 189,
    specs: { '소재': '100% 천연 대나무', '크기': '직경 15/20/25cm 3종', '처리': '방수 코팅', '색상': '내추럴 베이지' }
  }
];

export const CATEGORIES = [
  { id: 'all', ko: '전체', en: 'All' },
  { id: 'hydroponics', ko: '수경재배', en: 'Hydroponics' },
  { id: 'smart_lighting', ko: '스마트 조명', en: 'Smart Lighting' },
  { id: 'eco_pots', ko: '에코 화분', en: 'Eco Pots' },
  { id: 'sensors', ko: '센서 & 모니터', en: 'Sensors' },
  { id: 'nutrients', ko: '영양제', en: 'Nutrients' },
  { id: 'accessories', ko: '액세서리', en: 'Accessories' },
  { id: 'bundles', ko: '번들 패키지', en: 'Bundles' },
];
