import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceListing, CropCategory, QualityGrade } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { EmptyState } from '../common/EmptyState';
import { DemoNotice } from '../common/DemoNotice';
import {
  Search,
  Filter,
  QrCode,
  ShoppingCart,
  Check,
  X,
  MapPin,
  Calendar,
  Scale,
  Award,
  Layers,
  Sparkles,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { listings, placeOrder, quickNavigateToBatch } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [availabilityOnly, setAvailabilityOnly] = useState<boolean>(true);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [quantityMode, setQuantityMode] = useState<'all' | 'retail' | 'bulk'>('all');
  const [sortBy, setSortBy] = useState<'harvest' | 'price_asc' | 'price_desc' | 'qty_desc'>('harvest');

  // Order modal state
  const [selectedListingForOrder, setSelectedListingForOrder] = useState<ProduceListing | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(100);
  const [buyerName, setBuyerName] = useState('Taj Connemara Kitchens');
  const [buyerType, setBuyerType] = useState<
    'Hotel & Restaurant' | 'Supermarket Chain' | 'Institutional Canteen' | 'Food Processor' | 'Direct Retailer'
  >('Hotel & Restaurant');
  const [buyerLocation, setBuyerLocation] = useState('Central Chennai / Metro Core');
  const [deliveryAddress, setDeliveryAddress] = useState('Receiving Bay 3, Binny Road, Chennai');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-16');

  // Extract unique locations from listings
  const locationsList = useMemo(() => {
    const locs = Array.from(new Set(listings.map(l => l.location.split(',')[0].trim())));
    return locs;
  }, [listings]);

  // Filter listings based on search, location, price, availability, and quantity tier
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmerOrFpo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.batchId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesLocation =
        selectedLocation === 'all' || item.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesGrade =
        selectedGrade === 'all' || item.qualityGrade === selectedGrade;

      const matchesPrice = item.pricePerKg <= maxPrice;

      const matchesAvailability = !availabilityOnly || (item.availableQtyKg > 0 && item.status === 'active');

      const matchesQuantityTier =
        quantityMode === 'all' ||
        (quantityMode === 'retail' && item.minOrderQtyKg <= 100) ||
        (quantityMode === 'bulk' && item.availableQtyKg >= 1000);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesGrade &&
        matchesPrice &&
        matchesAvailability &&
        matchesQuantityTier
      );
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePerKg - b.pricePerKg;
      if (sortBy === 'price_desc') return b.pricePerKg - a.pricePerKg;
      if (sortBy === 'qty_desc') return b.availableQtyKg - a.availableQtyKg;
      return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime();
    });
  }, [
    listings,
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedGrade,
    maxPrice,
    availabilityOnly,
    quantityMode,
    sortBy
  ]);

  const openOrderModal = (listing: ProduceListing, initialMode: 'retail' | 'bulk' = 'bulk') => {
    setSelectedListingForOrder(listing);
    const suggestedQty =
      initialMode === 'retail'
        ? Math.max(listing.minOrderQtyKg, Math.min(100, listing.availableQtyKg))
        : Math.max(listing.minOrderQtyKg, Math.min(500, listing.availableQtyKg));
    setOrderQuantity(suggestedQty);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingForOrder) return;

    placeOrder({
      listingId: selectedListingForOrder.id,
      cropName: selectedListingForOrder.cropName,
      buyerName,
      buyerType,
      buyerLocation,
      farmerOrFpo: selectedListingForOrder.farmerOrFpo,
      quantityKg: orderQuantity,
      quantityUnit: 'kg',
      pricePerKg: selectedListingForOrder.pricePerKg,
      totalAmount: orderQuantity * selectedListingForOrder.pricePerKg,
      deliveryDateRequested: deliveryDate,
      batchId: selectedListingForOrder.batchId,
      deliveryAddress,
      collectionCenterId: 'hub-nashik'
    });

    setSelectedListingForOrder(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedGrade('all');
    setAvailabilityOnly(false);
    setMaxPrice(300);
    setQuantityMode('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <PageHeader
        badge="Direct Produce Catalog"
        title="Agricultural Produce Marketplace"
        description="Browse certified harvest batches directly from farmers and FPO clusters. Compare farm-gate rates, verify cold-chain intake dates, and request retail or institutional bulk contracts."
      />

      {/* Filter and Control Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop name (e.g. Tomatoes, Mangoes), variety, producer FPO, or batch code..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-700 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end lg:self-auto text-xs">
            <span className="text-stone-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="harvest">Freshest Harvest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="qty_desc">Available Volume (Highest)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Comprehensive Multi-Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-stone-100 text-xs">
          {/* Category Filter */}
          <div>
            <label className="block text-stone-500 font-medium mb-1">Crop Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains & Cereals</option>
              <option value="pulses">Pulses & Legumes</option>
            </select>
          </div>

          {/* Location Filter (Requirement 2.B) */}
          <div>
            <label className="block text-stone-500 font-medium mb-1">Origin Cluster / State</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Growing Regions</option>
              {locationsList.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Quality Grade Filter */}
          <div>
            <label className="block text-stone-500 font-medium mb-1">Quality Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Grades</option>
              <option value="Grade A (Export)">Grade A (Export)</option>
              <option value="Grade A (Premium Retail)">Grade A (Premium Retail)</option>
              <option value="Grade B (Processing)">Grade B (Processing)</option>
              <option value="Organic Certified">Organic Certified</option>
            </select>
          </div>

          {/* Quantity Tier: Retail vs Bulk (Requirement 2.B) */}
          <div>
            <label className="block text-stone-500 font-medium mb-1">Quantity Tier</label>
            <select
              value={quantityMode}
              onChange={(e) => setQuantityMode(e.target.value as any)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Order Sizes</option>
              <option value="retail">Retail Orders (25 - 100 kg min)</option>
              <option value="bulk">Bulk Institutional (1000+ kg lots)</option>
            </select>
          </div>

          {/* Max Price Range Filter (Requirement 2.B) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-stone-500 font-medium">Max Price / kg</label>
              <span className="font-bold text-emerald-950 font-mono-numbers">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={20}
              max={300}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
          </div>
        </div>

        {/* Row 3: Active Filter Pills & In-Stock Check */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-stone-700 select-none">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(e) => setAvailabilityOnly(e.target.checked)}
              className="rounded accent-emerald-800 w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Show available lots in stock only</span>
          </label>

          <div className="flex items-center gap-3">
            <span className="text-stone-500 text-[11px]">
              Showing <span className="font-bold text-stone-900 font-mono-numbers">{filteredListings.length}</span> of {listings.length} lots
            </span>
            <button
              onClick={resetFilters}
              className="text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Produce Listings Grid */}
      {filteredListings.length === 0 ? (
        <EmptyState
          icon={Filter}
          title="No produce listings match your criteria"
          description="Try broadening your search term, clearing regional location filters, or expanding the price per kilogram slider."
          actionLabel="Reset All Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Product Visual Container */}
              <div className="relative h-48 bg-stone-100 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.cropName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
                    <Scale className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs font-medium">{item.cropName}</span>
                    <span className="text-[10px] text-stone-400">{item.variety}</span>
                  </div>
                )}

                {/* Grade Badge */}
                <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                  {item.qualityGrade}
                </div>

                {/* Stock Status Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] px-2 py-0.5 rounded font-mono-numbers">
                  {item.status === 'active' ? 'Available' : item.status.replace('_', ' ')}
                </div>
              </div>

              {/* Product Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata (Anti-slop 1.A) */}
                  <div className="text-xs text-stone-500 mb-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="capitalize font-medium text-stone-700">{item.category}</span>
                    <span>·</span>
                    <span className="font-mono-numbers">{item.variety}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {item.cropName}
                  </h3>

                  {/* Crop details */}
                  <div className="text-xs text-stone-600 mt-2.5 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{item.location} ({item.district})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate font-medium text-stone-800">{item.farmerOrFpo}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Harvest: {item.harvestDate} · Shelf Life: {item.shelfLifeDays} days</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 mt-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Volume & Price Footer */}
                <div className="pt-3 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-500">Available Lot: </span>
                      <span className="font-bold text-stone-900 font-mono-numbers">
                        {item.availableQtyKg.toLocaleString()} kg
                      </span>
                      <div className="text-[10px] text-stone-400 font-mono-numbers">
                        Min. Order: {item.minOrderQtyKg} kg
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-emerald-950 font-mono-numbers">
                        ₹{item.pricePerKg}
                      </span>
                      <span className="text-xs text-stone-500"> / kg</span>
                    </div>
                  </div>

                  {/* Actions: Batch Trace & Direct Order Tiers */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => quickNavigateToBatch(item.batchId)}
                        className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono-numbers rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                        title="Inspect soil test and cold chain logs"
                      >
                        <QrCode className="w-3.5 h-3.5 text-emerald-800" />
                        <span className="truncate max-w-[100px]">{item.batchId}</span>
                      </button>

                      <div className="flex-1 flex gap-1.5">
                        <button
                          onClick={() => openOrderModal(item, 'retail')}
                          disabled={item.availableQtyKg === 0}
                          className="flex-1 py-1.5 px-2 text-[11px] font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors text-center cursor-pointer disabled:opacity-50"
                        >
                          Retail Tier
                        </button>

                        <button
                          onClick={() => openOrderModal(item, 'bulk')}
                          disabled={item.availableQtyKg === 0}
                          className="flex-1 py-1.5 px-2 text-[11px] font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors text-center cursor-pointer disabled:opacity-50"
                        >
                          Bulk Contract
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Requisition Modal */}
      {selectedListingForOrder && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                  Direct Harvest Order Requisition
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  {selectedListingForOrder.cropName}
                </h3>
                <div className="text-xs text-stone-500">
                  Producer: {selectedListingForOrder.farmerOrFpo} · Batch: {selectedListingForOrder.batchId}
                </div>
              </div>
              <button
                onClick={() => setSelectedListingForOrder(null)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              {/* Quantity Slider / Direct Number Input */}
              <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-stone-700">Contract Quantity (kg)</label>
                  <span className="text-stone-500 font-mono-numbers">
                    Min: {selectedListingForOrder.minOrderQtyKg} kg | Lot Max: {selectedListingForOrder.availableQtyKg} kg
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={selectedListingForOrder.minOrderQtyKg}
                    max={selectedListingForOrder.availableQtyKg}
                    step={25}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="flex-1 accent-emerald-800"
                  />
                  <div className="w-24">
                    <input
                      type="number"
                      min={selectedListingForOrder.minOrderQtyKg}
                      max={selectedListingForOrder.availableQtyKg}
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs font-bold font-mono-numbers text-right focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>

                {/* Real-time Order Total Calculation */}
                <div className="pt-3 mt-2 border-t border-stone-200 flex justify-between items-center text-xs">
                  <span className="text-stone-600">
                    Formula: ₹{selectedListingForOrder.pricePerKg} × {orderQuantity} kg
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-stone-500">Total Farm Gate Payment: </span>
                    <span className="text-base font-bold text-emerald-950 font-mono-numbers">
                      ₹{(orderQuantity * selectedListingForOrder.pricePerKg).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buyer Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Purchaser Entity</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Commercial Sector</label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value as any)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Hotel & Restaurant">Hotel & Restaurant</option>
                    <option value="Supermarket Chain">Supermarket Chain</option>
                    <option value="Institutional Canteen">Institutional Canteen</option>
                    <option value="Food Processor">Food Processor</option>
                    <option value="Direct Retailer">Direct Retailer</option>
                  </select>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <label className="block font-medium text-stone-700">Kitchen / Dock Receiving Address</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Destination City</label>
                  <input
                    type="text"
                    required
                    value={buyerLocation}
                    onChange={(e) => setBuyerLocation(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Requested Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedListingForOrder(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Order Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
