import React, { useState } from 'react';
import { GuessResult } from '@/types/game';

interface ResultsShareCardProps {
  isWin: boolean;
  guesses: GuessResult[];
  streak: number;
  answerTitle: string;
}

export const ResultsShareCard: React.FC<ResultsShareCardProps> = ({
  isWin,
  guesses,
  streak,
  answerTitle,
}) => {
  const [copied, setCopied] = useState(false);

  const generateShareGrid = () => {
    // Converts color results to grid emojis
    return guesses
      .map((g) => {
        const diffEmoji = g.difficulty.color === 'green' ? '🟩' : g.difficulty.color === 'yellow' ? '🟨' : '⬛';
        const topicEmoji = g.topics.color === 'green' ? '🟩' : g.topics.color === 'yellow' ? '🟨' : '⬛';
        return `${diffEmoji}${topicEmoji}`;
      })
      .join('\n');
  };

  const handleCopy = () => {
    const text = `Reverse LeetCode ${isWin ? guesses.length : 'X'}/6\n\n${generateShareGrid()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl max-w-md mx-auto text-center shadow-2xl">
      <h2 className="text-2xl font-bold mb-2">{isWin ? 'Solved!' : 'Game Over'}</h2>
      <p className="text-zinc-400 text-sm mb-4">
        Today's Problem: <span className="text-white font-semibold">{answerTitle}</span>
      </p>

      <div className="flex justify-around my-4 bg-zinc-800 p-3 rounded-lg">
        <div>
          <div className="text-2xl font-bold text-green-400">{guesses.length}</div>
          <div className="text-xs text-zinc-400 uppercase">Guesses</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-yellow-400">{streak}</div>
          <div className="text-xs text-zinc-400 uppercase">Streak</div>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-500 font-semibold rounded-md transition-colors text-white mt-2"
      >
        {copied ? 'Copied to Clipboard!' : 'Share Results'}
      </button>
    </div>
  );
};