import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/language';
import { useCart } from '@/lib/cart';
import FlowerButton from '@/components/FlowerButton';
import { ShoppingBag, Star, ChevronLeft, Minus, Plus } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    base44.entities.Product.filter({ id })
      .then(res => setProduct(res[0] || null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-border-subtle border-t-sage-green rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="font-sans-kr text-muted-foreground">{t('제품을 찾을 수 없습니다.', 'Product not found.')}</p>
        <Link to="/shop" className="text-sage-green underline text-sm font-sans-kr mt-4 inline-block">{t('쇼핑 계속하기', 'Back to Shop')}</Link>
      </div>
    );
  }

  const discountedPrice = product.is_sale && product.discount_percent
    ? Math.round(product.price * (1 - product.discount_percent / 100))
    : product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem({ ...product, price: discountedPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 font-sans-kr text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-deep-forest flex items-center gap-1">
          <ChevronLeft className="w-3 h-3" />{t('전체 상품', 'Products')}
        </Link>
        <span>/</span>
        <span className="text-deep-forest">{t(product.name_ko, product.name_en)}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square bg-light-sage overflow-hidden mb-3">
            {product.images?.[selectedImage] ? (
              <img src={product.images[selectedImage]} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-12 h-12" />
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 border overflow-hidden ${selectedImage === i ? 'border-deep-forest' : 'border-subtle'} min-h-[44px] min-w-[44px]`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.is_sale && (
            <span className="inline-block bg-dusty-rose text-warm-cream text-xs font-sans-kr px-2 py-0.5 mb-3">
              {product.discount_percent}% {t('할인', 'OFF')}
            </span>
          )}
          <h1 className="font-serif-kr font-semibold text-deep-forest text-3xl mb-2">
            {t(product.name_ko, product.name_en)}
          </h1>

          {product.rating && (
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-sage-green fill-sage-green' : 'text-border-subtle'}`} />
              ))}
              <span className="font-sans-kr text-xs text-muted-foreground ml-1">({product.review_count})</span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-serif-kr font-semibold text-deep-forest text-3xl">{discountedPrice.toLocaleString()}원</span>
            {product.is_sale && product.original_price && (
              <span className="font-sans-kr text-muted-foreground line-through">{product.original_price.toLocaleString()}원</span>
            )}
          </div>

          {product.description_ko && (
            <p className="font-sans-kr text-sm text-muted-foreground leading-relaxed mb-6">
              {t(product.description_ko, product.description_en)}
            </p>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans-kr text-sm text-deep-forest">{t('수량', 'Qty')}</span>
            <div className="flex items-center border border-subtle">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-light-sage">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-sans-kr text-sm text-deep-forest">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock_quantity, q + 1))} className="w-11 h-11 flex items-center justify-center hover:bg-light-sage">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="font-sans-kr text-xs text-muted-foreground">{t('재고', 'Stock')}: {product.stock_quantity}</span>
          </div>

          {product.stock_quantity > 0 ? (
            <FlowerButton
              onClick={handleAddToCart}
              className="w-full bg-earthen-charcoal text-warm-cream py-5 font-sans-kr font-medium text-base hover:bg-deep-forest"
            >
              {added ? t('담겼습니다! ✓', 'Added! ✓') : t('장바구니 담기', 'Add to Cart')}
            </FlowerButton>
          ) : (
            <div className="w-full bg-muted text-muted-foreground py-4 text-center font-sans-kr text-sm">
              {t('품절', 'Sold Out')}
            </div>
          )}

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-8 border-t border-subtle pt-6">
              <h3 className="font-serif-kr font-semibold text-deep-forest mb-3">{t('제품 사양', 'Specifications')}</h3>
              <dl className="space-y-2">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex gap-4 text-sm font-sans-kr">
                    <dt className="text-muted-foreground w-32 shrink-0">{k}</dt>
                    <dd className="text-deep-forest">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
