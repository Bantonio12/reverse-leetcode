"use client";

import React, { useState, useEffect } from 'react';
import { Problem } from '@/types/problem';
import { selectDailyProblem } from '@/engine/selectDailyProblem';
import { GameBoardInner } from './GameBoardInner';

interface GameBoardProps {
  allProblems: Problem[];
}

export const GameBoard: React.FC<GameBoardProps> = ({ allProblems }) => {
  const [dailyProblem, setDailyProblem] = useState<Problem | null>(null);

  useEffect(() => {
    setDailyProblem(selectDailyProblem(allProblems, new Date()));
  }, [allProblems]);

  if (!dailyProblem) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-zinc-500">
        Loading today's puzzle...
      </div>
    );
  }

  return <GameBoardInner dailyProblem={dailyProblem} allProblems={allProblems} />;
};