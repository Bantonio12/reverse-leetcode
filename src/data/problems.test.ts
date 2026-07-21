import { describe, it, expect } from "vitest";
import { Problem, DIFFICULTY_LADDER, RUNTIME_LADDER } from "../types/problem";
import problems from "./problems.json";

const typedProblems = problems as Problem[];

describe("problems.json", () => {
    it("has at least one problem", () => {
        expect(typedProblems.length).toBeGreaterThan(0);
    });

    it("every problem has a valid difficulty", () => {
        for (const problem of typedProblems) {
            expect(DIFFICULTY_LADDER).toContain(problem.difficulty);
        }
    });

    it("every problem has a valid runtime", () => {
        for (const problem of typedProblems) {
            expect(RUNTIME_LADDER).toContain(problem.runtime);
        }
    });

    it("every problem number is unique", () => {
        const problemNums = typedProblems.map((p) => p.problemNum);
        expect(new Set(problemNums).size).toBe(problemNums.length);
    });
});