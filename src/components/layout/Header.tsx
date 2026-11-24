import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { Menu, ChevronDown, UserCheck, RotateCcw, Store, ShieldCheck, Check } from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    activeRole,
    setActiveRole,
    currentUserProfile,
    resetDemoData,
    setCurrentPage,
    currentPage
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { role: Role; title: string; subtitle: string; page: any }[] = [
    { role: 'farmer', title: 'Rajesh Patil', subtitle: 'Farmer / FPO Producer (Nashik)', page: 'farmer' },
    { role: 'buyer', title: 'Ananya Sen', subtitle: 'Chief Procurement (Grand Hyatt)', page: 'buyer' },
    { role: 'logistics', title: 'Vikram Gaikwad', subtitle: 'Fleet Lead (Cold-Chain Hub)', page: 'logistics' },
    { role: 'admin', title: 'Dr. Sunita Rao', subtitle: 'Quality Director (Agmark Supervisor)', page: 'admin' },
    { role: 'guest', title: 'Wholesale Visitor', subtitle: 'Public Agricultural Evaluator', page: 'marketplace' }
  ];

  const handleSwitchProfile = (role: Role, targetPage: any) => {
    setActiveRole(role);
    setCurrentPage(targetPage);
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile hamburger & Brand (mobile only) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Text */}
            <button
              onClick={() => setCurrentPage('landing')}
              className="lg:hidden font-bold text-emerald-950 text-base whitespace-nowrap cursor-pointer"
            >
              AgriLink
            </button>

            {/* Desktop Quick Nav Shortcut to Marketplace */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('marketplace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentPage === 'marketplace'
                    ? 'bg-emerald-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Browse Marketplace</span>
              </button>

              <button
                onClick={() => setCurrentPage('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentPage === 'admin'
                    ? 'bg-emerald-900 text-white'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </button>
            </div>
          </div>

          {/* Right: Reset Data & Clearly Identified Demo Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={resetDemoData}
              className="hidden sm:flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 px-2.5 py-1.5 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
              title="Restore standard demonstration harvest lots and orders"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>

            {/* Demo User Profile Pill with Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-left transition-colors cursor-pointer"
                aria-expanded={isProfileMenuOpen}
              >
                {/* Avatar Badge */}
                <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUserProfile.avatarText}
                </div>

                {/* Profile Identity Details */}
                <div className="hidden sm:block text-left leading-tight">
                  <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                    <span>{currentUserProfile.name}</span>
                    <span className="text-[10px] text-emerald-800 font-semibold uppercase">
                      ({currentUserProfile.role})
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 truncate max-w-[140px]">
                    {currentUserProfile.organization}
                  </div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-1" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-2 border-b border-stone-100">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                      Simulated Demonstration Persona
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Switch perspectives to test role-specific workflows and dashboards:
                    </p>
                  </div>

                  <div className="py-1">
                    {rolesList.map((item) => {
                      const isCurrent = activeRole === item.role;
                      return (
                        <button
                          key={item.role}
                          onClick={() => handleSwitchProfile(item.role, item.page)}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-50 text-emerald-950 font-semibold'
                              : 'text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-stone-900">{item.title}</div>
                            <div className="text-[11px] text-stone-500">{item.subtitle}</div>
                          </div>
                          {isCurrent && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-3.5 pt-2 pb-1 border-t border-stone-100 text-[10px] text-stone-400">
                    Active Demo State: Updates affect local storage only.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
