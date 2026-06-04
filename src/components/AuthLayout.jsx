import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      {/* Top nav */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-subtle">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://media.base44.com/images/public/6a167d1fd7ad42c5f616d796/e7f28b383_55916c5e-975c-414c-a41f-28d45faa82b8.png" alt="Floradizm" className="w-8 h-8 object-contain" />
          <div>
            <div className="font-serif-kr font-semibold text-deep-forest text-base leading-none">Floradizm</div>
            <div className="font-sans-kr text-[10px] text-sage-green tracking-widest">플로라디즘</div>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1 text-sm font-sans-kr text-muted-foreground hover:text-deep-forest">
          <ArrowLeft className="w-4 h-4" />
          홈으로
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif-kr font-semibold text-deep-forest text-2xl">{title}</h1>
            {subtitle && <p className="font-sans-kr text-sm text-muted-foreground mt-2">{subtitle}</p>}
          </div>
          <div className="bg-white border border-subtle p-8">
            {children}
          </div>
          {footer && (
            <p className="text-center text-sm font-sans-kr text-muted-foreground mt-6">{footer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
