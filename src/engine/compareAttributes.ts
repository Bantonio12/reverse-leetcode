import {Difficulty, DIFFICULTY_LADDER, Runtime, RUNTIME_LADDER} from "../types/problem";
import {DifficultyFeedback, SetAttributeFeedback, OrdinalAttributeFeedback, FeedbackColor, AlgorithmFeedback} from "../types/game";

function comparePool(guess: string[], answer: string[]): SetAttributeFeedback {
    // helper function to compare two sets of attributes (like topics, algorithms, or companies) and return feedback(color) on their overlap.
    const guessSet = new Set(guess);
    const answerSet = new Set(answer);
    const matchedItems = [...guessSet].filter((item) => answerSet.has(item));

    const color : FeedbackColor = 
        matchedItems.length === guessSet.size && matchedItems.length === answerSet.size
            ? "green"
            : matchedItems.length > 0
            ? "yellow"
            : "grey";

    return {
        color,
        matchedItems,
        answerPoolSize: answerSet.size
    };
}

function compareOrdinalPosition(guessPosition: number, answerPosition: number): OrdinalAttributeFeedback {
    // helper function to compare two ordinal attributes (like problem number or runtime) and return feedback(direction) on their relative positions.
    if (guessPosition === answerPosition) {
        return { direction: "exact" };
    } 
    return { direction: guessPosition < answerPosition ? "up" : "down" };    
}

function splitAlgorithmParts(value: string): string[] {
    // helper function for spliting algorithm attribute string when it contains '+' or '/'.
    return value.split(/[+/]/).map((part) => part.trim());
}

function sameFamily(strA: string, strB: string, taxonomy: Record<string, string>): boolean {
    // helper function for checking if strA and strB are from the same family in our taxonomy file.
    return taxonomy[strA] !== undefined && taxonomy[strA] === taxonomy[strB];
}

export function compareDifficulty(guess: Difficulty, answer: Difficulty): DifficultyFeedback {
    // helper function to compare two difficulty levels and return feedback(color & direction) on their relative positions in the DIFFICULTY_LADDER.
    const guessIndex = DIFFICULTY_LADDER.indexOf(guess);
    const answerIndex = DIFFICULTY_LADDER.indexOf(answer);
    const distance = Math.abs(guessIndex - answerIndex);

    if (distance === 0) {
        return { color: "green" };
    } 
    if (distance === 1) {
        return { color: "yellow", direction: guessIndex < answerIndex ? "up" : "down" };
    }
    return { color: "grey" };
}

export function compareTopics(guess: string[], answer: string[]): SetAttributeFeedback {
    return comparePool(guess, answer);
}

export function compareAlgorithms(guess: string, answer: string, taxonomy: Record<string, string>): AlgorithmFeedback {
    // function for comparing algorithm using algorithm taxonomy. 
    if (guess === answer) {
        return { color: "green" };
    }

    const guessParts = splitAlgorithmParts(guess);
    const answerParts = splitAlgorithmParts(answer);

    const foundCousin = guessParts.some((gp) => answerParts.some((ap) => gp === ap || sameFamily(gp, ap, taxonomy)));

    return { color: foundCousin ? "yellow" : "grey"};
}

export function compareAcceptance(guess: number, answer: number): OrdinalAttributeFeedback {
    return compareOrdinalPosition(guess, answer);
}

export function compareProblemNumber(guess: number, answer: number): OrdinalAttributeFeedback {
    return compareOrdinalPosition(guess, answer);
}

export function compareRuntime(guess: Runtime, answer: Runtime): OrdinalAttributeFeedback {
    return compareOrdinalPosition(RUNTIME_LADDER.indexOf(guess), RUNTIME_LADDER.indexOf(answer));
}
