import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/language';
import { User, Package, MapPin, RotateCcw, LogOut } from 'lucide-react';

const ORDER_STATUS = {
  pending: { ko: '결제 대기', en: 'Pending', color: 'text-muted-foreground' },
  processing: { ko: '처리 중', en: 'Processing', color: 'text-sage-green' },
  shipped: { ko: '배송 중', en: 'Shipped', color: 'text-blue-600' },
  delivered: { ko: '배송 완료', en: 'Delivered', color: 'text-deep-forest' },
  cancelled: { ko: '취소됨', en: 'Cancelled', color: 'text-destructive' },
};

const TABS = [
  { id: 'profile', ko: '내 정보', en: 'Profile', icon: User },
  { id: 'orders', ko: '주문 내역', en: 'Orders', icon: Package },
  { id: 'addresses', ko: '배송지', en: 'Addresses', icon: MapPin },
  { id: 'refunds', ko: '환불 요청', en: 'Refunds', icon: RotateCcw },
];

export default function Account() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const [tab, setTab] = useState(params.get('tab') || 'profile');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (!authed) { navigate('/login'); return; }
      const me = await base44.auth.me();
      setUser(me);
      const [ord, addr, ref] = await Promise.all([
        base44.entities.Order.filter({ customer_id: me.id }, '-created_date', 50),
        base44.entities.Address.filter({ user_id: me.id }),
        base44.entities.RefundRequest.filter({ customer_id: me.id }, '-created_date', 20),
      ]);
      setOrders(ord);
      setAddresses(addr);
      setRefunds(ref);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => base44.auth.logout('/');

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-border-subtle border-t-sage-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif-kr font-semibold text-deep-forest text-3xl">{t('내 계정', 'My Account')}</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 font-sans-kr text-sm text-muted-foreground hover:text-destructive">
          <LogOut className="w-4 h-4" />{t('로그아웃', 'Logout')}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-48 shrink-0">
          <nav className="space-y-1">
            {TABS.map(({ id, ko, en, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-sans-kr ${
                  tab === id ? 'bg-light-sage text-deep-forest font-medium' : 'text-muted-foreground hover:text-deep-forest'
                }`}>
                <Icon className="w-4 h-4" />{t(ko, en)}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {/* Profile */}
          {tab === 'profile' && (
            <div className="border border-subtle p-6">
              <h2 className="font-serif-kr font-semibold text-deep-forest mb-4">{t('내 정보', 'Profile')}</h2>
              <dl className="space-y-3 font-sans-kr text-sm">
                <div className="flex gap-4">
                  <dt className="text-muted-foreground w-24">{t('이름', 'Name')}</dt>
                  <dd className="text-deep-forest">{user?.full_name || '-'}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-muted-foreground w-24">{t('이메일', 'Email')}</dt>
                  <dd className="text-deep-forest">{user?.email || '-'}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Orders */}
          {tab === 'orders' && (
            <div>
              <h2 className="font-serif-kr font-semibold text-deep-forest mb-4">{t('주문 내역', 'My Orders')}</h2>
              {orders.length === 0 ? (
                <div className="border border-subtle p-8 text-center">
                  <p className="font-sans-kr text-sm text-muted-foreground">{t('주문 내역이 없습니다.', 'No orders yet.')}</p>
                  <Link to="/shop" className="text-sage-green underline text-sm font-sans-kr mt-3 inline-block">{t('쇼핑하러 가기', 'Start Shopping')}</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => {
                    const status = ORDER_STATUS[order.order_status] || ORDER_STATUS.pending;
                    return (
                      <div key={order.id} className="border border-subtle p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-sans-kr font-medium text-deep-forest text-sm">{order.order_number}</p>
                            <p className="font-sans-kr text-xs text-muted-foreground">{order.created_date?.slice(0, 10)}</p>
                          </div>
                          <span className={`font-sans-kr text-xs font-medium ${status.color}`}>{t(status.ko, status.en)}</span>
                        </div>
                        <div className="space-y-1 mb-3">
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex justify-between font-sans-kr text-xs text-muted-foreground">
                              <span>{item.product_name_ko} × {item.quantity}</span>
                              <span>{item.total_price?.toLocaleString()}원</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between border-t border-subtle pt-2 font-sans-kr text-sm">
                          <span className="text-muted-foreground">{t('합계', 'Total')}</span>
                          <span className="font-semibold text-deep-forest">{order.total_amount?.toLocaleString()}원</span>
                        </div>
                        {order.tracking_number && (
                          <p className="font-sans-kr text-xs text-sage-green mt-2">{t('운송장', 'Tracking')}: {order.courier_name} {order.tracking_number}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Addresses */}
          {tab === 'addresses' && (
            <div>
              <h2 className="font-serif-kr font-semibold text-deep-forest mb-4">{t('배송지 목록', 'My Addresses')}</h2>
              {addresses.length === 0 ? (
                <div className="border border-subtle p-8 text-center">
                  <p className="font-sans-kr text-sm text-muted-foreground">{t('저장된 배송지가 없습니다.', 'No saved addresses.')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <div key={addr.id} className="border border-subtle p-4 font-sans-kr text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-deep-forest">{addr.label || t('배송지', 'Address')}</span>
                        {addr.is_default && <span className="text-xs bg-light-sage text-sage-green px-1.5 py-0.5">{t('기본', 'Default')}</span>}
                      </div>
                      <p className="text-deep-forest">{addr.recipient_name} · {addr.phone}</p>
                      <p className="text-muted-foreground">[{addr.postal_code}] {addr.address1} {addr.address2}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Refunds */}
          {tab === 'refunds' && (
            <div>
              <h2 className="font-serif-kr font-semibold text-deep-forest mb-4">{t('환불 요청 내역', 'Refund Requests')}</h2>
              {refunds.length === 0 ? (
                <div className="border border-subtle p-8 text-center">
                  <p className="font-sans-kr text-sm text-muted-foreground">{t('환불 요청 내역이 없습니다.', 'No refund requests.')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {refunds.map(r => (
                    <div key={r.id} className="border border-subtle p-4 font-sans-kr text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-deep-forest">{t('주문번호', 'Order')}: {r.order_id}</span>
                        <span className={`text-xs font-medium ${r.status === 'approved' ? 'text-sage-green' : r.status === 'rejected' ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {r.status === 'approved' ? t('승인', 'Approved') : r.status === 'rejected' ? t('거부', 'Rejected') : t('검토 중', 'Pending')}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{r.reason}</p>
                      {r.admin_note && <p className="text-deep-forest mt-1 border-t border-subtle pt-1">{r.admin_note}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
