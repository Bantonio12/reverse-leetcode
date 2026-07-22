"use client";

import React, { useState, useEffect } from 'react';
import { formatDate } from '@/utils/dateConverter';

function getTutorialStorageKey(date: Date): string {
  return `reverse-leetcode-tutorial-seen-${formatDate(date)}`;
}

export const HowToPlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storageKey = getTutorialStorageKey(new Date());
    const alreadySeenToday = localStorage.getItem(storageKey);
    if (!alreadySeenToday) {
      setIsOpen(true);
      localStorage.setItem(storageKey, 'true');
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-sm font-medium text-white transition-colors"
      >
        How to Play
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">How to Play</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="text-zinc-300 text-sm mb-4">
              Guess the daily LeetCode problem in 6 tries. After each guess,
              every attribute below is colored to tell you how close you are.
            </p>

            <ul className="space-y-3 text-sm text-zinc-300">
              <li>
                <span className="font-semibold text-white">Difficulty:</span>{' '}
                Green means exact match, yellow (with an arrow) means one
                step off (Easy/Medium/Hard), gray means two steps off.
              </li>
              <li>
                <span className="font-semibold text-white">Topics:</span>{' '}
                Green means the exact same set of topics, yellow means some
                topics overlap (shown as a count), gray means none do.
              </li>
              <li>
                <span className="font-semibold text-white">Algorithms:</span>{' '}
                Green means the exact same technique, yellow means a related
                technique from the same family (e.g. DFS and BFS), gray
                means unrelated.
              </li>
              <li>
                <span className="font-semibold text-white">Acceptance Rate:</span>{' '}
                Green means an exact match, yellow with an arrow shows
                whether the real problem's rate is higher or lower.
              </li>
              <li>
                <span className="font-semibold text-white">Problem Number:</span>{' '}
                Green means exact, yellow with an arrow shows whether the
                real problem's number is higher or lower.
              </li>
              <li>
                <span className="font-semibold text-white">Runtime:</span>{' '}
                Green means an exact match, yellow with an arrow shows
                whether the optimal runtime is faster or slower.
              </li>
            </ul>

            <p className="text-zinc-400 text-xs mt-4">
              Tip: click any attribute cell to see its full value if it's
              truncated.
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-5 py-2 px-4 bg-green-600 hover:bg-green-500 font-semibold rounded-md transition-colors text-white"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
