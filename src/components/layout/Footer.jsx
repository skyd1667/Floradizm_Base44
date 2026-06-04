import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/language';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-deep-forest text-warm-cream mt-24">
      {/* Botanical decoration line */}
      <div className="h-px bg-sage-green/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="https://media.base44.com/images/public/6a167d1fd7ad42c5f616d796/e7f28b383_55916c5e-975c-414c-a41f-28d45faa82b8.png" alt="Floradizm" className="w-9 h-9 object-contain brightness-0 invert" />
              <div>
                <div className="font-serif-kr font-semibold text-warm-cream text-lg">Floradizm</div>
                <div className="font-sans-kr text-[10px] text-sage-green tracking-widest">플로라디즘</div>
              </div>
            </div>
            <p className="text-sm text-warm-cream/60 font-sans-kr leading-relaxed">
              {t('스마트 홈 플랜테이션의 새로운 기준. 기술과 자연이 만나는 곳.', 'The new standard in smart home plantation. Where technology meets nature.')}
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/floradizm_official/" target="_blank" rel="noopener noreferrer" className="p-2.5 border border-warm-cream/20 hover:border-sage-green text-warm-cream/60 hover:text-sage-green min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:aismshanekim@gmail.com" className="p-2.5 border border-warm-cream/20 hover:border-sage-green text-warm-cream/60 hover:text-sage-green min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-serif-kr font-semibold text-warm-cream mb-4 text-sm tracking-wider uppercase">
              {t('쇼핑', 'Shop')}
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/shop', ko: '전체 상품', en: 'Products' },
                { to: '/shop?sale=true', ko: '세일', en: 'Sale' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-warm-cream/60 hover:text-warm-cream font-sans-kr py-1.5 inline-block">
                    {t(l.ko, l.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif-kr font-semibold text-warm-cream mb-4 text-sm tracking-wider uppercase">
              {t('고객 서비스', 'Customer Service')}
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/account', ko: '내 계정', en: 'My Account' },
                { to: '/account?tab=orders', ko: '주문 조회', en: 'My Orders' },
                { to: '/account?tab=refunds', ko: '반품 / 환불', en: 'Returns & Refunds' },
                { to: '/shipping-policy', ko: '배송 정책', en: 'Shipping Policy' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-warm-cream/60 hover:text-warm-cream font-sans-kr py-1.5 inline-block">
                    {t(l.ko, l.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="font-serif-kr font-semibold text-warm-cream mb-4 text-sm tracking-wider uppercase">
              {t('사업자 정보', 'Business Info')}
            </h4>
            <ul className="space-y-1 text-xs text-warm-cream/50 font-sans-kr">
              <li>{t('상호명: 플로라디즘 (Floradizm)', 'Business: Floradizm (플로라디즘)')}</li>
              <li>{t('대표: Kim Shane', 'CEO: Kim Shane')}</li>
              <li>{t('연락처: 010-9547-5270', 'Contact: +82 10-9547-5270')}</li>
              <li>{t('이메일: aismshanekim@gmail.com', 'Email: aismshanekim@gmail.com')}</li>
              <li className="pt-2">{t('통신판매업: 신고 예정', 'E-commerce Registration: Pending')}</li>
              <li>{t('사업자등록번호: 등록 예정', 'Business Reg. No.: Pending')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-warm-cream/40 font-sans-kr">
            © 2026 Floradizm (플로라디즘). {t('모든 권리 보유.', 'All rights reserved.')}
          </p>
          <div className="flex gap-4 text-xs text-warm-cream/40 font-sans-kr">
            <Link to="/privacy-policy" className="hover:text-warm-cream/70">{t('개인정보처리방침', 'Privacy Policy')}</Link>
            <Link to="/shipping-policy" className="hover:text-warm-cream/70">{t('배송 정책', 'Shipping Policy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
