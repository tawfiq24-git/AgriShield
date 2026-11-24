import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AnomalyAlert } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { DemoNotice } from '../common/DemoNotice';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Check,
  X,
  Eye,
  MessageSquare,
  UserCheck,
  Truck
} from 'lucide-react';

interface PendingUser {
  id: string;
  name: string;
  entityType: 'Farmer Producer Org (FPO)' | 'Individual Grower' | 'Hotel Group' | 'Retail Supermarket';
  location: string;
  registrationNumber: string;
  certification: string;
  submittedAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

const INITIAL_PENDING_USERS: PendingUser[] = [
  {
    id: 'usr-01',
    name: 'Baramati Grape & Pomegranate Co-op',
    entityType: 'Farmer Producer Org (FPO)',
    location: 'Baramati, Pune District',
    registrationNumber: 'FPO-MH-PUN-2026-081',
    certification: 'APEDA Export Registration / GlobalGAP',
    submittedAt: 'Today, 08:30 IST',
    status: 'pending'
  },
  {
    id: 'usr-02',
    name: 'ITC Grand Central F&B Procurement',
    entityType: 'Hotel Group',
    location: 'Parel, Mumbai',
    registrationNumber: 'GSTIN-27AAACI1681G1ZM',
    certification: 'FSSAI Central Kitchen License #10014022002',
    submittedAt: 'Yesterday, 16:45 IST',
    status: 'pending'
  },
  {
    id: 'usr-03',
    name: 'Himalayan Organic Apple Growers',
    entityType: 'Individual Grower',
    location: 'Kotgarh, Himachal Pradesh',
    registrationNumber: 'HP-HORTI-IND-9912',
    certification: 'PGS-India Organic Certified',
    submittedAt: '2 days ago',
    status: 'verified'
  }
];

export const AdminDashboard: React.FC = () => {
  const { listings, orders, anomalies, updateListingStatus, updateAnomalyReview, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'listings' | 'orders' | 'anomalies'>('users');
  const [users, setUsers] = useState<PendingUser[]>(INITIAL_PENDING_USERS);

  // Human Anomaly Review Modal (Requirement 2.H)
  const [selectedAlertForReview, setSelectedAlertForReview] = useState<AnomalyAlert | null>(null);
  const [reviewStatus, setReviewStatus] = useState<'open' | 'investigating' | 'resolved'>('investigating');
  const [reviewNotes, setReviewNotes] = useState('');
  const [assignedInspector, setAssignedInspector] = useState('Dr. Sunita Rao (Agmark Chief)');

  const handleVerifyUser = (userId: string, newStatus: 'verified' | 'rejected') => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    addToast(newStatus === 'verified' ? 'success' : 'warning', 'User Status Updated', `Entity marked as ${newStatus}.`);
  };

  const openReviewModal = (alert: AnomalyAlert) => {
    setSelectedAlertForReview(alert);
    setReviewStatus(alert.reviewStatus || 'investigating');
    setReviewNotes(alert.reviewerNotes || 'Assigned local fleet coordinator to inspect temperature logger and core produce temperature.');
    setAssignedInspector(alert.assignedInspector || 'Dr. Sunita Rao (Agmark Chief)');
  };

  const handleSaveAnomalyReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlertForReview) return;

    updateAnomalyReview(
      selectedAlertForReview.id,
      reviewStatus,
      reviewNotes,
      assignedInspector
    );

