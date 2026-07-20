import { Problem } from '../types/problem';
import {formatDate} from '../utils/dateConverter';

function djb2Hash(input : string): number {
    // djb2 hash function to generate a hash from a date string input. This hash is used to create a hash value from the current date for daily puzzle selection.
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
        hash = (hash * 33 + input.charCodeAt(i)) | 0;
    }
    return hash;
}

export function selectDailyProblem(problems: Problem[], date: Date): Problem {
    // Selects a daily problem based on the current date. 
    // It uses the djb2hash function to generate a hash from the formatted date string, which is then used to select a problem from the provided list.
    const dateString = formatDate(date);
    const hash = djb2Hash(dateString);
    const index = Math.abs(hash) % problems.length;
    return problems[index];
}