import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useLanguage } from '@/lib/language';
import FlowerButton from '@/components/FlowerButton';

export default function ProductCard({ product, size = 'normal' }) {
  const { addItem } = useCart();
  const { t } = useLanguage();

  const discountedPrice = product.is_sale && product.discount_percent
    ? Math.round(product.price * (1 - product.discount_percent / 100))
    : product.price;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addItem({ ...product, price: discountedPrice });
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {/* Image container */}
      <div className={`relative overflow-hidden bg-light-sage ${size === 'large' ? 'aspect-[3/4]' : 'aspect-square'}`}>
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={t(product.name_ko, product.name_en)}
            className="w-full h-full object-cover group-hover:scale-[1.02]"
            style={{ transition: 'transform 100ms ease' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-8 h-8" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.is_sale && (
            <span className="bg-dusty-rose text-warm-cream text-[11px] font-sans-kr font-medium px-2 py-0.5">
              {product.discount_percent}% {t('할인', 'OFF')}
            </span>
          )}
          {product.stock_quantity <= 10 && product.stock_quantity > 0 && (
            <span className="bg-earthen-charcoal text-warm-cream text-[11px] font-sans-kr px-2 py-0.5">
              {t('품절 임박', 'Low Stock')}
            </span>
          )}
          {product.stock_quantity === 0 && (
            <span className="bg-muted text-muted-foreground text-[11px] font-sans-kr px-2 py-0.5">
              {t('품절', 'Sold Out')}
            </span>
          )}
        </div>

        {/* Quick add - shows on hover */}
        {product.stock_quantity > 0 && (
          <FlowerButton
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 bg-earthen-charcoal/95 text-warm-cream py-3 text-sm font-sans-kr font-medium
              opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0"
            style={{ transition: 'all 100ms ease' }}
          >
            {t('장바구니 담기', 'Quick Add')}
          </FlowerButton>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <h3 className="font-sans-kr text-sm text-deep-forest font-medium line-clamp-2 leading-snug">
          {t(product.name_ko, product.name_en)}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-sage-green fill-sage-green" />
            <span className="text-xs text-muted-foreground font-sans-kr">{product.rating} ({product.review_count})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-sans-kr font-semibold text-deep-forest text-sm">{discountedPrice.toLocaleString()}원</span>
          {product.is_sale && product.original_price && (
            <span className="font-sans-kr text-xs text-muted-foreground line-through">{product.original_price.toLocaleString()}원</span>
          )}
        </div>
      </div>
    </Link>
  );
}