    setSelectedAlertForReview(null);
  };

  const totalGmv = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const completedDeliveries = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <PageHeader
        badge="Platform Governance"
        title="Administrative & Quality Moderation Console"
        description="Verify producer credentials, review commercial listings, inspect global purchase orders, and conduct human review of flagged quality and temperature anomalies."
      />

      <DemoNotice
        badge="Governance Console"
        message="Review decisions and status changes made here update the shared demonstration state for this browser session."
      />

      {/* Summary Cards Strip (Requirement 2.H: Users, Listings, Orders, Deliveries, Anomaly Flags) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] text-stone-500 uppercase tracking-wider">Total GMV (Demo)</div>
          <div className="text-xl font-bold text-stone-900 font-mono-numbers">
            ₹{totalGmv.toLocaleString()}
          </div>
          <div className="text-[10px] text-stone-500">Direct settlement value</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] text-stone-500 uppercase tracking-wider">Verified Listings</div>
          <div className="text-xl font-bold text-stone-900 font-mono-numbers">
            {listings.length}
          </div>
          <div className="text-[10px] text-stone-500">Active harvest lots</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] text-stone-500 uppercase tracking-wider">Exchange Orders</div>
          <div className="text-xl font-bold text-stone-900 font-mono-numbers">
            {orders.length}
          </div>
          <div className="text-[10px] text-stone-500">{completedDeliveries} completed</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] text-stone-500 uppercase tracking-wider">KYC Queue</div>
          <div className="text-xl font-bold text-amber-700 font-mono-numbers">
            {users.filter(u => u.status === 'pending').length}
          </div>
          <div className="text-[10px] text-stone-500">Entities awaiting review</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] text-stone-500 uppercase tracking-wider">Anomaly Flags</div>
          <div className="text-xl font-bold text-rose-700 font-mono-numbers">
            {anomalies.length}
          </div>
          <div className="text-[10px] text-stone-500">Human review required</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden space-y-4">
        <div className="border-b border-stone-200 px-5 pt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'users'
                ? 'border-emerald-800 text-emerald-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            User Verification Queue ({users.filter(u => u.status === 'pending').length})
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'listings'
                ? 'border-emerald-800 text-emerald-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Listings Moderation ({listings.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-emerald-800 text-emerald-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Orders & Deliveries ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('anomalies')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'anomalies'
                ? 'border-emerald-800 text-emerald-950 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Anomaly Review Desk ({anomalies.length})
          </button>
        </div>

        {/* Tab 1: Users KYC */}
        {activeTab === 'users' && (
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Entity Name</th>
                  <th className="py-3 px-4 font-semibold">Classification</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Registration / License</th>
                  <th className="py-3 px-4 font-semibold">Submitted</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50/80">
                    <td className="py-3.5 px-4 font-bold text-stone-900">{u.name}</td>
                    <td className="py-3.5 px-4 text-stone-700">{u.entityType}</td>
                    <td className="py-3.5 px-4 text-stone-600">{u.location}</td>
                    <td className="py-3.5 px-4 font-mono-numbers">
                      <div>{u.registrationNumber}</div>
                      <div className="text-[11px] text-stone-500 font-sans">{u.certification}</div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 font-mono-numbers">{u.submittedAt}</td>
                    <td className="py-3.5 px-4 capitalize font-medium">
                      <span className={u.status === 'verified' ? 'text-emerald-700' : u.status === 'rejected' ? 'text-rose-700' : 'text-amber-700'}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {u.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleVerifyUser(u.id, 'verified')}
                            className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleVerifyUser(u.id, 'rejected')}
                            className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {u.status !== 'pending' && (
                        <span className="text-[11px] text-stone-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Listings Moderation */}
        {activeTab === 'listings' && (
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Crop & Variety</th>
                  <th className="py-3 px-4 font-semibold">Producer / FPO</th>
                  <th className="py-3 px-4 font-semibold text-right">Volume</th>
                  <th className="py-3 px-4 font-semibold text-right">Price</th>
                  <th className="py-3 px-4 font-semibold">Batch Code</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/80">
                    <td className="py-3.5 px-4 font-semibold text-stone-900">{item.cropName}</td>
                    <td className="py-3.5 px-4 text-stone-700">{item.farmerOrFpo}</td>
                    <td className="py-3.5 px-4 text-right font-mono-numbers">{item.availableQtyKg.toLocaleString()} kg</td>
                    <td className="py-3.5 px-4 text-right font-mono-numbers font-bold text-emerald-950">₹{item.pricePerKg}/kg</td>
                    <td className="py-3.5 px-4 font-mono-numbers text-stone-600">{item.batchId}</td>
                    <td className="py-3.5 px-4 capitalize text-stone-700">{item.status.replace('_', ' ')}</td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      {item.status === 'active' ? (
                        <button
                          onClick={() => updateListingStatus(item.id, 'reserved')}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-[11px] cursor-pointer"
                        >
                          Suspend Lot
                        </button>
                      ) : (
                        <button
                          onClick={() => updateListingStatus(item.id, 'active')}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded text-[11px] cursor-pointer"
                        >
                          Approve Live
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Orders Oversight */}
        {activeTab === 'orders' && (
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Order ID</th>
                  <th className="py-3 px-4 font-semibold">Buyer</th>
                  <th className="py-3 px-4 font-semibold">Producer</th>
                  <th className="py-3 px-4 font-semibold">Commodity</th>
                  <th className="py-3 px-4 font-semibold text-right">Value</th>
                  <th className="py-3 px-4 font-semibold">Order Date</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/80">
                    <td className="py-3.5 px-4 font-mono-numbers font-semibold text-stone-900">{ord.orderNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-stone-800">{ord.buyerName}</td>
                    <td className="py-3.5 px-4 text-stone-600">{ord.farmerOrFpo}</td>
                    <td className="py-3.5 px-4 text-stone-800">{ord.cropName} ({ord.quantityKg} kg)</td>
                    <td className="py-3.5 px-4 text-right font-mono-numbers font-bold text-emerald-950">₹{ord.totalAmount.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-mono-numbers text-stone-600">{ord.orderDate}</td>
                    <td className="py-3.5 px-4 capitalize font-medium text-stone-700">{ord.status.replace('_', ' ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Flagged Anomalies with Human Review (Requirement 2.H) */}
        {activeTab === 'anomalies' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Human Review Protocol: Click "Conduct Human Review" to inspect logs and assign investigators rather than automatic rejection.</span>
              <span className="font-mono-numbers">{anomalies.length} open tickets</span>
            </div>

            {anomalies.length === 0 ? (
              <div className="text-center p-8 text-stone-500 text-xs">
                All quality and thermal anomalies have been reviewed and resolved.
              </div>
            ) : (
              <div className="space-y-3">
                {anomalies.map((al) => (
                  <div
                    key={al.id}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-rose-800">{al.type}</span>
                        <span className="text-stone-400">·</span>
                        <span className="font-semibold text-stone-900">{al.cropOrBatch}</span>
                        {al.reviewStatus && (
                          <span className={`text-[10px] font-mono-numbers uppercase px-1.5 py-0.5 rounded font-semibold ${
                            al.reviewStatus === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {al.reviewStatus}
                          </span>
                        )}
                      </div>

                      <p className="text-stone-700 leading-relaxed">{al.summary}</p>

                      <div className="text-[11px] text-stone-500 font-mono-numbers">
                        Location: {al.location} · Detected: {al.detectedAt}
                      </div>

                      {al.reviewerNotes && (
                        <div className="bg-white p-2.5 rounded-lg border border-stone-200 text-stone-700 text-[11px]">
                          <span className="font-semibold text-stone-900">Audit Notes: </span>
                          <span>{al.reviewerNotes}</span>
                          {al.assignedInspector && (
                            <span className="text-stone-500 ml-2">({al.assignedInspector})</span>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => openReviewModal(al)}
                      className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Conduct Human Review</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Human Review Modal (Requirement 2.H) */}
      {selectedAlertForReview && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-rose-800 font-semibold">
                  Human Quality Audit Desk
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  Review Incident: {selectedAlertForReview.type}
                </h3>
                <div className="text-xs text-stone-500 font-mono-numbers">
                  Target: {selectedAlertForReview.cropOrBatch}
                </div>
              </div>
              <button
                onClick={() => setSelectedAlertForReview(null)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnomalyReview} className="space-y-4 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-stone-700 leading-relaxed">
                {selectedAlertForReview.summary}
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Human Determination / Review Decision *
                </label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                >
                  <option value="investigating">Under Investigation (Dispatch Field Inspector)</option>
                  <option value="resolved">Resolved / Core Quality Verified Safe</option>
                  <option value="open">Keep Open (Escalate to Laboratory Test)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Assigned Quality Inspector
                </label>
                <select
                  value={assignedInspector}
                  onChange={(e) => setAssignedInspector(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                >
                  <option value="Dr. Sunita Rao (Agmark Chief)">Dr. Sunita Rao (Agmark Chief)</option>
                  <option value="Inspector Kailas Shinde (Nashik Hub)">Inspector Kailas Shinde (Nashik Hub)</option>
                  <option value="Meera Deshpande (Cold-Chain Officer)">Meera Deshpande (Cold-Chain Officer)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Supervisor Audit Notes & Corrective Action *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Record verification rationale, thermometer calibration check, or quota adjustments..."
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setSelectedAlertForReview(null)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Log Human Audit Decision</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
