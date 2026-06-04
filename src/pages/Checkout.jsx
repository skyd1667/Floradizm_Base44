import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Lock, CreditCard } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useLanguage } from '@/lib/language';

const STEPS = [
  { id: 'address', ko: '배송지', en: 'Shipping' },
  { id: 'payment', ko: '결제', en: 'Payment' },
  { id: 'confirm', ko: '확인', en: 'Confirm' },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState('address');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  const [address, setAddress] = useState({ recipient_name: '', postal_code: '', address1: '', address2: '', city: '', phone: '' });
  const [payment, setPayment] = useState({ card_number: '', expiry: '', cvv: '', name_on_card: '' });
  const [errors, setErrors] = useState({});

  const validateAddress = () => {
    const e = {};
    if (!address.recipient_name) e.recipient_name = t('이름을 입력하세요', 'Name is required');
    if (!address.postal_code || address.postal_code.length !== 5) e.postal_code = t('우편번호 5자리를 입력하세요', 'Enter 5-digit postal code');
    if (!address.address1) e.address1 = t('주소를 입력하세요', 'Address is required');
    if (!address.phone || address.phone.length < 10) e.phone = t('전화번호를 입력하세요', 'Phone number is required');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    const cleaned = payment.card_number.replace(/\s/g, '');
    if (!cleaned || cleaned.length !== 16) e.card_number = t('카드 번호 16자리를 입력하세요', 'Enter 16-digit card number');
    if (!payment.expiry || !/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = t('유효기간 형식: MM/YY', 'Format: MM/YY');
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = t('CVV 3자리를 입력하세요', 'Enter 3-digit CVV');
    if (!payment.name_on_card) e.name_on_card = t('카드 소유자명을 입력하세요', 'Cardholder name required');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatCardNumber = (val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  };

  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  const placeOrder = () => {
    const num = `FLR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 9000) + 1000}`;
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-light-sage rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-sage-green" />
        </div>
        <h2 className="font-serif-kr font-semibold text-deep-forest text-2xl mb-2">{t('주문이 완료되었습니다!', 'Order Placed!')}</h2>
        <p className="font-sans-kr text-muted-foreground text-sm mb-1">{t('주문번호:', 'Order Number:')} <strong className="text-deep-forest">{orderNumber}</strong></p>
        <p className="font-sans-kr text-muted-foreground text-sm mb-8">{t('주문 확인 이메일을 발송했습니다.', 'A confirmation email has been sent.')}</p>

        {/* Upsell */}
        <div className="bg-light-sage border border-subtle p-6 text-left mb-6">
          <p className="font-serif-kr font-semibold text-deep-forest mb-1">{t('이런 제품도 어떠세요?', 'You might also like')}</p>
          <p className="font-sans-kr text-xs text-muted-foreground mb-3">{t('구매 고객을 위한 추천 제품', 'Recommended for buyers like you')}</p>
          <Link to="/shop?category=nutrients" className="text-sm text-sage-green underline font-sans-kr">
            {t('수경재배 영양제 보기 →', 'View Hydroponic Nutrients →')}
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/account?tab=orders" className="bg-earthen-charcoal text-warm-cream py-3 font-sans-kr text-sm text-center hover:bg-deep-forest">
            {t('주문 조회하기', 'Track My Order')}
          </Link>
          <Link to="/shop" className="border border-subtle text-deep-forest py-3 font-sans-kr text-sm text-center hover:border-deep-forest">
            {t('쇼핑 계속하기', 'Continue Shopping')}
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="font-sans-kr text-muted-foreground">{t('장바구니가 비어있습니다.', 'Your cart is empty.')}</p>
        <Link to="/shop" className="mt-4 inline-block text-sage-green underline text-sm">{t('쇼핑하러 가기', 'Go Shopping')}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif-kr font-semibold text-deep-forest text-3xl mb-8">{t('결제', 'Checkout')}</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className={`flex items-center gap-2 ${step === s.id ? 'text-deep-forest' : 'text-muted-foreground'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                STEPS.indexOf(STEPS.find(x => x.id === step)) > i
                  ? 'bg-sage-green text-warm-cream'
                  : step === s.id ? 'bg-deep-forest text-warm-cream' : 'border border-subtle'
              }`}>
                {STEPS.indexOf(STEPS.find(x => x.id === step)) > i ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className="text-sm font-sans-kr hidden sm:block">{t(s.ko, s.en)}</span>
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-border-subtle" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'address' && (
            <div className="space-y-4">
              <h2 className="font-serif-kr font-semibold text-deep-forest text-lg border-b border-subtle pb-3">{t('배송지 정보', 'Shipping Address')}</h2>
              {[
                { key: 'recipient_name', ko: '수령인 이름', en: 'Recipient Name', type: 'text' },
                { key: 'postal_code', ko: '우편번호 (5자리)', en: 'Postal Code (5 digits)', type: 'text' },
                { key: 'address1', ko: '주소', en: 'Address', type: 'text' },
                { key: 'address2', ko: '상세 주소 (선택)', en: 'Address Detail (optional)', type: 'text' },
                { key: 'phone', ko: '연락처', en: 'Phone Number', type: 'tel' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block font-sans-kr text-sm text-deep-forest mb-1">{t(field.ko, field.en)}</label>
                  <input
                    type={field.type}
                    value={address[field.key]}
                    onChange={e => setAddress({ ...address, [field.key]: e.target.value })}
                    className={`w-full px-4 py-2.5 border bg-white font-sans-kr text-sm text-deep-forest focus:outline-none ${
                      errors[field.key] ? 'border-destructive' : 'border-subtle focus:border-sage-green'
                    }`}
                  />
                  {errors[field.key] && <p className="text-xs text-destructive mt-1 font-sans-kr">{errors[field.key]}</p>}
                </div>
              ))}
              <button onClick={() => { if (validateAddress()) setStep('payment'); }}
                className="w-full bg-earthen-charcoal text-warm-cream py-3 font-sans-kr font-medium hover:bg-deep-forest">
                {t('결제 정보 입력하기', 'Continue to Payment')}
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <h2 className="font-serif-kr font-semibold text-deep-forest text-lg border-b border-subtle pb-3">{t('카드 정보', 'Card Information')}</h2>
              <div className="bg-light-sage border border-subtle px-4 py-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-sage-green" />
                <p className="font-sans-kr text-xs text-muted-foreground">{t('모든 결제 정보는 TLS 암호화로 안전하게 보호됩니다.', 'All payment data is secured with TLS encryption.')}</p>
              </div>
              {[
                { key: 'name_on_card', ko: '카드 소유자명', en: 'Name on Card' },
                { key: 'card_number', ko: '카드 번호', en: 'Card Number', format: formatCardNumber, placeholder: '0000 0000 0000 0000' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block font-sans-kr text-sm text-deep-forest mb-1">{t(field.ko, field.en)}</label>
                  <input
                    type="text"
                    value={payment[field.key]}
                    placeholder={field.placeholder}
                    onChange={e => setPayment({ ...payment, [field.key]: field.format ? field.format(e.target.value) : e.target.value })}
                    className={`w-full px-4 py-2.5 border bg-white font-sans-kr text-sm focus:outline-none ${
                      errors[field.key] ? 'border-destructive' : 'border-subtle focus:border-sage-green'
                    }`}
                  />
                  {errors[field.key] && <p className="text-xs text-destructive mt-1 font-sans-kr">{errors[field.key]}</p>}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans-kr text-sm text-deep-forest mb-1">{t('유효기간', 'Expiry Date')}</label>
                  <input type="text" value={payment.expiry} placeholder="MM/YY"
                    onChange={e => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                    className={`w-full px-4 py-2.5 border bg-white font-sans-kr text-sm focus:outline-none ${errors.expiry ? 'border-destructive' : 'border-subtle focus:border-sage-green'}`} />
                  {errors.expiry && <p className="text-xs text-destructive mt-1 font-sans-kr">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block font-sans-kr text-sm text-deep-forest mb-1">CVV</label>
                  <input type="text" value={payment.cvv} placeholder="000" maxLength={4}
                    onChange={e => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '') })}
                    className={`w-full px-4 py-2.5 border bg-white font-sans-kr text-sm focus:outline-none ${errors.cvv ? 'border-destructive' : 'border-subtle focus:border-sage-green'}`} />
                  {errors.cvv && <p className="text-xs text-destructive mt-1 font-sans-kr">{errors.cvv}</p>}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('address')} className="flex-1 border border-subtle text-deep-forest py-3 font-sans-kr text-sm hover:border-deep-forest">
                  {t('이전', 'Back')}
                </button>
                <button onClick={() => { if (validatePayment()) setStep('confirm'); }}
                  className="flex-1 bg-earthen-charcoal text-warm-cream py-3 font-sans-kr font-medium hover:bg-deep-forest">
                  {t('주문 확인', 'Review Order')}
                </button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <h2 className="font-serif-kr font-semibold text-deep-forest text-lg border-b border-subtle pb-3">{t('주문 확인', 'Order Review')}</h2>
              <div className="border border-subtle divide-y divide-subtle">
                <div className="p-4">
                  <h3 className="font-sans-kr text-sm font-medium text-deep-forest mb-2">{t('배송지', 'Delivery Address')}</h3>
                  <p className="font-sans-kr text-sm text-muted-foreground">{address.recipient_name} · {address.phone}</p>
                  <p className="font-sans-kr text-sm text-muted-foreground">[{address.postal_code}] {address.address1} {address.address2}</p>
                </div>
                <div className="p-4">
                  <h3 className="font-sans-kr text-sm font-medium text-deep-forest mb-2">{t('결제 수단', 'Payment Method')}</h3>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <p className="font-sans-kr text-sm text-muted-foreground">**** **** **** {payment.card_number.slice(-4)}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('payment')} className="flex-1 border border-subtle text-deep-forest py-3 font-sans-kr text-sm hover:border-deep-forest">
                  {t('이전', 'Back')}
                </button>
                <button onClick={placeOrder} className="flex-1 bg-earthen-charcoal text-warm-cream py-3 font-sans-kr font-medium hover:bg-deep-forest flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t('결제 완료', 'Place Order')} — {total.toLocaleString()}원
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-subtle p-5 sticky top-24">
            <h3 className="font-serif-kr font-semibold text-deep-forest mb-4">{t('주문 요약', 'Order Summary')}</h3>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.product_id} className="flex gap-3">
                  <div className="w-12 h-12 bg-light-sage overflow-hidden shrink-0">
                    {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans-kr text-xs text-deep-forest font-medium line-clamp-2">{item.name_ko}</p>
                    <p className="font-sans-kr text-xs text-muted-foreground">× {item.quantity}</p>
                  </div>
                  <p className="font-sans-kr text-xs font-medium text-deep-forest shrink-0">{(item.price * item.quantity).toLocaleString()}원</p>
                </div>
              ))}
            </div>
            <div className="border-t border-subtle pt-3 space-y-1 text-sm font-sans-kr">
              <div className="flex justify-between text-muted-foreground">
                <span>{t('소계', 'Subtotal')}</span><span>{subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t('배송비', 'Shipping')}</span>
                <span>{shippingFee === 0 ? t('무료', 'Free') : `${shippingFee.toLocaleString()}원`}</span>
              </div>
              <div className="flex justify-between text-deep-forest font-semibold pt-2 border-t border-subtle">
                <span>{t('합계', 'Total')}</span><span>{total.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
