import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COLLECTION_CENTRES, VEHICLE_TRIPS } from '../../data/demoData';
import { VehicleTrip } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { DemoNotice } from '../common/DemoNotice';
import {
  Truck,
  Thermometer,
  Warehouse,
  Plus,
  QrCode,
  MapPin,
  Clock,
  Compass,
  Check,
  AlertCircle
} from 'lucide-react';

export const LogisticsDashboard: React.FC = () => {
  const { quickNavigateToBatch, addToast } = useApp();
  const [trips, setTrips] = useState<VehicleTrip[]>(VEHICLE_TRIPS);
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);

  // New Trip form state
  const [vehicleNumber, setVehicleNumber] = useState('MH-14-CL-7704');
  const [vehicleType, setVehicleType] = useState<VehicleTrip['vehicleType']>('Refrigerated 4T Truck');
  const [driverName, setDriverName] = useState('Sachin Bhosale');
  const [route, setRoute] = useState('Pimpalgaon Hub -> Mumbai Dadar Wholesale Hub');
  const [loadKg, setLoadKg] = useState<number>(2800);
  const [maxCapacityKg, setMaxCapacityKg] = useState<number>(4000);
  const [tempCelsius, setTempCelsius] = useState<number>(10.5);

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrip: VehicleTrip = {
      id: `trip-${Date.now()}`,
      vehicleNumber,
      vehicleType,
      driverName,
      route,
      currentLoadKg: Number(loadKg),
      maxCapacityKg: Number(maxCapacityKg),
      currentTempCelsius: Number(tempCelsius),
      status: 'Loading',
      eta: 'Today, scheduled 19:30 IST (Demo Placeholder)',
      assignedBatches: ['BATCH-2026-TOM-042']
    };

    setTrips([newTrip, ...trips]);
    setIsNewTripModalOpen(false);
    addToast('success', 'Trip Scheduled (Demo)', `Vehicle ${vehicleNumber} allocated for ${route}.`);
  };

  const handleUpdateTripStatus = (tripId: string, newStatus: VehicleTrip['status']) => {
    setTrips(prev =>
      prev.map(t => (t.id === tripId ? { ...t, status: newStatus } : t))
    );
    addToast('info', 'Vehicle Trip Updated', `Trip status set to ${newStatus}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <PageHeader
        badge="Cold-Chain Infrastructure"
        title="Logistics Fleet & Collection Centers"
        description="Monitor rural aggregation hubs, pre-cooling cold rooms, vehicle load capacity utilization, and continuous IoT temperature telematics across transit corridors."
        actions={
          <button
            onClick={() => setIsNewTripModalOpen(true)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Vehicle Dispatch</span>
          </button>
        }
      />

      {/* Explicit Placeholder Notice (Requirement 2.F) */}
      <DemoNotice
        badge="Logistics Route Disclaimer"
        message="Route corridors, transit distance calculations, and ETAs displayed here are simulated demonstration placeholders. Real-time GPS OBD-II telemetry and Google Maps Fleet Engine routing will be integrated in future phases."
      />

      {/* Visual Hub Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs bg-stone-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Modern Aggregation Operations
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Integrated Cold Rooms & Reefer Telematics
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
              AgriLink routes all farm harvest through registered aggregation hubs equipped with rapid hydro-cooling, digital weighing platforms, and IoT thermal data logging to protect produce shelf life.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-300 font-mono-numbers">
              <div>Hub Network: <span className="text-white font-bold">4 Operational</span></div>
              <div>Fleet Utilization: <span className="text-white font-bold">84.2%</span></div>
              <div>Avg Transit Temp: <span className="text-emerald-400 font-bold">11.4°C (Target 10-12°C)</span></div>
            </div>
          </div>
          <div className="lg:col-span-5 h-56 lg:h-full">
            <img
              src="/src/assets/images/logistics_farm_hub_1791795082974.jpg"
              alt="Cold aggregation logistics center"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Regional Collection Centres Grid (Requirement 2.F) */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-bold text-stone-900">Regional Collection & Pre-Cooling Hubs</h2>
          <p className="text-xs text-stone-500 mt-0.5">Physical intake and quality aggregation hubs across production belts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTION_CENTRES.map((hub) => {
            const usagePercent = Math.round((hub.currentTonnes / hub.capacityTonnes) * 100);

            return (
              <div key={hub.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Warehouse className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono-numbers text-stone-500">
                    {hub.activeDispatches} active dispatches
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-stone-900 text-sm leading-snug">{hub.name}</h3>
                  <div className="text-[11px] text-stone-500 mt-0.5">{hub.location}</div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono-numbers">
                    <span className="text-stone-500">Capacity Load:</span>
                    <span className="font-semibold text-stone-800">
                      {hub.currentTonnes} / {hub.capacityTonnes} T ({usagePercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${usagePercent > 85 ? 'bg-amber-600' : 'bg-emerald-700'}`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600 flex justify-between items-center">
                  <span>{hub.refrigeratedRooms} Cold Chambers</span>
                  <span className="truncate max-w-[120px]">{hub.contactPerson.split(' ')[0]} (Lead)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Delivery Jobs & Fleet Table (Requirement 2.F) */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden space-y-4">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">Active Delivery Jobs & Fleet Telematics</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Live transit corridors, cargo weight allocation, and onboard refrigerated container status.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Vehicle & Driver</th>
                <th className="py-3 px-4 font-semibold">Route & Corridor (Placeholder)</th>
                <th className="py-3 px-4 font-semibold text-right">Capacity Utilization</th>
                <th className="py-3 px-4 font-semibold text-right">Reefer Temp</th>
                <th className="py-3 px-4 font-semibold">ETA (Simulated)</th>
                <th className="py-3 px-4 font-semibold">Assigned Batches</th>
                <th className="py-3 px-4 font-semibold">Delivery State</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {trips.map((trip) => {
                const loadPercent = Math.round((trip.currentLoadKg / trip.maxCapacityKg) * 100);

                return (
                  <tr key={trip.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 font-mono-numbers">{trip.vehicleNumber}</div>
                      <div className="text-[11px] text-stone-500">{trip.vehicleType} · {trip.driverName}</div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-stone-800 max-w-xs truncate">
                      {trip.route}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-mono-numbers font-semibold text-stone-900">
                        {trip.currentLoadKg.toLocaleString()} / {trip.maxCapacityKg.toLocaleString()} kg
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono-numbers">{loadPercent}% loaded</div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 font-mono-numbers font-bold text-stone-900">
                        <Thermometer className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{trip.currentTempCelsius}°C</span>
                      </div>
                      <div className="text-[10px] text-emerald-700">Optimal Range</div>
                    </td>

                    <td className="py-3.5 px-4 text-stone-600 font-mono-numbers">
                      {trip.eta}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {trip.assignedBatches.map((b) => (
                          <button
                            key={b}
                            onClick={() => quickNavigateToBatch(b)}
                            className="text-[10px] font-mono-numbers text-emerald-800 hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <QrCode className="w-3 h-3" />
                            <span>{b}</span>
                          </button>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-stone-800">
                      {trip.status}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      {trip.status === 'Loading' && (
                        <button
                          onClick={() => handleUpdateTripStatus(trip.id, 'In Transit')}
                          className="px-2.5 py-1 bg-stone-900 text-white rounded text-[11px] cursor-pointer"
                        >
                          Dispatch
                        </button>
                      )}
                      {trip.status === 'In Transit' && (
                        <button
                          onClick={() => handleUpdateTripStatus(trip.id, 'Unloading')}
                          className="px-2.5 py-1 bg-emerald-800 text-white rounded text-[11px] cursor-pointer"
                        >
                          Arrived
                        </button>
                      )}
                      {trip.status === 'Unloading' && (
                        <button
                          onClick={() => handleUpdateTripStatus(trip.id, 'Completed')}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-[11px] cursor-pointer"
                        >
                          Complete
                        </button>
                      )}
                      {trip.status === 'Completed' && (
                        <span className="text-[11px] text-stone-400">Ready</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Trip Modal */}
      {isNewTripModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex justify-between items-start border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                  Logistics Dispatch
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  Schedule New Cold-Chain Route (Demo)
                </h3>
              </div>
              <button onClick={() => setIsNewTripModalOpen(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <form onSubmit={handleCreateTrip} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Vehicle Plate Number</label>
                  <input
                    type="text"
                    required
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700 font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Vehicle Classification</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as any)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Refrigerated 4T Truck">Refrigerated 4T Truck</option>
                    <option value="Electric Van 1T">Electric Van 1T</option>
                    <option value="Covered 2T Pickup">Covered 2T Pickup</option>
                    <option value="Multi-Axle 12T">Multi-Axle 12T</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Assigned Driver</label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Reefer Set Temp (°C)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={tempCelsius}
                    onChange={(e) => setTempCelsius(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700 font-mono-numbers"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Logistics Corridor (Placeholder)</label>
                <input
                  type="text"
                  required
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Scheduled Load (kg)</label>
                  <input
                    type="number"
                    required
                    value={loadKg}
                    onChange={(e) => setLoadKg(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700 font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Vehicle Max Gross (kg)</label>
                  <input
                    type="number"
                    required
                    value={maxCapacityKg}
                    onChange={(e) => setMaxCapacityKg(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-700 font-mono-numbers"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsNewTripModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
