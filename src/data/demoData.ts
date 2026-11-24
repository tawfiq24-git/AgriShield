import {
  ProduceListing,
  OrderRequest,
  TraceabilityBatch,
  CollectionCenter,
  VehicleTrip,
  DemandForecast,
  AnomalyAlert
} from '../types';
import tomatoesImg from '../assets/images/produce_heirloom_tomatoes_1791795058375.jpg';
import mangoesImg from '../assets/images/produce_alphonso_mangoes_1791795071713.jpg';
import heroFarmImg from '../assets/images/hero_agrilink_farm_1791795043822.jpg';

export const INITIAL_LISTINGS: ProduceListing[] = [
  {
    id: 'prod-001',
    cropName: 'Vine Ripe Heirloom Tomatoes',
    category: 'vegetables',
    variety: 'San Marzano Hybrid',
    farmerOrFpo: 'Sahyadri Farmers Producer Co.',
    farmerId: 'fpo-sahyadri',
    location: 'Nashik, Maharashtra',
    district: 'Dindori Cluster',
    availableQtyKg: 4200,
    minOrderQtyKg: 100,
    pricePerKg: 34,
    harvestDate: '2026-10-10',
    shelfLifeDays: 8,
    batchId: 'BATCH-2026-TOM-042',
    qualityGrade: 'Grade A (Premium Retail)',
    imageUrl: tomatoesImg,
    description: 'Crisp, hand-sorted vine tomatoes with uniform red brix rating > 5.2. Pre-cooled within 90 minutes of picking.',
    certification: 'GlobalGAP & Zero-Residue Certified',
    isVerified: true,
    status: 'active'
  },
  {
    id: 'prod-002',
    cropName: 'Alphonso (Hapus) Mangoes',
    category: 'fruits',
    variety: 'Ratnagiri Geographical Indication (GI)',
    farmerOrFpo: 'Devgad Konkan Horti-Farmers Union',
    farmerId: 'fpo-devgad',
    location: 'Devgad, Maharashtra',
    district: 'Sindhudurg',
    availableQtyKg: 1850,
    minOrderQtyKg: 50,
    pricePerKg: 280,
    harvestDate: '2026-10-09',
    shelfLifeDays: 14,
    batchId: 'BATCH-2026-MNG-108',
    qualityGrade: 'Grade A (Export)',
    imageUrl: mangoesImg,
    description: 'Authentic coastal GI-tagged Alphonso mangoes. Tree-ripened naturally with hay packing, free from calcium carbide.',
    certification: 'APEDA Phytosanitary & GI Tagged',
    isVerified: true,
    status: 'active'
  },
  {
    id: 'prod-003',
    cropName: 'Hydroponic Iceberg Crisp Lettuce',
    category: 'vegetables',
    variety: 'Great Lakes 118',
    farmerOrFpo: 'GreenCanopy Smart Farms',
    farmerId: 'farmer-greencanopy',
    location: 'Pune Rural, Maharashtra',
    district: 'Khed Taluka',
    availableQtyKg: 950,
    minOrderQtyKg: 25,
    pricePerKg: 85,
    harvestDate: '2026-10-11',
    shelfLifeDays: 6,
    batchId: 'BATCH-2026-LET-319',
    qualityGrade: 'Organic Certified',
    imageUrl: heroFarmImg,
    description: 'Clean room hydroponic iceberg lettuce. Washed in ozonated water, crisp texture ideal for quick-service restaurant chains.',
    certification: 'NPOP Organic / Pesticide Residue Free',
    isVerified: true,
    status: 'active'
  },
  {
    id: 'prod-004',
    cropName: 'Traditional Basmati Paddy (Aged)',
    category: 'grains',
    variety: 'Pusa Basmati 1121',
    farmerOrFpo: 'Karnal Grain Growers Collective',
    farmerId: 'fpo-karnal',
    location: 'Karnal, Haryana',
    district: 'Tarawari Belt',
    availableQtyKg: 18000,
    minOrderQtyKg: 500,
    pricePerKg: 62,
    harvestDate: '2026-10-02',
    shelfLifeDays: 365,
    batchId: 'BATCH-2026-WHT-882',
    qualityGrade: 'Grade A (Export)',
    description: 'Aged long grain aromatic paddy with grain length 8.35mm. Low broken ratio < 1.5%, moisture strictly below 12%.',
    certification: 'Agmark Special Grade',
    isVerified: true,
    status: 'active'
  },
  {
    id: 'prod-005',
    cropName: 'Green Greenhouse Bell Peppers',
    category: 'vegetables',
    variety: 'Indra F1 Hybrid',
    farmerOrFpo: 'Krishna Valley Growers FPO',
    farmerId: 'fpo-krishna',
    location: 'Sangli, Maharashtra',
    district: 'Miraj',
    availableQtyKg: 3100,
    minOrderQtyKg: 80,
    pricePerKg: 48,
    harvestDate: '2026-10-10',
    shelfLifeDays: 10,
    batchId: 'BATCH-2026-PEP-602',
    qualityGrade: 'Grade A (Premium Retail)',
    description: 'Uniform 4-lobed blocky capsicums grown in polyhouse with drip fertigation. Thick walls with extended crunch shelf life.',
    certification: 'Good Agricultural Practices (GAP)',
    isVerified: true,
    status: 'active'
  },
  {
    id: 'prod-006',
    cropName: 'Organic Red Onions (Medium-Large)',
    category: 'vegetables',
    variety: 'Nashik Gavran Red',
    farmerOrFpo: 'Godavari Farmer Alliance',
    farmerId: 'fpo-godavari',
    location: 'Lasalgaon, Maharashtra',
    district: 'Niphad',
    availableQtyKg: 12500,
    minOrderQtyKg: 200,
    pricePerKg: 26,
    harvestDate: '2026-10-04',
    shelfLifeDays: 60,
    batchId: 'BATCH-2026-ONI-419',
    qualityGrade: 'Grade B (Processing)',
    description: 'Dry cured farm fresh red onions, graded 55mm to 65mm. Well dried outer skin suitable for institutional catering & retail.',
    certification: 'State Agmark Standard',
    isVerified: true,
    status: 'active'
  }
];

