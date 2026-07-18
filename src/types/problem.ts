export const DIFFICULTY_LADDER = ["Easy", "Medium", "Hard"] as const;

export type Difficulty = (typeof DIFFICULTY_LADDER)[number];

export const RUNTIME_LADDER = [
    "O(1)", 
    "O(log n)", 
    "O(n)", 
    "O(n log n)", 
    "O(n^2)", 
    "O(n^3)", 
    "O(2^n)", 
    "O(n!)"
] as const;

export type Runtime = (typeof RUNTIME_LADDER)[number];

export interface Problem {
    problemNum: number;
    name: string;
    slug: string; // slug of the problem name, used for fuse.js auto-complete matching
    difficulty: Difficulty;
    topics: string[];
    algorithms: string[];
    company: string[];
    runtime: Runtime;
}