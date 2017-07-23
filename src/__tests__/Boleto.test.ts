import { BoletoType,
    getBoletoType,
    getBoletoTypeableLine,
    getBoletoTypeableLineSeqs,
    getFormattedTypeableLine } from "../models/Boleto";

const collectionBarCode = "83680000000560000820999989421070019693993499";
const bankBarCode = "02191618900000166510010847800017732009402163";

describe("boleto model", () => {
    it("should return the collection boleto type", () => {
        expect(getBoletoType({ barCode: collectionBarCode }))
        .toEqual(BoletoType.Collection);
    });

    it("should return a collection boleto typeable line", () => {
        expect(getBoletoTypeableLine({ barCode: collectionBarCode }))
        .toEqual("836800000009560000820996998942107009196939934994");
    });

    it("should return the bank boleto type", () => {
        expect(getBoletoType({ barCode: bankBarCode }))
        .toEqual(BoletoType.Bank);
    });

    it("should return a bank boleto typeable line", () => {
        expect(getBoletoTypeableLine({ barCode: bankBarCode }))
        .toEqual("02190010884780001773420094021639161890000016651");
    });

    it("should return the collection boleto typeable line sequence", () => {
        expect(getBoletoTypeableLineSeqs({ barCode: collectionBarCode }))
        .toEqual(["83680000000", "9", "56000082099", "6", "99894210700", "9", "19693993499", "4"]);
    });

    it("should return the bank boleto typeable line sequence", () => {
        expect(getBoletoTypeableLineSeqs({ barCode: bankBarCode }))
        .toEqual(["02190", "01088", "47800", "017734", "20094", "021639", "1", "61890000016651"]);
    });

    it("should return the collection boleto formatted typeable line", () => {
        expect(getFormattedTypeableLine({ barCode: collectionBarCode }))
        .toEqual("83680000000-9 56000082099-6 99894210700-9 19693993499-4");
    });

    it("should return the bank boleto formatted typeable line", () => {
        expect(getFormattedTypeableLine({ barCode: bankBarCode }))
        .toEqual("02190.01088 47800.017734 20094.021639 1 61890000016651");
    });
});