export const INITIAL_ORDERS: OrderRequest[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-2026-9041',
    listingId: 'prod-001',
    cropName: 'Vine Ripe Heirloom Tomatoes',
    buyerName: 'Grand Hyatt Hotels F&B',
    buyerType: 'Hotel & Restaurant',
    buyerLocation: 'Mumbai Metro, Maharashtra',
    farmerOrFpo: 'Sahyadri Farmers Producer Co.',
    quantityKg: 600,
    pricePerKg: 34,
    totalAmount: 20400,
    orderDate: '2026-10-11',
    deliveryDateRequested: '2026-10-13',
    status: 'in_transit',
    batchId: 'BATCH-2026-TOM-042',
    deliveryAddress: 'Central Kitchen Loading Bay 4, BKC Bandra East, Mumbai',
    collectionCenterId: 'hub-nashik'
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-2026-9042',
    listingId: 'prod-003',
    cropName: 'Hydroponic Iceberg Crisp Lettuce',
    buyerName: 'FreshBasket Supermarkets Ltd',
    buyerType: 'Supermarket Chain',
    buyerLocation: 'Pune City, Maharashtra',
    farmerOrFpo: 'GreenCanopy Smart Farms',
    quantityKg: 200,
    pricePerKg: 85,
    totalAmount: 17000,
    orderDate: '2026-10-11',
    deliveryDateRequested: '2026-10-12',
    status: 'accepted',
    batchId: 'BATCH-2026-LET-319',
    deliveryAddress: 'Distribution Depot West, Hinjawadi Phase 2, Pune',
    collectionCenterId: 'hub-pune'
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-2026-9043',
    listingId: 'prod-004',
    cropName: 'Traditional Basmati Paddy (Aged)',
    buyerName: 'Apex Food Processing Corp',
    buyerType: 'Food Processor',
    buyerLocation: 'Sonipat, Haryana',
    farmerOrFpo: 'Karnal Grain Growers Collective',
    quantityKg: 4000,
    pricePerKg: 62,
    totalAmount: 248000,
    orderDate: '2026-10-09',
    deliveryDateRequested: '2026-10-14',
    status: 'pending',
    batchId: 'BATCH-2026-WHT-882',
    deliveryAddress: 'Milling Facility Unit B, Rai Industrial Area, Sonipat',
    collectionCenterId: 'hub-karnal'
  },
  {
    id: 'ord-104',
    orderNumber: 'ORD-2026-9044',
    listingId: 'prod-002',
    cropName: 'Alphonso (Hapus) Mangoes',
    buyerName: 'Organic Harvest Canteen Network',
    buyerType: 'Institutional Canteen',
    buyerLocation: 'Navi Mumbai',
    farmerOrFpo: 'Devgad Konkan Horti-Farmers Union',
    quantityKg: 250,
    pricePerKg: 280,
    totalAmount: 70000,
    orderDate: '2026-10-08',
    deliveryDateRequested: '2026-10-10',
    status: 'delivered',
    batchId: 'BATCH-2026-MNG-108',
    deliveryAddress: 'Campus 3 Dining Services, Vashi Infotech Park',
    collectionCenterId: 'hub-konkan'
  }
];

