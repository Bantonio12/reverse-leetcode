import React from 'react';
import { FeedbackColor } from '@/types/game';

interface AttributeCellProps {
  label?: string;
  value: React.ReactNode;
  color?: FeedbackColor;
  direction?: 'up' | 'down' | 'exact';
  matchedItems?: string[];
  totalPoolSize?: number;
}

export const AttributeCell: React.FC<AttributeCellProps> = ({
  label,
  value,
  color = 'grey',
  direction,
  matchedItems,
  totalPoolSize,
}) => {
  const colorMap: Record<FeedbackColor, string> = {
    green: 'bg-green-600 text-white',
    yellow: 'bg-yellow-500 text-black',
    grey: 'bg-zinc-800 text-gray-300',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-3 rounded-md min-w-[80px] min-h-[80px] font-semibold text-center border border-zinc-700 transition-colors ${colorMap[color]}`}
    >
      {label && <span className="text-xs uppercase opacity-75 mb-1">{label}</span>}

      <div className="flex items-center gap-1">
        <span>{value}</span>
        {direction === 'up' && <span>▲</span>}
        {direction === 'down' && <span>▼</span>}
      </div>

      {matchedItems && totalPoolSize !== undefined && (
        <span className="text-xs mt-1 opacity-90">
          ({matchedItems.length}/{totalPoolSize})
        </span>
      )}
    </div>
  );
};