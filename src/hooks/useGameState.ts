"use client";

import { useState, useEffect } from 'react';
import { Problem } from '@/types/problem';
import { GuessResult } from '@/types/game';
import { compareGuessResult } from '@/engine/buildGuessResult';
import { formatDate } from '@/utils/dateConverter';
import { Proza_Libre } from 'next/font/google';

export const MAX_GUESSES = 6;

function getStorageKey(date: Date): string {
    return `reverse-leetcode-progress-${formatDate(date)}`;
}

export function useGameState(dailyProblem: Problem, allProblems: Problem[]) {
    const [guesses, setGuesses] = useState<{ problem: Problem; result: GuessResult }[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(getStorageKey(new Date()));
        if (!saved) return;

        try {
            const guessedProblemNums: number[] = JSON.parse(saved);
            const restoredGuesses = guessedProblemNums
                .map((num) => allProblems.find((p) => p.problemNum === num))
                .filter((p): p is Problem => p !== undefined)
                .map((problem) => ({
                    problem, 
                    result: compareGuessResult(problem, dailyProblem),
                }));
            setGuesses(restoredGuesses);
        } catch {
            // Ignore corrupted or unexpected localStorage data and start fresh
        }
    }, [dailyProblem, allProblems]);

    const isWin = guesses.some((g) => g.problem.problemNum === dailyProblem.problemNum);
    const isGameOver = isWin || guesses.length >= MAX_GUESSES;

    const handleGuess = (selectedProblem: Problem) => {
        if (isGameOver || guesses.length >= MAX_GUESSES) return;

        const result = compareGuessResult(selectedProblem, dailyProblem);
        const updatedGuesses = [...guesses, { problem: selectedProblem, result }];
        setGuesses(updatedGuesses);

        const guessedProblemNums = updatedGuesses.map((g) => g.problem.problemNum);
        localStorage.setItem(getStorageKey(new Date()), JSON.stringify(guessedProblemNums));
    };

    return { guesses, isGameOver, isWin, handleGuess };
}