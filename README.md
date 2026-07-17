## Reverse LeetCode

A daily puzzle game where you guess a LeetCode problem based on clues about its difficulty, algorithms, topics, and runtime. Inspired by Wordle. Each guess reveals how close you are, narrowing down the answer until you land on the right problem or run out of tries.

Built for anyone who grinds LeetCode and wants a quick way to practice pattern recognition without sitting down for a full problem.

## Features

- Daily puzzle, same problem for every player each day
- 6 guesses per day, autocomplete search instead of typing exact titles
- Feedback across 6 attributes: difficulty, topics, algorithms, company, problem number, and runtime
- Set based matching for topics and algorithms, so feedback reflects real overlap instead of vague hints
- Higher/lower indicators for problem number and runtime to help narrow things down
- Win/loss stats and streak tracking saved locally
- Shareable result grid once you finish the day's puzzle

## Tech Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS
- React Compiler
- Fuse.js for search and autocomplete
- Vitest for testing the game logic
- Vercel for hosting
