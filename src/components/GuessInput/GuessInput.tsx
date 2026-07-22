"use client";

import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Problem } from '@/types/problem';

interface GuessInputProps {
  problems: Problem[];
  onSelectGuess: (problem: Problem) => void;
  disabled: boolean;
}

export const GuessInput: React.FC<GuessInputProps> = ({ problems, onSelectGuess, disabled }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Problem[]>([]);

  // Configure Fuse to search 'name', 'problemNum', and 'slug'
  const fuse = useMemo(() => {
    return new Fuse(problems, {
      keys: ['name', 'problemNum', 'slug'],
      threshold: 0.3,
    });
  }, [problems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      const results = fuse.search(val).slice(0, 5).map((res) => res.item);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (problem: Problem) => {
    onSelectGuess(problem);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto my-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder={disabled ? "Game Over" : "Search LeetCode problem..."}
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-green-500 disabled:opacity-50"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl max-h-60 overflow-y-auto">
          {suggestions.map((p) => (
            <li
              key={p.problemNum}
              onClick={() => handleSelect(p)}
              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-sm text-zinc-200 flex justify-between items-center border-b border-zinc-700/50 last:border-none"
            >
              <span>{p.name}</span>
              <span className="text-xs text-zinc-400">#{p.problemNum}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};