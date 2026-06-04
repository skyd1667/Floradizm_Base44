import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useLanguage } from '@/lib/language';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCart();
  const { t } = useLanguage();

  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-deep-forest/30 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-warm-cream shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-subtle">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-deep-forest" />
            <h2 className="font-serif-kr font-semibold text-deep-forest">{t('장바구니', 'Cart')}</h2>
            {items.length > 0 && <span className="text-xs text-muted-foreground">({items.length})</span>}
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground hover:text-deep-forest min-h-[44px] min-w-[44px] flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-border-subtle mb-4" />
              <p className="font-sans-kr text-muted-foreground text-sm">{t('장바구니가 비어있습니다', 'Your cart is empty')}</p>
              <Link to="/shop" onClick={() => setIsOpen(false)} className="mt-4 inline-block text-sm text-sage-green underline font-sans-kr">{t('쇼핑 계속하기', 'Continue Shopping')}</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.product_id} className="flex gap-3 py-3 border-b border-subtle">
                  <div className="w-16 h-16 bg-light-sage shrink-0 overflow-hidden">
                    {item.image && <img src={item.image} alt={item.name_ko} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans-kr text-sm text-deep-forest font-medium line-clamp-2">{t(item.name_ko, item.name_en)}</p>
                    <p className="font-sans-kr text-sm text-sage-green mt-0.5">{item.price.toLocaleString()}원</p>
                    <div className="flex items-center gap-1 mt-2">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-11 h-11 border border-subtle flex items-center justify-center hover:border-deep-forest">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-11 h-11 border border-subtle flex items-center justify-center hover:border-deep-forest">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product_id)} className="p-2 text-muted-foreground hover:text-destructive shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-subtle space-y-3">
            <div className="space-y-1 text-sm font-sans-kr">
              <div className="flex justify-between text-muted-foreground">
                <span>{t('소계', 'Subtotal')}</span>
                <span>{subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t('배송비', 'Shipping')}</span>
                <span>{shippingFee === 0 ? t('무료', 'Free') : `${shippingFee.toLocaleString()}원`}</span>
              </div>
              {shippingFee > 0 && (
                <p className="text-xs text-sage-green">{t(`${(50000 - subtotal).toLocaleString()}원 더 구매하면 무료배송!`, `Add ${(50000 - subtotal).toLocaleString()}KRW for free shipping!`)}</p>
              )}
              <div className="flex justify-between text-deep-forest font-semibold pt-1 border-t border-subtle">
                <span>{t('합계', 'Total')}</span>
                <span>{total.toLocaleString()}원</span>
              </div>
            </div>
            <Link to="/checkout" onClick={() => setIsOpen(false)}
              className="block w-full bg-earthen-charcoal text-warm-cream py-4 text-center text-sm font-sans-kr font-medium hover:bg-deep-forest">
              {t('결제하기', 'Proceed to Checkout')}
            </Link>
            <button onClick={() => setIsOpen(false)}
              className="block w-full border border-subtle text-deep-forest py-4 text-center text-sm font-sans-kr hover:border-deep-forest min-h-[44px]">
              {t('쇼핑 계속하기', 'Continue Shopping')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
