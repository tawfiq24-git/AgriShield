import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-10 text-center max-w-md mx-auto my-6 space-y-3">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-500">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-stone-900 text-sm">{title}</h3>
      <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="pt-2">
          <button
            onClick={onAction}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};
