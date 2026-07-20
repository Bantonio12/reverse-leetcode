import { Problem } from '../types/problem';
import {GuessResult} from '../types/game';
import {
    compareDifficulty,
    compareTopics,
    compareAlgorithms,
    compareCompany,
    compareProblemNumber,
    compareRuntime
} from './compareAttributes';

export function compareGuessResult(guess: Problem, answer: Problem): GuessResult {
    return {
        // Assembly for all the attribute comparison functions.
        // Accepts guess and answer and produces a GuessResult object with the comparison results for each attribute.
        guessedProblemNum: guess.problemNum,
        difficulty: compareDifficulty(guess.difficulty, answer.difficulty),
        topics: compareTopics(guess.topics, answer.topics),
        algorithms: compareAlgorithms(guess.algorithms, answer.algorithms),
        company: compareCompany(guess.company, answer.company),
        problemNumber: compareProblemNumber(guess.problemNum, answer.problemNum),
        runtime: compareRuntime(guess.runtime, answer.runtime)
    };
}