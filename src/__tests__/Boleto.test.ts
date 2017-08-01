import { BoletoType,
    getAmount,
    getBank,
    getDueDate,
    getFormattedTypeableLine,
    getSegment,
    getType,
    getTypeableLine,
    getTypeableLineSeqs,
} from "../models/Boleto";

const mockBankBarcode = "02191618900000166510010847800017732009402163";
const mockColletionBarcode = "83680000000560000820999989421070019693993499";
const mockInvalidBankBankBarcode = "39991611800001264300010847800017732009402163";

describe("boleto model", () => {
    it("should return the collection boleto type", () => {
        expect(getType(mockColletionBarcode))
        .toEqual(BoletoType.Collection);
    });

    it("should return a collection boleto typeable line", () => {
        expect(getTypeableLine(mockColletionBarcode))
        .toEqual("836800000009560000820996998942107009196939934994");
    });

    it("should return the bank boleto type", () => {
        expect(getType(mockBankBarcode))
        .toEqual(BoletoType.Bank);
    });

    it("should return a bank boleto typeable line", () => {
        expect(getTypeableLine(mockBankBarcode))
        .toEqual("02190010884780001773420094021639161890000016651");
    });

    it("should return the collection boleto typeable line sequence", () => {
        expect(getTypeableLineSeqs(mockColletionBarcode))
        .toEqual(["83680000000", "9", "56000082099", "6", "99894210700", "9", "19693993499", "4"]);
    });

    it("should return the bank boleto typeable line sequence", () => {
        expect(getTypeableLineSeqs(mockBankBarcode))
        .toEqual(["02190", "01088", "47800", "017734", "20094", "021639", "1", "61890000016651"]);
    });

    it("should return the collection boleto formatted typeable line", () => {
        expect(getFormattedTypeableLine(mockColletionBarcode))
        .toEqual("83680000000-9 56000082099-6 99894210700-9 19693993499-4");
    });

    it("should return the bank boleto formatted typeable line", () => {
        expect(getFormattedTypeableLine(mockBankBarcode))
        .toEqual("02190.01088 47800.017734 20094.021639 1 61890000016651");
    });

    it("should return the bank name", () => {
        expect(getBank(mockBankBarcode))
        .toEqual("BANESTES");
    });

    it("should return null for the bank", () => {
        expect(getBank(mockInvalidBankBankBarcode))
        .toBeNull();
    });

    it("should return the segment name", () => {
        expect(getSegment(mockColletionBarcode))
        .toEqual("Energia Életrica/Gás");
    });

    it("should return the due date", () => {
        expect(getDueDate(mockBankBarcode))
        .toEqual(new Date(2014, 8, 17));
    });

    it("should return the amount for the collection barcode", () => {
        expect(getAmount(mockColletionBarcode))
        .toEqual(56.00);
    });

    it("should return the amount for the bank barcode", () => {
        expect(getAmount(mockBankBarcode))
        .toEqual(166.51);
    });
});
