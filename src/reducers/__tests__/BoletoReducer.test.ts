import { AddBoletoAction } from "../../actions";
import Boleto from "../../models/Boleto";
import BoletoReducer from "../BoletoReducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("boleto reducer", () => {
    it("should add a boleto", () => {
        expect(BoletoReducer([], AddBoletoAction(mockBoleto)))
        .toEqual([mockBoleto]);
    });

    it("shouldn't add the same boleto twice", () => {
        let state: Boleto[] = [mockBoleto];

        state = BoletoReducer(state, AddBoletoAction(mockBoleto));
        expect(BoletoReducer(state, AddBoletoAction(mockBoleto)))
        .toEqual([mockBoleto]);
    });
});
