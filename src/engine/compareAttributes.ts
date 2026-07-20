import {Difficulty, DIFFICULTY_LADDER, Runtime, RUNTIME_LADDER} from "../types/problem";
import {DifficultyFeedback, SetAttributeFeedback, OrdinalAttributeFeedback, FeedbackColor} from "../types/game";

function comparePool(guess: string[], answer: string[]): SetAttributeFeedback {
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
    if (guessPosition === answerPosition) {
        return { direction: "exact" };
    } 
    return { direction: guessPosition < answerPosition ? "up" : "down" };    
}

export function compareDifficulty(guess: Difficulty, answer: Difficulty): DifficultyFeedback {
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

export function compareAlgorithms(guess: string[], answer: string[]): SetAttributeFeedback {
    return comparePool(guess, answer);
}

export function compareCompany(guess: string[], answer: string[]): SetAttributeFeedback {
    return comparePool(guess, answer);
}

export function compareProblemNumber(guess: number, answer: number): OrdinalAttributeFeedback {
    return compareOrdinalPosition(guess, answer);
}

export function compareRuntime(guess: Runtime, answer: Runtime): OrdinalAttributeFeedback {
    return compareOrdinalPosition(RUNTIME_LADDER.indexOf(guess), RUNTIME_LADDER.indexOf(answer));
}