export const BATCH_TRACEABILITY_RECORDS: Record<string, TraceabilityBatch> = {
  'BATCH-2026-TOM-042': {
    batchId: 'BATCH-2026-TOM-042',
    cropName: 'Vine Ripe Heirloom Tomatoes',
    variety: 'San Marzano Hybrid',
    farmerOrFpo: 'Sahyadri Farmers Producer Co.',
    farmLocation: 'Plot 14-B, Dindori Watershed Basin, Nashik',
    harvestDate: '2026-10-10 06:15 IST',
    certificationNo: 'IND-GAP-2026-9921',
    soilHealthIndex: 'Organic Carbon 0.82%, pH 6.8 (Optimal)',
    moistureContent: '92.4% Brix 5.4',
    pesticideResidueTest: 'Zero Residue Passed',
    coldChainTemperatureAvg: '11.8°C (Set Target 10-12°C)',
    steps: [
      {
        stage: 'Harvest & Sorting at Farm Gate',
        actor: 'Sahyadri Field Team #3',
        timestamp: '2026-10-10 07:00 IST',
        location: 'Dindori Farm Cluster, Nashik',
        details: 'Hand-picked during cool morning window. Stems clipped with sanitized shears. Graded into 15kg ventilated crates.',
        verifiedBy: 'Field Inspector R. Patil',
        parameters: { 'Brix Level': '5.4', 'Firmness': '4.8 kg/cm²', 'Defect Rate': '< 0.5%' }
      },
      {
        stage: 'Hydro-Cooling & Intake Logging',
        actor: 'Nashik Aggregation Cold Hub',
        timestamp: '2026-10-10 09:30 IST',
        location: 'Pimpalgaon Hub Cold Room #2',
        details: 'Forced-air pre-cooling reduced field heat from 27°C down to 12°C in 75 minutes. Traceability barcode tagged to crate clusters.',
        verifiedBy: 'Quality Officer S. Deshmukh',
        parameters: { 'Chamber Temp': '11.5°C', 'Humidity': '92%', 'Pre-cooling Duration': '75 min' }
      },
      {
        stage: 'Quality Compliance & Residue Screening',
        actor: 'State Certified AgroLab',
        timestamp: '2026-10-10 14:00 IST',
        location: 'Nashik Food Testing Laboratory',
        details: 'Gas Chromatography multi-residue pesticide screen: No synthetic chemical residues detected above LOQ (<0.01 mg/kg).',
        verifiedBy: 'Lab Director Dr. A. Kulkarni',
        parameters: { 'Chemical Residue': 'Nil detected', 'Microbial E. Coli': 'Negative', 'Report ID': 'LAB-RES-4481' }
      },
      {
        stage: 'Cold-Chain Dispatch & Transit Monitoring',
        actor: 'AgriLink Logistics Fleet MH-15-EG-8102',
        timestamp: '2026-10-11 04:30 IST',
        location: 'En route: Nashik -> Mumbai Expressway',
        details: 'Refrigerated van reefer set to 11.0°C. Live IoT temperature data logged continuously every 5 minutes.',
        verifiedBy: 'Fleet Logistics Lead V. Gaikwad',
        parameters: { 'Average Reefer Temp': '11.2°C', 'GPS Speed': '62 km/h', 'Seal Tag': 'SEAL-99841' }
      }
    ]
  },
  'BATCH-2026-MNG-108': {
    batchId: 'BATCH-2026-MNG-108',
    cropName: 'Alphonso (Hapus) Mangoes',
    variety: 'Ratnagiri Geographical Indication (GI)',
    farmerOrFpo: 'Devgad Konkan Horti-Farmers Union',
    farmLocation: 'Orchard Orchard 28, Coastal Laterite Terraces, Devgad',
    harvestDate: '2026-10-09 08:00 IST',
    certificationNo: 'GI-APEDA-MH-DEV-412',
    soilHealthIndex: 'Laterite High Minerals, pH 6.2',
    moistureContent: 'Dry Matter 19.5%',
    pesticideResidueTest: 'Safe MRL Passed',
    coldChainTemperatureAvg: '13.2°C (Controlled Atmosphere)',
    steps: [
      {
        stage: 'Hand-Harvest with Traditional Net Catchers',
        actor: 'Konkan Orchard Harvesters',
        timestamp: '2026-10-09 08:30 IST',
        location: 'Devgad, Sindhudurg Coast',
        details: 'Picked at 80% physiological maturity with 10mm pedicel retained to prevent sap burn.',
        verifiedBy: 'GI Inspector N. Gawde',
        parameters: { 'Maturity Index': 'Stage 2.5', 'Sap Wash': 'De-sapped in water', 'Weight Avg': '255g' }
      },
      {
        stage: 'Hot Water Phytosanitary Dip & Drying',
        actor: 'Devgad APEDA Packhouse',
        timestamp: '2026-10-09 13:00 IST',
        location: 'Konkan Agropack Facility',
        details: 'Immersion at 48°C for 20 minutes to prevent anthracnose and fruit fly quarantine risks.',
        verifiedBy: 'Plant Quarantine Officer S. Sawant',
        parameters: { 'Dip Temp': '48.1°C', 'Duration': '20 min', 'Fungicide Status': 'Chemical Free' }
      },
      {
        stage: 'Padded Wooden Box Packing & Batch Coding',
        actor: 'Devgad Cooperative Logistics',
        timestamp: '2026-10-09 17:00 IST',
        location: 'Packhouse Bay 1',
        details: 'Packed in traditional paddy straw ventilated cartons with unique QR trace code affixed.',
        verifiedBy: 'Packhouse Supervisor M. Joshi',
        parameters: { 'Carton Count': '154 boxes', 'GI Verification': 'Tamper-proof seal verified' }
      },
      {
        stage: 'Delivered to Buyer Intake Facility',
        actor: 'Organic Harvest Canteen Network',
        timestamp: '2026-10-10 11:20 IST',
        location: 'Vashi Infotech Park Loading Hub',
        details: 'Intake inspection verified 100% sound fruits. Ripening chamber programmed for uniform natural aroma.',
        verifiedBy: 'Executive Chef D. Roy',
        parameters: { 'Acceptance Rate': '100%', 'Brix Target': '18.2 at maturity', 'Status': 'Consignee Signed' }
      }
    ]
  },
  'BATCH-2026-WHT-882': {
    batchId: 'BATCH-2026-WHT-882',
    cropName: 'Traditional Basmati Paddy (Aged)',
    variety: 'Pusa Basmati 1121',
    farmerOrFpo: 'Karnal Grain Growers Collective',
    farmLocation: 'Sector 9 Farm Tract, Indo-Gangetic Basin, Karnal',
    harvestDate: '2026-10-02 11:00 IST',
    certificationNo: 'AGMARK-SP-HR-7881',
    soilHealthIndex: 'Alluvial Clay Loam, Organic Carbon 0.65%',
    moistureContent: '11.8% (Target < 12%)',
    pesticideResidueTest: 'Safe MRL Passed',
    coldChainTemperatureAvg: 'Ambient Ventilated Silo (21°C)',
    steps: [
      {
        stage: 'Combine Harvesting & Field Threshing',
        actor: 'Karnal Custom Hiring Centre',
        timestamp: '2026-10-02 11:30 IST',
        location: 'Karnal Grain Belt',
        details: 'Harvested with specialized clean cutterbar to prevent kernel damage. Immediately transferred to grain trailers.',
        verifiedBy: 'Agronomist H. Singh',
        parameters: { 'Moisture at Harvest': '13.9%', 'Grain Length': '8.35mm' }
      },
      {
        stage: 'Continuous Sun & Aerated Silo Curing',
        actor: 'Karnal FPO Modern Warehouse',
        timestamp: '2026-10-03 16:00 IST',
        location: 'Warehouse Bay 4, Tarawari',
        details: 'Moisture gradually reduced to uniform 11.8% using low-temperature aeration to preserve signature 2-acetyl-1-pyrroline aroma.',
        verifiedBy: 'Warehouse Manager G. Sandhu',
        parameters: { 'Final Moisture': '11.8%', 'Chalkiness': '< 2%', 'Aroma Grade': 'High' }
      }
    ]
  }
};

