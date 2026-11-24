import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMAND_FORECASTS, ANOMALY_ALERTS } from '../../data/demoData';
import { PageHeader } from '../common/PageHeader';
import { DemoNotice } from '../common/DemoNotice';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  BarChart3,
  GitCompare,
  ShieldAlert
} from 'lucide-react';

export const AiInsightsPage: React.FC = () => {
  const { setCurrentPage, anomalies } = useApp();
  const [activeTab, setActiveTab] = useState<'forecast' | 'matching' | 'anomalies'>('forecast');
  const [selectedCropForecast, setSelectedCropForecast] = useState<string>('Vine Ripe Tomatoes');
  const [isSimulatingAnalysis, setIsSimulatingAnalysis] = useState(false);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  const activeForecast =
    DEMAND_FORECASTS.find((f) => f.cropName === selectedCropForecast) || DEMAND_FORECASTS[0];

  const handleRunModelSimulation = () => {
    setIsSimulatingAnalysis(true);
    setSimulationNotice(null);
    setTimeout(() => {
      setIsSimulatingAnalysis(false);
      setSimulationNotice(
        `Simulation updated: Synthesized 2,400 daily wholesale terminal mandi rates and regional logistics capacity for ${selectedCropForecast}.`
      );
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <PageHeader
        badge="Marketplace Intelligence"
        title="AI Demand Insights & Supply Matching"
        description="Predictive demand forecasting, regional deficit-surplus matching, and automated supply chain anomaly screening to stabilize agricultural trade."
        actions={
          <button
            onClick={handleRunModelSimulation}
            disabled={isSimulatingAnalysis}
            className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingAnalysis ? 'animate-spin' : ''}`} />
            <span>{isSimulatingAnalysis ? 'Analyzing Feeds...' : 'Refresh Forecast Feeds'}</span>
          </button>
        }
      />

      {/* Explicit Demonstration Label (Requirement 2.E) */}
      <DemoNotice
        badge="Demonstration Model Notice"
        message="The charts, trend percentages, and risk alerts below are demonstration metrics designed to illustrate the planned Gemini / FastAPI ML microservice. They are not connected to live neural networks or official government mandi feeds."
      />

      {simulationNotice && (
        <div className="p-3 bg-stone-900 text-stone-200 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-150">
          <span>{simulationNotice}</span>
          <button onClick={() => setSimulationNotice(null)} className="text-stone-400 hover:text-white cursor-pointer">✕</button>
        </div>
      )}

      {/* Navigation Segmented Tabs for 3 Distinct Sections (Requirement 2.E) */}
      <div className="flex border-b border-stone-200 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('forecast')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'forecast'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>1. Demand Forecasting</span>
        </button>

        <button
          onClick={() => setActiveTab('matching')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'matching'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <GitCompare className="w-4 h-4" />
          <span>2. Regional Supply Matching</span>
        </button>

        <button
          onClick={() => setActiveTab('anomalies')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'anomalies'
              ? 'border-emerald-800 text-emerald-950 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>3. Anomaly Alerts ({anomalies.length})</span>
        </button>
      </div>

      {/* Section 1: Demand Forecasting */}
      {activeTab === 'forecast' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Commodity Selector */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700 uppercase tracking-wider text-[11px]">
                    Monitored Commodities
                  </span>
                  <span className="text-stone-400 text-[10px]">Demo Data</span>
                </div>

                <div className="space-y-1.5">
                  {DEMAND_FORECASTS.map((item) => {
                    const isSelected = item.cropName === selectedCropForecast;
                    return (
                      <button
                        key={item.cropName}
                        onClick={() => setSelectedCropForecast(item.cropName)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-700/50 text-emerald-950 font-bold'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div>
                          <div>{item.cropName}</div>
                          <div className="text-[11px] text-stone-500 font-normal">
                            Avg Rate: ₹{item.currentAvgMarketPrice}/kg
                          </div>
                        </div>
                        <span className="font-medium text-stone-800 font-mono-numbers">
                          {item.projectedDemandTrend}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sowing Advice Card */}
              <div className="bg-stone-900 text-stone-200 p-5 rounded-xl space-y-2 text-xs">
                <div className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                  Agronomic Planting Window
                </div>
                <div className="text-stone-100 font-bold text-sm">
                  {activeForecast.recommendedPlantingWindow}
                </div>
                <p className="text-stone-400 leading-relaxed text-[11px]">
                  Staggering nursery cycles protects FPOs from peak-harvest price crashes and assures stable farm-gate realizations.
                </p>
              </div>
            </div>

            {/* Visual Forecast & Narrative */}
            <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
                <div>
                  <span className="text-xs text-stone-500 capitalize">{activeForecast.category} Forecast Model</span>
                  <h3 className="text-xl font-bold text-stone-900">{activeForecast.cropName}</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-stone-500">Projected 3-Week Trajectory: </span>
                  <span className="text-base font-bold text-emerald-900 font-mono-numbers">
                    {activeForecast.projectedDemandTrend}
                  </span>
                </div>
              </div>

              {/* Sample Visual Bar Chart (Explicitly labeled demo metrics) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    Simulated 4-Week Demand Index (Demonstration Chart)
                  </span>
                  <span className="text-[10px] text-stone-400">Baseline = 100 pts</span>
                </div>

                <div className="grid grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-center text-xs">
                  <div>
                    <div className="h-20 flex items-end justify-center mb-2">
                      <div className="w-8 bg-stone-300 rounded-t-md" style={{ height: '55%' }} />
                    </div>
                    <div className="font-bold text-stone-800 font-mono-numbers">98 pts</div>
                    <div className="text-[10px] text-stone-500">Week 1 (Past)</div>
                  </div>
                  <div>
                    <div className="h-20 flex items-end justify-center mb-2">
                      <div className="w-8 bg-emerald-600 rounded-t-md" style={{ height: '70%' }} />
                    </div>
                    <div className="font-bold text-stone-800 font-mono-numbers">112 pts</div>
                    <div className="text-[10px] text-stone-500">Week 2 (Current)</div>
                  </div>
                  <div>
                    <div className="h-20 flex items-end justify-center mb-2">
                      <div className="w-8 bg-emerald-700 rounded-t-md" style={{ height: '88%' }} />
                    </div>
                    <div className="font-bold text-stone-800 font-mono-numbers">128 pts</div>
                    <div className="text-[10px] text-stone-500">Week 3 (Projected)</div>
                  </div>
                  <div>
                    <div className="h-20 flex items-end justify-center mb-2">
                      <div className="w-8 bg-emerald-800 rounded-t-md" style={{ height: '95%' }} />
                    </div>
                    <div className="font-bold text-emerald-950 font-mono-numbers">135 pts</div>
                    <div className="text-[10px] text-stone-500">Week 4 (Peak)</div>
                  </div>
                </div>
              </div>

              {/* Market Narrative */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Demand Drivers & Consumption Rationale
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  {activeForecast.rationale}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <span className="text-xs text-stone-500">
                  Direct match available in active marketplace inventory.
                </span>
                <button
                  onClick={() => setCurrentPage('marketplace')}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Procure {activeForecast.cropName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Supply Matching (Requirement 2.E) */}
      {activeTab === 'matching' && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Regional Deficit vs. Surplus Supply Balancing
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Automated matching pairs excess agricultural harvest clusters directly with urban consumption deficit pockets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deficit Zone Box */}
            <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
              <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                <span>Deficit Zones (Active Institutional Buyer RFQs)</span>
              </div>
              <p className="text-xs text-stone-600">
                Buyers in these urban centers are actively requesting fresh deliveries with insufficient local production:
              </p>
              <ul className="space-y-2 text-xs font-medium text-stone-800">
                {activeForecast.deficitRegions.map((region) => (
                  <li key={region} className="flex items-center justify-between bg-white/80 p-2.5 rounded-lg border border-rose-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span>{region}</span>
                    </div>
                    <span className="text-[11px] text-rose-700 font-mono-numbers">High Requisition Demand</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Surplus Cluster Box */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <span>Surplus Production Clusters (Ready Harvest Lots)</span>
              </div>
              <p className="text-xs text-stone-600">
                Regional FPOs with verified harvest capacity and pre-cooling cold storage available:
              </p>
              <ul className="space-y-2 text-xs font-medium text-stone-800">
                {activeForecast.surplusRegions.map((region) => (
                  <li key={region} className="flex items-center justify-between bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>{region}</span>
                    </div>
                    <span className="text-[11px] text-emerald-800 font-mono-numbers">Ready for Dispatch</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Efficiency Metric Box */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2">
            <div className="font-semibold text-stone-900">Direct Route Optimization Impact</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-numbers pt-1">
              <div>
                <span className="text-stone-500 block text-[11px]">Intermediary Hops:</span>
                <span className="font-bold text-emerald-800 text-sm">Reduced from 5 to 1</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Estimated Produce Shrinkage:</span>
                <span className="font-bold text-emerald-800 text-sm">-24% spoilage reduction</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Transit Carbon Footprint:</span>
                <span className="font-bold text-emerald-800 text-sm">-18% CO₂ via grouped reefer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Anomaly Alerts & Risk Screening (Requirement 2.E) */}
      {activeTab === 'anomalies' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden space-y-4">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Automated Supply Chain Anomaly Screening
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Surveillance of cold-chain reefer telematics, mandi spot deviations, and local weather disruptions.
              </p>
            </div>
            <div className="text-xs text-stone-500">
              {anomalies.length} active alerts logged
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {anomalies.map((alert) => (
              <div key={alert.id} className="p-5 space-y-2.5 hover:bg-stone-50/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        alert.severity === 'high'
                          ? 'text-rose-700'
                          : alert.severity === 'medium'
                          ? 'text-amber-700'
                          : 'text-stone-700'
                      }`}
                    >
                      {alert.type}
                    </span>
                    <span className="text-stone-400">·</span>
                    <span className="font-medium text-stone-900">{alert.cropOrBatch}</span>
                  </div>
                  <div className="text-stone-500 font-mono-numbers text-[11px]">
                    Detected {alert.detectedAt} · {alert.location}
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {alert.summary}
                </p>

                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">AgriLink Platform Protocol: </span>
                    {alert.actionRequired}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
