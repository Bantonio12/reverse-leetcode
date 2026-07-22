import { GameBoard } from '@/components/GameBoard/GameBoard';
import { selectDailyProblem } from '@/engine/selectDailyProblem';
import { Problem } from '@/types/problem';
import { HowToPlay } from '@/components/HowToPlay/HowToPlay';

// Importing your problems dataset (assuming problems.json exists in src/data/)
import problemsData from '@/data/problems.json';

export const dynamic = 'force-dynamic';

export default function Home() {
  const allProblems = problemsData as Problem[];
  // Select today's daily problem based on current date
  const dailyProblem = selectDailyProblem(allProblems, new Date());

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-start p-6">
      <header className="mb-8 text-center relative w-full flex flex-col items-center">
        <div className="absolute right-0 top-0">
          <HowToPlay />
        </div>
        <h1 className="text-4xl tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
          Reverse LeetCode
        </h1>
        <p className="text-zinc-400 text-sm max-w-md">
          Guess the daily LeetCode problem based on attribute feedback.
        </p>
      </header>

      <GameBoard 
        dailyProblem={dailyProblem} 
        allProblems={allProblems} 
      />
    </main>
  );
}