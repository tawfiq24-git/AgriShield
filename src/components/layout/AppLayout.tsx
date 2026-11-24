import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { DemoBanner } from '../common/DemoBanner';
import { ToastContainer } from '../common/ToastContainer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      {/* Top Prototype Context Banner */}
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Mobile Slide-over Drawer Backdrop */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-stone-900 z-10 animate-in slide-in-from-left duration-200">
              <Sidebar
                isMobileDrawer={true}
                onCloseMobile={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header with App Title, Quick Actions & Demo Profile Switcher */}
          <Header onToggleMobileMenu={() => setMobileDrawerOpen(true)} />

          {/* Dynamic Page Viewport */}
          <main className="flex-1 pb-16">
            {children}
          </main>

          {/* Persistent Footer */}
          <Footer />
        </div>
      </div>

      {/* Global Interactive Notification Toasts */}
      <ToastContainer />
    </div>
  );
};