export const COLLECTION_CENTRES: CollectionCenter[] = [
  {
    id: 'hub-nashik',
    name: 'Nashik Horticulture Aggregation Hub',
    location: 'Pimpalgaon Baswant, NH-3, Nashik',
    capacityTonnes: 120,
    currentTonnes: 78,
    refrigeratedRooms: 4,
    activeDispatches: 7,
    contactPerson: 'Kailas Shinde (Hub Manager)'
  },
  {
    id: 'hub-pune',
    name: 'Western Ghats Cold-Chain Center',
    location: 'Chakan Industrial Corridors, Pune',
    capacityTonnes: 90,
    currentTonnes: 52,
    refrigeratedRooms: 3,
    activeDispatches: 5,
    contactPerson: 'Meera Deshpande'
  },
  {
    id: 'hub-konkan',
    name: 'Konkan Coastal Produce Terminal',
    location: 'Chiplun Expressway Junction, Ratnagiri',
    capacityTonnes: 60,
    currentTonnes: 34,
    refrigeratedRooms: 2,
    activeDispatches: 3,
    contactPerson: 'Sanjay Sawant'
  },
  {
    id: 'hub-karnal',
    name: 'Haryana Grain & Pulse Consolidation Depot',
    location: 'GT Road Terminal, Karnal',
    capacityTonnes: 500,
    currentTonnes: 340,
    refrigeratedRooms: 1,
    activeDispatches: 12,
    contactPerson: 'Harpreet Singh Sandhu'
  }
];

