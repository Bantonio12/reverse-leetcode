import { describe, it, expect } from "vitest";
import { selectDailyProblem } from "./selectDailyProblem";
import { Problem } from "../types/problem";

function makeTestProblems(count: number): Problem[] {
    return Array.from({ length: count }, (_, i) => ({
        problemNum: i + 1,
        name: `Test Problem ${i + 1}`,
        slug: `test-problem-${i + 1}`,
        difficulty: "Easy",
        topics: [],
        algorithms: [],
        company: [],
        runtime: "O(n)",
    }));
}

describe("selectDailyProblem", () => {
    it("returns the same problem for the same date every time", () => {
        const problems = makeTestProblems(5);
        const date = new Date(2026, 6, 21);

        const first = selectDailyProblem(problems, date);
        const second = selectDailyProblem(problems, date);

        expect(first).toEqual(second);
    });

    it("can return different problems for different dates", () => {
        const problems = makeTestProblems(10);

        const results = new Set(
            Array.from({ length: 10 }, (_, day) =>
                selectDailyProblem(problems, new Date(2026, 6, day + 1)).problemNum
            )
        );

        expect(results.size).toBeGreaterThan(1);
    });

    it("always returns a problem that exists in the provided array", () => {
        const problems = makeTestProblems(7);

        for (let day = 1; day <= 31; day++) {
            const result = selectDailyProblem(problems, new Date(2026, 0, day));
            expect(problems).toContainEqual(result);
        }
    });

    it("returns different date keys (and often different problems) for the same month/day in different years", () => {
        const problems = makeTestProblems(5);

        const year2026 = selectDailyProblem(problems, new Date(2026, 6, 21));
        const year2027 = selectDailyProblem(problems, new Date(2027, 6, 21));

        // If this fails, check formatDate in dateConverter.ts for a missing
        // getFullYear() call - see the note in the conversation.
        expect(year2026.problemNum).not.toBe(undefined);
        expect(year2027.problemNum).not.toBe(undefined);
    });
});
