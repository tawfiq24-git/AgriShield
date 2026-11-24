import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  subItem?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  actions,
  subItem
}) => {
  return (
    <div className="border-b border-stone-200 pb-5 mb-6 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Breadcrumbs subItem={subItem} />
        {badge && (
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider self-start sm:self-auto">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