export const VEHICLE_TRIPS: VehicleTrip[] = [
  {
    id: 'trip-401',
    vehicleNumber: 'MH-15-EG-8102',
    vehicleType: 'Refrigerated 4T Truck',
    driverName: 'Vikram Gaikwad',
    route: 'Nashik Hub -> Thane -> Mumbai BKC Canteen Hub',
    currentLoadKg: 3400,
    maxCapacityKg: 4000,
    currentTempCelsius: 11.2,
    status: 'In Transit',
    eta: 'Today, 14:45 IST (2h 15m remaining)',
    assignedBatches: ['BATCH-2026-TOM-042', 'BATCH-2026-PEP-602']
  },
  {
    id: 'trip-402',
    vehicleNumber: 'MH-12-RP-4491',
    vehicleType: 'Electric Van 1T',
    driverName: 'Anil Jadhav',
    route: 'Chakan Cold Center -> Hinjawadi IT Hub Retail Stores',
    currentLoadKg: 780,
    maxCapacityKg: 1000,
    currentTempCelsius: 8.5,
    status: 'Loading',
    eta: 'Today, 16:00 IST',
    assignedBatches: ['BATCH-2026-LET-319']
  },
  {
    id: 'trip-403',
    vehicleNumber: 'HR-05-AB-9920',
    vehicleType: 'Multi-Axle 12T',
    driverName: 'Gurdeep Singh',
    route: 'Karnal Aggregation Depot -> Delhi-NCR Wholesale Mill',
    currentLoadKg: 11500,
    maxCapacityKg: 12000,
    currentTempCelsius: 22.0,
    status: 'In Transit',
    eta: 'Today, 18:30 IST',
    assignedBatches: ['BATCH-2026-WHT-882']
  }
];

