import { BoletoType,
    getBank,
    getDueDate,
    getFormattedTypeableLine,
    getSegment,
    getType,
    getTypeableLine,
    getTypeableLineSeqs,
} from "../models/Boleto";

const mockBankBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };
const mockColletionBoleto = { barcode: "83680000000560000820999989421070019693993499", title: "", paid: true };
const mockInvalidBankBankBoleto = { barcode: "39991611800001264300010847800017732009402163", title: "", paid: true };

describe("boleto model", () => {
    it("should return the collection boleto type", () => {
        expect(getType(mockColletionBoleto))
        .toEqual(BoletoType.Collection);
    });

    it("should return a collection boleto typeable line", () => {
        expect(getTypeableLine(mockColletionBoleto))
        .toEqual("836800000009560000820996998942107009196939934994");
    });

    it("should return the bank boleto type", () => {
        expect(getType(mockBankBoleto))
        .toEqual(BoletoType.Bank);
    });

    it("should return a bank boleto typeable line", () => {
        expect(getTypeableLine(mockBankBoleto))
        .toEqual("02190010884780001773420094021639161890000016651");
    });

    it("should return the collection boleto typeable line sequence", () => {
        expect(getTypeableLineSeqs(mockColletionBoleto))
        .toEqual(["83680000000", "9", "56000082099", "6", "99894210700", "9", "19693993499", "4"]);
    });

    it("should return the bank boleto typeable line sequence", () => {
        expect(getTypeableLineSeqs(mockBankBoleto))
        .toEqual(["02190", "01088", "47800", "017734", "20094", "021639", "1", "61890000016651"]);
    });

    it("should return the collection boleto formatted typeable line", () => {
        expect(getFormattedTypeableLine(mockColletionBoleto))
        .toEqual("83680000000-9 56000082099-6 99894210700-9 19693993499-4");
    });

    it("should return the bank boleto formatted typeable line", () => {
        expect(getFormattedTypeableLine(mockBankBoleto))
        .toEqual("02190.01088 47800.017734 20094.021639 1 61890000016651");
    });

    it("should return the bank name", () => {
        expect(getBank(mockBankBoleto))
        .toEqual("BANESTES");
    });

    it("should return null for the bank", () => {
        expect(getBank(mockInvalidBankBankBoleto))
        .toBeNull();
    });

    it("should return the segment name", () => {
        expect(getSegment(mockColletionBoleto))
        .toEqual("Energia Életrica/Gás");
    });

    it("should return the due date", () => {
        expect(getDueDate(mockBankBoleto))
        .toEqual(new Date(2014, 8, 17));
    });
});
