import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProduceListing,
  OrderRequest,
  Role,
  TraceabilityBatch,
  UserProfile,
  AnomalyAlert
} from '../types';
import {
  INITIAL_LISTINGS,
  INITIAL_ORDERS,
  BATCH_TRACEABILITY_RECORDS,
  ANOMALY_ALERTS
} from '../data/demoData';

export type PageView =
  | 'landing'
  | 'marketplace'
  | 'farmer'
  | 'buyer'
  | 'insights'
  | 'logistics'
  | 'traceability'
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export const DEMO_PROFILES: Record<Role, UserProfile> = {
  farmer: {
    id: 'usr-farmer-01',
    name: 'Rajesh Patil',
    role: 'farmer',
    organization: 'Sahyadri Farmers Producer Co.',
    location: 'Nashik Cluster, Maharashtra',
    avatarText: 'RP'
  },
  buyer: {
    id: 'usr-buyer-01',
    name: 'Ananya Sen',
    role: 'buyer',
    organization: 'Grand Hyatt Culinary Operations',
    location: 'Mumbai Metro, Maharashtra',
    avatarText: 'AS'
  },
  logistics: {
    id: 'usr-logistics-01',
    name: 'Vikram Gaikwad',
    role: 'logistics',
    organization: 'Western Cold-Chain Logistics Hub',
    location: 'Chakan Center, Pune',
    avatarText: 'VG'
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Dr. Sunita Rao',
    role: 'admin',
    organization: 'AgriLink Quality & Moderation Directorate',
    location: 'National Exchange Hub',
    avatarText: 'SR'
  },
  guest: {
    id: 'usr-guest-01',
    name: 'Wholesale Visitor',
    role: 'guest',
    organization: 'AgriLink Trade Observer',
    location: 'Regional Agricultural Grid',
    avatarText: 'WV'
  }
};

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  currentUserProfile: UserProfile;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  listings: ProduceListing[];
  orders: OrderRequest[];
  anomalies: AnomalyAlert[];
  selectedTraceBatchId: string;
  setSelectedTraceBatchId: (batchId: string) => void;
  activeBatchData: TraceabilityBatch | null;
  addListing: (listing: Omit<ProduceListing, 'id' | 'isVerified' | 'status'>) => void;
  updateListing: (id: string, updatedData: Partial<ProduceListing>) => void;
  deleteListing: (id: string) => void;
  updateListingStatus: (listingId: string, status: ProduceListing['status']) => void;
  placeOrder: (order: Omit<OrderRequest, 'id' | 'orderNumber' | 'orderDate' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: OrderRequest['status']) => void;
  updateAnomalyReview: (id: string, status: 'open' | 'investigating' | 'resolved', notes: string, inspector?: string) => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  quickNavigateToBatch: (batchId: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [activeRole, setActiveRoleState] = useState<Role>('guest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Persistent in memory with local demo fallback
  const [listings, setListings] = useState<ProduceListing[]>(() => {
    try {
      const saved = localStorage.getItem('agrilink_listings');
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem('agrilink_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>(() => {
    try {
      const saved = localStorage.getItem('agrilink_anomalies');
      return saved ? JSON.parse(saved) : ANOMALY_ALERTS;
    } catch {
      return ANOMALY_ALERTS;
    }
  });

  const [selectedTraceBatchId, setSelectedTraceBatchId] = useState<string>('BATCH-2026-TOM-042');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('agrilink_listings', JSON.stringify(listings));
    } catch {}
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('agrilink_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('agrilink_anomalies', JSON.stringify(anomalies));
    } catch {}
  }, [anomalies]);

  const setActiveRole = (role: Role) => {
    setActiveRoleState(role);
  };

  const currentUserProfile = DEMO_PROFILES[activeRole];

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addListing = (newListingData: Omit<ProduceListing, 'id' | 'isVerified' | 'status'>) => {
    const id = `prod-${Date.now()}`;
    const newListing: ProduceListing = {
      ...newListingData,
      id,
      isVerified: true,
      status: 'active'
    };
    setListings(prev => [newListing, ...prev]);
    addToast('success', 'Listing Created (Demo)', `${newListing.cropName} (${newListing.availableQtyKg} ${newListing.quantityUnit || 'kg'}) added to local demo state.`);
  };

  const updateListing = (id: string, updatedData: Partial<ProduceListing>) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );
    addToast('success', 'Listing Updated (Demo)', `Changes saved to local browser session.`);
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Listing Removed (Demo)', `Lot deleted from demonstration inventory.`);
  };

  const updateListingStatus = (listingId: string, status: ProduceListing['status']) => {
    setListings(prev =>
      prev.map(item => (item.id === listingId ? { ...item, status } : item))
    );
    addToast('info', 'Listing Status Changed', `Status updated to "${status.replace('_', ' ')}".`);
  };

  const placeOrder = (orderData: Omit<OrderRequest, 'id' | 'orderNumber' | 'orderDate' | 'status'>) => {
    const id = `ord-${Date.now()}`;
    const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRequest = {
      ...orderData,
      id,
      orderNumber,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    // Deduct quantity from listing
    setListings(prev =>
      prev.map(item => {
        if (item.id === orderData.listingId) {
          const remaining = Math.max(0, item.availableQtyKg - orderData.quantityKg);
          return {
            ...item,
            availableQtyKg: remaining,
            status: remaining === 0 ? 'sold_out' : item.status
          };
        }
        return item;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    addToast('success', 'Order Submitted (Demo)', `Requisition #${orderNumber} for ${orderData.quantityKg} kg placed directly with ${orderData.farmerOrFpo}.`);
  };

  const updateOrderStatus = (orderId: string, status: OrderRequest['status']) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
    addToast('info', 'Order Updated', `Order #${orderId} marked as ${status.replace('_', ' ')}.`);
  };

  const updateAnomalyReview = (
    id: string,
    status: 'open' | 'investigating' | 'resolved',
    notes: string,
    inspector?: string
  ) => {
    setAnomalies(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              reviewStatus: status,
              reviewerNotes: notes,
              assignedInspector: inspector || a.assignedInspector
            }
          : a
      )
    );
    addToast(
      status === 'resolved' ? 'success' : 'info',
      'Anomaly Review Saved',
      `Incident ${id} set to "${status}". Action logged to human audit trail.`
    );
  };

  const quickNavigateToBatch = (batchId: string) => {
    setSelectedTraceBatchId(batchId);
    setCurrentPage('traceability');
  };

  const resetDemoData = () => {
    setListings(INITIAL_LISTINGS);
    setOrders(INITIAL_ORDERS);
    setAnomalies(ANOMALY_ALERTS);
    setSelectedTraceBatchId('BATCH-2026-TOM-042');
    try {
      localStorage.removeItem('agrilink_listings');
      localStorage.removeItem('agrilink_orders');
      localStorage.removeItem('agrilink_anomalies');
    } catch {}
    addToast('info', 'Demo Data Reset', 'Standard agricultural demo records have been restored.');
  };

  const activeBatchData = BATCH_TRACEABILITY_RECORDS[selectedTraceBatchId] || {
    batchId: selectedTraceBatchId,
    cropName: 'Custom Agricultural Produce Batch',
    variety: 'Certified Standard',
    farmerOrFpo: 'Cooperative Farmer Member',
    farmLocation: 'Regional Aggregation Center Zone',
    harvestDate: 'Recent Harvest 2026',
    certificationNo: 'STD-AGRI-2026-VERIFIED',
    soilHealthIndex: 'Nutrient Rich Certified Soil (pH 6.5)',
    moistureContent: 'Optimal Standard Range',
    pesticideResidueTest: 'Safe MRL Passed',
    coldChainTemperatureAvg: '12.0°C (Controlled transit)',
    steps: [
      {
        stage: 'Farm Gate Harvest & Quality Sorting',
        actor: 'Registered Grower Cluster',
        timestamp: 'Batch Registration Date',
        location: 'Origin Agro-Zone',
        details: 'Visual inspection, grade separation, and digital weighment registered into AgriLink system.',
        verifiedBy: 'Agronomist Inspector',
        parameters: { 'Grade': 'Export / A', 'Packaging': 'Crates' }
      },
      {
        stage: 'Collection Center Receiving',
        actor: 'AgriLink Regional Aggregation Depot',
        timestamp: 'Intake Inspection',
        location: 'Cold Aggregation Facility',
        details: 'Physical verification and pre-cooling protocol applied.',
        verifiedBy: 'Depot Supervisor',
        parameters: { 'Storage Temp': '11.5°C' }
      }
    ]
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        activeRole,
        setActiveRole,
        currentUserProfile,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        listings,
        orders,
        anomalies,
        selectedTraceBatchId,
        setSelectedTraceBatchId,
        activeBatchData,
        addListing,
        updateListing,
        deleteListing,
        updateListingStatus,
        placeOrder,
        updateOrderStatus,
        updateAnomalyReview,
        toasts,
        addToast,
        removeToast,
        quickNavigateToBatch,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
