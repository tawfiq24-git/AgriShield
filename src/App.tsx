/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './components/pages/LandingPage';
import { MarketplacePage } from './components/pages/MarketplacePage';
import { FarmerDashboard } from './components/pages/FarmerDashboard';
import { BuyerDashboard } from './components/pages/BuyerDashboard';
import { AiInsightsPage } from './components/pages/AiInsightsPage';
import { LogisticsDashboard } from './components/pages/LogisticsDashboard';
import { TraceabilityPage } from './components/pages/TraceabilityPage';
import { AdminDashboard } from './components/pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <AppLayout>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'marketplace' && <MarketplacePage />}
      {currentPage === 'farmer' && <FarmerDashboard />}
      {currentPage === 'buyer' && <BuyerDashboard />}
      {currentPage === 'insights' && <AiInsightsPage />}
      {currentPage === 'logistics' && <LogisticsDashboard />}
      {currentPage === 'traceability' && <TraceabilityPage />}
      {currentPage === 'admin' && <AdminDashboard />}
    </AppLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
