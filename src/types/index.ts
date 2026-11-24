export type Role = 'guest' | 'farmer' | 'buyer' | 'logistics' | 'admin';

export type CropCategory = 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'spices';

export type QuantityUnit = 'kg' | 'quintals' | 'crates';

export type QualityGrade = 'Grade A (Export)' | 'Grade A (Premium Retail)' | 'Grade B (Processing)' | 'Organic Certified';

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  organization: string;
  location: string;
  avatarText: string;
}

export interface ProduceListing {
  id: string;
  cropName: string;
  category: CropCategory;
  variety: string;
  farmerOrFpo: string;
  farmerId: string;
  location: string;
  district: string;
  availableQtyKg: number;
  quantityUnit?: QuantityUnit;
  minOrderQtyKg: number;
  pricePerKg: number;
  harvestDate: string;
  shelfLifeDays: number;
  batchId: string;
  qualityGrade: QualityGrade;
  imageUrl?: string;
  description: string;
  certification: string;
  isVerified: boolean;
  status: 'active' | 'reserved' | 'sold_out';
}

export type OrderStatus = 'pending' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled';

export interface OrderRequest {
  id: string;
  orderNumber: string;
  listingId: string;
  cropName: string;
  buyerName: string;
  buyerType: 'Supermarket Chain' | 'Hotel & Restaurant' | 'Institutional Canteen' | 'Food Processor' | 'Direct Retailer';
  buyerLocation: string;
  farmerOrFpo: string;
  quantityKg: number;
  quantityUnit?: QuantityUnit;
  pricePerKg: number;
  totalAmount: number;
  orderDate: string;
  deliveryDateRequested: string;
  status: OrderStatus;
  batchId: string;
  deliveryAddress: string;
  collectionCenterId?: string;
}

export interface TraceabilityStep {
  stage: string;
  actor: string;
  timestamp: string;
  location: string;
  details: string;
  verifiedBy: string;
  parameters?: Record<string, string>;
}

export interface TraceabilityBatch {
  batchId: string;
  cropName: string;
  variety: string;
  farmerOrFpo: string;
  farmLocation: string;
  harvestDate: string;
  certificationNo: string;
  soilHealthIndex: string;
  moistureContent: string;
  pesticideResidueTest: 'Zero Residue Passed' | 'Safe MRL Passed' | 'Organic Confirmed';
  coldChainTemperatureAvg: string;
  steps: TraceabilityStep[];
}

export interface CollectionCenter {
  id: string;
  name: string;
  location: string;
  capacityTonnes: number;
  currentTonnes: number;
  refrigeratedRooms: number;
  activeDispatches: number;
  contactPerson: string;
}

export interface VehicleTrip {
  id: string;
  vehicleNumber: string;
  vehicleType: 'Refrigerated 4T Truck' | 'Covered 2T Pickup' | 'Electric Van 1T' | 'Multi-Axle 12T';
  driverName: string;
  route: string;
  currentLoadKg: number;
  maxCapacityKg: number;
  currentTempCelsius: number;
  status: 'Loading' | 'In Transit' | 'Unloading' | 'Completed';
  eta: string;
  assignedBatches: string[];
}

export interface DemandForecast {
  cropName: string;
  category: CropCategory;
  currentAvgMarketPrice: number;
  projectedDemandTrend: 'Surge (+18%)' | 'Stable (+3%)' | 'Moderate (-5%)' | 'High Deficit (+28%)';
  recommendedPlantingWindow: string;
  deficitRegions: string[];
  surplusRegions: string[];
  rationale: string;
}

export interface AnomalyAlert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  type: 'Price Anomaly' | 'Cold-chain Temperature Deviation' | 'Harvest Delay' | 'Supply Shortage';
  cropOrBatch: string;
  location: string;
  detectedAt: string;
  summary: string;
  actionRequired: string;
  reviewStatus?: 'open' | 'investigating' | 'resolved';
  reviewerNotes?: string;
  assignedInspector?: string;
}

