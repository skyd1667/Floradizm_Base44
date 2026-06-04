import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, RotateCcw,
  TrendingUp, Plus, Eye, X, Check
} from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';

const MOCK_ORDERS_ADMIN = [
  { id: 'o1', order_number: 'FLR-20260527-1001', customer_name: '김민준', total_amount: 189000, order_status: 'pending', created_date: '2026-05-27' },
  { id: 'o2', order_number: 'FLR-20260526-0932', customer_name: '이서연', total_amount: 78000, order_status: 'processing', created_date: '2026-05-26' },
  { id: 'o3', order_number: 'FLR-20260525-0741', customer_name: '박지호', total_amount: 259000, order_status: 'shipped', tracking_number: 'CJ9201847300', created_date: '2026-05-25' },
  { id: 'o4', order_number: 'FLR-20260524-0612', customer_name: '최수아', total_amount: 50000, order_status: 'delivered', created_date: '2026-05-24' },
  { id: 'o5', order_number: 'FLR-20260523-0503', customer_name: '정도윤', total_amount: 145000, order_status: 'delivered', created_date: '2026-05-23' },
];

const MOCK_REFUNDS = [
  { id: 'r1', order_number: 'FLR-20260510-0312', customer_name: '홍길동', reason: 'defect', status: 'pending', refund_amount: 189000, created_date: '2026-05-20' },
  { id: 'r2', order_number: 'FLR-20260501-0211', customer_name: '이지현', reason: 'change_mind', status: 'approved', refund_amount: 42000, created_date: '2026-05-15' },
];

const STATUS_MAP = {
  pending: { ko: '결제 대기', en: 'Pending', bg: 'bg-muted text-muted-foreground' },
  processing: { ko: '처리 중', en: 'Processing', bg: 'bg-light-sage text-sage-green' },
  shipped: { ko: '배송 중', en: 'Shipped', bg: 'bg-blue-50 text-blue-700' },
  delivered: { ko: '배송 완료', en: 'Delivered', bg: 'bg-light-sage text-deep-forest' },
  cancelled: { ko: '취소됨', en: 'Cancelled', bg: 'bg-red-50 text-red-700' },
};

const TABS = [
  { id: 'dashboard', ko: '대시보드', en: 'Dashboard', IconComp: LayoutDashboard },
  { id: 'orders', ko: '주문 관리', en: 'Orders', IconComp: ShoppingCart },
  { id: 'products', ko: '제품 관리', en: 'Products', IconComp: Package },
  { id: 'refunds', ko: '환불 관리', en: 'Refunds', IconComp: RotateCcw },
  { id: 'customers', ko: '고객 관리', en: 'Customers', IconComp: Users },
];

