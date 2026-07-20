import { describe, it, expect } from "vitest";
import {
    compareDifficulty, 
    compareTopics, 
    compareAlgorithms, 
    compareCompany,
    compareProblemNumber, 
    compareRuntime
} from "./compareAttributes";

// Test cases for compareAttributes functions

describe("compareDifficulty", () => {
    it ("should return green when guess and answer are the same", () => {
        expect(compareDifficulty("Easy", "Easy")).toEqual({ color: "green" });
    });

    it ("should return yellow with an up arrow when the answer is one step harder", () => {
        expect(compareDifficulty("Easy", "Medium")).toEqual({ color: "yellow", direction: "up" });
    });

    it ("should return yellow with a down arrow when the answer is one step easier", () => {
        expect(compareDifficulty("Hard", "Medium")).toEqual({ color: "yellow", direction: "down" });
    });

    it ("should return gray when difficulties are two steps apart", () => {
        expect(compareDifficulty("Easy", "Hard")).toEqual({ color: "grey" });
    });
});

describe("compareTopics", () => {
    it ("should return green when topic sets are identical, regardless of order", () => {
        expect(compareTopics(["Arrays", "Hash Table"], ["Hash Table", "Arrays"])).toEqual({
            color: "green",
            matchedItems: ["Arrays", "Hash Table"],
            answerPoolSize: 2,
        });
    });

    it ("should return yellow with matched items when there is partial overlap", () => {
        expect(compareTopics(["Arrays", "Dynamic Programming"], ["Arrays", "Greedy", "Backtracking"])).toEqual({
            color: "yellow",
            matchedItems: ["Arrays"],
            answerPoolSize: 3,
        });
    });

    it ("should return yellow, not green, when the guess has extra topics beyond the answer's set", () => {
        expect(compareTopics(["Arrays", "Hash Table", "Two Pointers"], ["Arrays", "Hash Table"])).toEqual({
            color: "yellow",
            matchedItems: ["Arrays", "Hash Table"],
            answerPoolSize: 2,
        });
    });

    it ("should return yellow, not green, when the guess is missing some of the answer's topics", () => {
        expect(compareTopics(["Arrays"], ["Arrays", "Hash Table"])).toEqual({
            color: "yellow",
            matchedItems: ["Arrays"],
            answerPoolSize: 2,
        });
    });

    it ("should return gray when there is no overlap", () => {
        expect(compareTopics(["Arrays"], ["Linked List"])).toEqual({
            color: "grey",
            matchedItems: [],
            answerPoolSize: 1,
        });
    });
});

describe("compareAlgorithms", () => {
    it ("shares the same pool-comparison behavior as compareTopics", () => {
        expect(compareAlgorithms(["Two Pointers"], ["Two Pointers"])).toEqual({
            color: "green",
            matchedItems: ["Two Pointers"],
            answerPoolSize: 1,
        });
    });
});

describe("compareCompany", () => {
    it ("shares the same pool-comparison behavior as compareTopics", () => {
        expect(compareCompany(["Google"], ["Google", "Meta"])).toEqual({
            color: "yellow",
            matchedItems: ["Google"],
            answerPoolSize: 2,
        });
    });
});

describe("compareProblemNumber", () => {
    it ("returns exact when problem numbers match", () => {
        expect(compareProblemNumber(1, 1)).toEqual({ direction: "exact" });
    });

    it ("returns up when the answer's problem number is higher", () => {
        expect(compareProblemNumber(1, 5)).toEqual({ direction: "up" });
    });

    it ("returns down when the answer's problem number is lower", () => {
        expect(compareProblemNumber(5, 1)).toEqual({ direction: "down" });
    });
});

describe("compareRuntime", () => {
    it ("returns exact when runtimes match", () => {
        expect(compareRuntime("O(n log n)", "O(n log n)")).toEqual({ direction: "exact" });
    });

    it ("returns up when the answer's runtime is higher on the ladder", () => {
        expect(compareRuntime("O(1)", "O(n!)")).toEqual({ direction: "up" });
    });

    it ("returns down when the answer's runtime is lower on the ladder", () => {
        expect(compareRuntime("O(n!)", "O(1)")).toEqual({ direction: "down" });
    });
});
