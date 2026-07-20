import { describe, it, expect } from "vitest";
import { formatDate } from "./dateConverter";

describe("formatDate", () => {
    it("formats a date as YYYY-MM-DD", () => {
        expect(formatDate(new Date(2026, 6, 21))).toBe("2026-07-21");
    });

    it("zero-pads single-digit months and days", () => {
        expect(formatDate(new Date(2026, 0, 5))).toBe("2026-01-05");
    });

    it("produces a different date key for the same month/day in a different year", () => {
        const year2026 = formatDate(new Date(2026, 6, 21));
        const year2027 = formatDate(new Date(2027, 6, 21));

        expect(year2026).not.toBe(year2027);
    });
});