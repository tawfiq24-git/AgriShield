import React from 'react';
import { useApp, PageView } from '../../context/AppContext';
import {
  Compass,
  Store,
  Sprout,
  Building2,
  TrendingUp,
  Truck,
  QrCode,
  ShieldCheck,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: PageView;
  label: string;
  badge?: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileDrawer, onCloseMobile }) => {
  const { currentPage, setCurrentPage, listings, orders, anomalies } = useApp();

  const navItems: NavItem[] = [
    { id: 'landing', label: 'Home Overview', icon: Compass },
    { id: 'marketplace', label: 'Produce Marketplace', badge: `${listings.length}`, icon: Store },
    { id: 'farmer', label: 'Farmer Dashboard', icon: Sprout },
    { id: 'buyer', label: 'Buyer Dashboard', badge: `${orders.length}`, icon: Building2 },
    { id: 'insights', label: 'AI Demand Insights', icon: TrendingUp },
    { id: 'logistics', label: 'Logistics Fleet', icon: Truck },
    { id: 'traceability', label: 'Batch Traceability', icon: QrCode },
    { id: 'admin', label: 'Admin Console', badge: `${anomalies.length}`, icon: ShieldCheck }
  ];

  const handleSelectPage = (page: PageView) => {
    setCurrentPage(page);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`flex flex-col bg-stone-900 text-stone-300 ${
        isMobileDrawer ? 'w-72 h-full' : 'w-64 border-r border-stone-800 shrink-0 hidden lg:flex'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-stone-800 flex items-center justify-between">
        <button
          onClick={() => handleSelectPage('landing')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-emerald-700 transition-colors">
            AL
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-tight leading-none">
              AgriLink
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              Direct Trade & Provenance
            </div>
          </div>
        </button>

        {isMobileDrawer && (
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-stone-400 hover:text-white rounded-md cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
          Core Workflows
        </div>
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleSelectPage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
                isActive
                  ? 'bg-emerald-900 text-white font-semibold shadow-xs'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-stone-400 group-hover:text-stone-200'
                  }`}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono-numbers ${
                    isActive ? 'bg-emerald-950 text-emerald-300' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-4 border-t border-stone-800 bg-stone-950/50 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-stone-400">
          <span>Demo Environment</span>
          <span className="text-emerald-400 font-mono-numbers">Phase 2</span>
        </div>
        <div className="text-[10px] text-stone-500 leading-relaxed">
          Local browser state enabled. Ready for FastAPI & PostgreSQL schema orchestration.
        </div>
      </div>
    </aside>
  );
};
