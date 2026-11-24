import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let colorClasses = 'border-stone-300 bg-white text-stone-900';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          colorClasses = 'border-emerald-600/30 bg-emerald-50/95 text-emerald-950';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClasses = 'border-rose-600/30 bg-rose-50/95 text-rose-950';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClasses = 'border-amber-600/30 bg-amber-50/95 text-amber-950';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-lg border shadow-lg transition-all flex items-start gap-3 ${colorClasses}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <div className="font-semibold">{toast.title}</div>
              <div className="text-stone-700 mt-0.5 leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-500 hover:text-stone-900 p-0.5 rounded cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
