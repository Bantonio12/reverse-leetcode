export type FeedbackColor = "green" | "yellow" | "gray";

export type DifficultyFeedback = 
    | { color : "green"} 
    | { color : "yellow"; direction : "up" | "down"}
    | { color : "gray"};

export interface SetAttributeFeedback { // interface for feedback on pool type answer attributes (ex. Topics, Algorithms)
    color : FeedbackColor; 
    matchedItems : string[]; // The items that matched the items in the answer attribute's pool
    answerPoolSize : number; // The number of items in the answer attribute's pool
}

export type OrdinalDirection = "exact"| "up" | "down";

export interface OrdinalAttributeFeedback { // interface for feedback on numerical answer attributes (ex. Problem number)
    direction: OrdinalDirection;
}

export interface GuessResult {
    guessedProblemNum: number;
    difficulty: DifficultyFeedback;
    topics: SetAttributeFeedback;
    algorithms: SetAttributeFeedback;
    company: SetAttributeFeedback;
    problemNumber: OrdinalAttributeFeedback;
    runtime: OrdinalAttributeFeedback;
}

export type GameStatus = "in-progress" | "won" | "lost";

export interface GameState {
    answerProblemNum: number;
    guesses: GuessResult[];
    status: GameStatus;
    maxGuesses: number;
}