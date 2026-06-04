import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/language';
import ProductCard from '@/components/shop/ProductCard';
import { SlidersHorizontal, Search } from 'lucide-react';

const CATEGORIES = [
  { value: 'all', ko: '전체', en: 'All' },
  { value: 'hydroponics', ko: '수경재배', en: 'Hydroponics' },
  { value: 'smart_lighting', ko: '스마트 조명', en: 'Smart Lighting' },
  { value: 'eco_pots', ko: '에코 화분', en: 'Eco Pots' },
  { value: 'sensors', ko: '센서', en: 'Sensors' },
  { value: 'nutrients', ko: '영양제', en: 'Nutrients' },
  { value: 'accessories', ko: '액세서리', en: 'Accessories' },
  { value: 'bundles', ko: '번들', en: 'Bundles' },
];

const SORT_OPTIONS = [
  { value: '-created_date', ko: '최신순', en: 'Newest' },
  { value: 'price', ko: '낮은 가격순', en: 'Price: Low' },
  { value: '-price', ko: '높은 가격순', en: 'Price: High' },
  { value: '-rating', ko: '평점순', en: 'Top Rated' },
];

export default function Shop() {
  const { t } = useLanguage();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isSale = params.get('sale') === 'true';
  const searchParam = params.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('-created_date');
  const [search, setSearch] = useState(searchParam);

  useEffect(() => {
    setLoading(true);
    const filter = { is_active: true };
    if (isSale) filter.is_sale = true;
    if (category !== 'all') filter.category = category;

    base44.entities.Product.filter(filter, sort, 100)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [category, sort, isSale]);

  const filtered = search
    ? products.filter(p =>
        p.name_ko?.includes(search) ||
        p.name_en?.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif-kr font-semibold text-deep-forest text-3xl mb-1">
          {isSale ? t('세일', 'Sale') : t('전체 상품', 'Products')}
        </h1>
        <p className="font-sans-kr text-sm text-muted-foreground">{filtered.length}{t('개 제품', ' products')}</p>
      </div>

      {/* Search */}
      {!isSale && (
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('식물 제품 검색...', 'Search plant products...')}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-subtle text-sm text-deep-forest placeholder-muted-foreground focus:outline-none focus:border-sage-green"
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-subtle bg-white px-3 py-3 font-sans-kr text-sm focus:outline-none min-h-[44px]"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{t(o.ko, o.en)}</option>
          ))}
        </select>
      </div>

      {/* Category pills */}
      {!isSale && (
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2.5 text-sm font-sans-kr border min-h-[44px] ${
                category === c.value
                  ? 'bg-deep-forest text-warm-cream border-deep-forest'
                  : 'border-subtle text-deep-forest hover:border-deep-forest'
              }`}
            >
              {t(c.ko, c.en)}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="font-sans-kr text-muted-foreground">{t('제품이 없습니다.', 'No products found.')}</p>
        </div>
      )}
    </div>
  );
}
