import React, { useState } from 'react';
import { useApp, PageView } from '../../context/AppContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'farmer', label: 'Farmer Dashboard' },
    { id: 'buyer', label: 'Buyer Dashboard' },
    { id: 'insights', label: 'AI Insights' },
    { id: 'logistics', label: 'Logistics Fleet' },
    { id: 'traceability', label: 'Batch Traceability' }
  ];

  const handleNavClick = (pageId: PageView) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('landing')}
            className="text-xl font-bold tracking-tight text-emerald-950 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 text-left"
          >
            AgriLink
          </button>

          {/* Zone 2: 4-6 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-emerald-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-emerald-900 text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <span>Admin Console</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 'landing' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            Home Overview
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === item.id ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 'admin' ? 'bg-emerald-900 text-white' : 'bg-stone-100 text-stone-800'
              }`}
            >
              Admin Console & Moderation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