export default function Admin() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('dashboard');
  const [orders, setOrders] = useState(MOCK_ORDERS_ADMIN);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [trackingInput, setTrackingInput] = useState({ tracking_number: '', courier_name: '' });
  const [productSearch, setProductSearch] = useState('');

  const stats = {
    total_revenue: orders.reduce((s, o) => s + o.total_amount, 0),
    total_orders: orders.length,
    processing: orders.filter(o => o.order_status === 'processing').length,
    delivered: orders.filter(o => o.order_status === 'delivered').length,
  };

  const updateOrderStatus = () => {
    setOrders(prev => prev.map(o => o.id === selectedOrder.id
      ? { ...o, order_status: newStatus || o.order_status, ...trackingInput }
      : o
    ));
    setSelectedOrder(null);
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p =>
    p.name_ko.includes(productSearch) || p.name_en?.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-deep-forest min-h-screen flex-shrink-0 hidden md:block">
          <div className="p-5 border-b border-warm-cream/10">
            <div className="font-serif-kr font-semibold text-warm-cream">Floradizm</div>
            <div className="font-sans-kr text-[10px] text-sage-green tracking-widest">관리자 패널</div>
          </div>
          <nav className="p-3 space-y-1">
            {TABS.map(({ id, ko, en, IconComp }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-sans-kr ${
                  tab === id ? 'bg-warm-cream/10 text-warm-cream' : 'text-warm-cream/60 hover:text-warm-cream hover:bg-warm-cream/5'
                }`}>
                <IconComp className="w-4 h-4" />
                {t(ko, en)}
              </button>
            ))}
          </nav>
          <div className="p-3 mt-4 border-t border-warm-cream/10">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm font-sans-kr text-warm-cream/50 hover:text-warm-cream">
              <Eye className="w-4 h-4" />
              {t('스토어 보기', 'View Store')}
            </Link>
          </div>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-deep-forest z-40 flex border-t border-warm-cream/10">
          {TABS.map(({ id, ko, IconComp }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-[10px] font-sans-kr ${tab === id ? 'text-warm-cream' : 'text-warm-cream/50'}`}>
              <IconComp className="w-4 h-4" />
              {ko}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 pb-20 md:pb-6">
          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="font-serif-kr font-semibold text-deep-forest text-2xl mb-6">{t('대시보드', 'Dashboard')}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label_ko: '총 매출', label_en: 'Total Revenue', value: `${stats.total_revenue.toLocaleString()}원`, IconComp: TrendingUp },
                  { label_ko: '전체 주문', label_en: 'Total Orders', value: stats.total_orders, IconComp: ShoppingCart },
                  { label_ko: '처리 중', label_en: 'Processing', value: stats.processing, IconComp: Package },
                  { label_ko: '배송 완료', label_en: 'Delivered', value: stats.delivered, IconComp: Check },
                ].map(s => (
                  <div key={s.label_ko} className="bg-white border border-subtle p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-sans-kr text-xs text-muted-foreground">{t(s.label_ko, s.label_en)}</span>
                      <s.IconComp className="w-4 h-4 text-sage-green" />
                    </div>
                    <p className="font-serif-kr font-semibold text-deep-forest text-2xl">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-subtle">
                <div className="p-4 border-b border-subtle">
                  <h2 className="font-serif-kr font-semibold text-deep-forest">{t('최근 주문', 'Recent Orders')}</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-sans-kr">
                    <thead className="bg-light-sage">
                      <tr>
                        {['주문번호', '고객명', '금액', '상태', '날짜'].map(h => (
                          <th key={h} className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-subtle">
                      {orders.slice(0, 5).map(order => {
                        const status = STATUS_MAP[order.order_status];
                        return (
                          <tr key={order.id} className="hover:bg-light-sage/50">
                            <td className="px-4 py-3 text-deep-forest font-medium text-xs">{order.order_number}</td>
                            <td className="px-4 py-3 text-deep-forest">{order.customer_name}</td>
                            <td className="px-4 py-3 text-deep-forest">{order.total_amount.toLocaleString()}원</td>
                            <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs font-medium ${status?.bg}`}>{t(status?.ko, status?.en)}</span></td>
                            <td className="px-4 py-3 text-muted-foreground text-xs">{order.created_date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {tab === 'orders' && (
            <div>
              <h1 className="font-serif-kr font-semibold text-deep-forest text-2xl mb-6">{t('주문 관리', 'Order Management')}</h1>
              <div className="bg-white border border-subtle overflow-x-auto">
                <table className="w-full text-sm font-sans-kr">
                  <thead className="bg-light-sage">
                    <tr>
                      {['주문번호', '고객명', '금액', '상태', '날짜', '관리'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-subtle">
                    {orders.map(order => {
                      const status = STATUS_MAP[order.order_status];
                      return (
                        <tr key={order.id} className="hover:bg-light-sage/30">
                          <td className="px-4 py-3 text-deep-forest font-medium text-xs">{order.order_number}</td>
                          <td className="px-4 py-3 text-deep-forest">{order.customer_name}</td>
                          <td className="px-4 py-3 text-deep-forest">{order.total_amount.toLocaleString()}원</td>
                          <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs font-medium ${status?.bg}`}>{t(status?.ko, status?.en)}</span></td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{order.created_date}</td>
                          <td className="px-4 py-3">
                            <button onClick={() => { setSelectedOrder(order); setNewStatus(order.order_status); setTrackingInput({ tracking_number: order.tracking_number || '', courier_name: order.courier_name || '' }); }}
                              className="text-xs text-sage-green hover:underline font-medium">
                              {t('수정', 'Edit')}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-forest/40">
                  <div className="bg-warm-cream border border-subtle p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-serif-kr font-semibold text-deep-forest">{selectedOrder.order_number}</h3>
                      <button onClick={() => setSelectedOrder(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-sans-kr text-xs text-muted-foreground mb-1">{t('주문 상태', 'Order Status')}</label>
                        <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                          className="w-full border border-subtle bg-white px-3 py-2 font-sans-kr text-sm focus:outline-none">
                          {Object.entries(STATUS_MAP).map(([k, v]) => (
                            <option key={k} value={k}>{t(v.ko, v.en)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-sans-kr text-xs text-muted-foreground mb-1">{t('택배사', 'Courier')}</label>
                        <input type="text" value={trackingInput.courier_name} onChange={e => setTrackingInput(p => ({ ...p, courier_name: e.target.value }))}
                          className="w-full border border-subtle bg-white px-3 py-2 font-sans-kr text-sm focus:outline-none" placeholder="CJ대한통운" />
                      </div>
                      <div>
                        <label className="block font-sans-kr text-xs text-muted-foreground mb-1">{t('운송장 번호', 'Tracking Number')}</label>
                        <input type="text" value={trackingInput.tracking_number} onChange={e => setTrackingInput(p => ({ ...p, tracking_number: e.target.value }))}
                          className="w-full border border-subtle bg-white px-3 py-2 font-sans-kr text-sm focus:outline-none" />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setSelectedOrder(null)} className="flex-1 border border-subtle py-2 font-sans-kr text-sm">{t('취소', 'Cancel')}</button>
                        <button onClick={updateOrderStatus} className="flex-1 bg-deep-forest text-warm-cream py-2 font-sans-kr font-medium text-sm">{t('저장', 'Save')}</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Products */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-serif-kr font-semibold text-deep-forest text-2xl">{t('제품 관리', 'Product Management')}</h1>
                <button className="bg-deep-forest text-warm-cream px-4 py-2 font-sans-kr text-sm flex items-center gap-2 hover:bg-earthen-charcoal">
                  <Plus className="w-4 h-4" /> {t('제품 추가', 'Add Product')}
                </button>
              </div>
              <div className="mb-4">
                <input type="text" value={productSearch} onChange={e => setProductSearch(e.target.value)}
                  placeholder={t('제품명 검색...', 'Search products...')}
                  className="w-full md:max-w-xs px-4 py-2 border border-subtle bg-white font-sans-kr text-sm focus:outline-none focus:border-sage-green" />
              </div>
              <div className="bg-white border border-subtle overflow-x-auto">
                <table className="w-full text-sm font-sans-kr">
                  <thead className="bg-light-sage">
                    <tr>
                      {['제품명', '카테고리', '가격', '재고', '상태', '관리'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-subtle">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-light-sage/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {product.images?.[0] && <img src={product.images[0]} className="w-8 h-8 object-cover bg-light-sage" alt="" />}
                            <span className="font-medium text-deep-forest text-xs">{product.name_ko}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{product.category}</td>
                        <td className="px-4 py-3 text-deep-forest">{product.price.toLocaleString()}원</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs ${product.stock_quantity <= 10 ? 'text-dusty-rose font-medium' : 'text-deep-forest'}`}>
                            {product.stock_quantity}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 ${product.is_sale ? 'bg-dusty-rose/10 text-dusty-rose' : 'bg-light-sage text-sage-green'}`}>
                            {product.is_sale ? t('세일', 'Sale') : t('정상', 'Normal')}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-xs text-sage-green hover:underline font-medium">{t('수정', 'Edit')}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Refunds */}
          {tab === 'refunds' && (
            <div>
              <h1 className="font-serif-kr font-semibold text-deep-forest text-2xl mb-6">{t('환불 관리', 'Refund Management')}</h1>
              <div className="bg-white border border-subtle">
                <table className="w-full text-sm font-sans-kr">
                  <thead className="bg-light-sage">
                    <tr>
                      {['주문번호', '고객명', '사유', '금액', '상태', '처리'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-subtle">
                    {MOCK_REFUNDS.map(r => (
                      <tr key={r.id} className="hover:bg-light-sage/30">
                        <td className="px-4 py-3 text-xs text-deep-forest font-medium">{r.order_number}</td>
                        <td className="px-4 py-3 text-deep-forest">{r.customer_name}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{r.reason}</td>
                        <td className="px-4 py-3 text-deep-forest">{r.refund_amount.toLocaleString()}원</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 ${r.status === 'approved' ? 'bg-light-sage text-sage-green' : 'bg-muted text-muted-foreground'}`}>
                            {r.status === 'approved' ? t('승인', 'Approved') : t('대기', 'Pending')}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {r.status === 'pending' && (
                            <div className="flex gap-2">
                              <button className="text-xs text-sage-green border border-sage-green px-2 py-0.5 hover:bg-light-sage">{t('승인', 'Approve')}</button>
                              <button className="text-xs text-destructive border border-destructive/30 px-2 py-0.5 hover:bg-red-50">{t('거부', 'Reject')}</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customers */}
          {tab === 'customers' && (
            <div>
              <h1 className="font-serif-kr font-semibold text-deep-forest text-2xl mb-6">{t('고객 관리', 'Customer Management')}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label_ko: '전체 회원', label_en: 'Total Members', value: 142 },
                  { label_ko: '이달 신규', label_en: 'New This Month', value: 23 },
                  { label_ko: '재구매율', label_en: 'Repurchase Rate', value: '38%' },
                ].map(s => (
                  <div key={s.label_ko} className="bg-white border border-subtle p-4">
                    <p className="font-sans-kr text-xs text-muted-foreground mb-1">{t(s.label_ko, s.label_en)}</p>
                    <p className="font-serif-kr font-semibold text-deep-forest text-2xl">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-subtle overflow-x-auto">
                <table className="w-full text-sm font-sans-kr">
                  <thead className="bg-light-sage">
                    <tr>
                      {['이름', '이메일', '주문수', '총 구매액', '가입일'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-subtle">
                    {[
                      { name: '김민준', email: 'minjun@example.com', orders: 3, total: 507000, joined: '2026-01-10' },
                      { name: '이서연', email: 'seoyeon@example.com', orders: 1, total: 78000, joined: '2026-02-15' },
                      { name: '박지호', email: 'jiho@example.com', orders: 2, total: 404000, joined: '2026-01-28' },
                      { name: '최수아', email: 'sua@example.com', orders: 1, total: 50000, joined: '2026-03-01' },
                    ].map(c => (
                      <tr key={c.email} className="hover:bg-light-sage/30">
                        <td className="px-4 py-3 text-deep-forest font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{c.email}</td>
                        <td className="px-4 py-3 text-deep-forest">{c.orders}</td>
                        <td className="px-4 py-3 text-deep-forest font-medium">{c.total.toLocaleString()}원</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{c.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
