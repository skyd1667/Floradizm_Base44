import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useLanguage } from '@/lib/language';

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-warm-cream border-b border-subtle' : 'bg-warm-cream/90 backdrop-blur-sm'}`}>
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="https://media.base44.com/images/public/6a167d1fd7ad42c5f616d796/e7f28b383_55916c5e-975c-414c-a41f-28d45faa82b8.png" alt="Floradizm" className="w-9 h-9 object-contain" />
              <div>
                <div className="font-serif-kr font-semibold text-deep-forest text-lg leading-none tracking-wide">Floradizm</div>
                <div className="font-sans-kr text-[10px] text-sage-green tracking-widest">플로라디즘</div>
              </div>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button onClick={toggleLang} className="px-3 py-2 text-xs font-sans-kr font-medium text-muted-foreground hover:text-deep-forest border border-subtle hover:border-deep-forest min-h-[44px] min-w-[44px]">
                {lang === 'ko' ? 'EN' : 'KO'}
              </button>
              <Link to="/account" className="p-3 text-deep-forest hover:text-sage-green min-h-[44px] min-w-[44px] flex items-center justify-center">
                <User className="w-5 h-5" />
              </Link>
              <button onClick={() => setIsOpen(true)} className="p-3 text-deep-forest hover:text-sage-green relative min-h-[44px] min-w-[44px] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-deep-forest text-warm-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-3 text-deep-forest min-h-[44px] min-w-[44px] flex items-center justify-center">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Category nav - desktop */}
        <div className="hidden md:block border-t border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-0">
              <Link to="/shop" className="px-5 py-3 text-sm font-sans-kr text-deep-forest hover:text-sage-green border-b-2 border-transparent hover:border-sage-green font-medium">
                {t('전체 상품', 'Products')}
              </Link>
              <Link to="/shop?sale=true" className="px-5 py-3 text-sm font-sans-kr text-dusty-rose hover:text-dusty-rose border-b-2 border-transparent hover:border-dusty-rose font-medium">
                {t('세일', 'Sale')}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-warm-cream pt-16 overflow-y-auto">
          <div className="p-6 space-y-1">
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-base font-sans-kr text-deep-forest border-b border-subtle font-medium min-h-[52px] flex items-center">{t('전체 상품', 'Products')}</Link>
            <Link to="/shop?sale=true" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-base font-sans-kr text-dusty-rose font-medium border-b border-subtle min-h-[52px] flex items-center">{t('세일', 'Sale')}</Link>
            <div className="pt-2">
              <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-base font-sans-kr text-deep-forest border-b border-subtle min-h-[52px] flex items-center">{t('내 계정', 'My Account')}</Link>
              <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-sm font-sans-kr text-muted-foreground border-b border-subtle min-h-[52px] flex items-center">{t('개인정보처리방침', 'Privacy Policy')}</Link>
              <Link to="/shipping-policy" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-sm font-sans-kr text-muted-foreground min-h-[52px] flex items-center">{t('배송 정책', 'Shipping Policy')}</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
