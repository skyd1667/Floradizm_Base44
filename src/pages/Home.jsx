import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/language';
import { useCart } from '@/lib/cart';
import ProductCard from '@/components/shop/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [featured, setFeatured] = useState([]);
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Product.filter({ is_featured: true, is_active: true }, '-created_date', 8),
      base44.entities.Product.filter({ is_sale: true, is_active: true }, '-created_date', 4),
    ]).then(([f, s]) => {
      setFeatured(f);
      setSale(s);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-warm-cream">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://goodearthplants.com/wp-content/uploads/2019/10/pots-716579_1920-MiliVanily-1024x602.jpg')" }}
        />
        <div className="absolute inset-0 bg-deep-forest/50" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-sans-kr text-xs tracking-[0.3em] text-warm-cream/90 uppercase font-medium drop-shadow-md">Smart Home Plantation</span>
          </div>
          <h1 className="font-serif-kr font-semibold text-warm-cream text-5xl md:text-7xl mb-6 leading-tight">
            Floradizm
          </h1>
          <p className="font-sans-kr text-warm-cream/80 text-base md:text-lg mb-10 leading-relaxed">
            {t('기술과 자연이 만나는 스마트 홈 플랜테이션', 'Where technology meets nature — smart home plantation')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="bg-warm-cream text-deep-forest px-8 py-4 font-sans-kr font-medium text-sm hover:bg-light-sage inline-flex items-center justify-center gap-2 min-h-[52px]"
            >
              {t('전체 상품 보기', 'Shop All')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop?sale=true"
              className="border border-warm-cream/60 text-warm-cream px-8 py-4 font-sans-kr font-medium text-sm hover:border-warm-cream inline-flex items-center justify-center min-h-[52px]"
            >
              {t('세일 상품', 'Sale')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="mb-10">
            <p className="font-sans-kr text-xs tracking-[0.2em] text-sage-green uppercase mb-2">{t('추천 제품', 'Featured')}</p>
            <h2 className="font-serif-kr font-semibold text-deep-forest text-3xl">{t('베스트 제품', 'Best Products')}</h2>
          </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse" />
            ))}
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p className="text-center text-muted-foreground font-sans-kr py-12">{t('등록된 제품이 없습니다.', 'No products yet.')}</p>
        )}
      </section>

      {/* Sale Banner */}
      {sale.length > 0 && (
        <section className="bg-light-sage py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="font-sans-kr text-xs tracking-[0.2em] text-dusty-rose uppercase mb-2">{t('한정 할인', 'Limited Sale')}</p>
              <h2 className="font-serif-kr font-semibold text-deep-forest text-3xl">{t('세일 상품', 'On Sale')}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {sale.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🌿', ko: '친환경 소재', en: 'Eco Materials', desc_ko: '자연과 함께하는 지속 가능한 선택', desc_en: 'Sustainable choices with nature' },
            { icon: '🔬', ko: '스마트 기술', en: 'Smart Tech', desc_ko: '최첨단 수경재배 솔루션', desc_en: 'Cutting-edge hydroponic solutions' },
            { icon: '🚚', ko: '빠른 배송', en: 'Fast Shipping', desc_ko: '5만원 이상 무료 배송', desc_en: 'Free shipping over ₩50,000' },
          ].map(v => (
            <div key={v.ko} className="p-8 border border-subtle">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-serif-kr font-semibold text-deep-forest text-lg mb-2">{t(v.ko, v.en)}</h3>
              <p className="font-sans-kr text-sm text-muted-foreground">{t(v.desc_ko, v.desc_en)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
