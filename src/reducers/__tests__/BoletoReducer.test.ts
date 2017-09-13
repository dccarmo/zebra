import { AddBoletoAction } from "../../actions";
import BoletoStore, { initialBoletoStore } from "../../stores/BoletoStore";
import BoletoReducer from "../BoletoReducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("boleto reducer", () => {
    it("should add a boleto", () => {
        expect(BoletoReducer.reducer({ boletos: [] }, AddBoletoAction(mockBoleto))).toEqual({ boletos: [mockBoleto] });
    });

    it("shouldn't add the same boleto twice", () => {
        let state: BoletoStore = initialBoletoStore;

        state = BoletoReducer.reducer(state, AddBoletoAction(mockBoleto));
        expect(BoletoReducer.reducer(state, AddBoletoAction(mockBoleto))).toEqual({ boletos: [mockBoleto] });
    });
});
