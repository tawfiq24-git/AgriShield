import React from 'react';
import { Info } from 'lucide-react';

interface DemoNoticeProps {
  message?: string;
  badge?: string;
}

export const DemoNotice: React.FC<DemoNoticeProps> = ({
  message = 'Demonstration State: Interactions and calculations are simulated locally in your browser. Real database persistence, payments, and blockchain verification will connect in future phases.',
  badge = 'Evaluation Prototype'
}) => {
  return (
    <div className="bg-stone-100/90 border border-stone-200/80 rounded-xl p-3.5 text-xs text-stone-700 flex items-start gap-2.5 my-4">
      <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
      <div className="flex-1 leading-relaxed">
        <span className="font-semibold text-stone-900">{badge}: </span>
        <span>{message}</span>
      </div>
    </div>
  );
};
