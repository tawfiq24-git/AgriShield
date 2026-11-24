import React from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { RotateCcw, UserCheck, ShieldCheck } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { activeRole, setActiveRole, resetDemoData, setCurrentPage } = useApp();

  return (
    <div className="bg-stone-900 text-stone-200 text-xs border-b border-stone-800 px-4 py-1.5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="font-medium text-emerald-400">Prototype Demonstration</span>
        <span className="text-stone-500 hidden sm:inline">·</span>
        <span className="text-stone-300 hidden sm:inline">
          Realistic agricultural data with farm-to-table direct orders, batch tracing, and logistics
        </span>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {/* Role Quick Selector */}
        <div className="flex items-center gap-1.5 text-stone-400">
          <UserCheck className="w-3.5 h-3.5 text-stone-400" />
          <span className="hidden md:inline">Simulated Perspective:</span>
          <select
            value={activeRole}
            onChange={(e) => {
              const r = e.target.value as Role;
              setActiveRole(r);
              if (r === 'farmer') setCurrentPage('farmer');
              else if (r === 'buyer') setCurrentPage('buyer');
              else if (r === 'logistics') setCurrentPage('logistics');
              else if (r === 'admin') setCurrentPage('admin');
            }}
            className="bg-stone-800 text-stone-200 border border-stone-700 rounded px-2 py-0.5 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="guest">Public / Marketplace Visitor</option>
            <option value="farmer">Farmer / FPO Producer</option>
            <option value="buyer">Institutional / Retail Buyer</option>
            <option value="logistics">Cold-Chain Logistics Fleet</option>
            <option value="admin">Platform Quality Administrator</option>
          </select>
        </div>

        <button
          onClick={resetDemoData}
          className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          title="Restore standard demo listings and batches"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Sample Data</span>
        </button>
      </div>
    </div>
  );
};
