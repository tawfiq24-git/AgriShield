import React from 'react';
import { useApp, PageView } from '../../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentTitle?: string;
  subItem?: string;
}

const PAGE_LABELS: Record<PageView, string> = {
  landing: 'Overview',
  marketplace: 'Marketplace',
  farmer: 'Farmer Dashboard',
  buyer: 'Buyer Dashboard',
  insights: 'AI Demand Insights',
  logistics: 'Logistics Fleet',
  traceability: 'Batch Traceability',
  admin: 'Admin Console'
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentTitle, subItem }) => {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500 py-1">
      <button
        onClick={() => setCurrentPage('landing')}
        className="flex items-center gap-1 hover:text-emerald-900 transition-colors cursor-pointer"
        title="Return to Overview"
      >
        <Home className="w-3.5 h-3.5 text-stone-400" />
        <span className="hidden sm:inline">Home</span>
      </button>

      {currentPage !== 'landing' && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <button
            onClick={() => setCurrentPage(currentPage)}
            className={`transition-colors cursor-pointer ${
              !subItem ? 'font-semibold text-emerald-950' : 'hover:text-emerald-900'
            }`}
          >
            {currentTitle || PAGE_LABELS[currentPage]}
          </button>
        </>
      )}

      {subItem && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="font-semibold text-emerald-950 font-mono-numbers truncate max-w-[200px]">
            {subItem}
          </span>
        </>
      )}
    </nav>
  );
};
