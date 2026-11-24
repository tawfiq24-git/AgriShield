import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../common/PageHeader';
import { DemoNotice } from '../common/DemoNotice';
import heroFarmImg from '../../assets/images/hero_agrilink_farm_1791795043822.jpg';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  TrendingUp,
  QrCode,
  Store,
  Users,
  CheckCircle2,
  Package,
  Clock,
  AlertTriangle,
  Layers
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { listings, orders, anomalies, setCurrentPage, quickNavigateToBatch } = useApp();

  const totalProduceVolumeKg = listings.reduce((acc, curr) => acc + curr.availableQtyKg, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const plannedDeliveriesCount = orders.filter((o) => o.status === 'in_transit' || o.status === 'accepted').length;
  const openAnomaliesCount = anomalies.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Page Header */}
      <PageHeader
        badge="Platform Overview"
        title="Direct Agricultural Trade & Traceability"
        description="AgriLink connects smallholder farmers and Farmer Producer Organizations (FPOs) directly with institutional buyers, restaurants, and retailers to eliminate unnecessary intermediaries, stabilize farm-gate pricing, and guarantee cold-chain batch provenance."
        actions={
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      />

      {/* Summary Cards Strip (Requirement 2.A: Available Produce, Active Orders, Planned Deliveries, Flagged Anomalies) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold text-stone-700 uppercase tracking-wider text-[11px]">
            Exchange Summary Metrics
          </span>
          <span className="text-[11px] font-mono-numbers">
            *All figures reflect local demonstration dataset
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Available Produce */}
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="text-left bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/50 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-medium text-stone-700">Available Produce</span>
              <Package className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
              {totalProduceVolumeKg.toLocaleString()} <span className="text-xs font-normal text-stone-500">kg</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
              <span>{listings.length} verified harvest lots</span>
              <span className="text-emerald-800 font-medium group-hover:underline flex items-center gap-0.5">
                Catalog <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </button>

          {/* Card 2: Active Orders */}
          <button
            onClick={() => setCurrentPage('buyer')}
            className="text-left bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/50 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-medium text-stone-700">Active Trade Orders</span>
              <Clock className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
              {activeOrdersCount} <span className="text-xs font-normal text-stone-500">contracts</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
              <span>{orders.length} total requisitions</span>
              <span className="text-emerald-800 font-medium group-hover:underline flex items-center gap-0.5">
                Orders <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </button>

          {/* Card 3: Planned Deliveries */}
          <button
            onClick={() => setCurrentPage('logistics')}
            className="text-left bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/50 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-medium text-stone-700">Planned Deliveries</span>
              <Truck className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
              {plannedDeliveriesCount} <span className="text-xs font-normal text-stone-500">dispatches</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
              <span>Refrigerated IoT monitoring</span>
              <span className="text-emerald-800 font-medium group-hover:underline flex items-center gap-0.5">
                Fleet <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </button>

          {/* Card 4: Flagged Anomalies */}
          <button
            onClick={() => setCurrentPage('admin')}
            className="text-left bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-rose-700/50 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-medium text-stone-700">Flagged Anomalies</span>
              <AlertTriangle className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-rose-700 font-mono-numbers">
              {openAnomaliesCount} <span className="text-xs font-normal text-stone-500">incidents</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
              <span>Under human supervisor audit</span>
              <span className="text-emerald-800 font-medium group-hover:underline flex items-center gap-0.5">
                Review <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Hero Showcase Split */}
      <section className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Cooperative Aggregation Model
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Direct procurement that benefits both farmers and institutional kitchens.
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Traditional Indian agriculture incurs 4–6 layers of intermediaries, resulting in 30%+ farm gate produce spoilage, opaque auction commissions, and delayed settlement. AgriLink offers a unified digital protocol:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Direct Farmer Settlements: </span>
                  <span className="text-stone-600">Zero broker commissions on contracted lots.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Cold Aggregation: </span>
                  <span className="text-stone-600">Hydro-cooling within 90 minutes of picking.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Lab Traceability: </span>
                  <span className="text-stone-600">Zero-residue and Brix quality certificates.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Live Telematics: </span>
                  <span className="text-stone-600">IoT continuous reefer thermal logging.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Produce Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => quickNavigateToBatch('BATCH-2026-TOM-042')}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-emerald-800" />
                <span>Verify Demo Batch QR</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden bg-stone-100">
            <img
              src={heroFarmImg}
              alt="Harvest collection at cooperative farm cluster"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <div className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                Nashik Valley Cooperative Cluster
              </div>
              <div className="text-sm font-bold mt-0.5">Pre-Cooled Farm Origin Lots</div>
              <div className="text-[11px] text-stone-300 mt-0.5">
                Pre-cooled at Pimpalgaon Aggregation Hub #2 · Temperature logged continuously
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Modules Navigation Grid */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900">Operational Application Modules</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Select a specialized portal to experience each stage of the agricultural direct supply chain:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => setCurrentPage('farmer')}
            className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <Users className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Farmer & FPO Management</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Publish harvest listings with exact units and moisture certificates. Accept and dispatch direct buyer procurement orders.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Open Farmer Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentPage('buyer')}
            className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <Store className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Buyer Requisitions & Orders</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Create purchase requisitions, track active reefer dispatches, and download commercial trade invoices for corporate accounting.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Open Buyer Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentPage('insights')}
            className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>AI Demand & Matching</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Explore demand trajectories across crops, regional supply-deficit balance, and automated thermal anomaly screenings.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Inspect Forecast Feeds</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentPage('logistics')}
            className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <Truck className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Logistics & Collection Hubs</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Monitor rural aggregation chambers, fleet gross load percentages, and live IoT reefer temperature status across transit corridors.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>View Fleet Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentPage('traceability')}
            className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <QrCode className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Batch QR Traceability</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Inspect soil health indexes, laboratory chemical residue screenings, and the immutable chain-of-custody for any agricultural batch.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Inspect Provenance Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentPage('admin')}
            className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Administrative Console</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Audit pending FPO verifications, moderate live harvest listings, and conduct human review of flagged quality anomalies.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Open Admin Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Demonstration Disclaimer */}
      <DemoNotice
        badge="Demonstration Architecture"
        message="All agricultural data, buyer transactions, and logistics routes are simulated in this browser session. The modular component structure is prepared for decoupling to a FastAPI backend and PostgreSQL database."
      />
    </div>
  );
};
