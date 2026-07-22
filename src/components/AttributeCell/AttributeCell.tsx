"use client";

import React, { useState, useRef, useEffect } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  const colorMap: Record<FeedbackColor, string> = {
    green: 'bg-green-600 text-white',
    yellow: 'bg-yellow-500 text-black',
    grey: 'bg-zinc-800 text-gray-300',
  };

  return (
    <div
      ref={cellRef}
      onClick={() => setIsExpanded((prev) => !prev)}
      className={`relative flex flex-col items-center justify-center p-3 rounded-md min-w-[80px] min-h-[80px] font-semibold text-center border border-zinc-700 transition-colors cursor-pointer ${colorMap[color]}`}
    >
      {label && <span className="text-xs uppercase opacity-75 mb-1">{label}</span>}

      <div className="flex items-center justify-center gap-1 w-full">
        <span className="truncate">{value}</span>
        {direction === 'up' && <span>▲</span>}
        {direction === 'down' && <span>▼</span>}
      </div>

      {matchedItems && totalPoolSize !== undefined && (
        <span className="text-xs mt-1 opacity-90">
          ({matchedItems.length}/{totalPoolSize})
        </span>
      )}

      {isExpanded && (
        <div
          onClick={(e) => e.stopPropagation()} 
          className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 min-w-[160px] max-w-[240px] bg-zinc-900 border border-zinc-700 rounded-md p-3 shadow-2xl text-sm font-normal text-white whitespace-normal"
        >
          {value}
        </div>
      )}
    </div>
  );
};
