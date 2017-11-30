import { addDays } from "date-fns";

import { formatAmount, formatDate } from "../FormatUtils";

const mockAmount = 123.45;
const mockDate = new Date(2017, 0, 1);

describe("Format Utilities", () => {
    it("should format the amount", () => {
        expect(formatAmount(mockAmount)).toEqual("R$123,45");
    });

    it("should format the date", () => {
        expect(formatDate(mockDate)).toEqual("1/01/2017");
    });

    it("should format the date for today", () => {
        expect(formatDate(new Date())).toEqual("Hoje");
    });

    it("should format the date for tomorrow", () => {
        expect(formatDate(addDays(new Date(), 1))).toEqual("Amanhã");
    });
});
