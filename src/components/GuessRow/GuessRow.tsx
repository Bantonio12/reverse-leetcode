import React from 'react';
import { GuessResult } from '@/types/game';
import { AttributeCell } from '../AttributeCell/AttributeCell';

interface GuessRowProps {
  guessResult?: GuessResult;
  problemTitle?: string;
}

export const GuessRow: React.FC<GuessRowProps> = ({ guessResult, problemTitle }) => {
  if (!guessResult) {
    // Static empty row placeholder (no pulsing animation)
    return (
      <div className="grid grid-cols-6 gap-2 my-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-20 bg-zinc-900/60 rounded-md border border-zinc-800/80" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col my-2">
      <div className="text-sm font-medium text-zinc-400 mb-1">{problemTitle}</div>
      <div className="grid grid-cols-6 gap-2">
        <AttributeCell
          label="Num"
          value={`#${guessResult.guessedProblemNum}`}
          direction={guessResult.problemNumber.direction}
          color={guessResult.problemNumber.direction === 'exact' ? 'green' : 'yellow'}
        />
        <AttributeCell
          label="Difficulty"
          value={guessResult.difficulty.color === 'green' ? 'Match' : 'Diff'}
          color={guessResult.difficulty.color}
          direction={'direction' in guessResult.difficulty ? guessResult.difficulty.direction : undefined}
        />
        <AttributeCell
          label="Topics"
          value={`${guessResult.topics.matchedItems.length} matched`}
          color={guessResult.topics.color}
          matchedItems={guessResult.topics.matchedItems}
          totalPoolSize={guessResult.topics.answerPoolSize}
        />
        <AttributeCell
          label="Algorithms"
          value="Algo"
          color={guessResult.algorithms.color}
        />
        <AttributeCell
          label="Acceptance"
          value="%"
          color={guessResult.acceptanceRate.direction === 'exact' ? 'green' : 'yellow'}
          direction={guessResult.acceptanceRate.direction}
        />
        <AttributeCell
          label="Runtime"
          value="Speed"
          color={guessResult.runtime.direction === 'exact' ? 'green' : 'yellow'}
          direction={guessResult.runtime.direction}
        />
      </div>
    </div>
  );
};