import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ScrollToTop from '@/components/ScrollToTop';
import GlobalFlowerEffect from '@/components/GlobalFlowerEffect';

export default function Layout() {
  return (
    <div className="min-h-screen bg-warm-cream flex flex-col">
      <ScrollToTop />
      <GlobalFlowerEffect />
      <Navbar />
      <main className="flex-1 pt-[113px] md:pt-[113px]">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
