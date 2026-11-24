import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BATCH_TRACEABILITY_RECORDS } from '../../data/demoData';
import { PageHeader } from '../common/PageHeader';
import { DemoNotice } from '../common/DemoNotice';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Thermometer,
  TestTube,
  Award,
  Share2,
  Copy,
  Check,
  Search,
  ExternalLink
} from 'lucide-react';

export const TraceabilityPage: React.FC = () => {
  const { selectedTraceBatchId, setSelectedTraceBatchId, activeBatchData, addToast } = useApp();
  const [customInputBatch, setCustomInputBatch] = useState(selectedTraceBatchId);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLookupBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputBatch.trim()) return;
    setSelectedTraceBatchId(customInputBatch.trim());
    addToast('info', 'Batch Loaded', `Showing traceability ledger for ${customInputBatch.trim()}.`);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    addToast('success', 'Verification Link Copied', `Provenance link for batch ${activeBatchData?.batchId} copied.`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const standardBatches = Object.keys(BATCH_TRACEABILITY_RECORDS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <PageHeader
        badge="Quality & Provenance"
        title="Agricultural Batch Traceability"
        description="Verify origin soil health indices, harvest timestamps, certified laboratory chemical residue screenings, and continuous cold-chain custody from farm gate to buyer kitchen."
        subItem={activeBatchData?.batchId}
      />

      {/* Explicit Blockchain / QR Verification Disclaimer (Requirement 2.G) */}
      <DemoNotice
        badge="Traceability State Notice"
        message="The QR graphic and chronological audit events shown below are demonstration representations. Cryptographic blockchain transaction hashing (Hyperledger / Polygon) and real-time physical camera scanning will be connected in future production phases."
      />

      {/* Batch Lookup & QR Interactive Card */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Simulated QR Code Area (Requirement 2.G) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-stone-50 rounded-xl border border-stone-200 text-center">
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs mb-3">
              <svg
                className="w-36 h-36 text-stone-900"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="5" y="5" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="4" />
                <rect x="12" y="12" width="12" height="12" fill="currentColor" />
                <rect x="69" y="5" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="4" />
                <rect x="76" y="12" width="12" height="12" fill="currentColor" />
                <rect x="5" y="69" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="4" />
                <rect x="12" y="76" width="12" height="12" fill="currentColor" />
                <rect x="37" y="10" width="8" height="8" fill="currentColor" />
                <rect x="51" y="10" width="8" height="8" fill="currentColor" />
                <rect x="37" y="24" width="8" height="8" fill="currentColor" />
                <rect x="10" y="37" width="8" height="8" fill="currentColor" />
                <rect x="24" y="37" width="8" height="8" fill="currentColor" />
                <rect x="37" y="37" width="26" height="26" fill="currentColor" />
                <rect x="69" y="37" width="8" height="8" fill="currentColor" />
                <rect x="83" y="37" width="8" height="8" fill="currentColor" />
                <rect x="69" y="51" width="8" height="8" fill="currentColor" />
                <rect x="83" y="51" width="8" height="8" fill="currentColor" />
                <rect x="37" y="69" width="8" height="8" fill="currentColor" />
                <rect x="51" y="69" width="8" height="8" fill="currentColor" />
                <rect x="69" y="69" width="8" height="8" fill="currentColor" />
                <rect x="83" y="83" width="8" height="8" fill="currentColor" />
                <rect x="51" y="83" width="8" height="8" fill="currentColor" />
              </svg>
            </div>

            <div className="font-mono-numbers font-bold text-stone-900 text-xs">
              {activeBatchData?.batchId}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              Demonstration QR Code Matrix
            </div>

            <button
              onClick={handleCopyLink}
              className="mt-3 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Copy Verification URL'}</span>
            </button>
          </div>

          {/* Right: Lookup Field & Sample Batch Buttons (Requirement 2.G) */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <h3 className="text-base font-bold text-stone-900">Inspect Lot Provenance</h3>
              <p className="text-xs text-stone-600 mt-1">
                Enter any AgriLink batch code or select from audited harvest records:
              </p>
            </div>

            {/* Quick Batch Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {standardBatches.map((bId) => {
                const isSelected = selectedTraceBatchId === bId;
                return (
                  <button
                    key={bId}
                    onClick={() => {
                      setSelectedTraceBatchId(bId);
                      setCustomInputBatch(bId);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono-numbers rounded-lg border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-emerald-900 font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {bId}
                  </button>
                );
              })}
            </div>

            {/* Custom Lookup Input */}
            <form onSubmit={handleLookupBatch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={customInputBatch}
                  onChange={(e) => setCustomInputBatch(e.target.value)}
                  placeholder="Enter custom batch identifier (e.g. BATCH-2026-TOM-042)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white focus:border-emerald-700 font-mono-numbers"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
              >
                Inspect Batch
              </button>
            </form>

            {/* Verified Certifications Strip */}
            <div className="pt-2 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Residue Screening:</span>
                <span className="font-semibold text-emerald-800">{activeBatchData?.pesticideResidueTest}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Soil Health Index:</span>
                <span className="font-semibold text-stone-800">{activeBatchData?.soilHealthIndex}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Cold Chain Average:</span>
                <span className="font-semibold text-stone-800 font-mono-numbers">{activeBatchData?.coldChainTemperatureAvg}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Certification License:</span>
                <span className="font-mono-numbers text-stone-700 truncate block">{activeBatchData?.certificationNo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Overview Banner */}
      {activeBatchData && (
        <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Batch Verification Passport
              </div>
              <h2 className="text-xl font-bold mt-0.5">{activeBatchData.cropName}</h2>
              <div className="text-xs text-stone-400 mt-0.5">
                Cultivar: {activeBatchData.variety} · Harvest Date: {activeBatchData.harvestDate}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-400">Origin Producer Entity: </span>
              <div className="font-bold text-sm text-stone-100">{activeBatchData.farmerOrFpo}</div>
              <div className="text-xs text-stone-400">{activeBatchData.farmLocation}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
            <div>
              <span className="text-stone-400 block text-[11px]">Moisture & Brix:</span>
              <span className="font-semibold text-white">{activeBatchData.moistureContent}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Phytosanitary Protocol:</span>
              <span className="font-semibold text-white">Full Conformity Verified</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Chain-of-Custody Steps:</span>
              <span className="font-semibold text-white">{activeBatchData.steps.length} Immutable Log Entries</span>
            </div>
          </div>
        </div>
      )}

      {/* Provenance Timeline (Requirement 2.G) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-6">
        <div>
          <h2 className="text-base font-bold text-stone-900">Chain-of-Custody & Journey Stages</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Chronological logging from farm picking, cold pre-cooling, laboratory testing, through refrigerated dispatch.
          </p>
        </div>

        <div className="relative border-l-2 border-emerald-800/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {activeBatchData?.steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-800 border-4 border-white shadow-xs" />

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-stone-900">
                    {step.stage}
                  </h3>
                  <span className="text-xs text-stone-500 font-mono-numbers">
                    {step.timestamp}
                  </span>
                </div>

                <div className="text-xs text-stone-600 flex flex-wrap items-center gap-1.5">
                  <span className="font-medium text-stone-800">{step.actor}</span>
                  <span>·</span>
                  <span className="text-stone-500">{step.location}</span>
                  <span>·</span>
                  <span className="text-emerald-800">Verified by: {step.verifiedBy}</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  {step.details}
                </p>

                {step.parameters && Object.keys(step.parameters).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {Object.entries(step.parameters).map(([key, val]) => (
                      <div
                        key={key}
                        className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-200 font-mono-numbers"
                      >
                        <span className="text-stone-500">{key}: </span>
                        <span className="font-semibold text-stone-900">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
