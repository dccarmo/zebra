import { AddBoletoAction, SelectBarcodeAction } from "../../actions";
import BoletoStore from "../../stores/BoletoStore";
import BoletoReducer from "../BoletoReducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("boleto reducer", () => {
    it("should add a boleto", () => {
        expect(BoletoReducer.reducer({ boletos: [], selectedBarcode: null }, AddBoletoAction(mockBoleto)))
        .toEqual({ boletos: [mockBoleto], selectedBarcode: null });
    });

    it("shouldn't add the same boleto twice", () => {
        let state: BoletoStore = { boletos: [mockBoleto], selectedBarcode: null };

        state = BoletoReducer.reducer(state, AddBoletoAction(mockBoleto));
        expect(BoletoReducer.reducer(state, AddBoletoAction(mockBoleto)))
        .toEqual({ boletos: [mockBoleto], selectedBarcode: null });
    });

    it("should set the selected barcode", () => {
        expect(BoletoReducer.reducer(undefined, SelectBarcodeAction(mockBoleto.barcode)))
        .toHaveProperty("selectedBarcode", mockBoleto.barcode);
    });
});
