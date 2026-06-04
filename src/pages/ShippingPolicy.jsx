import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language';

export default function ShippingPolicy() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-sans-kr text-muted-foreground hover:text-deep-forest mb-8">
        <ArrowLeft className="w-4 h-4" />
        {t('홈으로', 'Home')}
      </Link>

      <h1 className="font-serif-kr font-semibold text-deep-forest text-3xl md:text-4xl mb-2">
        {t('배송 정책', 'Shipping Policy')}
      </h1>
      <p className="font-sans-kr text-sm text-muted-foreground mb-10">{t('시행일: 2026년 6월 1일', 'Effective: June 1, 2026')}</p>

      <div className="space-y-10">

        {/* 배송비 */}
        <div className="border-b border-subtle pb-8">
          <h2 className="font-serif-kr font-semibold text-deep-forest text-lg mb-4">{t('배송비', 'Shipping Fees')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full font-sans-kr text-sm border border-subtle">
              <thead>
                <tr className="bg-light-sage">
                  <th className="text-left px-4 py-3 border-b border-subtle text-deep-forest font-semibold">{t('주문 금액', 'Order Amount')}</th>
                  <th className="text-left px-4 py-3 border-b border-subtle text-deep-forest font-semibold">{t('배송비', 'Shipping Fee')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border-b border-subtle text-deep-forest/80">{t('5만원 미만', 'Under ₩50,000')}</td>
                  <td className="px-4 py-3 border-b border-subtle text-deep-forest/80">{t('3,000원', '₩3,000')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-deep-forest/80">{t('5만원 이상', '₩50,000 or more')}</td>
                  <td className="px-4 py-3 text-sage-green font-semibold">{t('무료', 'Free')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-sans-kr text-xs text-muted-foreground mt-3">
            {t('* 도서·산간 지역은 추가 배송비가 부과될 수 있습니다.', '* Additional fees may apply to remote/island areas.')}
          </p>
        </div>

        {/* 배송 방법 */}
        <div className="border-b border-subtle pb-8">
          <h2 className="font-serif-kr font-semibold text-deep-forest text-lg mb-4">{t('배송 방법', 'Delivery Method')}</h2>
          <div className="font-sans-kr text-sm text-deep-forest/80 leading-relaxed space-y-2">
            <p>{t('• 택배 배송 (CJ대한통운, 롯데택배 등 국내 주요 택배사 이용)', '• Courier delivery via major domestic carriers (CJ Logistics, Lotte, etc.)')}</p>
            <p>{t('• 배송은 결제 완료 후 영업일 기준 1~3일 이내 출고됩니다.', '• Orders are shipped within 1–3 business days after payment confirmation.')}</p>
            <p>{t('• 출고 후 통상 1~2일 이내 수령 가능합니다.', '• Delivery typically arrives within 1–2 days after dispatch.')}</p>
          </div>
        </div>

        {/* 배송 기간 */}
        <div className="border-b border-subtle pb-8">
          <h2 className="font-serif-kr font-semibold text-deep-forest text-lg mb-4">{t('배송 기간', 'Delivery Timeline')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '01', ko: '주문 및 결제', en: 'Order & Payment', desc_ko: '주문 완료 즉시 처리 시작', desc_en: 'Processing begins immediately' },
              { step: '02', ko: '출고 준비', en: 'Packaging', desc_ko: '영업일 1~3일 이내 출고', desc_en: '1–3 business days to dispatch' },
              { step: '03', ko: '배송 완료', en: 'Delivered', desc_ko: '출고 후 1~2일 이내 도착', desc_en: '1–2 days after dispatch' },
            ].map(item => (
              <div key={item.step} className="p-4 bg-light-sage text-center">
                <div className="font-serif-kr text-sage-green text-2xl font-semibold mb-2">{item.step}</div>
                <div className="font-sans-kr text-sm font-semibold text-deep-forest mb-1">{t(item.ko, item.en)}</div>
                <div className="font-sans-kr text-xs text-muted-foreground">{t(item.desc_ko, item.desc_en)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 배송 조회 */}
        <div className="border-b border-subtle pb-8">
          <h2 className="font-serif-kr font-semibold text-deep-forest text-lg mb-4">{t('배송 조회', 'Tracking')}</h2>
          <div className="font-sans-kr text-sm text-deep-forest/80 leading-relaxed space-y-2">
            <p>{t('상품 출고 후 SMS 또는 이메일로 운송장 번호가 발송됩니다.', 'A tracking number will be sent via SMS or email after dispatch.')}</p>
            <p>{t('마이페이지 > 주문 조회에서 배송 현황을 확인하실 수 있습니다.', 'You can check delivery status in My Account > Orders.')}</p>
            <Link to="/account?tab=orders" className="inline-block mt-2 text-sage-green underline text-sm font-sans-kr">
              {t('주문 조회 바로가기 →', 'Go to My Orders →')}
            </Link>
          </div>
        </div>

        {/* 반품 / 교환 */}
        <div className="border-b border-subtle pb-8">
          <h2 className="font-serif-kr font-semibold text-deep-forest text-lg mb-4">{t('반품 및 교환', 'Returns & Exchanges')}</h2>
          <div className="font-sans-kr text-sm text-deep-forest/80 leading-relaxed space-y-3">
            <div className="p-4 bg-light-sage">
              <p className="font-semibold text-deep-forest mb-2">{t('반품/교환 가능 기간', 'Return/Exchange Period')}</p>
              <p>{t('상품 수령일로부터 7일 이내 (단순 변심의 경우)', 'Within 7 days of receipt (change of mind)')}</p>
              <p>{t('상품 하자의 경우 수령일로부터 30일 이내', 'Within 30 days for defective items')}</p>
            </div>
            <div>
              <p className="font-semibold text-deep-forest mb-2">{t('반품/교환 불가 사유', 'Non-returnable Conditions')}</p>
              <ul className="space-y-1 list-disc list-inside text-deep-forest/80">
                <li>{t('고객 부주의로 인한 상품 손상', 'Damage caused by customer negligence')}</li>
                <li>{t('사용 또는 일부 소비된 상품', 'Used or partially consumed products')}</li>
                <li>{t('포장이 훼손된 상품 (위생 상품 등)', 'Opened packaging (hygiene products, etc.)')}</li>
                <li>{t('맞춤 제작 상품', 'Customized or personalized items')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 반품 배송비 */}
        <div className="border-b border-subtle pb-8">
          <h2 className="font-serif-kr font-semibold text-deep-forest text-lg mb-4">{t('반품 배송비', 'Return Shipping Cost')}</h2>
          <div className="font-sans-kr text-sm text-deep-forest/80 leading-relaxed space-y-2">
            <p>{t('• 단순 변심: 왕복 배송비 고객 부담 (6,000원)', '• Change of mind: Customer bears round-trip shipping (₩6,000)')}</p>
            <p>{t('• 상품 하자 또는 오배송: 회사 부담', '• Defective item or wrong delivery: Company bears cost')}</p>
          </div>
        </div>

        {/* 문의 */}
        <div className="p-6 bg-light-sage">
          <h3 className="font-serif-kr font-semibold text-deep-forest mb-3">{t('배송 문의', 'Shipping Enquiries')}</h3>
          <div className="font-sans-kr text-sm text-deep-forest/80 space-y-1">
            <p>{t('이메일: aismshanekim@gmail.com', 'Email: aismshanekim@gmail.com')}</p>
            <p>{t('전화: 010-9547-5270', 'Phone: +82 10-9547-5270')}</p>
            <p className="text-xs text-muted-foreground mt-2">{t('영업일 기준 24시간 이내 답변 드립니다.', 'We respond within 24 business hours.')}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
