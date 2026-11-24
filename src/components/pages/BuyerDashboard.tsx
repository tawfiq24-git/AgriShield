import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderRequest, OrderStatus } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { DemoNotice } from '../common/DemoNotice';
import { EmptyState } from '../common/EmptyState';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  QrCode,
  ArrowRight,
  Plus,
  FileText,
  DollarSign,
  Calendar,
  MapPin,
  Check,
  X
} from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const { listings, orders, placeOrder, setCurrentPage, quickNavigateToBatch, updateOrderStatus } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<OrderRequest | null>(null);
  const [isRequisitionModalOpen, setIsRequisitionModalOpen] = useState(false);

  // Dedicated Order-Request Form Fields (Requirement 2.D)
  const [selectedListingId, setSelectedListingId] = useState<string>(listings[0]?.id || '');
  const [orderQuantity, setOrderQuantity] = useState<number>(200);
  const [quantityUnit, setQuantityUnit] = useState<'kg' | 'quintals' | 'crates'>('kg');
  const [deliveryLocation, setDeliveryLocation] = useState('Central Chennai / Metro Core');
  const [deliveryAddress, setDeliveryAddress] = useState('Central Kitchen Loading Dock 2, Binny Road, Chennai');
  const [requestedDate, setRequestedDate] = useState('2026-10-18');
  const [buyerOrganization, setBuyerOrganization] = useState('Grand Hyatt Culinary Operations');
  const [buyerSector, setBuyerSector] = useState<
    'Hotel & Restaurant' | 'Supermarket Chain' | 'Institutional Canteen' | 'Food Processor' | 'Direct Retailer'
  >('Hotel & Restaurant');

  const selectedCropListing = listings.find((l) => l.id === selectedListingId) || listings[0];
  const calculatedUnitPrice = selectedCropListing ? selectedCropListing.pricePerKg : 40;
  const calculatedTotal = orderQuantity * calculatedUnitPrice;

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  const totalProcurementSpend = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const activeInTransit = orders.filter((o) => o.status === 'in_transit').length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const handleCreateRequisition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCropListing) return;

    placeOrder({
      listingId: selectedCropListing.id,
      cropName: selectedCropListing.cropName,
      buyerName: buyerOrganization,
      buyerType: buyerSector,
      buyerLocation: deliveryLocation,
      farmerOrFpo: selectedCropListing.farmerOrFpo,
      quantityKg: orderQuantity,
      quantityUnit,
      pricePerKg: calculatedUnitPrice,
      totalAmount: calculatedTotal,
      deliveryDateRequested: requestedDate,
      batchId: selectedCropListing.batchId,
      deliveryAddress,
      collectionCenterId: 'hub-nashik'
    });

    setIsRequisitionModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <PageHeader
        badge="Institutional Procurement"
        title="Buyer Requisitions & Order Pipeline"
        description="Track active farm-gate purchase contracts, create direct crop orders, verify cold-chain arrival milestones, and download commercial receipts."
        actions={
          <button
            onClick={() => setIsRequisitionModalOpen(true)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Purchase Requisition</span>
          </button>
        }
      />

      <DemoNotice
        badge="Buyer Dashboard"
        message="Order requests created here deduct stock from the respective farm listing and immediately show up in the Farmer fulfillment queue and Logistics fleet dispatches."
      />

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>Total Purchase Orders</span>
            <FileText className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
            {orders.length}
          </div>
          <div className="text-[11px] text-stone-500 font-mono-numbers">
            ₹{totalProcurementSpend.toLocaleString()} committed spend
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>In-Transit Cold Shipments</span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
            {activeInTransit}
          </div>
          <div className="text-[11px] text-stone-500">Continuous thermal logging verified</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>Awaiting Farmer Confirmation</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
            {pendingOrders}
          </div>
          <div className="text-[11px] text-stone-500">Direct FPO communication</div>
        </div>
      </div>

      {/* Orders Filter & List Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden space-y-4">
        <div className="p-5 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-stone-900">Commercial Purchase Requisitions</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Live fulfillment status across all farm batches and cold-chain hubs.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs">
            {['all', 'pending', 'accepted', 'in_transit', 'delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap capitalize ${
                  statusFilter === st
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No orders found for this filter"
            description="Create a purchase requisition or browse active harvest lots on the marketplace."
            actionLabel="Create Requisition"
            onAction={() => setIsRequisitionModalOpen(true)}
          />
        ) : (
          <div className="divide-y divide-stone-100">
            {filteredOrders.map((ord) => {
              const isDelivered = ord.status === 'delivered';
              const isInTransit = ord.status === 'in_transit';
              const isAccepted = ord.status === 'accepted';

              return (
                <div key={ord.id} className="p-5 space-y-4 hover:bg-stone-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 font-mono-numbers text-sm">
                          {ord.orderNumber}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className="text-xs text-stone-600">Ordered: {ord.orderDate}</span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Producer: <span className="font-medium text-stone-800">{ord.farmerOrFpo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-emerald-950 font-mono-numbers">
                        ₹{ord.totalAmount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => setSelectedOrderReceipt(ord)}
                        className="px-2.5 py-1 text-xs border border-stone-200 hover:bg-stone-100 text-stone-700 rounded cursor-pointer"
                      >
                        View Receipt
                      </button>
                    </div>
                  </div>

                  {/* Order Line Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-xs">
                    <div>
                      <div className="text-stone-500 text-[11px]">Commodity / Produce</div>
                      <div className="font-bold text-stone-900 mt-0.5">{ord.cropName}</div>
                    </div>
                    <div>
                      <div className="text-stone-500 text-[11px]">Contract Volume</div>
                      <div className="font-semibold text-stone-900 font-mono-numbers mt-0.5">
                        {ord.quantityKg.toLocaleString()} kg @ ₹{ord.pricePerKg}/kg
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-500 text-[11px]">Required By</div>
                      <div className="font-medium text-stone-900 mt-0.5 font-mono-numbers">
                        {ord.deliveryDateRequested}
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-500 text-[11px]">Batch Provenance</div>
                      <button
                        onClick={() => quickNavigateToBatch(ord.batchId)}
                        className="text-emerald-800 font-mono-numbers hover:underline flex items-center gap-1 font-medium mt-0.5 cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>{ord.batchId}</span>
                      </button>
                    </div>
                  </div>

                  {/* Delivery Timeline Indicator */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isDelivered
                            ? 'bg-emerald-600'
                            : isInTransit
                            ? 'bg-blue-600'
                            : isAccepted
                            ? 'bg-amber-600'
                            : 'bg-stone-400'
                        }`}
                      />
                      <span className="font-medium text-stone-800 capitalize">
                        Status: {ord.status.replace('_', ' ')}
                      </span>
                      {isInTransit && (
                        <span className="text-stone-500 hidden sm:inline">
                          — Monitored reefer van dispatched from regional collection depot
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {ord.status === 'in_transit' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'delivered')}
                          className="px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-xs font-medium cursor-pointer"
                        >
                          Acknowledge Dock Receiving
                        </button>
                      )}
                      <button
                        onClick={() => quickNavigateToBatch(ord.batchId)}
                        className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect Journey</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dedicated Order-Request Form Modal (Requirement 2.D) */}
      {isRequisitionModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                  Buyer Requisition Form
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  Create Direct Agricultural Purchase Order
                </h3>
              </div>
              <button
                onClick={() => setIsRequisitionModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequisition} className="space-y-4 text-xs">
              {/* Crop Selection */}
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Select Harvest Lot from Exchange *
                </label>
                <select
                  value={selectedListingId}
                  onChange={(e) => setSelectedListingId(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                >
                  {listings.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.cropName} — ₹{l.pricePerKg}/kg ({l.farmerOrFpo}) [{l.availableQtyKg} kg available]
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity, Unit, Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Requisition Volume *</label>
                  <input
                    type="number"
                    required
                    min={25}
                    max={selectedCropListing?.availableQtyKg || 5000}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 font-mono-numbers focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Unit</label>
                  <select
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value as any)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="quintals">Quintals</option>
                    <option value="crates">Crates</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Farm Rate / kg</label>
                  <div className="w-full bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 font-mono-numbers text-stone-800 font-bold">
                    ₹{calculatedUnitPrice}
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Delivery Location (City/Cluster)</label>
                  <input
                    type="text"
                    required
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Requested Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Kitchen / Dock Receiving Address</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                />
              </div>

              {/* Order Summary & Calculated Totals (Requirement 2.D) */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                  Order Summary & Calculations
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-600">Selected Producer:</span>
                  <span className="font-semibold text-stone-900">{selectedCropListing?.farmerOrFpo}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-600">Batch Code:</span>
                  <span className="font-mono-numbers text-emerald-800">{selectedCropListing?.batchId}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-600">Calculated Rate:</span>
                  <span className="font-mono-numbers">
                    ₹{calculatedUnitPrice} × {orderQuantity} {quantityUnit}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold">
                  <span className="text-stone-900">Total Purchase Commitment:</span>
                  <span className="text-emerald-950 font-mono-numbers">
                    ₹{calculatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsRequisitionModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Requisition</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice / Receipt View Modal */}
      {selectedOrderReceipt && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="border-b border-stone-200 pb-3 flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                  Commercial Trade Receipt
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-mono-numbers mt-0.5">
                  {selectedOrderReceipt.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderReceipt(null)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Producer Entity</span>
                <span className="font-semibold text-stone-800">{selectedOrderReceipt.farmerOrFpo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Purchaser</span>
                <span className="font-semibold text-stone-800">{selectedOrderReceipt.buyerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Destination</span>
                <span className="text-stone-700 text-right max-w-[220px]">{selectedOrderReceipt.deliveryAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Lot Batch Code</span>
                <span className="font-mono-numbers text-emerald-800">{selectedOrderReceipt.batchId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Produce Volume</span>
                <span className="font-mono-numbers">{selectedOrderReceipt.cropName} ({selectedOrderReceipt.quantityKg} kg)</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold pt-2">
                <span className="text-stone-900">Total Farm Gate Settlement</span>
                <span className="text-emerald-950 font-mono-numbers">₹{selectedOrderReceipt.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrderReceipt(null)}
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