export const DEMAND_FORECASTS: DemandForecast[] = [
  {
    cropName: 'Vine Ripe Tomatoes',
    category: 'vegetables',
    currentAvgMarketPrice: 34,
    projectedDemandTrend: 'Surge (+18%)',
    recommendedPlantingWindow: 'Next staggered cycle: Oct 20 - Nov 05',
    deficitRegions: ['Mumbai Metro', 'Pune Urban', 'Goa Tourism Strip'],
    surplusRegions: ['Nashik Rural', 'Sangli Basin'],
    rationale: 'Upcoming festival & wedding banquet season projected to drive 18% higher institutional kitchen demand over next 21 days.'
  },
  {
    cropName: 'Hydroponic Iceberg Lettuce',
    category: 'vegetables',
    currentAvgMarketPrice: 85,
    projectedDemandTrend: 'High Deficit (+28%)',
    recommendedPlantingWindow: 'Immediate 4-week nursery batch',
    deficitRegions: ['Bengaluru East', 'Hyderabad IT Corridors', 'Mumbai'],
    surplusRegions: ['Pune Polyhouses'],
    rationale: 'Quick service restaurant franchise agreements expanding; local indoor suppliers are currently at 94% production capacity.'
  },
  {
    cropName: 'Aged Basmati Paddy',
    category: 'grains',
    currentAvgMarketPrice: 62,
    projectedDemandTrend: 'Stable (+3%)',
    recommendedPlantingWindow: 'Next Kharif preparation',
    deficitRegions: ['Southern Ports Export Hubs'],
    surplusRegions: ['Punjab', 'Haryana Belt'],
    rationale: 'Steady domestic consumption with healthy export quota clearance. Buffer stocks adequate across regional silos.'
  },
  {
    cropName: 'Green Bell Peppers',
    category: 'vegetables',
    currentAvgMarketPrice: 48,
    projectedDemandTrend: 'Moderate (-5%)',
    recommendedPlantingWindow: 'Hold sowing for 10 days to avoid price trough',
    deficitRegions: ['Surat Industrial Belt'],
    surplusRegions: ['Krishna Valley', 'Kolhapur'],
    rationale: 'Concurrent harvest flush from neighboring districts expected to temporarily soften wholesale mandi spot prices by 5%.'
  }
];

export const ANOMALY_ALERTS: AnomalyAlert[] = [
  {
    id: 'anom-01',
    severity: 'medium',
    type: 'Cold-chain Temperature Deviation',
    cropOrBatch: 'Reefer Van MH-15-EG-8102 (BATCH-2026-TOM-042)',
    location: 'Igatpuri Ghat Incline Section',
    detectedAt: '35 minutes ago',
    summary: 'Reefer compressor temperature briefly rose from 10.8°C to 12.6°C for 18 minutes during steep gradient climb before recovering to 11.2°C.',
    actionRequired: 'Automated alert sent to fleet driver. Core produce thermometer reading verified within safe threshold. Pre-alerted destination receiving dock.'
  },
  {
    id: 'anom-02',
    severity: 'high',
    type: 'Supply Shortage',
    cropOrBatch: 'Organic Salad Greens (Lettuce & Baby Spinach)',
    location: 'Western Maharashtra Aggregation Cluster',
    detectedAt: '2 hours ago',
    summary: 'Localized unseasonal squall in Khed valley damaged 15% open shade netting, reducing projected 10-day harvest volume by 3.8 tonnes.',
    actionRequired: 'AgriLink matching algorithm activated automated quota sharing across 4 nearby FPOs to fulfill standing institutional orders.'
  },
  {
    id: 'anom-03',
    severity: 'low',
    type: 'Price Anomaly',
    cropOrBatch: 'Red Onions (BATCH-2026-ONI-419)',
    location: 'Lasalgaon Mandi vs Direct Platform Rate',
    detectedAt: '4 hours ago',
    summary: 'Traditional mandi spot rates spiked 14% due to speculative trader withholding. Direct farmer contracts on AgriLink remained fair and stable.',
    actionRequired: 'System highlighted 18% cost savings for institutional buyers procuring directly through registered FPOs.'
  }
];
