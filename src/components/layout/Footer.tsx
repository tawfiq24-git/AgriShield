import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-400 text-sm border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <span className="text-lg font-bold text-white tracking-tight">AgriLink</span>
            <p className="text-xs leading-relaxed text-stone-400">
              Direct agricultural marketplace connecting smallholder farmers and FPOs with verified commercial buyers. Providing transparent farm-gate pricing, cold-chain logistics, and QR-grade batch provenance.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3">Marketplace</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('marketplace')} className="hover:text-stone-200 transition-colors">
                  Live Harvest Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('farmer')} className="hover:text-stone-200 transition-colors">
                  FPO & Producer Listings
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('buyer')} className="hover:text-stone-200 transition-colors">
                  Institutional Bulk Orders
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('traceability')} className="hover:text-stone-200 transition-colors">
                  Batch QR Verification
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3">Supply & Intelligence</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('insights')} className="hover:text-stone-200 transition-colors">
                  AI Demand Forecasting
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('logistics')} className="hover:text-stone-200 transition-colors">
                  Cold-Chain Collection Hubs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('logistics')} className="hover:text-stone-200 transition-colors">
                  Fleet Vehicle Telematics
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin')} className="hover:text-stone-200 transition-colors">
                  Platform Verification Audits
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3">System Architecture</h3>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Designed as a modern TypeScript frontend ready for decoupling into a Python FastAPI backend with PostgreSQL relational tables, TimescaleDB sensor logs, and cryptographic ledger provenance.
            </p>
            <div className="text-xs text-emerald-400 font-medium">
              Demo Environment Active
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} AgriLink Platform. Demonstration & Evaluation Interface.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Fair Trade</span>
            <span>·</span>
            <span>Zero Unnecessary Intermediaries</span>
            <span>·</span>
            <span>Farm Gate Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
