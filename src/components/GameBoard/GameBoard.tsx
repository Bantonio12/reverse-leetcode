"use client";

import React, { useState } from 'react';
import { Problem } from '@/types/problem';
import { GuessResult } from '@/types/game';
import { compareGuessResult } from '@/engine/buildGuessResult';
import { GuessRow } from '../GuessRow/GuessRow';
import { GuessInput } from '../GuessInput/GuessInput';
import { KnownFactsPanel } from '../KnownFactsPanel/KnownFactsPanel';
import { ResultsShareCard } from '../ResultsShareCard/ResultsShareCard';

interface GameBoardProps {
  dailyProblem: Problem;
  allProblems: Problem[];
}

export const GameBoard: React.FC<GameBoardProps> = ({ dailyProblem, allProblems }) => {
  const [guesses, setGuesses] = useState<{ problem: Problem; result: GuessResult }[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const MAX_GUESSES = 6;

  const knownDifficulty = guesses.find((g) => g.result.difficulty.color === 'green')?.problem.difficulty;

  const knownRuntime = guesses.find((g) => g.result.runtime.direction === 'exact')?.problem.runtime;

  const knownTopics = [...new Set(guesses.flatMap((g) => g.result.topics.matchedItems))];

  const handleGuess = (selectedProblem: Problem) => {
    if (isGameOver || guesses.length >= MAX_GUESSES) return;

    const result = compareGuessResult(selectedProblem, dailyProblem);
    const updatedGuesses = [...guesses, { problem: selectedProblem, result }];
    setGuesses(updatedGuesses);

    if (selectedProblem.problemNum === dailyProblem.problemNum) {
      setIsWin(true);
      setIsGameOver(true);
    } else if (updatedGuesses.length >= MAX_GUESSES) {
      setIsGameOver(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <KnownFactsPanel 
        knownTopics={knownTopics}
        knownDifficulty={knownDifficulty}
        knownRuntime={knownRuntime}
      />

      <div className="flex flex-col gap-1 my-4">
        {Array.from({ length: MAX_GUESSES }).map((_, idx) => {
          const guessData = guesses[idx];
          return (
            <GuessRow
              key={idx}
              guessResult={guessData?.result}
              guessedProblem={guessData?.problem}
            />
          );
        })}
      </div>

      {!isGameOver && (
        <GuessInput
          problems={allProblems}
          onSelectGuess={handleGuess}
          disabled={isGameOver}
        />
      )}

      {isGameOver && (
        <ResultsShareCard
          isWin={isWin}
          guesses={guesses.map((g) => g.result)}
          streak={1}
          answerTitle={dailyProblem.name}
        />
      )}
    </div>
  );
};