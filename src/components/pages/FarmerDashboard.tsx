import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceListing, OrderRequest, CropCategory, QualityGrade, QuantityUnit } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { DemoNotice } from '../common/DemoNotice';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  Clock,
  Package,
  DollarSign,
  QrCode,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const {
    listings,
    orders,
    addListing,
    updateListing,
    deleteListing,
    updateListingStatus,
    updateOrderStatus,
    quickNavigateToBatch
  } = useApp();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingListingId, setEditingListingId] = useState<string | null>(null);

  // Form Fields
  const [cropName, setCropName] = useState('');
  const [category, setCategory] = useState<CropCategory>('vegetables');
  const [variety, setVariety] = useState('');
  const [farmerOrFpo, setFarmerOrFpo] = useState('Sahyadri Farmers Producer Co.');
  const [location, setLocation] = useState('Nashik, Maharashtra');
  const [district, setDistrict] = useState('Dindori Cluster');
  const [availableQtyKg, setAvailableQtyKg] = useState<number>(1500);
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>('kg');
  const [minOrderQtyKg, setMinOrderQtyKg] = useState<number>(50);
  const [pricePerKg, setPricePerKg] = useState<number>(38);
  const [harvestDate, setHarvestDate] = useState('2026-10-12');
  const [shelfLifeDays, setShelfLifeDays] = useState<number>(10);
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>('Grade A (Premium Retail)');
  const [description, setDescription] = useState('');
  const [certification, setCertification] = useState('NPOP Organic & GAP Verified');
  const [batchIdInput, setBatchIdInput] = useState('');

  // Form validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Computed metrics
  const totalStockKg = listings.reduce((acc, curr) => acc + curr.availableQtyKg, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const fulfilledOrdersCount = orders.filter((o) => o.status === 'delivered').length;
  const totalEarnedRevenue = orders
    .filter((o) => o.status === 'delivered' || o.status === 'in_transit' || o.status === 'accepted')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const openCreateModal = () => {
    setEditingListingId(null);
    setCropName('');
    setVariety('');
    setCategory('vegetables');
    setAvailableQtyKg(1000);
    setQuantityUnit('kg');
    setMinOrderQtyKg(50);
    setPricePerKg(40);
    setHarvestDate(new Date().toISOString().split('T')[0]);
    setShelfLifeDays(10);
    setQualityGrade('Grade A (Premium Retail)');
    setDescription('');
    setBatchIdInput('');
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: ProduceListing) => {
    setEditingListingId(item.id);
    setCropName(item.cropName);
    setVariety(item.variety);
    setCategory(item.category);
    setFarmerOrFpo(item.farmerOrFpo);
    setLocation(item.location);
    setDistrict(item.district);
    setAvailableQtyKg(item.availableQtyKg);
    setQuantityUnit(item.quantityUnit || 'kg');
    setMinOrderQtyKg(item.minOrderQtyKg);
    setPricePerKg(item.pricePerKg);
    setHarvestDate(item.harvestDate);
    setShelfLifeDays(item.shelfLifeDays);
    setQualityGrade(item.qualityGrade);
    setDescription(item.description);
    setCertification(item.certification);
    setBatchIdInput(item.batchId);
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!cropName.trim()) {
      errors.cropName = 'Crop name is required.';
    }
    if (!availableQtyKg || availableQtyKg <= 0) {
      errors.availableQtyKg = 'Available quantity must be greater than zero.';
    }
    if (!minOrderQtyKg || minOrderQtyKg <= 0) {
      errors.minOrderQtyKg = 'Minimum order quantity must be greater than zero.';
    }
    if (minOrderQtyKg > availableQtyKg) {
      errors.minOrderQtyKg = 'Minimum order cannot exceed total available quantity.';
    }
    if (!pricePerKg || pricePerKg <= 0) {
      errors.pricePerKg = 'Price per kg must be a positive number.';
    }
    if (!harvestDate) {
      errors.harvestDate = 'Harvest date is required.';
    }
    if (!location.trim()) {
      errors.location = 'Location cluster is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const generatedBatchId =
      batchIdInput.trim() ||
      `BATCH-2026-${cropName.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    if (editingListingId) {
      // Edit mode
      updateListing(editingListingId, {
        cropName,
        category,
        variety: variety || 'Certified Standard Grade',
        farmerOrFpo,
        location,
        district,
        availableQtyKg: Number(availableQtyKg),
        quantityUnit,
        minOrderQtyKg: Number(minOrderQtyKg),
        pricePerKg: Number(pricePerKg),
        harvestDate,
        shelfLifeDays: Number(shelfLifeDays),
        batchId: generatedBatchId,
        qualityGrade,
        description: description || 'Freshly harvested produce sorted and packaged at origin collection facility.',
        certification
      });
    } else {
      // Create mode
      addListing({
        cropName,
        category,
        variety: variety || 'Certified Standard Grade',
        farmerOrFpo,
        farmerId: 'fpo-sahyadri',
        location,
        district,
        availableQtyKg: Number(availableQtyKg),
        quantityUnit,
        minOrderQtyKg: Number(minOrderQtyKg),
        pricePerKg: Number(pricePerKg),
        harvestDate,
        shelfLifeDays: Number(shelfLifeDays),
        batchId: generatedBatchId,
        qualityGrade,
        description: description || 'Freshly harvested produce sorted and packaged at origin collection facility.',
        certification
      });
    }

    setIsFormModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <PageHeader
        badge="Producer Portal"
        title="Farmer & FPO Producer Console"
        description="Manage your cooperative's harvest inventory, update pricing per kilogram, review direct orders from commercial buyers, and dispatch lots to regional cold aggregation centres."
        actions={
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post Harvest Listing</span>
          </button>
        }
      />

      {/* Local Simulation Disclaimer (Requirement 2.C) */}
      <DemoNotice
        badge="Farmer State Demo"
        message="Modifications made here (adding, editing, or reserving listings and changing order states) immediately update your local browser demonstration state and reflect across the Marketplace."
      />

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>Listed Produce Stock</span>
            <Package className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
            {totalStockKg.toLocaleString()} <span className="text-xs font-normal text-stone-500">kg</span>
          </div>
          <div className="text-[11px] text-stone-500">Across {listings.length} active lots</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>Pending Requisitions</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
            {pendingOrdersCount}
          </div>
          <div className="text-[11px] text-stone-500">Awaiting acceptance/dispatch</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>Dispatched / Delivered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-mono-numbers">
            {fulfilledOrdersCount}
          </div>
          <div className="text-[11px] text-stone-500">Cold-chain delivered to kitchens</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs text-stone-500 flex items-center justify-between">
            <span>Contracted Farm-Gate Total</span>
            <DollarSign className="w-4 h-4 text-emerald-800" />
          </div>
          <div className="text-2xl font-bold text-emerald-950 font-mono-numbers">
            ₹{totalEarnedRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-500">0% intermediary deductions</div>
        </div>
      </div>

      {/* Incoming Buyer Orders Section */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden space-y-4">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">Incoming Buyer Requisitions & Fulfillment</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Direct commercial orders placed by hotels, supermarkets, and institutional canteens.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Order / Batch</th>
                <th className="py-3 px-4 font-semibold">Purchaser Entity</th>
                <th className="py-3 px-4 font-semibold">Crop</th>
                <th className="py-3 px-4 font-semibold text-right">Volume</th>
                <th className="py-3 px-4 font-semibold text-right">Valuation (₹)</th>
                <th className="py-3 px-4 font-semibold">Required By</th>
                <th className="py-3 px-4 font-semibold">Fulfillment State</th>
                <th className="py-3 px-4 font-semibold text-right">Fulfillment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-900 font-mono-numbers">{ord.orderNumber}</div>
                    <button
                      onClick={() => quickNavigateToBatch(ord.batchId)}
                      className="text-[11px] text-emerald-800 hover:underline flex items-center gap-1 font-mono-numbers mt-0.5 cursor-pointer"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>{ord.batchId}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-stone-900">{ord.buyerName}</div>
                    <div className="text-stone-500 text-[11px]">{ord.buyerType} · {ord.buyerLocation}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-stone-800">{ord.cropName}</td>
                  <td className="py-3.5 px-4 text-right font-mono-numbers font-medium">
                    {ord.quantityKg.toLocaleString()} kg
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono-numbers font-bold text-emerald-950">
                    ₹{ord.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-mono-numbers">{ord.deliveryDateRequested}</td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize font-medium text-stone-700">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {ord.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'accepted')}
                        className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded font-medium cursor-pointer"
                      >
                        Accept
                      </button>
                    )}
                    {ord.status === 'accepted' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'in_transit')}
                        className="px-2.5 py-1 bg-stone-800 hover:bg-stone-900 text-white rounded font-medium cursor-pointer"
                      >
                        Dispatch Lot
                      </button>
                    )}
                    {ord.status === 'in_transit' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'delivered')}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium cursor-pointer"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {ord.status === 'delivered' && (
                      <span className="text-[11px] text-stone-500 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Produce Listings Table with Edit & Manage Options */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden space-y-4">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">Your Active Harvest Inventory Lots</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Edit produce details, adjust rates per kg, toggle reservation status, or view batch passports.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Crop Name & Variety</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Quality Grade</th>
                <th className="py-3 px-4 font-semibold text-right">Available Qty</th>
                <th className="py-3 px-4 font-semibold text-right">Price / kg</th>
                <th className="py-3 px-4 font-semibold">Harvest Date</th>
                <th className="py-3 px-4 font-semibold">Batch Code</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {listings.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div>{item.cropName}</div>
                    <div className="text-[11px] text-stone-500">{item.variety}</div>
                  </td>
                  <td className="py-3.5 px-4 capitalize text-stone-600">{item.category}</td>
                  <td className="py-3.5 px-4 text-stone-700">{item.qualityGrade}</td>
                  <td className="py-3.5 px-4 text-right font-mono-numbers font-medium">
                    {item.availableQtyKg.toLocaleString()} {item.quantityUnit || 'kg'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono-numbers font-bold text-emerald-950">
                    ₹{item.pricePerKg}
                  </td>
                  <td className="py-3.5 px-4 font-mono-numbers text-stone-600">{item.harvestDate}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => quickNavigateToBatch(item.batchId)}
                      className="text-[11px] font-mono-numbers text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>{item.batchId}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 capitalize text-stone-700">
                    {item.status.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1 hover:bg-stone-100 rounded text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                      title="Edit this produce listing"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {item.status === 'active' ? (
                      <button
                        onClick={() => updateListingStatus(item.id, 'reserved')}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] cursor-pointer"
                      >
                        Reserve
                      </button>
                    ) : (
                      <button
                        onClick={() => updateListingStatus(item.id, 'active')}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded text-[11px] cursor-pointer"
                      >
                        Activate
                      </button>
                    )}

                    <button
                      onClick={() => deleteListing(item.id)}
                      className="p-1 hover:bg-rose-50 rounded text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                      title="Delete listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Form Modal (Requirement 2.C) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  {editingListingId ? 'Edit Harvest Lot' : 'New Harvest Lot'}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  {editingListingId ? 'Update Listing Details' : 'Publish Produce Listing to AgriLink'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3.5 text-xs">
              {/* Crop Name & Variety */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Crop Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Crisp English Cucumbers"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className={`w-full bg-white border rounded px-2.5 py-1.5 focus:outline-none ${
                      formErrors.cropName ? 'border-rose-500 focus:border-rose-600' : 'border-stone-200 focus:border-emerald-700'
                    }`}
                  />
                  {formErrors.cropName && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.cropName}</span>
                  )}
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Variety / Cultivar</label>
                  <input
                    type="text"
                    placeholder="e.g. F1 Green Long"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Category & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CropCategory)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains & Cereals</option>
                    <option value="pulses">Pulses & Legumes</option>
                    <option value="spices">Spices</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Quality Grade</label>
                  <select
                    value={qualityGrade}
                    onChange={(e) => setQualityGrade(e.target.value as QualityGrade)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Grade A (Premium Retail)">Grade A (Premium Retail)</option>
                    <option value="Grade A (Export)">Grade A (Export)</option>
                    <option value="Grade B (Processing)">Grade B (Processing)</option>
                    <option value="Organic Certified">Organic Certified</option>
                  </select>
                </div>
              </div>

              {/* Quantity, Unit, Min Order, Price per kg */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Available Qty <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={availableQtyKg}
                    onChange={(e) => setAvailableQtyKg(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 font-mono-numbers focus:outline-none focus:border-emerald-700"
                  />
                  {formErrors.availableQtyKg && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.availableQtyKg}</span>
                  )}
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Unit</label>
                  <select
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value as QuantityUnit)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="quintals">Quintals (100kg)</option>
                    <option value="crates">Crates (15kg)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Min Order</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={minOrderQtyKg}
                    onChange={(e) => setMinOrderQtyKg(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 font-mono-numbers focus:outline-none focus:border-emerald-700"
                  />
                  {formErrors.minOrderQtyKg && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.minOrderQtyKg}</span>
                  )}
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Price / kg (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 font-mono-numbers focus:outline-none focus:border-emerald-700"
                  />
                  {formErrors.pricePerKg && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.pricePerKg}</span>
                  )}
                </div>
              </div>

              {/* Location & Batch ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Location / Cluster <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Batch Code (Leave blank to auto-generate)</label>
                  <input
                    type="text"
                    placeholder="e.g. BATCH-2026-CUC-104"
                    value={batchIdInput}
                    onChange={(e) => setBatchIdInput(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 font-mono-numbers focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Harvest Date & Shelf Life */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Harvest Date</label>
                  <input
                    type="date"
                    required
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Shelf Life (Days)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={shelfLifeDays}
                    onChange={(e) => setShelfLifeDays(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 font-mono-numbers focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Description & Quality Notes</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Irrigation method, post-harvest sorting, and pre-cooling condition..."
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingListingId ? 'Save Changes' : 'Publish to Exchange'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
